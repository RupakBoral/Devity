import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1 mx-5">
        <a className="btn btn-ghost text-xl">🧑‍💻 Devity</a>
      </div>
      {user && (
        <div className="flex-none gap-2 mx-5">
          <p>{user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  className="bg-white"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
