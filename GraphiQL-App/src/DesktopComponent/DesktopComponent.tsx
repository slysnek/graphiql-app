import { Allotment } from "allotment";

export const DesktopComponent = () => {
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
  </div>;
};