import { INTENTS, LOG_LEVEL } from '@/lib/config/bot';

import {
  ApplicationCommandRegistries,
  RegisterBehavior,
  SapphireClient,
} from '@sapphire/framework';

export default class UTHAssistantClient extends SapphireClient {
  public constructor() {
    super({
      intents: INTENTS,
      logger: {
        level: LOG_LEVEL,
      },
    });
  }

  public override login(token?: string) {
    ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
      RegisterBehavior.BulkOverwrite,
    );

    return super.login(token);
  }
}
