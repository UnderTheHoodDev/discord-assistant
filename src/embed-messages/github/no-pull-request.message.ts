import { GuildService } from '@/services/guild.service';
import { type SapphireClient } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

const NoPullRequestMessage = (client: SapphireClient, guildId: string) => {
  const guild = new GuildService(client, guildId);
  const CEO_ID = guild.getRoleByName('CEO')?.id;
  const COO_ID = guild.getRoleByName('COO')?.id;

  return {
    content: `<@&${CEO_ID}> <@&${COO_ID}>`,
    embeds: [
      new EmbedBuilder()
        .setTitle('No Open Pull Requests')
        .setDescription(
          'There are currently no open pull requests in this repository.',
        )
        .setColor('#349454')
        .setFooter({ text: 'Stay tuned for updates!' }),
    ],
    allowed_mentions: {
      parse: ['roles'],
    },
  };
};

export default NoPullRequestMessage;
