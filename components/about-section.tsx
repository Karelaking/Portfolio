"use client";

import { ProfileCard } from "@/components/about/profile-card";
import { PinnedRepoList } from "@/components/about/pinned-repo-list";
import { ReadmeViewer } from "@/components/about/readme-viewer";
import { SectionContainer } from "@/components/ui/section-container";
import { GithubProfile } from "@/lib/github";
import { useState, useEffect } from "react";

type Profile = {
  full_name: string | null;
  email: string | null;
  bio: string | null;
  avatar_url: string | null;
  resume_url: string | null;
};

const AboutSection = ({ profile }: { profile?: Profile | null }) => {
  const [githubData, setGithubData] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState("karelaking");

  useEffect(() => {
    fetchGithubData();
  }, []);

  const fetchGithubData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/github_user?username=${githubUsername}`,
      );
      const result = await response.json();

      if (result.status === "success") {
        setGithubData(result.data);
      } else {
        setError(result.message || "Failed to fetch GitHub data");
      }
    } catch (err) {
      setError(`Network error while fetching GitHub data ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data for ProfileCard when GitHub data is not available
  const fallbackData: GithubProfile = {
    name: profile?.full_name || "Karela king",
    bio:
      profile?.bio ||
      "Software engineer with a passion for building beautiful, functional, and scalable web applications.",
    avatarUrl: profile?.avatar_url || "https://github.com/karelaking.png",
    login: "karelaking",
    location: "Earth",
    url: "https://github.com/karelaking",
    followers: { totalCount: 0 },
    following: { totalCount: 0 },
    status: { message: "Open to work", emoji: "⚡" },
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: 0,
        weeks: [],
      },
    },
    pinnedItems: {
      nodes: [],
    },
    readme: null,
  };

  const displayData = githubData || fallbackData;

  return (
    <SectionContainer id="about" className="">
      <div className="grid w-full gap-8 lg:grid-cols-[300px_1fr] py-4">
        {/* Left Column: Profile Card */}
        <ProfileCard data={displayData} />

        <div className="w-full min-w-0">
          {loading ? (
            <div className="rounded-lg border bg-gray-50 p-8 dark:bg-gray-800">
              <p className="text-center text-gray-500">
                Loading GitHub data...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-lg border bg-red-50 p-8 dark:bg-red-900/20">
              <p className="text-center text-red-600 dark:text-red-400">
                Error: {error}
              </p>
              <button
                onClick={fetchGithubData}
                className="mx-auto mt-4 block rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {githubData && (
                <>
                  <ReadmeViewer data={githubData} />
                </>
              )}
              {!githubData && (
                <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-center text-gray-500">
                    GitHub data not available. Using fallback profile
                    information.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
