import { MEMBERS_FROM_GITHUB_TO_DISCORD } from '@/constants/github';
import { calculateDuration, getUTC7Time } from '@/helpers/time';
import { GuildService } from '@/services/guild.service';
import { PullRequest } from '@/types/github';
import { SapphireClient } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

const PullRequest = (
  pullRequest: PullRequest,
  discordAuthorId?: string,
): EmbedBuilder => {
  const {
    number,
    title,
    url,
    author,
    state,
    approvedBy,
    createdAt,
    firstCommitAt,
    firstReviewedAt,
    firstApprovedAt,
    lastApprovedAt,
  } = pullRequest;
  const openedAt = new Date(pullRequest.createdAt);
  const firstCommitToOpen = calculateDuration(
    new Date(firstCommitAt),
    openedAt,
  );
  const firstOpenToFirstReviewed = calculateDuration(
    new Date(firstCommitAt),
    new Date(firstReviewedAt),
  );
  const firstReviewToFirstApproved = calculateDuration(
    new Date(firstReviewedAt),
    new Date(firstApprovedAt),
  );
  const lastApprovedToNow = calculateDuration(
    new Date(lastApprovedAt),
    new Date(),
  );
  const detailState =
    approvedBy.length > 0
      ? `Approved by: ${approvedBy.map((user) => `@${user}`).join(', ')}`
      : state;

  const embedTitle = `PR#${number}: ${title}`;
  const embedDescription = `**Author**: <@${discordAuthorId}> - @${author}\n
  **State**: ${detailState}\n
  **Created at**: ${getUTC7Time(new Date(createdAt))}\n
  **Time from first commit to open**: ${firstCommitToOpen}\n
  **Time from open to first review**: ${firstOpenToFirstReviewed}\n
  **Time from first review to approved**: ${firstReviewToFirstApproved}\n
  **Time from last approved to now**: ${lastApprovedToNow}
  `;

  return new EmbedBuilder()
    .setTitle(embedTitle)
    .setURL(url)
    .setDescription(embedDescription)
    .setColor('#349454');
};

const PullRequestsMessage = (
  client: SapphireClient,
  guildId: string,
  pullRequests: Array<PullRequest>,
) => {
  const guildService = new GuildService(client, guildId);
  const discordAuthorId = guildService.getMemberByName(
    MEMBERS_FROM_GITHUB_TO_DISCORD[pullRequests[0]?.author],
  )?.user.id;
  const CEO_ID = guildService.getRoleByName('CEO')?.id;
  const COO_ID = guildService.getRoleByName('COO')?.id;

  return {
    content: `<@&${CEO_ID}> <@&${COO_ID}> Here are the latest pull requests. Please check!`,
    embeds: pullRequests.map((pullRequest) =>
      PullRequest(pullRequest, discordAuthorId),
    ),
    allowed_mentions: {
      parse: ['roles', 'users'],
    },
  };
};

export default PullRequestsMessage;
