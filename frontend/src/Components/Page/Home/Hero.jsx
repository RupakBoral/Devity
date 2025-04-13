import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { homeSetting } from "../../../utils/homeSlice";

const Hero = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <section id="home" className="pt-16">
      <div className="hero min-h-screen bg-gradient-to-br from-[#6030f0] to-[#f55844]">
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content transition-all duration-500 ease-linear">
          <div className="max-w-lg">
            <h1 className="mb-5 text-4xl font-bold">
              Innovate with{" "}
              <span className="text-5xl font-bold bg-gradient-to-l from-violet-600 to-pink-400 text-transparent bg-clip-text">
                Devity
              </span>
            </h1>
            <p className="mb-8 text-base-content">
              A modern solution for your development workflow that helps you
              achieve greater productivity with ease and efficiency.
            </p>
            <Link
              onClick={() => dispatch(homeSetting(false))}
              to={user === null ? "/login" : "/"}
              className="btn btn-xl bg-white text-black hover:text-white animate-bounce transition-all transition-duration-700 shadow-2xl rounded-sm hover:bg-gradient-to-l from-violet-600 to-pink-400 border-0 "
            >
              Get Started
            </Link>
            <div className="mt-8 flex items-center justify-center">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar border-white">
                  <div className="w-12">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80" />
                  </div>
                </div>
                <div className="avatar border-white">
                  <div className="w-12">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80" />
                  </div>
                </div>
                <div className="avatar border-white">
                  <div className="w-12">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80" />
                  </div>
                </div>
              </div>
              <p className="ml-4 text-white">
                Join <span className="font-bold">500+</span> satisfied users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
