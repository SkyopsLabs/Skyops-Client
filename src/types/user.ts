export interface IUser {
  username?: string;
  code: string;
  gmail?: string;
  discord_id?: number;
  discord_username?: string;
  x_id?: number;
  x_username?: string;
  tg_id?: number;
  tg_username?: string;
  lastDiscordMessage?: Date;
  lastTelegramMessage?: Date;
  wallet: string;
  balance?: number;
  points?: number;
  claimedDiscord?: boolean;
  claimedTelegram?: boolean;
  tokens?: number;
  created_at?: Date;
  updated_at?: Date;
}
