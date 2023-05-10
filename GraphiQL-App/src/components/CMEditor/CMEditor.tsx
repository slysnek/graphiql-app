import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { graphql } from 'cm6-graphql';

export default function useCodeMirror() {
  const editor = useRef();

  useEffect(() => {
    const log = (event) => console.log(event);
    // editor.current.addEventListener("input", log);

    const state = EditorState.create({
      doc: ' ',
      extensions: [basicSetup, graphql()],
    });
    const view = new EditorView({ state, parent: editor.current });
    return () => {
      view.destroy();
      // editor.current.removeEventListener("input", log);
    };
  }, []);

  return (
    <div className="CMEditor">
      <div ref={editor}></div>
    </div>
  );
}
