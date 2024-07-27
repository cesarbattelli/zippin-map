import { IDelivery, IDriver } from "../interfaces/common";

export class DataService {
  static getDrivers = async (): Promise<IDriver[]> => {
    try {
      const response = await fetch("/drivers.json");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: IDriver[] = await response.json();
      return data;
    } catch (error) {
      console.error("Unable to get drivers", error);
      throw new Error("Unable to get drivers");
    }
  };

  static getDeliveries = async (): Promise<IDelivery[]> => {
    try {
      const response = await fetch("/deliveries.json");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: IDelivery[] = await response.json();
      return data;
    } catch (error) {
      console.error("Unable to get deliveries", error);
      throw new Error("Unable to get deliveries");
    }
  };
}
