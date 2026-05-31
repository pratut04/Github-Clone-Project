import {
  useNavigate
} from "react-router-dom";

import "./dashboard.css";

const SuggestedRepos = ({
  repositories,
}) => {

  const navigate =
    useNavigate();

  return (
    <aside className="dashboard-sidebar">

      <h3>
        Suggested Repositories
      </h3>

      <div className="sidebar-content">

        {repositories
          .slice(0, 5)
          .map((repo) => (

            <div
              className="suggested-card"
              key={repo._id}

              onClick={() =>
                navigate(
                  `/repository/${repo._id}`
                )
              }

              style={{
                cursor: "pointer"
              }}
            >

              <h4>
                {repo.name}
              </h4>

              <p>
                {repo.description ||
                  "No description"}
              </p>

            </div>
          ))}

      </div>

    </aside>
  );
};

export default SuggestedRepos;