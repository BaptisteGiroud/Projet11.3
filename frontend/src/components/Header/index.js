import { Link, useLocation } from "react-router-dom";
import BankLogo from "../../assets/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const isLoggedIn = useSelector((state) => state.log.isLoggedIn);
  const userData = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

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
        {isLoggedIn ? (
          <div>
            <Link to="/user" className={"main-nav-item"}>
              <i className="fa fa-user-circle"></i> {userData.userName}
            </Link>
            {location.pathname === "/user" && (
              <Link
                to="/signin"
                onClick={handleLogout}
                className={"main-nav-item"}
              >
                <i className="fa fa-sign-out"></i> Sign Out
              </Link>
            )}
          </div>
        ) : (
          <Link to="/signin" className={"main-nav-item"}>
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
