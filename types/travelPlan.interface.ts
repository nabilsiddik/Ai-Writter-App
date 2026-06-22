import { IUser } from "./user.interface";

export interface ITravelPlan {
  id: string;
  title: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetFrom: string;
  budgetTo: string;
  createdAt: string;
  updatedAt: string;
  travelType: string;
  userId: string;
  user: IUser;
}

export enum TravelType {
  SOLO = "SOLO",
  FAMILY = "FAMILY",
  FRIENDS = "FRIENDS",
}
