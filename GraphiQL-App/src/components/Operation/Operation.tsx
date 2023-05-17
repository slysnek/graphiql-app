import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from './Operation.module.css';
import CMEditor from '../CMEditor/CMEditor';
import { useTranslation } from 'react-i18next';

export function Operation() {
  const { t, i18n } = useTranslation()
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span>{t('editorPage.operation')}</span>
        <Button variant="contained" startIcon={<PlayArrowIcon />}>
        {t('editorPage.query')}
        </Button>
        <CMEditor />
      </div>
    </div>
  );
}
