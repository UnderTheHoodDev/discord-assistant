import DailyMessage from '@/embed-messages/daily.message';
import DailyService from '@/services/daily.service';
import { GuildService } from '@/services/guild.service';
import { container } from '@sapphire/framework';
import { Client, TextChannel } from 'discord.js';
import cron from 'node-cron';

export class DailyTask {
  private dailyService: DailyService;
  private client: Client;
  private CHANNEL_ID = '1395439064458465463';

  public constructor(client: Client) {
    this.client = client;
    this.dailyService = new DailyService();
  }

  public start(guildId: string) {
    cron.schedule(
      '0 0 7 * * *',
      async () => {
        await this.run(guildId);
        this.client;
      },
      {
        timezone: 'Asia/Ho_Chi_Minh',
      },
    );
    container.logger.info(
      'Daily task scheduled to run at 07:00 Ho Chi Minh time',
    );
  }

  private async run(guildId: string) {
    const guildService = new GuildService(this.client, guildId);
    try {
      const channel = guildService.getChannelById(
        this.CHANNEL_ID,
      ) as TextChannel;
      const randomQuote = await this.dailyService.getRandomDailyQuote();
      await channel.send(DailyMessage(randomQuote));
    } catch (error) {
      container.logger.error('Error sending daily information:', error);
    }
  }
}
