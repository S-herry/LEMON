import { createContext, useState, useEffect } from "react";

export const RoomContext = createContext({
  settingUnlock: () => {},
  getRootState: () => {},
  updateBooking: () => {},
  settingCellWidth: () => {},
  delBooking: () => {},
  room: null,
  currentRoomState: null,
  unlock: true,
  allRootData: null,
  cellWidth: 0,
  daysToShow: "web",
  currentRoomInfo: null,
  saveData: () => {}, // 新增保存功能
});

const ContextProvider = ({ children }) => {
  const [daysToShow, setDaysToShow] = useState(14); // 默认 14 天（桌面）
  const [cellWidth, setCellWidth] = useState(0);
  const [allRootData, setAllRootData] = useState(null);
  const [unlock, setUnlock] = useState(true);
  const [currentRoomState, setRoomState] = useState(null);
  const [currentRoomInfo, setRoomInfo] = useState(null);
  const [currentBooking, setBooking] = useState(null);
  const [movedBooking, setMovedBooking] = useState(null);

  function settingUnlock() {
    setUnlock((prev) => !prev);
  }

  const getRootState = (roomId, infoId, bookingId) => {
    if (roomId == null || infoId == null || bookingId == null) {
      setRoomState(null);
      setBooking(null);
      setRoomInfo(null);
      return;
    }

    const room = allRootData.find((room) => room.id === roomId);
    setRoomState(room);
    if (!room) {
      console.error("找不到房間");
      return null;
    }

    const info = room.info.find((info) => info.id === infoId);
    if (!info) {
      console.error("找不到info");
      return null;
    }
    setRoomInfo(info);

    const booking =
      info.bookings.find((booking) => booking.id === bookingId) || null;

    if (!booking) {
      console.error("找不到 booking");
      return null;
    }
    setBooking(booking);
    return booking;
  };

  const settingCellWidth = (info) => {
    setCellWidth(info);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/sections.json");
        if (!response.ok) throw new Error("錯誤");
        const data = await response.json();
        setAllRootData(data);
      } catch (err) {
        console.error("取得錯誤:", err);
      }
    }
    fetchData();
  }, []);

  const delBooking = (fromRoomId, fromInfoId, bookingId) => {
    setAllRootData((prevData) => {
      let movedBooking = null;
      const newData = prevData.map((room) => {
        if (room.id === fromRoomId) {
          return {
            ...room,
            info: room.info.map((info) => {
              if (info.id === fromInfoId) {
                const updatedBookings = info.bookings.filter((b) => {
                  if (b.id === bookingId) {
                    movedBooking = { ...b };
                    return false;
                  }
                  return true;
                });
                return { ...info, bookings: updatedBookings };
              }
              return info;
            }),
          };
        }
        return room;
      });
      if (movedBooking) {
        setMovedBooking(movedBooking); // ✅ 只有找到才设置
      } else {
        console.warn("未找到要删除的预订");
      }

      return newData;
    });
  };
  useEffect(() => {
    const updateDaysToShow = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setDaysToShow("web");
      } else if (width >= 768) {
        setDaysToShow("tablet");
      } else {
        setDaysToShow("mobile");
      }
    };
    updateDaysToShow();
    window.addEventListener("resize", updateDaysToShow);
    return () => window.removeEventListener("resize", updateDaysToShow);
  }, []);

  const updateBooking = (toRoomId, toInfoId) => {
    setAllRootData((prevData) => {
      let newData = JSON.parse(JSON.stringify(prevData));

      if (!movedBooking) {
        return prevData;
      }

      const toRoom = newData.find((room) => room.id === toRoomId);
      if (toRoom) {
        const toInfo = toRoom.info.find((info) => info.id === toInfoId);
        if (toInfo) {
          const { startDate, endDate } = movedBooking;

          const hasConflict = toInfo.bookings.some((b) => {
            return !(
              new Date(b.endDate) <= new Date(startDate) ||
              new Date(b.startDate) >= new Date(endDate)
            );
          });

          if (hasConflict) {
            return prevData;
          }

          const movedBookingWithColor = { ...movedBooking, color: "yellow" };
          toInfo.bookings.push(movedBookingWithColor);
        }
      }

      setAllRootData(newData);

      return newData;
    });
  };

  const saveData = () => {
    const cleanedData = allRootData.map((room) => ({
      ...room,
      info: room.info.map((info) => ({
        ...info,
        bookings: info.bookings.map(({ color, ...rest }) => rest), // 去除 color
      })),
    }));

    setAllRootData(cleanedData);
    settingUnlock();
  };

  return (
    <RoomContext.Provider
      value={{
        getRootState,
        settingUnlock,
        updateBooking,
        settingCellWidth,
        delBooking,
        unlock,
        allRootData,
        cellWidth,
        daysToShow,
        currentRoomState,
        currentRoomInfo,
        currentBooking,
        saveData,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default ContextProvider;
