import { useEffect, useState } from "react";

import Navbar from "../Navbar";

import RepoCard from "../ui/RepoCard";

import {
  fetchUserRepositories
} from "../../services/repoService";

import "./explore.css";

const Repositories = () => {

  const [
    repositories,
    setRepositories
  ] = useState([]);

  useEffect(() => {

    const userId =
      localStorage.getItem(
        "userId"
      );

    if (userId) {

      loadRepositories(
        userId
      );

    }

  }, []);

  const loadRepositories =
    async (userId) => {

      try {

        const data =
          await fetchUserRepositories(
            userId
          );

        setRepositories(
          data.repositories || []
        );

      } catch (err) {

        console.error(err);

      }
    };

  return (
    <>
      <Navbar />

      <div className="explore-page">

        <div className="explore-header">

          <h1>
            My Repositories
          </h1>

          <p>
            Manage your repositories
          </p>

        </div>

        <div className="explore-grid">

          {repositories.map(
            (repo) => (

              <RepoCard
                key={repo._id}
                repo={repo}
              />

            )
          )}

        </div>

      </div>
    </>
  );
};

export default Repositories;