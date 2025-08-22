/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GitHub = ({ gitHub }) => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!gitHub) {
      setIsLoading(false);
      return;
    }

    const fetchGit = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://api.github.com/users/${gitHub}`);
        setUser(res.data);
        setErr("");
      } catch (error) {
        console.error("Failed to fetch GitHub profile:", error);
        setUser(null);
        if (error.response && error.response.status === 404) {
          setErr("User not found.");
        } else {
          setErr("An error occurred. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGit();
  }, [gitHub]);

  if (isLoading) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  if (err) {
    return (
      <section className="p-6 bg-base-200/50 rounded-lg dark:border border-gray-400">
        <p className="text-error">{err}</p>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  const { avatar_url, public_repos, location, bio, name, repos_url, html_url } =
    user;

  return (
    <section className="p-6 bg-base-200/50 rounded-lg flex flex-col gap-2 justify-between dark:border border-gray-400">
      <h2 className="font-semibold text-xl font-merriweather">
        GitHub Profile
      </h2>
      <hr className="text-accent" />
      <div className="flex justify-around items-center">
        <img
          className="w-20 h-20 rounded-full"
          src={avatar_url}
          alt={`${name}'s GitHub avatar`}
        />
        <h3 className="text-gray-500">
          Name: <span className="text-base-content">{name || "N/A"}</span>
        </h3>
        {bio && (
          <p className="text-gray-500">
            Bio: <span className="text-base-content">{bio}</span>
          </p>
        )}
        <p className="text-gray-500">
          Repositories:{" "}
          <span className="text-base-content">{public_repos}</span>
        </p>
        {location && (
          <p className="text-gray-500">
            Location: <span className="text-base-content">{location}</span>
          </p>
        )}
      </div>
      <div className="flex justify-around">
        <Link target="_blank" to={html_url}>
          <p className="btn text-base-content border border-base-content">
            Profile
          </p>
        </Link>
        <Link target="_blank" to={repos_url}>
          <p className="btn text-base-content border border-base-content">
            Repositories
          </p>
        </Link>
      </div>
    </section>
  );
};

export default GitHub;
