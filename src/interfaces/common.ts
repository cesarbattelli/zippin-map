export interface IDriver {
  id: number;
  firstName: string;
  lastName: string;
  reputation: number;
  orders?: string[];
  avatar: string;
  color: string;
}

export interface IDelivery {
  id: number;
  lat: number;
  lng: number;
  title: string;
  description: string;
}

export interface IAssignment {
  id: string;
  delivery: IDelivery;
  driver: IDriver;
  assignedAt: Date;
}
