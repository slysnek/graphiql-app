import { useTranslation } from 'react-i18next';
import styles from './Documentation.module.css';
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';
import { useEffect, useState } from 'react';


async function getSDLSchemaString() {
  const introspectionQuery = getIntrospectionQuery();
  const res = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: introspectionQuery }),
  });
  const { data } = await res.json();
  console.log(data);
  console.log(data.__schema.types[0]);
  const root = data.__schema.types[0];
  return root;
}

export const Documentation = () => {
  const [currObj, setCurrObj] = useState();

  useEffect(() => {
    async function getRoot() {
      const rootObject = await getSDLSchemaString();
      setCurrObj(rootObject);
      console.log(rootObject);
    }
    getRoot();
  }, []);

  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{t('editorPage.documentation')}</h3>
        {/* {currObj.name ? <div>{currObj.name}</div> : ''} */}
        <ul>
          {currObj
            ? currObj.fields.map((el) => {
                // eslint-disable-next-line react/jsx-key
                return <li>{el.name}</li>;
              })
            : ''}
        </ul>
      </div>
    </div>
  );
};
