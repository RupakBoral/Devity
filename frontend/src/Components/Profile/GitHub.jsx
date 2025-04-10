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

  return user !== null && user.length !== 0 ? (
    <section className="p-6 bg-base-200/50 rounded-lg flex flex-col gap-2 justify-between dark:border border-gray-400">
      <h2 className="font-semibold text-xl font-merriweather">
        GitHub Profile
      </h2>
      <hr className="text-accent" />
      <div className="flex justify-around items-center">
        <img className="w-20 h-20 rounded-full" src={avatar_url} />
        <h3 className="text-gray-500">
          Name: <span className="text-base-content">{name}</span>
        </h3>
        <p className="text-gray-500">
          {bio !== null && bio.length !== 0 && <p>Bio</p>}
          <span className="text-base-content">{bio}</span>
        </p>
        <p className="text-gray-500">
          Repositories:{" "}
          <span className="text-base-content">{public_repos}</span>
        </p>
        <p className="text-gray-500">
          Location: <span className="text-base-content">{location}</span>
        </p>
      </div>
      <div className="flex justify-around">
        <Link target="_blank" to={html_url}>
          <p className="btn text-base-content border border-base-content">
            Profile
          </p>
        </Link>
        <Link target="_blank" href={repos_url}>
          <p className="btn text-base-content border border-base-content  ">
            Repositories
          </p>
        </Link>
      </div>
      <p>{err}</p>
    </section>
  ) : (
    <span className="loading loading-ring loading-xl"></span>
  );
};

export default GitHub;
