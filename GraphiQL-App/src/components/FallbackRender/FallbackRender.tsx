'use client';
import { FallbackRenderProps } from '../../types/interfaces';

export function FallbackRender({ error }: FallbackRenderProps) {
  return (
    <div
      role="alert"
      style={{
        backgroundColor: '#000',
        color: 'red',
        position: 'absolute',
        textAlign: 'center',
        border: '3px solid red',
        fontSize: '40px',
        top: '50%',
        left: '30%',
      }}
    >
      <p>Something went wrong:</p>
      <pre
        style={{
          color: 'red',
        }}
      >
        {error.message}
      </pre>
    </div>
  );
}
