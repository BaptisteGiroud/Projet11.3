import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reducers/user.reducer";
import UserEdit from "../../components/editUser";

function User() {
  const isLoggedIn = useSelector((state) => state.log.isLoggedIn);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FETCH GETUSER //

  async function getUser() {
    // GET TOKEN //
    let token = "";
    const getToken = () => {
      token = window.sessionStorage.getItem("token");
      if (!token) {
        token = window.localStorage.getItem("token");
      }
      return token;
    };
    getToken();

    // USER DATA //
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/user/profile`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Problème de récupération de l'utilisateur:");
      }
      const userData = await response.json();
      return userData.body;
    } catch (error) {
      console.error("Problème de récupération de l'utilisateur:", error);
      throw error;
    }
  }

  // VERIFY ISLOGGED //

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      getUser()
        .then((userData) => {
          dispatch(setUser(userData));
        })
        .catch((error) =>
          console.error("Problème de récupération de l'utilisateur:", error)
        );
    }
  }, [isLoggedIn, navigate, dispatch]);

  return (
    <main className="main bg-dark">
      <UserEdit />
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default User;
