import { create } from "zustand";
import { IDelivery, IDriver } from "../interfaces/common";
import { DataService } from "../services/data.service";

type DataStore = {
  drivers: IDriver[];
  fetchDrivers: () => Promise<void>;
  deliveries: IDelivery[];
  fetchDeliveries: () => Promise<void>;
};

const useDataStore = create<DataStore>()((set) => ({
  drivers: [],
  fetchDrivers: async () => {
    try {
      const drivers = await DataService.getDrivers();

      set({ drivers });
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  },
  deliveries: [],
  fetchDeliveries: async () => {
    try {
      const deliveries = await DataService.getDeliveries();

      set({ deliveries });
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  },
}));

export default useDataStore;
