import React from 'react';
import EditorTemplate from '../components/editor/EditorTemplate';
import EditorHeaderContainer from '../containers/editor/EditorHeaderContainer';
import EditorPaneContainer from '../containers/editor/EditorPaneContainer';
import PreviewPaneContainer from '../containers/editor/PreviewPaneContainer';

const EditorPage = ({ match }) => {
    const { id } = match.params;
    return (
        <EditorTemplate
            id={id}
            header={<EditorHeaderContainer id={id} />}
            editor={<EditorPaneContainer id={id} />}
            preview={<PreviewPaneContainer />}
        />
    )
}

export default EditorPage;