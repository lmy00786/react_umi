import React, { PureComponent } from 'react';
import { Card, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// 约束pros的包
import PropTypes from 'prop-types';
import styles from './index.less';
// ts 约束用的直接用any也是可以的
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
    // 前边头像没有设置 自己加一下结构出来展示就好了
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

// 像外面暴漏的class组件ProJectCard
export default class ProJectCard extends PureComponent<TypeProps> {
  // 定义的props下面使用的都是这里的
  static propTypes = {
    proJect: PropTypes.object.isRequired,
    currentProject: PropTypes.object.isRequired,
    clickProjectChange: PropTypes.func.isRequired,
  };
  private btnChang(e: any, proJect: Instance.Project) {
    // 阻止冒泡 不让触发父的事件（必须加的）
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
        // 点击card其他部分（并不是按钮位置  传值为false）
        onClick={() => clickProjectChange(false)}
      >
        <CardContent proJect={proJect} />
        <div className={styles.Card_bottom}>
          <div className={styles.bottom_left}>
            <span>负责人：</span>
            <span>{projectPrincipal}</span>
          </div>
          <div className={styles.bottom_right}>
            {/* 点击子项目按钮进行触发自己本身的方法 实际也是再调用clickProjectChange方法传参是两个一个true  一个是被点击的项目本身的数据 */}
            <Button onClick={e => this.btnChang(e, proJect)}>子项目{sonProjectCount}</Button>
          </div>
        </div>
      </Card>
    );
  }
}
