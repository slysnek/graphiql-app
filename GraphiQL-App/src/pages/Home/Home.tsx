import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import { ToolBar } from '../../components/ToolBar/ToolBar';
import { Documentation } from '../../components/Documentation/Documentation';
import { Operation } from '../../components/Operation/Operation';
import { OperationBottomPane } from '../../components/OperationBottomPane/OperationBottomPane';
import { Response } from '../../components/Response/Response';

import { useAppSelector } from '../../store/hooksRedux';

import styles from './Home.module.css';

function Home() {
  const docPanVisible = useAppSelector((state) => state.docPaneState.visible);
  return (
    <div className={styles.container} style={{ minHeight: 200, minWidth: 320 }}>
      <Allotment>
        <Allotment.Pane minSize={100} maxSize={100}>
          <ToolBar />
        </Allotment.Pane>
        <Allotment.Pane snap preferredSize={'15%'} visible={docPanVisible}>
          <Documentation />
        </Allotment.Pane>
        <Allotment.Pane snap preferredSize={'40%'}>
          <Allotment vertical>
            <Allotment.Pane minSize={100}>
              <Operation />
            </Allotment.Pane>
            <Allotment.Pane minSize={100} preferredSize={100}>
              <OperationBottomPane />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
        <Allotment.Pane snap>
          <Response />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default Home;
