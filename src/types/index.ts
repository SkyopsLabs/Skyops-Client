import { ReactNode } from "react";

export interface IAppContext {
  loading: boolean;
  user: IUser | null;
  refetchUserData: () => Promise<void>;
}

export interface IAppProviderProps {
  children: ReactNode;
}

export interface IUser {
  username?: string;
  tokens?: string;
  wallet: string;
  balance: number;
  created_at: string;
}

export interface IBilling {
  user: IUser;
  amount: number;
  created_at: string;
}

export interface IModel {
  _id: string;
  name: string;
  description: string;
  pricePerInference: number;
  pricePerFineTune: number;
  downloads: number;
  link: string;
  image: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface IService {
  name: string;
  defaultValue: number;
}

export interface IOrganization {
  _id: string;
  name: string;
  owner: IUser;
  members: IUser[];
  created_at: string;
  updated_at: string;
}

export interface IChat {
  type: "user" | "assistant";
  content: string;
  tokens: number;
  created_at: string;
}
