import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from '../../lib/api';

// const INITIALIZE = 'post/INITIALIZE';
// const CHANGE_INPUT = 'post/CHANGE_INPUT';
const GET_POST = 'post/GET_POST';

// export const initialize = createAction(INITIALIZE)
// export const changeInput = createAction(CHANGE_INPUT)
export const getPost = createAction(GET_POST, api.getPost)


const initialState = Map({
    post: Map({})
})

export default handleActions({
    ...pender({
        type: GET_POST,
        onSuccess: (state, action) => {
            const { list: post } = action.payload.data
            return state.set('post', fromJS(post))
        }
    })
}, initialState)