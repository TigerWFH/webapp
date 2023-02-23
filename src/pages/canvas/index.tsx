import * as React from 'react';
import Tabs, { TabPanel } from 'Components/Tabs';
import Demo1 from './components/Demo1';
import Rect from './components/Rect';
import Path from './components/Path';
import styles from './index.module.scss';

export default function Canvas(props: any) {
  return (
    <div className={styles.canvas}>
      <Tabs defaultActiveName="path">
        <TabPanel key="@@path" name="path" title="path">
          <div className={styles.container}>
            <Path className={styles.component} />
          </div>
        </TabPanel>
        <TabPanel key="@@rect" name="rect" title="rect">
          <div className={styles.container}>
            <Rect className={styles.component} />
          </div>
        </TabPanel>
        <TabPanel key="@@demo1" name="demo1" title="demo1">
          <div className={styles.container}>
            <Demo1 className={styles.component} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
