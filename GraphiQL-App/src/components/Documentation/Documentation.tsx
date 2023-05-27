import { useTranslation } from 'react-i18next';
import styles from './Documentation.module.css';
import { MouseEvent, Suspense, useEffect, useRef, useState } from 'react';
import DisplayBox from './DisplayBox';
import { getSDLSchemaTypes } from '../../helpers/Utils';
import QueryHistory from './QueryHistory';
import DisplayTextBox from './DisplayTextBox';

const Documentation = () => {
  const [currObj, setCurrObj] = useState(undefined);
  const [previousObjs, setPreviousObjs] = useState([]);
  const [currHistoryStrings, setCurrHistoryStrings] = useState<any>([]);
  const allTypes = useRef(null);

  useEffect(() => {
    async function getAllTypes() {
      allTypes.current = await getSDLSchemaTypes();
      setCurrObj(allTypes.current[0]);
      setCurrHistoryStrings((currHistoryStrings) => [
        ...currHistoryStrings,
        allTypes.current[0].name,
      ]);
    }
    getAllTypes();
  }, []);

  useEffect(() => {
    console.log('------------');
    console.log(currObj, 'current');
    console.log(previousObjs, 'previous');
    console.log(currHistoryStrings, 'history');
    console.log('------------');
  }, [currHistoryStrings, currObj, previousObjs]);

  const handleClickinDisplay = (newObject: any) => {
    setCurrHistoryStrings((currHistoryStrings) => {
      currHistoryStrings.push(newObject.name);
      return currHistoryStrings;
    });
    setCurrObj(newObject);
    setPreviousObjs((previousObjs) => [...previousObjs, currObj]);
  };

  const handleHistoryReturn = () => {
    setCurrHistoryStrings((currHistoryStrings) => {
      if (currHistoryStrings.length > 1) {
        const newHistory = [...currHistoryStrings];
        newHistory.pop();
        return newHistory;
      }
      return currHistoryStrings;
    });
    setCurrObj(previousObjs[previousObjs.length - 1]);
    setPreviousObjs((previousObjs) => {
      if (previousObjs.length > 1) {
        const newPreviousObjs = [...previousObjs];
        newPreviousObjs.pop();
        return newPreviousObjs;
      }
      return previousObjs;
    });
  };

  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{t('editorPage.documentation')}</h3>
        <h2>{currObj?.name} - current</h2>
        <h2>{previousObjs.map((el) => `${el.name}/`)} - previous</h2>
        <QueryHistory
          historyReturn={handleHistoryReturn}
          currentHistory={currHistoryStrings}
        ></QueryHistory>
        <DisplayBox
          header="Arguments"
          noValue="No Arguments"
          localHistoryState={currObj}
          displayType="args"
          addToHistory={handleClickinDisplay}
        ></DisplayBox>
        <DisplayBox
          header="Fields"
          noValue="No Fields"
          localHistoryState={currObj}
          displayType="fields"
          addToHistory={handleClickinDisplay}
        ></DisplayBox>
        <DisplayTextBox
          header="Description"
          noValue="No Description"
          localHistoryState={currObj}
          displayType="description"
          allFields={allTypes.current}
          addToHistory={handleClickinDisplay}
        ></DisplayTextBox>
        <DisplayTextBox
          header="Metadata"
          noValue="No Metadata"
          localHistoryState={currObj}
          displayType="metadata"
          allFields={allTypes.current}
          addToHistory={handleClickinDisplay}
        ></DisplayTextBox>
      </div>
    </div>
  );
};

export default Documentation;
