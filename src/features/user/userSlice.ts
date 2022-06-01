import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchUserById } from './userAPI';
import { IUser } from '../types';
import { RootState } from '../../app/store';

export interface UserState {
  user: IUser;
  userStatus: 'idle' | 'loading' | 'failed';
  users: IUser[];
  usersStatus: 'idle' | 'loading' | 'failed';
}

const initialUser: IUser = {
  id: '',
  name: '',
  password: '',
  phone: '',
  role: 'guest',
};

const initialState: UserState = {
  user: initialUser,
  userStatus: 'idle',
  users: [initialUser],
  usersStatus: 'idle',
};

export const fetchUser = createAsyncThunk(
  'user/fetchUserById',
  async (id: string) => {
    const response = await fetchUserById(id);
    return response.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async () => {
    const response = await fetchUsers();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userStatus = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userStatus = 'idle';
        state.user = action.payload.getUserById;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userStatus = 'failed';
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersStatus = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersStatus = 'idle';
        state.users = action.payload.getUsers;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.usersStatus = 'failed';
      });
  },
});

export const userData = (state: RootState) => state.user;


export default userSlice.reducer;
