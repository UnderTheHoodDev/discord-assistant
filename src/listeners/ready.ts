import GuildCache from '@/lib/cache/guild-cache';
import { GUILD_ID } from '@/lib/config/bot';
import { DailyTask } from '@/tasks/daily.task';
import { GithubTask } from '@/tasks/github.task';
import { Listener, type SapphireClient } from '@sapphire/framework';

export default class ReadyListener extends Listener {
  private dailyTask: DailyTask;
  private githubTask: GithubTask;
  private guildCache: GuildCache;

  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
    super(context, {
      ...options,
      event: 'ready',
      once: true,
    });

    this.dailyTask = new DailyTask(this.container.client);
    this.githubTask = new GithubTask(this.container.client);
    this.guildCache = new GuildCache(this.container.client);
  }

  public async run(client: SapphireClient) {
    client.logger.info(`Logged in as ${client.user?.tag}`);
    await this.guildCache.cacheGuildInformation(GUILD_ID);
    this.dailyTask.start(GUILD_ID);
    this.githubTask.start(GUILD_ID);
  }
}
