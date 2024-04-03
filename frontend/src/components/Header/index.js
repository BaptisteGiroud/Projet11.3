import { Link } from "react-router-dom";
import BankLogo from "../../assets/argentBankLogo.png";

function Header() {
  return (
    <nav className="main-nav">
      <Link to="/" className={"main-nav-logo"}>
        <img
          className="main-nav-logo-image"
          src={BankLogo}
          alt="Argent Bank Logo"
        />
      </Link>
      <h1 className="sr-only">Argent Bank</h1>
      <div>
        <Link to="/signin" className={"main-nav-item"}>
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Header;
