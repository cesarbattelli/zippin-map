import "./App.css";
import MapComponent from "./components/Map/Map";
import Drivers from "./components/DriverList/DriverList";
import useDataStore from "./stores/data.store";
import { useEffect } from "react";

function App() {
  const fetchDrivers = useDataStore((state) => state.fetchDrivers);
  const fetchDeliveries = useDataStore((state) => state.fetchDeliveries);

  useEffect(() => {
    fetchDrivers();
    fetchDeliveries();
  }, []);

  return (
    <>
      <MapComponent />
      <Drivers />
    </>
  );
}

export default App;
