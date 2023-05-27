import { useTranslation } from 'react-i18next';
import styles from './Documentation.module.css';
import { MouseEvent, Suspense, useEffect, useRef, useState } from 'react';
import DisplayBox from './DisplayBox';
import { getSDLSchemaTypes } from '../../helpers/Utils';
import QueryHistory from './QueryHistory';
import DisplayTextBox from './DisplayTextBox';

const Documentation = () => {
  const [currObj, setCurrObj] = useState(undefined);
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

  const handleClickinDisplay = (newObject: any) => {
    setCurrHistoryStrings((currHistoryStrings) => {
      currHistoryStrings.push(newObject.name);
      return currHistoryStrings;
    });
    setCurrObj(newObject);
  };

  const handleHistoryReturn = () => {
    setCurrHistoryStrings((currHistoryStrings) => {
      if (currHistoryStrings.length > 1) {
        currHistoryStrings.pop();
      }
      return currHistoryStrings;
    });
    setCurrObj(() => {
      console.log(currHistoryStrings);
      //TODO: fix 2
      if (currHistoryStrings.length === 1) {
        return currObj;
      }
      if (currHistoryStrings.length > 1) {
        const previousObjName = currHistoryStrings[currHistoryStrings.length - 2];
        console.log(previousObjName);
        const previousObj = allTypes.current.find((el) => el.name === previousObjName);
        console.log(previousObj);
        return previousObj;
      }
    });
  };

  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{t('editorPage.documentation')}</h3>
        <h2>{currObj?.name}</h2>
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
