import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './index.less';

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
class CardhradLeft extends Component {
  static propTypes = {
    projectName: PropTypes.string.isRequired,
    projectName_ps: PropTypes.string.isRequired,
  };
  render() {
    const { projectName, projectName_ps } = this.props;
    return (
      <div className={styles.Card_hrad_left}>
        <div>{projectName}</div>
        <div>{projectName_ps}</div>
      </div>
    );
  }
}
// 底部
class CardBottom extends Component {
  render() {
    return (
      <div className={styles.Card_bottom}>
        <div className={styles.bottom_left}>
          <span>负责人：</span>
          <span>刘</span>
        </div>
        <div className={styles.bottom_right}>
          <Button>子项目10</Button>
        </div>
      </div>
    );
  }
}
//内容部分
class CardContent extends Component {
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
export default class ProJectCard extends Component {
  static propTypes = {
    proJect: PropTypes.object.isRequired,
  };
  render() {
    const { proJect = {} } = this.props;
    const { projectName, projectName_ps, projectId } = proJect;
    return (
      <Card
        title={<CardhradLeft projectName={projectName} projectName_ps={projectName_ps} />}
        extra={<CardhradRight projectId={projectId} />}
      >
        <CardContent proJect={this.props.proJect} />
        <CardBottom />
      </Card>
    );
  }
}
