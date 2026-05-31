import "./repository.css";

const RepositoryTabs = ({
  activeTab,
  setActiveTab,
  issueCount,
  isOwner,
}) => {

  const tabs = isOwner

    ? [
      "Code",
      "Issues",
      "Pull Requests",
      "Actions",
      "Settings",
    ]

    : [
      "Code",
      "Issues",
      "Pull Requests",
      "Actions",
    ];

  return (
    <div className="repository-tabs">

      {tabs.map((tab) => (

        <button
          key={tab}
          onClick={() =>
            setActiveTab(tab)
          }
          className={
            activeTab === tab
              ? "active-tab"
              : ""
          }
        >

          {tab}

          {tab === "Issues" && (
            <span className="issue-count">

              {issueCount}

            </span>
          )}

        </button>

      ))}

    </div>
  );
};

export default RepositoryTabs;