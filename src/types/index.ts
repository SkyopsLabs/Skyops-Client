import { ReactNode } from "react";

export interface IAppContext {
  loading: boolean;
  user: IUser | null;
  refetchUserData: () => Promise<void>;
}

export interface IAppProviderProps {
  children: ReactNode;
}

export interface ILeaderboard {
  wallet: string;
  points: number;
  rank: number;
  referee: string;
}

export interface IPointsHistory {
  date: String;
  type: string; // e.g., "earned", "spent", "bonus"
  points: number;
}

export interface IUser {
  username?: string;
  code: string;
  followed?: boolean;
  gmail?: string;
  discord_id?: string;
  discord_username?: string;
  x_id?: string;
  referee: string;
  x_username?: string;
  tg_id?: string;
  tg_username?: string;
  lastDiscordMessage?: Date;
  lastTelegramMessage?: Date;
  wallet: string;
  balance?: number;
  points?: number;
  claimedDiscord?: boolean;
  claimedTelegram?: boolean;
  tokens?: number;
  pointsHistory?: IPointsHistory[];
  created_at?: Date;
  updated_at?: Date;
  token?: number;
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
  sender: "user" | "assistant";
  message: string;
  system?: string;
  model?: string;
  tokens: number;
  created_at: string;
}

export interface AppSession {
  x_id: number;
  x_username: string;
  tg_id: number;
  tg_username: string;
  discord_id: number;
  discord_username: string;
  expires: string;
  email: string;
}
