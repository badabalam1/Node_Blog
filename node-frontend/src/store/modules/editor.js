import { createAction, handleActions } from 'redux-actions'

import { Map } from 'immutable'
import { pender } from 'redux-pender'

import * as api from '../../lib/api';

// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';
const GET_USER = 'editor/GET_USER';
const WRITE_PUT = 'editor/WRITE_PUT';

// action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const writePost = createAction(WRITE_POST, api.writePost)
export const user = createAction(GET_USER, api.writeGet)
export const writePut = createAction(WRITE_PUT, api.writePut)

// initial state
const initialState = Map({
    title: '',
    markdown: '',
    postId: null,
    user: '',
    post: '',
})

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            const { _id } = action.payload.data.target;
            return state.set('postId', _id)
        }
    }),
    ...pender({
        type: WRITE_PUT,
        onSuccess: (state, action) => {
            const { message: post } = action.payload.data
            return state.set('post', post)
        }
    }),
    ...pender({
        type: GET_USER,
        onSuccess: (state, action) => {
            const { user } = action.payload.data
            return state.set('user', user)
        }
    })
}, initialState)