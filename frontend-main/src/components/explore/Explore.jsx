import { useEffect, useState } from "react";

import Navbar from "../Navbar";

import RepoCard from "../ui/RepoCard";


import {
  fetchAllRepositories,
  searchRepositories
} from "../../services/repoService";

import "./explore.css";

const Explore = () => {

  const [
    repositories,
    setRepositories
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState("");

  useEffect(() => {

    loadRepositories();

  }, []);

  useEffect(() => {

    const searchRepos =
      async () => {

        try {

          const data =
            await searchRepositories(
              search
            );

          setRepositories(
            data
          );

        } catch (err) {

          console.error(err);

        }
      };

    searchRepos();

  }, [search]);

  const loadRepositories =
    async () => {

      try {

        const data =
          await fetchAllRepositories();

        setRepositories(
          data || []
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
            Explore Public Repositories
          </h1>

          <p>
            Discover repositories created by the community
          </p>

          <input

            type="text"

            placeholder=
            "Search repositories..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="explore-search"
          />

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

export default Explore;