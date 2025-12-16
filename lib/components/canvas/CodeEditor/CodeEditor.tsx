import Editor from '@monaco-editor/react';

export function CodeEditor() {
    return (
        <>
            <Editor height='100%' defaultLanguage='typescript' defaultValue='// some comment' />;
        </>
    );
}
