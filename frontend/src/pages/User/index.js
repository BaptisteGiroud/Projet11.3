import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reducers/user.reducer";
import UserEdit from "../../components/editUser";
import Account from "../../components/Account";
import data from "../../datas/accounts.json";

function User() {
  const isLoggedIn = useSelector((state) => state.log.isLoggedIn);
  const { firstName, lastName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

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

    // GET ACCOUNTS //
    const getAccounts = () => {
      const userId = `${firstName} ${lastName}`;
      const userAccounts = data.usersAccounts.find(
        (userAccount) => userAccount.id === userId
      );
      if (userAccounts) {
        return userAccounts.accounts;
      }
      return [];
    };
    const accountsData = getAccounts();
    setAccounts(accountsData);

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
  });

  return (
    <main className="main bg-dark">
      <UserEdit />
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <Account
          key={account.name}
          name={account.name}
          solde={account.solde}
          balance={account.balance}
        />
      ))}
    </main>
  );
}

export default User;
