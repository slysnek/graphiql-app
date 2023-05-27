import { useTranslation } from 'react-i18next';
import styles from './Documentation.module.css';
import { MouseEvent, Suspense, useEffect, useRef, useState } from 'react';
import { addObject } from '../../store/slices/historySlice';
import DisplayBox from './DisplayBox';
import { getSDLSchemaTypes } from '../../helpers/Utils';
import QueryHistory from './QueryHistory';
import DisplayTextBox from './DisplayTextBox';

const Documentation = () => {
  const [currObj, setCurrObj] = useState(undefined);
  const [currHistoryStrings, setCurrHistoryStrings] = useState<any>([]);
  const allTypes = useRef(null);

  useEffect(() => {
    console.log('i work');
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

  const handleHistoryReturn = async () => {
    setCurrHistoryStrings((currHistoryStrings) => {
      currHistoryStrings.pop();
      return currHistoryStrings;
    });
    setCurrObj(() => {
      //TODO: fix 2
      if (currHistoryStrings.length > 1) {
        const previousObjName = currHistoryStrings[currHistoryStrings.length - 2];
        const previousObj = allTypes.current.find((el) => el.name === previousObjName);
        return previousObj;
      }
    });
  };

  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{t('editorPage.documentation')}</h3>
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
        ></DisplayTextBox>
      </div>
    </div>
  );
};

export default Documentation;
