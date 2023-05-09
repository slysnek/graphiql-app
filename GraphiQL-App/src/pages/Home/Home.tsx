import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import { Documentation } from '../../components/Documentation/Documentation';
import { Operation } from '../../components/Operation/Operation';
import { OperationBottomPane } from '../../components/OperationBottomPane/OperationBottomPane';
import { Response } from '../../components/Response/Response';

import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container} style={{ minHeight: 200, minWidth: 320 }}>
      <Allotment>
        <Allotment.Pane minSize={100}>
          <Documentation />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment vertical>
            <Allotment.Pane minSize={100}>
              <Operation />
            </Allotment.Pane>
            <Allotment.Pane minSize={100}>
              <OperationBottomPane />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
        <Allotment.Pane>
          <Response />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default Home;
