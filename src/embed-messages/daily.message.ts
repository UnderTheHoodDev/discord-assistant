import { DailyQuote } from '@/types/daily';
import { EmbedBuilder } from 'discord.js';

const DailyMessage = (randomQuote: DailyQuote) => {
  return {
    content: '@everyone',
    embeds: [
      new EmbedBuilder()
        .setTitle('🌟 Daily Quote')
        .setDescription(`"${randomQuote.quote}"\n— ${randomQuote.author}`)
        .setColor('#349454')
        .setTimestamp()
        .setFooter({ text: 'Stay inspired!' }),
    ],
    allowed_mentions: {
      parse: ['everyone'],
    },
  };
};

export default DailyMessage;
