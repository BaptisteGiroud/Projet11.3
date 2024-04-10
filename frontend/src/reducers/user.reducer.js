import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    userName: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, userName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
    },
    updateUser: (state, action) => {
      const { userName } = action.payload;
      state.userName = userName;
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
