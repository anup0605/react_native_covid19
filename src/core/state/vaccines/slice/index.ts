import { IVaccineState } from '@covid/core/state/vaccines/types';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateVaccine: IVaccineState = {
  vaccines: [],
};

// TODO: Delete once we fully launch the updated VaccineListScreen component
export const fetchVaccines = createAsyncThunk<unknown, string>(
  'vaccines/fetchVaccines',
  async (patientId: string): Promise<TVaccineRequest[]> => {
    const response = await vaccineService.listVaccines();
    const patientVaccines = response.filter((vaccine) => vaccine.patient === patientId);
    return patientVaccines;
  },
);

const vaccinesSlice = createSlice({
  extraReducers: {
    [fetchVaccines.fulfilled.type]: (state, action: { payload: TVaccineRequest[] }) => {
      state.vaccines = action.payload;
    },
  },
  initialState: initialStateVaccine,
  name: 'Vaccine',
  reducers: {
    reset: (state) => {
      state = initialStateVaccine;
    },
    // Added 14.01.2021. Not currently used but should be useful for setting and saving vaccine
    setVaccine: (state, action: PayloadAction<TVaccineRequest[]>) => {
      state.vaccines = action.payload;
    },
  },
});

export const { setVaccine, reset } = vaccinesSlice.actions;
export const selectApp = (state: IVaccineState) => state.vaccines;
export default vaccinesSlice;
