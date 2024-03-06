import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//get users list
export const getUserList = createAsyncThunk("getUserList", async () => {
  const usersList = await fetch("http://localhost:5000/api/users/list");
  return usersList.json();
});

//update user detail
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({putData, id}) => {
    const updatedUser = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    });
    console.log('updatedUser',updatedUser);
    return updatedUser.json();
  }
);


const getUsersListSlice = createSlice({
  name: "getUsersList",
  initialState: {
    isLoading: false,
    userList: [],
    isError: false,
    updateUserDetail:{},
    updateUserDetailStatus: 'begin'
  },
  //reducer
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
      state.updateUserDetailStatus='begin'
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log('->action',action)
      state.updateUserDetail = action.payload;
      state.updateUserDetailStatus= 'success';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default getUsersListSlice.reducer;
