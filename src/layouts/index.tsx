import React from 'react';
import styles from './index.less';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default BasicLayout;
