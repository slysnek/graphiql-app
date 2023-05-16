import { useMemo, useRef } from 'react';
import { Allotment, AllotmentHandle } from 'allotment';
import { debounce } from 'lodash';
import 'allotment/dist/style.css';

import { ToolBar } from '../../components/ToolBar/ToolBar';
import { Documentation } from '../../components/Documentation/Documentation';
import { RequestPanel } from '../../components/RequestPanel/RequestPanel';
import { QueryPanel } from '../../components/QueryPanel/QueryPanel';
import { ResponsePanel } from '../../components/ResponsePanel/ResponsePanel';

import { setQueryPanelState } from '../../store/slices/queryPanelStateSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';

import { arraysAreEqual } from '../../utils/Utils';

import styles from './Home.module.css';
import config from '../../config/config.json';
import { QueryPanelState } from '../../types/interfaces';

function Home() {
  const dispatch = useAppDispatch();
  const docPanVisible = useAppSelector((state) => state.docPaneState.visible);
  const queryPanelState = useAppSelector((state) => state.queryPanelState);
  const ref = useRef<AllotmentHandle>(null!);

  const handleChange = useMemo(
    () =>
      debounce((sizes: number[]) => {
        if (sizes !== undefined) {
          const initQueryPanelState: QueryPanelState = { ...queryPanelState };
          initQueryPanelState.isOpened = sizes[1] > config.QUERY_PANEL_INIT_SIZE ? true : false;
          initQueryPanelState.sizes = [...sizes];
          if (arraysAreEqual(initQueryPanelState.prev_sizes, [0, 0])) {
            initQueryPanelState.prev_sizes = [...sizes];
          }

          dispatch(
            setQueryPanelState({
              isOpened: initQueryPanelState.isOpened,
              sizes: initQueryPanelState.sizes,
              prev_sizes: initQueryPanelState.prev_sizes,
            })
          );
        }
      }, 100),
    []
  );

  const handleQueryPanelSizeChange = (newQueryPanelState: QueryPanelState) => {
    if (newQueryPanelState.sizes !== undefined) {
      ref.current.resize(newQueryPanelState.sizes);
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: 200, minWidth: 320 }}>
      <Allotment defaultSizes={[1, 1, 2, 3]} minSize={50}>
        <Allotment.Pane minSize={100} maxSize={100}>
          <ToolBar />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={'15%'} visible={docPanVisible}>
          <Documentation />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={'35%'}>
          <Allotment vertical defaultSizes={[1000, 1]} onChange={handleChange} ref={ref}>
            <Allotment.Pane minSize={50} preferredSize={'100%'}>
              <div style={{ overflowY: 'auto', height: '100%' }}>
                <RequestPanel />
              </div>
            </Allotment.Pane>
            <Allotment.Pane
              minSize={config.QUERY_PANEL_INIT_SIZE}
              preferredSize={config.QUERY_PANEL_INIT_SIZE}
            >
              <div style={{ overflowY: 'auto', height: '100%' }}>
                <QueryPanel onChange={handleQueryPanelSizeChange} />
              </div>
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
        <Allotment.Pane minSize={50}>
          <div style={{ overflowY: 'auto', height: '100%' }}>
            <ResponsePanel />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default Home;
