import { REPOSITORIES } from '@/constants/github';
import NoPullRequestMessage from '@/embed-messages/github/no-pull-request.message';
import PullRequestsMessage from '@/embed-messages/github/pull-requests.message';
import GithubService from '@/services/github.service';
import { GuildService } from '@/services/guild.service';
import { PullRequest } from '@/types/github';
import { container } from '@sapphire/framework';
import { Client, TextChannel } from 'discord.js';

export class GithubTask {
  private client: Client;
  private githubService: GithubService;

  public constructor(client: Client) {
    this.client = client;
    this.githubService = new GithubService();
  }

  public start(guildId: string) {
    // cron.schedule(
    //   '0 0 7 * * *',
    //   async () => {
    //     await this.run(guildId);
    //     this.client;
    //   },
    //   {
    //     timezone: 'Asia/Ho_Chi_Minh',
    //   },
    // );
    setInterval(async () => {
      await this.run(guildId);
      this.client;
    }, 1000 * 30);
    container.logger.info(
      'Github task scheduled to run at 07:00 Ho Chi Minh time',
    );
  }

  private async run(guildId: string) {
    const guildService = new GuildService(this.client, guildId);
    try {
      REPOSITORIES.map(async (repo) => {
        const channel = guildService.getChannelById(
          repo.channel_id,
        ) as TextChannel;

        const data = await this.githubService.getRepoPullRequests(repo.name);

        if (data.length === 0) {
          await channel.send(NoPullRequestMessage(this.client, guildId));
          return;
        }

        const pullRequests: Array<PullRequest> = await Promise.all(
          data.map((pullRequest: any) =>
            this.githubService.getPullRequestDetail(
              repo.name,
              pullRequest.number,
            ),
          ),
        );

        await channel.send(
          PullRequestsMessage(this.client, guildId, pullRequests),
        );
      });
    } catch (error) {
      container.logger.error('Error sending daily information:', error);
    }
  }
}
