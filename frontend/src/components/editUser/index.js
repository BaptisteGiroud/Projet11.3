import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../reducers/user.reducer";

function User() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedButtonName, setEditedButtonName] = useState("Edit Name");

  let token = "";
  const getToken = () => {
    token = window.sessionStorage.getItem("token");
    if (!token) {
      token = window.localStorage.getItem("token");
    }
    return token;
  };
  getToken();

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setEditedButtonName(userData.userName);
  };

  const handleButtonNameChange = (e) => {
    setEditedButtonName(e.target.value);
  };

  const handleInputBlur = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName: editedButtonName,
          }),
        }
      );
      if (response.ok) {
        const updatedUserData = await response.json();
        dispatch(updateUser({ userName: updatedUserData.userName }));
      } else {
        console.error("Error lors de l'édition du user name");
      }
    } catch (error) {
      console.error("Error lors de l'édition du user name");
    }
    setEditedButtonName("Edit Name");
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {userData.firstName} {userData.lastName}!
      </h1>
      {isEditing ? (
        <input
          type="text"
          value={editedButtonName}
          onChange={handleButtonNameChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <button className="edit-button" onClick={handleEditButtonClick}>
          {editedButtonName}
        </button>
      )}
    </div>
  );
}

export default User;
