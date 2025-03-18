import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content mx-0 p-10 mt-30 border-t-2 border-accent">
      <nav className="grid grid-flow-col md:gap-4 lg:gap-4 gap-2">
        <Link to={"/aboutMe"} className="link link-hover">
          About
        </Link>
        <Link to={""} className="link link-hover">
          Contact
        </Link>
        <Link
          to={"https://rupakboral-portfolio.web.app/"}
          target="_blank"
          className="link link-hover"
        >
          Portfolio
        </Link>
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
        <p>
          <span className="md:inline lg:inline hidden">Developed by </span>
          Rupak Boral
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
