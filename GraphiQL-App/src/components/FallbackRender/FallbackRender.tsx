'use client';
import { FallbackRenderProps } from '../../types/interfaces';

export function FallbackRender({ error }: FallbackRenderProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}
