import React, { Component } from 'react';
import styles from './MarkdownRender.scss';
import classnames from 'classnames/bind';

import marked from 'marked';

import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
// 지원할 코드 형식들을 불러옵니다.
// http://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-css.min.js'

const cx = classnames.bind(styles)

class MarkdownRender extends Component {
    state = {
        html: ''
    }

    componentDidMount() {
        Prism.highlightAll()
    }

    renderMarkdown = () => {
        const { markdown } = this.props
        if (!markdown) {
            this.setState({ html: '' })
            return
        }
        this.setState({
            html: marked(markdown, {
                breaks: true, //일반 엔터로 새 줄 입력
                sanitize: true // 마크다운 내부 html 무시
            })
        })
    }

    constructor(props) {
        super(props);
        const { markdown } = props
        this.state = {
            html: markdown ? marked(props.markdown, { breaks: true, sanitize: true }) : ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.markdown !== this.props.markdown) {
            this.renderMarkdown()
        }

        if (prevState.html !== this.state.html) {
            Prism.highlightAll()
        }
    }

    render() {
        const { html } = this.state

        const markup = {
            __html: html
        }

        return (
            <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />
        );
    }
}

export default MarkdownRender;