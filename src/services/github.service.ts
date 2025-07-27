import { calculateDuration, getUTC7Time } from '@/helpers/time';
import { githubAPI } from '@/lib/api';
import { PullRequest } from '@/types/github';

export default class GithubService {
  private ORGANIZATION_NAME = 'UnderTheHoodDev';

  public constructor() {}

  public async getRepoPullRequests(
    repoName: string,
  ): Promise<Array<PullRequest>> {
    try {
      const response = await githubAPI.get(
        `/repos/${this.ORGANIZATION_NAME}/${repoName}/pulls`,
        {
          params: {
            state: 'open',
            sort: 'created',
            direction: 'desc',
            per_page: 20,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching pull requests:', error);
      throw error;
    }
  }

  public async getPullRequestDetail(
    repoName: string,
    pullRequestID: string,
  ): Promise<PullRequest> {
    const options = {
      sort: 'created_at',
      direction: 'desc',
    };
    try {
      const [prResponse, reviewsResponse, commitsResponse] = await Promise.all([
        githubAPI.get(
          `/repos/${this.ORGANIZATION_NAME}/${repoName}/pulls/${pullRequestID}`,
          { params: options },
        ),
        githubAPI.get(
          `/repos/${this.ORGANIZATION_NAME}/${repoName}/pulls/${pullRequestID}/reviews`,
          { params: options },
        ),
        githubAPI.get(
          `/repos/${this.ORGANIZATION_NAME}/${repoName}/pulls/${pullRequestID}/commits`,
          { params: options },
        ),
      ]);

      const prData = prResponse.data,
        reviews = reviewsResponse.data,
        commits = commitsResponse.data;

      const approvedReviews = reviews.filter(
        (review: any) => review.state === 'APPROVED',
      );

      const firstCommitAt = commits[0]?.commit?.author?.date;
      const firstReviewAt = reviews[reviews.length - 1]?.submitted_at;
      const firstApproveAt =
        approvedReviews[approvedReviews.length - 1]?.submitted_at;
      const lastApproveAt = approvedReviews[0]?.submitted_at;

      return {
        number: prData?.number,
        approvedBy: approvedReviews.map((review: any) => review.user.login),
        state: prData?.state,
        title: prData?.title,
        url: prData?.html_url,
        author: prData?.user?.login,
        createdAt: prData?.created_at,
        firstCommitAt: firstCommitAt,
        firstReviewedAt: firstReviewAt,
        firstApprovedAt: firstApproveAt,
        lastApprovedAt: lastApproveAt,
      };
    } catch (error) {
      console.error('Error fetching pull request details:', error);
      throw error;
    }
  }
}
