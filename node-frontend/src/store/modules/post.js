import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from '../../lib/api';

// const INITIALIZE = 'post/INITIALIZE';
// const CHANGE_INPUT = 'post/CHANGE_INPUT';
const GET_POST = 'post/GET_POST';
const DELETE_POST = 'post/DELETE_POST';

// export const initialize = createAction(INITIALIZE)
// export const changeInput = createAction(CHANGE_INPUT)
export const getPost = createAction(GET_POST, api.getPost)
export const deletePost = createAction(DELETE_POST, api.deletePost)

const initialState = Map({
    post: '',
    admin: '',
})

export default handleActions({
    ...pender({
        type: DELETE_POST,
        onSuccess: (state, action) => {
            const { message } = action.payload.data
            console.log(action)
            alert(message)
            // window.location.replace('/')
            return state.set('')
        }
    }),
    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            console.log(action)
            if (action.payload.data.message === 'Success') {
                const { list: post, user } = action.payload.data
                return state.set('post', post).set('admin', user)
            } else {
                alert(action.payload.data.message)
                window.location.replace('/')
            }
        }
    })
}, initialState)