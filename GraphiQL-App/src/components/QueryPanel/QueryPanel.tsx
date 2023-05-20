import React from 'react';
import { Box, Tab, IconButton, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Tooltip } from '@mui/material';

import styles from './QueryPanel.module.css';
import { QueryHeadersPane } from '../QueryHeaders/QueryHeadersPane';
import { QueryVariablesPane } from '../QueryVariables/QueryVariablesPane';

import { useAppSelector } from '../../store/hooksRedux';
import { arraysAreEqual } from '../../helpers/Utils';

import config from '../../config/config.json';
import { QueryPanelState } from '../../types/interfaces';

interface QueryPanelProps {
  onChange: (newQueryPanelState: QueryPanelState) => void;
}

export const QueryPanel = ({ onChange }: QueryPanelProps) => {
  const queryPanelState = useAppSelector((state) => state.queryPanelState);

  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  interface ButtonInTabsProps {
    onClick: React.MouseEventHandler;
    children: React.ReactNode;
  }

  const ButtonInTabs = ({ onClick, children }: ButtonInTabsProps) => {
    return (
      <Tooltip title={queryPanelState.isOpened ? 'Hide editor tools' : 'Show editor tools'}>
        <IconButton onClick={onClick} children={children} />
      </Tooltip>
    );
  };

  const OpenPanel = () => {
    let newPanelState: QueryPanelState = { ...queryPanelState };
    if (queryPanelState.sizes !== undefined) {
      if (arraysAreEqual(queryPanelState.sizes, queryPanelState.prev_sizes)) {
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
      } else {
        const sizes = [...queryPanelState.sizes];
        const prev_sizes = [...queryPanelState.sizes];
        newPanelState = {
          ...queryPanelState,
          sizes: prev_sizes,
          prev_sizes: sizes,
        };
      }
      onChange(newPanelState);
    }
  };

  const BoxOpenPanel = () => {
    if (!queryPanelState.isOpened) {
      OpenPanel();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 0, borderColor: 'divider' }}
              onClick={() => {
                BoxOpenPanel();
              }}
            >
              <TabList onChange={handleChange} aria-label="query panel">
                <Tab label="Variables" value="1" />
                <Tab label="Headers" value="2" />
                <ButtonInTabs
                  onClick={() => {
                    OpenPanel();
                  }}
                  children={queryPanelState.isOpened ? <ExpandMoreIcon /> : <ExpandLessIcon />}
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
