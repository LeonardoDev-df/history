import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className="header">
      <Link to="/" className="title">
      VR Quiz History
      </Link>

      <Link to="/" className="navi">
      Ranking
      </Link>

      <hr className="divider" />
    </nav>


  );
};


export default Header;
