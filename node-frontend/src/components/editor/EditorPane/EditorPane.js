import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classnames from 'classnames/bind';

import CodeMirror from 'codemirror'

import 'codemirror/mode/markdown/markdown' // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'

// CodeMirror를 위한 css스타일
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

const cx = classnames.bind(styles)

class EditorPane extends Component {

    state = {
        title: '',
        content: ''
    }

    editor = null //에디터 ref
    codeMirror = null //codeMirror 인스턴스
    cursor = null

    initializeEditor = () => {
        this.codeMirror = CodeMirror(this.editor, {
            mode: 'markdown',
            theme: 'monokai',
            lineNumbers: true, //왼쪽 라인 넘버 띄우기
            lineWrapping: true, // 내용이 길면 다음 줄에 작성
        })
        this.codeMirror.on('change', this.handleChangeMarkdown)
    }

    componentDidMount() {
        this.initializeEditor()
    }

    handleChange = (e) => {
        const { onChangeInput } = this.props
        const { value, name } = e.target
        this.setState({ title: value })
        onChangeInput({ name, value })
    }

    handleChangeMarkdown = (doc) => {
        const { onChangeInput } = this.props

        this.cursor = doc.getCursor() // 텍스트 cursor 위치 저장
        onChangeInput({
            name: 'markdown',
            value: doc.getValue()
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.markdown !== this.props.markdown) {
            const { codeMirror, cursor } = this
            if (!codeMirror) return // 인스턴트를 아직 만들지 않았을 때
            codeMirror.setValue(this.props.markdown)
            if (!cursor) return //커서가 없을 때
            codeMirror.setCursor(cursor)
        }
    }

    render() {
        const { handleChange } = this
        const { title } = this.props
        return (
            <div className={cx('editor-pane')}>
                <input className={cx('title')} placeholder='제목을 입력하세요' name='title' value={title} onChange={handleChange} />
                <div className={cx('code-editor')} ref={ref => this.editor = ref}></div>
            </div>
        );
    }
}

export default EditorPane;