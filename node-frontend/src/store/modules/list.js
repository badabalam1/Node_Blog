import { createAction, handleActions } from 'redux-actions'

import { Map, List, fromJS } from 'immutable'
import { pender } from 'redux-pender'

import * as api from '../../lib/api';

const GET_POST_LIST = 'list/GET_POST_LIST';

export const getPostList = createAction(GET_POST_LIST, api.getList)

const initialState = Map({
    posts: List(),
})

export default handleActions({
    ...pender({
        type: GET_POST_LIST,
        onSuccess: (state, action) => {
            console.log(action)
            const { list: posts } = action.payload.data
            return state.set('posts', fromJS(posts))
        }
    })
}, initialState)