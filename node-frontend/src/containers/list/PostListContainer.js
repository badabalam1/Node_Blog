import React, { Component } from 'react';
import PostList from '../../components/list/PostList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from '../../store/modules/list';

class PostListContainer extends Component {

    getPostList = () => {
        const { ListActions } = this.props
        ListActions.getPostList()
    }

    componentDidMount() {
        this.getPostList()
    }

    render() {
        const { posts, user } = this.props
        return (
            <PostList posts={posts} user={user} />
        );
    }
}

export default connect(
    (state) => ({
        posts: state.list.get('posts'),
        user: state.list.get('user')
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(PostListContainer)