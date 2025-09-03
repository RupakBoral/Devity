import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-transparent text-base-content mx-0 p-10 border-t-2 border-accent">
      <nav className="grid grid-flow-col md:gap-4 lg:gap-4 gap-2">
        <Link to={"/aboutMe"} className="link link-hover">
          About
        </Link>
        <Link
          to={"https://rupakboral-portfolio.web.app/"}
          target="_blank"
          className="link link-hover"
        >
          Portfolio
        </Link>
        <a href="mailto:boralrupak@gmail.com">boralrupak@gmail.com</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to={"https://github.com/RupakBoral"} target="_blank">
            <FiGithub className="w-6 h-6" />
          </Link>

          <Link
            to={"https://www.linkedin.com/in/rupak-boral-169435249/"}
            target="_blank"
          >
            <FiLinkedin className="w-6 h-6" />
          </Link>
        </div>
      </nav>
      <aside>
        <div>
          <span className="md:inline lg:inline hidden">Developed by </span>
          <span className="text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-orange-400 font-base">
            Rupak Boral
          </span>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
