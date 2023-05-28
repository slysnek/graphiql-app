import { getIntrospectionQuery } from 'graphql';

export const arraysAreEqual = (
  array1: number[] | undefined,
  array2: number[] | undefined
): boolean => {
  if (array1 === undefined || array2 === undefined) {
    return false;
  } else {
    return (
      array1.length === array2.length && array1.every((value, index) => value === array2[index])
    );
  }
};

export async function getSDLSchemaTypes() {
  const introspectionQuery = getIntrospectionQuery();
  const res = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: introspectionQuery }),
  });
  const { data } = await res.json();
  const allTypes = data.__schema.types;
  return allTypes;
}
