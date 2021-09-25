import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './index.less';

type TypeProps = {
  proJect: any;
  clickProjectItem?: any;
  currentProject?: any;
};
// 头部右 侧
class CardhradRight extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className={styles.Card_hrad_right}>
        <div>
          <EditOutlined style={{ color: 'white' }} />
        </div>
        <div>
          <DeleteOutlined style={{ color: 'white' }} />
        </div>
      </div>
    );
  }
}
// 头部左侧
class CardhradLeft extends Component<any> {
  static propTypes = {
    projectName: PropTypes.string.isRequired,
    projectNamePs: PropTypes.string.isRequired,
  };
  render() {
    const { projectName, projectNamePs } = this.props;
    return (
      <div className={styles.Card_hrad_left}>
        <div>{projectName}</div>
        <div>{projectNamePs}</div>
      </div>
    );
  }
}
//内容部分
class CardContent extends Component<TypeProps> {
  static propTypes = {
    proJect: PropTypes.object.isRequired,
  };
  render() {
    const { proJect = {} } = this.props;
    const { projectNum, projectType, projectDepartment } = proJect;
    return (
      <div className={styles.content}>
        <div>
          <span>项目编号：</span>
          <span>{projectNum}</span>
        </div>
        <div>
          <span>类型：</span>
          <span>{projectType}</span>
        </div>
        <div>
          <span>部门：</span>
          <span>{projectDepartment}</span>
        </div>
      </div>
    );
  }
}
export default class ProJectCard extends Component<TypeProps> {
  static propTypes = {
    proJect: PropTypes.object.isRequired,
    currentProject: PropTypes.object.isRequired,
    clickProjectItem: PropTypes.func.isRequired,
  };
  render() {
    const { proJect = {}, clickProjectItem, currentProject } = this.props;
    const { projectName, projectNamePs, projectId, sonCount } = proJect;
    const is = projectId === currentProject.projectId;
    return (
      <Card
        title={<CardhradLeft projectName={projectName} projectNamePs={projectNamePs} />}
        extra={<CardhradRight projectId={projectId} />}
        className={is ? styles.isClick_card : null}
      >
        <CardContent proJect={proJect} />
        <div className={styles.Card_bottom}>
          <div className={styles.bottom_left}>
            <span>负责人：</span>
            <span>刘</span>
          </div>
          <div className={styles.bottom_right}>
            <Button onClick={() => clickProjectItem(proJect)}>子项目{sonCount}</Button>
          </div>
        </div>
      </Card>
    );
  }
}
