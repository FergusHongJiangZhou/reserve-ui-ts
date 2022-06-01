import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {  fetchReservations, fetchReservationById } from './reserveAPI';
import { IReservation } from '../types';

export interface ReservationState {
  reservation: IReservation;
  reservationStatus: 'idle' | 'loading' | 'failed';
  reservations: IReservation[];
  reservationsStatus: 'idle' | 'loading' | 'failed';
}

const initialReservation: IReservation = {
  id: '',
  size: 0,
  userId: '',
  reservedAt: new Date(),
  status: 'active',
  user: {
    id: '',
    name: '',
    password: '',
    phone: '',
    role: 'guest',
  },
};

const initialState: ReservationState = {
  reservation: initialReservation,
  reservationStatus: 'idle',
  reservations: [initialReservation],
  reservationsStatus: 'idle',
};

export const fetchAllReservations = createAsyncThunk(
  'reservation/fetchAllReservations',
  async () => {
    const response = await fetchReservations();
    return response.data;
  }
);

export const fetchReservation = createAsyncThunk(
  'reservation/fetchReservation',
  async (id: string) => {
    const response = await fetchReservationById(id);
    return response.data;
  }
);

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReservations.pending, (state) => {
        state.reservationsStatus = 'loading';
      })
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.reservationsStatus = 'idle';
        const results = action.payload.getReservations;
        if(results) {
          state.reservations = results.map((item: IReservation)=>{
            return {...item, reservedAt: new Date(item.reservedAt)}
          });
        } else {
          state.reservations = [];
        }
        
      })
      .addCase(fetchAllReservations.rejected, (state) => {
        state.reservationsStatus = 'failed';
      })
      .addCase(fetchReservation.pending, (state) => {
        state.reservationStatus = 'loading';
      })
      .addCase(fetchReservation.fulfilled, (state, action) => {
        state.reservationStatus = 'idle';
        const result = action.payload.getReservationById;
        if(result) {
          state.reservation = {...result, reservedAt: new Date(result.reservedAt)};
        }
        
      })
      .addCase(fetchReservation.rejected, (state) => {
        state.reservationStatus = 'failed';
      });
  },
});

export const reservationData = (state: RootState) => state.reserve;

export default reservationSlice.reducer;
