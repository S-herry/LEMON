import "./App.css";
import Dashboard from "./components/Dashboard";
import ContextProvider from "./content/ContextProvider";
function App() {
  return (
    <ContextProvider>
      <Dashboard />
    </ContextProvider>
  );
}

export default App;
