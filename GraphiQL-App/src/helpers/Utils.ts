import { getIntrospectionQuery } from 'graphql';
import { BASE_URL } from '../config/config.json';

import { ErrorObject } from '../types/interfaces';

export function arraysAreEqual(
  array1: number[] | undefined,
  array2: number[] | undefined
): boolean {
  if (array1 === undefined || array2 === undefined) {
    return false;
  } else {
    return (
      array1.length === array2.length && array1.every((value, index) => value === array2[index])
    );
  }
}

export function getErrorMessage(error: unknown): ErrorObject {
  if (error instanceof Error)
    return {
      error: true,
      name: error.name,
      message: error.message,
    };
  return {
    error: true,
    name: '',
    message: String(error),
  };
}

export async function getSDLSchemaTypes() {
  const introspectionQuery = getIntrospectionQuery();
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: introspectionQuery }),
  });
  const { data } = await res.json();
  const allTypes = data.__schema.types;
  return allTypes;
}
