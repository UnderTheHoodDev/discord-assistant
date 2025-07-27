import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || '';

if (!GITHUB_ACCESS_TOKEN) {
  throw new Error('GITHUB_ACCESS_TOKEN is required');
}
