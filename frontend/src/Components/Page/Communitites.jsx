import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Disscussion from "./Disscussion";
import communitiesDark from "../../img/communitiesDark.png";

const Communitites = () => {
  const [communities, setCommunities] = useState();
  const [selectCom, setSelectCom] = useState();
  const [error, setError] = useState("");

  const fetchCommunities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/communities`, {
        withCredentials: true,
      });
      setCommunities(res?.data?.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="w-5/6 relative mx-auto flex min-h-screen max-h-fit my-20 bg-base-100 border rounded-sm border-accent mt-24">
      {communities ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/*Main Chat platform*/}
            {selectCom ? (
              <Disscussion selectCom={selectCom} />
            ) : (
              <div className="carousel carousel-center bg-neutral rounded-box w-fit space-x-4">
                <div className="carousel-item">
                  <img
                    src={communitiesDark}
                    className="rounded-box w-sm h-sm lg:w-lg lg:h-lg md:w-md md:h-md bg-transparent"
                  />
                </div>
              </div>
            )}
            <p>{error}</p>
          </div>

          <div className="drawer-side absolute">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="md:menu-md lg:menu-lg bg-base-200 text-base-content min-h-full space-y-4 py-4 px-2">
              {communities.map((community, index) => {
                return (
                  <li
                    className="text-left hover:border hover:border-dotted hover:text-primary-content px-6 py-2 cursor-pointer"
                    onClick={() => setSelectCom(community)}
                    key={index}
                  >
                    {community.communityName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <p className="invisible"></p>
      )}
    </div>
  );
};

export default Communitites;
