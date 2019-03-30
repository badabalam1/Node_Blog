import React, { Component } from 'react';
import PostInfo from '../../components/Post/PostInfo';
import PostBody from '../../components/Post/PostBody';
import PostComment from '../../components/Post/PostComment';
import PostLike from '../../components/Post/PostLike';
import * as postActions from '../../store/modules/post';
import * as commentAction from '../../store/modules/comment';
import * as likeAction from '../../store/modules/like';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Post extends Component {

    componentDidUpdate(prevProps, prevState) {
        const { id } = this.props
        // if (prevProps.data !== this.props.data) {
        //     this.props.CommentAction.getComment(id)
        // }
        if (this.props.commentPost) {
            if (this.props.commentPost.size) {
                this.props.commentPost.size = 0;
                this.props.CommentAction.getComment(id)
            }
        }
    }

    initialize = async () => {
        const { PostActions, CommentAction, LikeAction, id } = this.props
        try {
            await PostActions.getPost(id);
            await CommentAction.getComment(id);
            await LikeAction.getLike(id)
        } catch (e) {
            console.log(e)
        }
    }

    handleChangeInput = ({ name, value }) => {
        const { CommentAction } = this.props;
        CommentAction.changeInput({ name, value })
    }

    handleDelete = async (commentId) => {
        const { CommentAction } = this.props
        try {
            CommentAction.deleteComment(commentId)
        } catch (e) {
            console.log(e)
        }
    }

    handleUpdate = async (commentId, text) => {
        const { CommentAction } = this.props
        try {
            CommentAction.updateComment(commentId, text)
        } catch (e) {
            console.log(e)
        }
    }

    handleSubmit = async () => {
        if (!localStorage.getItem('Token')) {
            alert('로그인 후 사용해주세요.');
        } else {
            const { comment, CommentAction, id } = this.props
            try {
                await CommentAction.postComment(comment, id)
            } catch (e) {
                console.log(e)
            }
        }
    }


    componentDidMount() {
        this.initialize();
    }

    render() {
        const { loading, comments, comment, id, PostActions, goods, goodsCount, LikeAction, like } = this.props
        const { title, content, createdAt } = this.props.post
        const { handleChangeInput, handleSubmit, handleDelete, handleUpdate } = this
        if (loading) return null;
        return (
            <div>
                <PostInfo title={title} createdAt={createdAt} />
                <PostBody content={content} id={id} PostActions={PostActions} postLike={<PostLike goodsCount={goodsCount} goods={goods} PostActions={PostActions} LikeAction={LikeAction} id={id} like={like} />} />
                <PostComment comments={comments} onChangeInput={handleChangeInput} onSubmit={handleSubmit} handleDelete={handleDelete} comment={comment} handleUpdate={handleUpdate} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        members: state.login.get('members'),
        post: state.post.get('post'),
        goods: state.like.get('goods'),
        goodsCount: state.like.get('goodsCount'),
        like: state.like.get('like'),
        comments: state.comment.get('comments'),
        comment: state.comment.get('comment'),
        commentPost: state.comment.get('post'),
        commentBlooean: state.comment.get('blooean'),
        loading: state.pender.pending['post/GET_POST'] //로딩 상태
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        CommentAction: bindActionCreators(commentAction, dispatch),
        LikeAction: bindActionCreators(likeAction, dispatch)
    })
)(Post);