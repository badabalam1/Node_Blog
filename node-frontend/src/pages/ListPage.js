import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import ListWrapper from '../components/list/ListWrapper';
import PostListContainer from '../containers/list/PostListContainer';

const ListPage = () => {
    return (
        <PageTemplate>
            <ListWrapper>
                <PostListContainer />
            </ListWrapper>
        </PageTemplate>
    )
}

export default ListPage