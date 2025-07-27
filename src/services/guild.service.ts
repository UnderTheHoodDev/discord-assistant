import { type SapphireClient } from '@sapphire/framework';
import { Guild } from 'discord.js';

export class GuildService {
  private client: SapphireClient;
  private guildId: string;
  private guild?: Guild;

  constructor(client: SapphireClient, guildId: string) {
    this.client = client;
    this.guildId = guildId;
    this.fetchGuild();
  }

  public async fetchGuild() {
    if (!this.client.guilds.cache.has(this.guildId)) {
      await this.client.guilds.fetch(this.guildId);
    }

    this.guild = this.client.guilds.cache.get(this.guildId);
  }

  public getAllChannels() {
    return this.guild?.channels.cache;
  }

  public getChannelById(channelId: string) {
    const channel = this.guild?.channels.cache.get(channelId);
    if (!channel) {
      this.client.logger.error(`Channel with ID ${channelId} not found`);
      return null;
    }

    return channel;
  }

  public getAllRoles() {
    return this.guild?.roles.cache;
  }

  public getRoleById(roleId: string) {
    const role = this.guild?.roles.cache.get(roleId);
    if (!role) {
      this.client.logger.error(`Role with ID ${roleId} not found`);
      return null;
    }

    return role;
  }

  public getRoleByName(roleName: string) {
    const role = this.guild?.roles.cache.find((r) => r.name === roleName);
    if (!role) {
      this.client.logger.error(`Role with name ${roleName} not found`);
      return null;
    }

    return role;
  }

  public getAllMembers() {
    return this.guild?.members.cache;
  }

  public getMemberById(memberId: string) {
    const member = this.guild?.members.cache.get(memberId);
    if (!member) {
      this.client.logger.error(`Member with ID ${memberId} not found`);
      return null;
    }

    return member;
  }

  public getMemberByName(memberName: string) {
    const member = this.guild?.members.cache.find(
      (m) => m.user.username === memberName,
    );
    if (!member) {
      this.client.logger.error(`Member with name ${memberName} not found`);
      return null;
    }

    return member;
  }
}
