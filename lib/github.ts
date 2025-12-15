
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  isPrivate: boolean;
}

export interface GithubProfile {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  location: string;
  url: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  status: { emoji: string | null; message: string | null } | null;
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: ContributionWeek[];
    };
  };
  pinnedItems: {
    nodes: PinnedRepo[];
  };
  readme: {
    text: string;
  } | null;
  readmeLower?: {
    text: string;
  } | null;
}

export async function getGithubData(username: string): Promise<GithubProfile | null> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.warn('GITHUB_TOKEN is not defined in environment variables.');
    return null;
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        bio
        location
        url
        followers {
          totalCount
        }
        following {
          totalCount
        }
        status {
          emoji
          message
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              isPrivate
            }
          }
        }
        readme: repository(name: $username) {
          object(expression: "HEAD:README.md") {
            ... on Blob {
              text
            }
          }
        }
        readmeLower: repository(name: $username) {
          object(expression: "HEAD:readme.md") {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
        const errorMsg = `GitHub API error: ${res.status} ${res.statusText}`;
        console.error(errorMsg);
        return { error: errorMsg } as unknown as GithubProfile;
    }

    const json = await res.json();
    
    if (json.errors) {
        const errorMsg = `GitHub GraphQL error: ${json.errors[0].message}`;
        console.error(errorMsg, json.errors);
        return { error: errorMsg } as unknown as GithubProfile;
    }

    const data = json.data.user;
    
    // Consolidate readme
    const readmeText = data.readme?.object?.text || data.readmeLower?.object?.text || null;
    
    return {
        ...data,
        readme: readmeText ? { text: readmeText } : null
    };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return { error: error instanceof Error ? error.message : 'Unknown network error' } as unknown as GithubProfile;
  }
}
