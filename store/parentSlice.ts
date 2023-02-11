import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import parentService from 'services/parentService';
import { IParentChild } from 'types/interfaces';
import { closePreloader, openErrorModal, openPreloader } from './fetchSlice';

const initialState: IParentChild = {
    // child: {
        codingExperience: '',
        dob: '',
        fullname: '',
        password: '',
        username: ''
    // }
}

export const addChild: any = createAsyncThunk('parent/child/new', async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const dispatch = thunkAPI.dispatch;
    const { codingExperience, dob, fullname, password, username } = state.parent;
    const data = { codingExperience, dob, fullname, password, username };
    dispatch(openPreloader({ loadingText: 'Adding Child' }));

    try {
        const child = await parentService.addChild(data);
        dispatch(closePreloader());
        return child;
    } catch (error: any) {
        dispatch(closePreloader());
        if (error.response.data.non_field_errors) {
            dispatch(
                openErrorModal({
                    errorText: [error.response.data.non_field_errors[0]],
                }),
            );
        } else if (error.response.data.email) {
            dispatch(
                openErrorModal({
                    errorText: [...error.response.data.email],
                }),
            );
        } else {
            dispatch(openErrorModal({ errorText: [error.message] }));
        }
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const parentSlice = createSlice({
    name: 'parents',
    initialState,
    reducers: {
        updateChild: (
            state: IParentChild | any,
            action: PayloadAction<{
                key: string;
                value: string;
            }>,
        ) => {
            state[action.payload.key as keyof typeof state] = action.payload.value;
        },
        resetChild: (state: IParentChild) => {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addChild.fulfilled, () => {
                console.log('Successful')
            })
            .addCase(addChild.rejected, (_, { payload }: PayloadAction) => {
                console.error(payload)
            })
    },
})

export const { resetChild, updateChild } = parentSlice.actions
export default parentSlice.reducer;