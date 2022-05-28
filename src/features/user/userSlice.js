import { createSlice } from '@reduxjs/toolkit'

function getDiffDays(strDay) {
    let oldDate = new Date(strDay);
    let date = new Date()

    let Difference_In_Time = date.getTime() - oldDate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.ceil(Difference_In_Days)
}

let initialState
try {
    initialState = JSON.parse(localStorage.getItem('user')) ?? {}
    if (initialState) {
        if (getDiffDays(initialState.dateLogin) >= 10) {
            localStorage.removeItem('user');
            initialState = {}
        }
    }
} catch (error) {
    initialState = {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            let date = new Date()
            let newUser = { ...action.payload, dateLogin: date }
            localStorage.setItem('user', JSON.stringify(newUser), 2)
            return newUser
        },
        delUser: () => {
            let newUser = {}
            localStorage.setItem('user', JSON.stringify(newUser))
            return newUser
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, delUser } = userSlice.actions

export default userSlice.reducer