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
        const { posts } = this.props
        return (
            <PostList posts={posts} />
        );
    }
}

export default connect(
    (state) => ({
        posts: state.list.get('posts')
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(PostListContainer)