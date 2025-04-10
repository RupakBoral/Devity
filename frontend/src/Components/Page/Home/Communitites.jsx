import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import Disscussion from "./Disscussion";

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
    <div className="w-5/6 mx-auto flex min-h-screen max-h-fit my-20 bg-base-100 border border-accent mt-24">
      {/*SideBar */}
      {communities ? (
        <div className="drawer w-fit drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <ul className="md:menu bg-base-200 text-base-content min-h-full w-1/2 px-1 md:w-full md:p-4">
              {communities.map((community, index) => {
                return (
                  <button
                    className="text-left"
                    onClick={() => setSelectCom(community)}
                    key={index}
                  >
                    {community.communityName}
                  </button>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <p className="invisible"></p>
      )}

      {/*Main Chat platform*/}
      {selectCom ? (
        <Disscussion community={selectCom} />
      ) : (
        <div className="carousel carousel-center bg-neutral rounded-box w-fit space-x-4 p-4">
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
              className="rounded-box"
            />
          </div>
        </div>
      )}

      <p>{error}</p>
    </div>
  );
};

export default Communitites;
