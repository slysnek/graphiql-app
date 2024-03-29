import { useNavigate } from 'react-router-dom';
import { auth } from '../../helpers/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooksRedux';
import { exitUser, setUser } from '../../store/slices/userSlice';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Allotment, AllotmentHandle } from 'allotment';
import { debounce } from 'lodash';
import { arraysAreEqual } from '../../helpers/Utils';
import { ToolBar } from '../../components/ToolBar/ToolBar';
import { RequestPanel } from '../../components/RequestPanel/RequestPanel';
import { QueryPanel } from '../../components/QueryPanel/QueryPanel';
import { ResponsePanel } from '../../components/ResponsePanel/ResponsePanel';
import { setQueryPanelState } from '../../store/slices/queryPanelStateSlice';
import { QueryPanelState } from '../../types/interfaces';
import styles from './Home.module.css';
import config from '../../config/config.json';
import 'allotment/dist/style.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Documentation = lazy(() => import('../../components/Documentation/Documentation'));

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useAppSelector((state) => state.userAuth.name);
  const docPanVisible = useAppSelector((state) => state.docPaneState.visible);
  const queryPanelState = useAppSelector((state) => state.queryPanelState);
  const ref = useRef<AllotmentHandle>(null!);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(exitUser());
        navigate('/login', { replace: true });
      }
      if (user) {
        dispatch(
          setUser({
            email: user && user.email ? user.email : '',
            token: user ? user.refreshToken : '',
            id: user ? user.uid : '',
            name: name,
          })
        );
      }
    });
    return () => {
      listenAuth();
    };
  }, [dispatch, name, navigate]);

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
    [dispatch, queryPanelState]
  );

  const handleQueryPanelSizeChange = (newQueryPanelState: QueryPanelState) => {
    if (newQueryPanelState.sizes !== undefined) {
      ref.current.resize(newQueryPanelState.sizes);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= config.MOBILE_WIDTH_SIZE);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container} style={{ minHeight: 200, minWidth: 200 }}>
      <Allotment
        key={isMobile.toString()}
        vertical={isMobile}
        defaultSizes={isMobile ? [1, 4, 6, 3] : [1, 3, 4, 4]}
        minSize={50}
      >
        <Allotment.Pane minSize={100} maxSize={100}>
          <ToolBar />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={'30%'} visible={docPanVisible}>
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <div style={{ overflowY: 'auto', height: '100%' }}>
              <Documentation />
            </div>
          </Suspense>
        </Allotment.Pane>
        <Allotment.Pane preferredSize={'50%'} minSize={300}>
          <Allotment
            vertical
            defaultSizes={isMobile ? [100, 1] : [100, 1]}
            onChange={handleChange}
            ref={ref}
          >
            <Allotment.Pane minSize={50} preferredSize={'45%'}>
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
        <Allotment.Pane preferredSize={'50%'} minSize={50}>
          <div style={{ overflowY: 'auto', height: '100%', backgroundColor: 'rgb(242, 241, 248)' }}>
            <ResponsePanel />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
export default Home;
