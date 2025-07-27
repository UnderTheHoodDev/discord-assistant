import { LogLevel } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN || '';
export const APP_ID = process.env.APP_ID || '';
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const GUILD_ID = process.env.GUILD_ID || '';
export const LOG_LEVEL =
  process.env.NODE_ENV === 'development' ? LogLevel.Debug : LogLevel.Info;

export const INTENTS = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.MessageContent,
];

if (!DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is required');
}

if (!APP_ID) {
  throw new Error('APP_ID is required');
}

if (!CLIENT_ID) {
  throw new Error('CLIENT_ID is required');
}

if (!GUILD_ID) {
  throw new Error('GUILD_ID is required');
}

export {};
