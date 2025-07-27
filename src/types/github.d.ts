type PullRequest = {
  number: number;
  title: string;
  url: string;
  author: string;
  approvedBy: Array<string>;
  state: string;
  createdAt: string;
  firstCommitAt: string;
  firstReviewedAt: string;
  firstApprovedAt: string;
  lastApprovedAt: string;
};

export type { PullRequest };
