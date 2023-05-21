import { useTranslation } from 'react-i18next';
import styles from './Response.module.css';

export const Response = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{t('editorPage.response')}</h3>
        <svg
          className={styles.svg}
          preserveAspectRatio="none"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeWidth="2"
            d="M0 0l200 200M0 200L200 0"
          ></path>
        </svg>
      </div>
    </div>
  );
};
