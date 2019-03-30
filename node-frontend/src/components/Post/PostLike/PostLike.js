import React, { Component } from 'react';
import styles from './PostLike.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)

class PostLike extends Component {

    componentDidUpdate(nextProps, nextState) {
        console.log(nextProps)
        if (nextProps.like !== this.props.like) {
            const { LikeAction, id } = this.props
            LikeAction.getLike(id)
        }
    }

    handleLike = () => {
        const { LikeAction, id } = this.props
        LikeAction.postLike(id)
    }

    render() {
        const { goods, goodsCount } = this.props
        const { handleLike } = this
        return (
            <div className={cx('hert')}>
                <button onClick={handleLike}>{goods ? <div className={cx('red')}></div> : <div className={cx('gray')}></div>}</button>
                <p className={cx('goodsCount')}>{goodsCount}</p>
            </div>
        )
    }
}

export default PostLike;