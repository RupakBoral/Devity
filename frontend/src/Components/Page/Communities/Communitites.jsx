import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import Disscussion from "./Disscussion";
import communitiesDark from "../../../img/communitiesDark.png";

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
    <div className="w-screen h-screen pt-24">
      <div className="w-5/6 relative h-screen mx-auto flex bg-base-100 ">
        {communities ? (
          <div className="drawer h-full relative lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center ">
              {/*Main Chat platform*/}
              {selectCom ? (
                <Disscussion selectCom={selectCom} />
              ) : (
                <div className="flex flex-col items-center rounded-box space-y-4 w-fit space-x-4">
                  <img
                    src={communitiesDark}
                    className="rounded-box w-sm h-sm lg:w-lg lg:h-lg md:w-md md:h-md bg-transparent"
                  />
                  <label
                    htmlFor="my-drawer-2"
                    className="drawer-button lg:hidden"
                  >
                    <div className="btn-sm md:btn-md btn-dash bg-transparent">
                      Click here to get Started!
                    </div>
                  </label>
                </div>
              )}
              <p>{error}</p>
            </div>

            <div className="drawer-side absolute border rounded-l-sm border-accent">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="bg-base-300 h-full text-base-content space-y-4 py-4 px-2">
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
    </div>
  );
};

export default Communitites;
