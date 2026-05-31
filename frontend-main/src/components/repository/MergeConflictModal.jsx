import {
    useState
} from "react";

import Editor
    from "@monaco-editor/react";

import "./repository.css";

const MergeConflictModal = ({
    mainContent,
    featureContent,
    filePath,
    onClose,
    onResolve,
}) => {

    const [resolvedContent,
        setResolvedContent] =
        useState(

            `<<<<<<< MAIN\n${mainContent}\n=======\n${featureContent}\n>>>>>>> FEATURE`
        );

    return (

        <div className="merge-conflict-overlay">

            <div className="merge-conflict-modal">

                <div className="merge-conflict-header">

                    <h2>
                        ⚠ Merge Conflict
                    </h2>

                    <p>
                        Conflict detected in:
                        {" "}
                        <strong>
                            {filePath}
                        </strong>
                    </p>

                </div>

                <div className="merge-actions">

                    <button
                        className="merge-option-btn"

                        onClick={() =>
                            setResolvedContent(
                                mainContent
                            )
                        }
                    >
                        Accept Current
                    </button>

                    <button
                        className="merge-option-btn"

                        onClick={() =>
                            setResolvedContent(
                                featureContent
                            )
                        }
                    >
                        Accept Incoming
                    </button>

                </div>

                <div className="merge-editor">

                    <Editor

                        height="60vh"

                        theme="vs-dark"

                        defaultLanguage="markdown"

                        value={resolvedContent}

                        onChange={(value) =>
                            setResolvedContent(
                                value || ""
                            )
                        }

                        options={{

                            minimap: {
                                enabled: false,
                            },

                            fontSize: 14,

                            wordWrap: "on",

                            automaticLayout: true,
                        }}
                    />

                </div>

                <div className="merge-footer">

                    <button
                        className="cancel-btn"

                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"

                        onClick={() =>
                            onResolve(
                                resolvedContent
                            )
                        }
                    >
                        Resolve & Merge
                    </button>

                </div>

            </div>

        </div>
    );
};

export default MergeConflictModal;

