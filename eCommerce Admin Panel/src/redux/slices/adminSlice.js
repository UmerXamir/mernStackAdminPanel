import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//get users list
export const getUserList = createAsyncThunk("getUserList", async () => {
  const usersList = await fetch("http://localhost:5000/api/users/list");
  return usersList.json();
});

//update user detail
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ putData, id }) => {
    const updatedUser = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    });
    console.log("updatedUser", updatedUser);
    return updatedUser.json();
  }
);

//add user
export const addUser = createAsyncThunk("addUser", async (postData) => {
  const newUser = await fetch(`http://localhost:5000/api/users/adduser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  console.log("newUser", newUser);
  return newUser.json();
});

const getUsersListSlice = createSlice({
  name: "getUsersList",
  initialState: {
    isLoading: false,
    userList: [],
    isError: false,
    updateUserDetail: {},
    updateUserDetailStatus: "begin",
    addUser: {},
    addUserStatus: "begin",
  },
  //reducer
  extraReducers: (builder) => {
    //list
    builder.addCase(getUserList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
      state.updateUserDetailStatus = "begin";
      state.addUserStatus = "begin";
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    //update

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("->action", action);
      state.updateUserDetail = action.payload;
      state.updateUserDetailStatus = "success";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });

    //add user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("->action", action);
      state.addUser = action.payload;
      state.addUserStatus = "success";
    });
    builder.addCase(addUser.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default getUsersListSlice.reducer;
