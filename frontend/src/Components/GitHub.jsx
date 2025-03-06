import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const GitHub = ({ gitHub }) => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  const fetchGit = async () => {
    try {
      const res = await axios.get(`https://api.github.com/users/${gitHub}`);
      setUser(res.data);
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    fetchGit();
  }, []);

  if (user === null || user.length === 0) return;

  const { avatar_url, public_repos, location, bio, name, repos_url, html_url } =
    user;

  return (
    user !== null &&
    user.length !== 0 && (
      <section className="bg-white dark:bg-black p-6 rounded-lg flex flex-col gap-2 justify-between dark:border border-gray-400">
        <h2 className="text-white font-semibold text-xl font-merriweather">
          GitHub Profile
        </h2>
        <div className="flex justify-around items-center">
          <img className="w-20 h-20 rounded-full" src={avatar_url} />
          <h3>
            Name: <span className="dark:text-white">{name}</span>
          </h3>
          <p>
            <span className="dark:text-white">{bio}</span>
          </p>
          <p>
            Repos: <span className="dark:text-white">{public_repos}</span>
          </p>
          <p>
            <span className="dark:text-white">{location}</span>
          </p>
        </div>
        <div className="flex justify-around">
          <Link target="_blank" to={html_url}>
            <p className="dark:text-white border border:black bg-transparent dark:border-white px-4 py-2 rounded-md dark:hover:shadow-[0px_0px_5px_4px_white]">
              Profile
            </p>
          </Link>
          <Link target="_blank" href={repos_url}>
            <p className="dark:text-white border border:black bg-transparent dark:border-white px-4 py-2 rounded-md dark:hover:shadow-[0px_0px_5px_4px_white]">
              GitHub Repositories
            </p>
          </Link>
        </div>
        <p>{err}</p>
      </section>
    )
  );
};

export default GitHub;
