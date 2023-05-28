import { useTranslation } from 'react-i18next';
import styles from './Documentation.module.css';
import { useEffect, useRef, useState } from 'react';
import DisplayBox from './DisplayBox';
import { getSDLSchemaTypes } from '../../helpers/Utils';
import QueryHistory from './QueryHistory';
import DisplayTextBox from './DisplayTextBox';
import { ArgsEntity, FieldsEntity, TypesEntity } from '../../types/interfaces';

const Documentation = () => {
  const [currObj, setCurrObj] = useState<TypesEntity | FieldsEntity | ArgsEntity | undefined>(
    undefined
  );
  const [previousObjs, setPreviousObjs] = useState<
    (TypesEntity | FieldsEntity | ArgsEntity | undefined)[]
  >([]);
  const [currHistoryStrings, setCurrHistoryStrings] = useState<string[]>([]);
  const allTypes = useRef<TypesEntity[] | null>(null);

  useEffect(() => {
    async function getAllTypes() {
      allTypes.current = await getSDLSchemaTypes();
      setCurrObj(allTypes.current![0]);
      setCurrHistoryStrings((currHistoryStrings) => [
        ...currHistoryStrings,
        allTypes.current![0].name,
      ]);
    }
    getAllTypes();
  }, []);

  const handleClickinDisplay = (newObject: TypesEntity | FieldsEntity | ArgsEntity) => {
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
    setCurrObj(previousObjs![previousObjs!.length - 1]);
    setPreviousObjs((previousObjs) => {
      if (previousObjs!.length > 1) {
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
        <QueryHistory
          historyReturn={handleHistoryReturn}
          currentHistory={currHistoryStrings}
        ></QueryHistory>
        <DisplayBox
          header="Arguments"
          noValue="No Arguments"
          currentEntity={currObj}
          displayType="args"
          addToHistory={handleClickinDisplay}
        ></DisplayBox>
        <DisplayBox
          header="Fields"
          noValue="No Fields"
          currentEntity={currObj}
          displayType="fields"
          addToHistory={handleClickinDisplay}
        ></DisplayBox>
        <DisplayTextBox
          header="Description"
          noValue="No Description"
          currentEntity={currObj as FieldsEntity | ArgsEntity}
          displayType="description"
          allFields={allTypes.current}
          addToHistory={handleClickinDisplay}
        ></DisplayTextBox>
        <DisplayTextBox
          header="Metadata"
          noValue="No Metadata"
          currentEntity={currObj as FieldsEntity | ArgsEntity}
          displayType="metadata"
          allFields={allTypes.current}
          addToHistory={handleClickinDisplay}
        ></DisplayTextBox>
      </div>
    </div>
  );
};

export default Documentation;
