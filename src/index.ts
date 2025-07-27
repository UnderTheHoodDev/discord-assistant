import UTHAssistantClient from '@/client/UTHAssistantClient';
import { DISCORD_TOKEN } from '@/lib/config/bot';

const client = new UTHAssistantClient();

client.login(DISCORD_TOKEN);
