import { GUILD_ID } from '@/lib/config/bot';
import { type ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { type ChatInputCommandInteraction } from 'discord.js';

export default class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ping',
      description: 'Ping bot to see if it is alive',
    });
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry,
  ) {
    registry.registerChatInputCommand(
      (command) => command.setName(this.name).setDescription(this.description),
      { idHints: [], guildIds: [GUILD_ID] },
    );
  }

  public chatInputRun(interaction: ChatInputCommandInteraction) {
    console.log(`Ping command invoked by ${interaction.user.tag}`);
    return interaction.reply({
      content: `Pong! 🏓 ${interaction.client.ws.ping}ms. Duy dep trai nhat Yes sir`,
    });
  }
}
