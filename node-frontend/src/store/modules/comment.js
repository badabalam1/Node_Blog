import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';

import * as api from '../../lib/api';

//댓글
const INITIALIZE = 'comment/INITIALIZE';
const CHANGE_INPUT = 'comment/CHANGE_INPUT';

//댓글 읽어오기 및 보내기(API연동)
const GET_COMMENT = 'comment/GET_COMMENT';
const POST_COMMENT = 'comment/POST_COMMENT';
const DELET_COMMENT = 'comment/DELETE_COMMENT';
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';

//글입력
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
//댓글 api연동
export const getComment = createAction(GET_COMMENT, api.getComment)
export const postComment = createAction(POST_COMMENT, api.WriteComment)
export const deleteComment = createAction(DELET_COMMENT, api.DeleteComment)
export const updateComment = createAction(UPDATE_COMMENT, api.UpdateComment)


const initialState = Map({
    comment: '',
    comments: List(),
    post: Map({})
})

export default handleActions({
    //댓글입력 스토어에 저장
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    //연동 후 결과
    ...pender({
        type: POST_COMMENT,
        onSuccess: (state, action) => {
            const { comment } = action.payload.data
            return state.set('post', fromJS(comment))
        }
    }),
    ...pender({
        type: DELET_COMMENT,
        onSuccess: (state, action) => {
            const { comment } = action.payload.data
            return state.set('post', fromJS(comment))
        }
    }),
    ...pender({
        type: UPDATE_COMMENT,
        onSuccess: (state, action) => {
            const { comment } = action.payload.data
            return state.set('post', fromJS(comment))
        }
    }),
    ...pender({
        type: GET_COMMENT,
        onSuccess: (state, action) => {
            const { comments } = action.payload.data
            return state.set('comments', fromJS(comments))
        }
    })
}, initialState)