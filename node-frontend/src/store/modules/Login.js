import { createAction, handleActions } from 'redux-actions'

import { Map, fromJS } from 'immutable'
import { pender } from 'redux-pender'

import * as api from '../../lib/api';

// action types
const INITIALIZE = 'login/INITIALIZE';
const CHANGE_INPUT = 'login/CHANGE_INPUT';
const LOGIN_POST = 'login/LOGIN_POST';

// action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const loginPost = createAction(LOGIN_POST, api.Login_Post)

// initial state
const initialState = Map({
    id: '',
    password: '',
    members: Map({})
})

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: LOGIN_POST,
        onSuccess: (state, action) => {
            const { data: members } = action.payload
            return state.set('members', fromJS(members))
        }
    })
}, initialState)