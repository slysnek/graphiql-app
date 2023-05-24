import React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { QueryHeadersPane } from '../QueryHeaders/QueryHeadersPane';
import { QueryVariablesPane } from '../QueryVariables/QueryVariablesPane';
import { QueryButtonInTabs } from './QueryButtonInTabs';
import { useAppSelector } from '../../store/hooksRedux';
import { QueryPanelProps, QueryPanelState } from '../../types/interfaces';
import styles from './QueryPanel.module.css';
import config from '../../config/config.json';

export const QueryPanel = ({ onChange }: QueryPanelProps) => {
  const { t } = useTranslation();
  const queryPanelState = useAppSelector((state) => state.queryPanelState);
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const changePanelView = () => {
    const newPanelState: QueryPanelState = { ...queryPanelState };
    if (queryPanelState.sizes !== undefined) {
      const new_sizes = queryPanelState.isOpened
        ? [
            queryPanelState.sizes[0] + queryPanelState.sizes[1] - config.QUERY_PANEL_INIT_SIZE,
            config.QUERY_PANEL_INIT_SIZE,
          ]
        : [
            queryPanelState.sizes[0] - config.QUERY_PANEL_HEIGHT,
            queryPanelState.sizes[1] + config.QUERY_PANEL_HEIGHT,
          ];
      newPanelState.sizes = [...new_sizes];
      onChange(newPanelState);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider', border: '1px' }}>
              <TabList onChange={handleChange} aria-label="query panel">
                <Tab
                  onClick={() => {
                    queryPanelState.isOpened ? null : changePanelView();
                  }}
                  label={t('editorPage.variables')}
                  value="1"
                  sx={{ fontWeight: '800' }}
                />
                <Tab
                  onClick={() => {
                    queryPanelState.isOpened ? null : changePanelView();
                  }}
                  label={t('editorPage.headers')}
                  value="2"
                  sx={{ fontWeight: '800' }}
                />
                <QueryButtonInTabs
                  onClick={() => {
                    changePanelView();
                  }}
                  isPanelOpened={queryPanelState.isOpened}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <QueryVariablesPane />
            </TabPanel>
            <TabPanel value="2">
              <QueryHeadersPane />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};
