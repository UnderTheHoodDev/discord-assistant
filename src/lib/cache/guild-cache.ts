import { type SapphireClient } from '@sapphire/framework';

export default class GuildCache {
  private client: SapphireClient;

  constructor(client: SapphireClient) {
    this.client = client;
  }

  public async cacheGuildInformation(guildId: string) {
    if (!this.client.guilds.cache.has(guildId)) {
      await this.client.guilds.fetch(guildId);
    }
    const guild = this.client.guilds.cache.get(guildId);

    if (!guild) {
      this.client.logger.error(`Guild with ID ${guildId} not found`);
      return;
    }
    if (guild.members.cache.size === 0) {
      await guild.members.fetch();
    }
    if (guild.roles.cache.size === 0) {
      await guild.roles.fetch();
    }
    if (guild.channels.cache.size === 0) {
      await guild.channels.fetch();
    }
  }
}
