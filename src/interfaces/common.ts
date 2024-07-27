export interface IDriver {
  id: number;
  firstName: string;
  lastName: string;
  reputation: number;
  orders?: string[];
  avatar: string;
}
