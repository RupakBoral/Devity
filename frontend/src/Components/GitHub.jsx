import axios from "axios";
import { useEffect, useState } from "react";

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

  const { avatar_url } = user;

  return (
    user !== null &&
    user.length !== 0 && (
      <section className="bg-white dark:bg-black p-6 rounded-lg flex flex-col gap-2 justify-between dark:border border-gray-400">
        <h2>GitHub Profile</h2>
        <img className="w-20 h-20 rounded-full" src={avatar_url} />
        <p>{err}</p>
      </section>
    )
  );
};

export default GitHub;
