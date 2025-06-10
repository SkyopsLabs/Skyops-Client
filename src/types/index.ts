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
  points?: number;
  tokens?: number;
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
  pointsHistory?: IPointsHistory[];
  created_at?: Date;
  updated_at?: Date;
  tokens?: number;
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

export interface TransformedNodeData {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  coordinates: [number, number];
  count: number;
  region: string;
  status: string;
  load: number;
  tier: string;
  agentId: string;
  hostname: string;
  cpuCount: number;
  ramTotal: number;
  ramFree: number;
  diskTotal: number;
  diskFree: number;
  gpuName?: string;
  gpuRamTotal?: number;
  gpuRamFree?: number;
  reputationScore: number;
  totalJobsCompleted: number;
  uptime: number;
  lastSeen: Date;
}

export // Interface for the raw node data from database
interface RawNodeData {
  _id: { $oid: string };
  agent_id: string;
  hostname: string;
  location: {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    timezone: string;
    readme: string;
  };
  system_info: {
    hostname: string;
    platform: string;
    platform_family: string;
    platform_version: string;
    kernel_version: string;
    architecture: string;
    cpu_count: number;
    boot_time: string;
    uptime: number;
  };
  wallet_address: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_seen: string;
  reputation_score: number;
  total_jobs_completed: number;
  cpu_count: number;
  disk_free: number;
  disk_total: number;
  gpu_name?: string;
  gpu_ram_free?: number;
  gpu_ram_total?: number;
  ram_free: number;
  ram_total: number;
}
