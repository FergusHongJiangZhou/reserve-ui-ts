import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reserveReducer from "../features/reserve/reserveSlice";
import userReducer from "../features/user/userSlice";
import commonReducer from "../features/common/commonSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    reserve: reserveReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
