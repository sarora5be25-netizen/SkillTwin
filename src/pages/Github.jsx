import { useState } from "react";
import "./Github.css";

import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Github() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeGithub = async () => {
    if (!username.trim()) return;

    setLoading(true);

    try {
      const [userRes, repoRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        ),
      ]);

      if (!userRes.ok) throw new Error();

      const userData = await userRes.json();
      const repoData = await repoRes.json();

      setUser(userData);
      setRepos(repoData);

      const totalStars = repoData.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0
      );

      const githubScore = Math.min(
        100,
        userData.public_repos * 5 +
          totalStars * 2 +
          userData.followers
      );

      if (auth.currentUser) {
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          {
            githubUsername: userData.login,
            githubRepos: userData.public_repos,
            githubFollowers: userData.followers,
            githubStars: totalStars,
            githubScore,
            githubUpdatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch {
      alert("GitHub user not found.");
      setUser(null);
      setRepos([]);
    }

    setLoading(false);
  };

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  return (
    <div className="github-page">
      <h1>🐙 GitHub Analyzer</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={analyzeGithub}>
          Analyze
        </button>
      </div>

      {loading && <h2>Loading...</h2>}

      {user && (
        <>
          <div className="github-card">
            <img
              src={user.avatar_url}
              alt=""
              className="avatar"
            />

            <h2>{user.name || user.login}</h2>

            <p>@{user.login}</p>

            <div className="stats-grid">
              <div>
                <h3>{user.public_repos}</h3>
                <span>Repositories</span>
              </div>

              <div>
                <h3>{user.followers}</h3>
                <span>Followers</span>
              </div>

              <div>
                <h3>{user.following}</h3>
                <span>Following</span>
              </div>

              <div>
                <h3>{totalStars}</h3>
                <span>Total Stars</span>
              </div>
            </div>
          </div>

          <div className="repo-grid">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="repo-card"
              >
                <h3>{repo.name}</h3>

                <p>{repo.description || "No description"}</p>

                <p>💻 {repo.language || "Unknown"}</p>

                <p>
                  ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                </p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Repository
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Github;