import React, { PureComponent } from 'react';
import { Card, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Instance } from '../../types/typing.Instance';

type TypeProps = {
  proJect: any;
  clickProjectChange?: any;
  currentProject?: any;
};
// 头部右 侧
class CardhradRight extends PureComponent {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className={styles.Card_hrad_right}>
        <div>
          <Tooltip placement="top" title="编辑">
            <EditOutlined style={{ color: 'white' }} />
          </Tooltip>
        </div>
        <div>
          <Tooltip placement="top" title="删除">
            <DeleteOutlined style={{ color: 'white' }} />
          </Tooltip>
        </div>
      </div>
    );
  }
}
// 头部左侧
class CardhradLeft extends PureComponent<any> {
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
class CardContent extends PureComponent<TypeProps> {
  static propTypes = {
    proJect: PropTypes.object.isRequired,
  };
  render() {
    const { proJect } = this.props;
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
export default class ProJectCard extends PureComponent<TypeProps> {
  static propTypes = {
    proJect: PropTypes.object.isRequired,
    currentProject: PropTypes.object.isRequired,
    clickProjectChange: PropTypes.func.isRequired,
  };
  private btnChang(e: any, proJect: Instance.Project) {
    e.stopPropagation();
    this.props.clickProjectChange(true, proJect);
  }
  render() {
    const { proJect = {}, clickProjectChange, currentProject } = this.props;
    const { projectName, projectNamePs, projectId, sonProjectCount, projectPrincipal } = proJect;
    const is = projectId === currentProject.projectId;
    return (
      <Card
        title={<CardhradLeft projectName={projectName} projectNamePs={projectNamePs} />}
        extra={<CardhradRight projectId={projectId} />}
        className={is ? styles.isClick_card : null}
        onClick={() => clickProjectChange(false)}
      >
        <CardContent proJect={proJect} />
        <div className={styles.Card_bottom}>
          <div className={styles.bottom_left}>
            <span>负责人：</span>
            <span>{projectPrincipal}</span>
          </div>
          <div className={styles.bottom_right}>
            <Button onClick={e => this.btnChang(e, proJect)}>子项目{sonProjectCount}</Button>
          </div>
        </div>
      </Card>
    );
  }
}
