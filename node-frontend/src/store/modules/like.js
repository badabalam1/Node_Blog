import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from '../../lib/api';

const GET_LIKE = 'like/GET_LIKE';
const POST_LIKE = 'like/POST_LIKE';

export const getLike = createAction(GET_LIKE, api.getLike)
export const postLike = createAction(POST_LIKE, api.postLike)

const initialState = Map({
    goods: '',
    goodsCount: 0,
    like: ''
})

export default handleActions({
    ...pender({
        type: POST_LIKE,
        onSuccess: (state, action) => {
            if (action.payload.data.message !== 'Success') {
                alert('로그인 후 이용해주세요.')
            }
            const { like } = action.payload.data
            return state.set('like', like)
        }
    }),
    ...pender({
        type: GET_LIKE,
        onSuccess: (state, action) => {
            console.log(action.payload)
            const { goods, goodsCount } = action.payload.data
            return state.set('goods', goods).set('goodsCount', goodsCount)
        }
    })
}, initialState)