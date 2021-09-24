import React from 'react';
import styles from './index.less';

const BasicLayout: React.FC = props => <div className={styles.layout}>{props.children}</div>;

export default BasicLayout;
