import MapComponent from "./components/Map/Map";
import useDataStore from "./stores/data.store";
import { useEffect } from "react";
import Footer from "./components/shared/Footer/Footer";
import DriverList from "./components/DriverList/DriverList";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const fetchDrivers = useDataStore((state) => state.fetchDrivers);
  const fetchDeliveries = useDataStore((state) => state.fetchDeliveries);

  useEffect(() => {
    fetchDrivers();
    fetchDeliveries();
  }, []);

  return (
    <>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <MapComponent />
        <DriverList />
      </APIProvider>
      <Footer />
    </>
  );
}

export default App;
