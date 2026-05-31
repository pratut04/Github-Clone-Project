import {
  useEffect,
  useState
} from "react";

import Navbar from "../Navbar";

import HeatMapProfile
  from "./HeatMap";

import ProfileHeader
  from "./ProfileHeader";

import ProfileSidebar
  from "./ProfileSidebar";

import ProfileRepositories
  from "./ProfileRepositories";

import ProfileTabs
  from "./ProfileTabs";

import {
  fetchUserProfile
} from "../../services/userService";

import {
  fetchUserRepositories,
  fetchProfileStats,
} from "../../services/repoService";

import "./profile.css";

const Profile = () => {

  const [stats, setStats] =
    useState({
      repositories: 0,
      stars: 0,
      forks: 0,
      commits: 0
    });

  const [
    userDetails,
    setUserDetails
  ] = useState({});

  const [
    repositories,
    setRepositories
  ] = useState([]);

  const [
    activeTab,
    setActiveTab
  ] = useState("Overview");

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    loadProfileData();

  }, []);

  const loadProfileData =
    async () => {

      try {

        const userId =
          localStorage.getItem(
            "userId"
          );

        if (
          !userId ||
          userId === "null"
        ) {
          return;
        }

        const userData =
          await fetchUserProfile(
            userId
          );

        setUserDetails(
          userData
        );

        const repoData =
          await fetchUserRepositories(
            userId
          );

        setRepositories(
          repoData.repositories || []
        );
        const statsData =
          await fetchProfileStats(
            userId
          );

        setStats(statsData);

      } catch (err) {

        console.error(
          "Profile Fetch Error:",
          err
        );

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (
      <>
        <Navbar />

        <div className="profile-loading">

          Loading Profile...

        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-container">

        {/* LEFT SIDEBAR */}

        <aside className="profile-left">

          <ProfileHeader
            username={
              userDetails.username
            }
            email={
              userDetails.email
            }
          />

          <div className="profile-follow-stats">

            <span>
              {userDetails.followers?.length || 0}
              {" "}Followers
            </span>

            <span>
              {userDetails.following?.length || 0}
              {" "}Following
            </span>

          </div>

          <div className="profile-stats">

            <div className="stat-card">

              <h3>
                {stats.repositories}
              </h3>

              <p>
                Repositories
              </p>

            </div>

            <div className="stat-card">

              <h3>
                {stats.stars}
              </h3>

              <p>
                Stars
              </p>

            </div>

            <div className="stat-card">

              <h3>
                {stats.forks}
              </h3>

              <p>
                Forks
              </p>

            </div>

            <div className="stat-card">

              <h3>
                {stats.commits}
              </h3>

              <p>
                Commits
              </p>

            </div>

          </div>

          <ProfileSidebar />

        </aside>

        {/* MAIN CONTENT */}

        <main className="profile-main">

          <ProfileTabs
            activeTab={activeTab}
            setActiveTab={
              setActiveTab
            }
          />

          {/* OVERVIEW TAB */}

          {
            activeTab ===
            "Overview" && (

              <>
                <div className="heatmap-wrapper">

                  <HeatMapProfile />

                </div>

                <div className="profile-overview-card">

                  <h3>
                    Contribution Activity
                  </h3>

                  <p>
                    Active contributor
                    across repositories.
                  </p>

                </div>
              </>
            )
          }

          {/* REPOSITORIES TAB */}

          {
            activeTab ===
            "Repositories" && (

              <div className="profile-repo-section">

                <h2>
                  Repositories
                </h2>

                <ProfileRepositories
                  repositories={
                    repositories
                  }
                />

              </div>
            )
          }

          {/* STARS TAB */}

          {
            activeTab ===
            "Stars" && (

              <div className="profile-placeholder">

                <h2>
                  Starred Repositories
                </h2>

                <p>
                  No starred repositories yet.
                </p>

              </div>
            )
          }

          {/* FOLLOWERS TAB */}

          {
            activeTab ===
            "Followers" && (

              <div className="profile-placeholder">

                <h2>Followers & Following</h2>

                <div className="follow-stats">

                  <div className="stat-card">

                    <h3>
                      {userDetails.followers?.length || 0}
                    </h3>

                    <p>Followers</p>

                  </div>

                  <div className="stat-card">

                    <h3>
                      {userDetails.following?.length || 0}
                    </h3>

                    <p>Following</p>

                  </div>

                </div>

              </div>
            )
          }

        </main>

      </div>
    </>
  );
};

export default Profile;