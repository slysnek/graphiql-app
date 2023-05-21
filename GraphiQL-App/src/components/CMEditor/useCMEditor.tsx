import { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { graphql } from 'cm6-graphql';

export default function useCodeMirror() {
  const editor = useRef<HTMLDivElement>(null);
  const [, setView] = useState<EditorView>();

  useEffect(() => {
    const state = EditorState.create({
      doc: ' ',
      extensions: [basicSetup, graphql()],
    });
    const createdView = new EditorView({ extensions: basicSetup, state, parent: editor.current! });
    setView(createdView);
    return () => {
      createdView.destroy();
    };
  }, []);

  return (
    <div className="CMEditor">
      <div ref={editor}></div>
    </div>
  );
}
