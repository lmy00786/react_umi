import React, { Component } from 'react';
import { Row, Col, message, Pagination } from 'antd';
import ProJectCard from '../../components/proJect-card';
import styles from './projectList.less';
import { getProjectList, getSonProjectList } from '../../server';
export default class project extends Component {
  state = {
    data: [],
    count: 0,
    // 模糊匹配名称
    name: '',
    // 条数
    pageSize: 12,
    // 页数
    pageNum: 1,
    // 子项目id必传
    id: '',
    // 被点击的项目数据
    currentProject: {},
    // 当前项目子项目数据
    sonProjectData: [],
  };

  // 获取列表数据
  private getData() {
    const { name, pageSize, pageNum, id } = this.state;
    getProjectList({ name, pageSize, pageNum, id })
      .then((intetface_res: any) => {
        const { data, count } = intetface_res;
        this.setState({ data, count });
      })
      .catch((e: any) => {
        message.error(e.message);
      });
  }

  private getSonProjectList(projectId: string) {
    getSonProjectList(projectId)
      .then((intetface_res: any) => {
        this.setState({ sonProjectData: intetface_res.data });
      })
      .catch((e: any) => {
        message.error(e.message);
      });
  }
  // 页数发生改变
  private pageChange = (pageNum: number, pageSize: any) => {
    this.setState({ pageNum });
    this.getData();
  };

  // 点击某一个card
  clickProjectItem = (currentProject: any) => {
    this.setState({ currentProject });
    this.getSonProjectList(currentProject.projectId);
  };
  componentDidMount() {
    // 初始化请求一次
    this.getData();
  }

  render() {
    const { pageSize, pageNum, count, currentProject, sonProjectData } = this.state;

    // 如果子项目列表有值创建table并插入到caedList中;
    let table = '';
    if (Array.isArray(sonProjectData) && sonProjectData[0]) {
      //table
      console.log(sonProjectData, '子项目数据要展示了！！！！需要处理逻辑');
    }

    let card = this.state.data.map((item: any) => (
      <Col span={6} className={styles.gutter_box} key={item.projectId}>
        <ProJectCard
          proJect={item}
          currentProject={currentProject}
          clickProjectItem={(itemInfo: any) => this.clickProjectItem(itemInfo)}
        />
      </Col>
    ));

    return (
      <div className={styles.view}>
        <Row className={styles.content} gutter={16}>
          {card}
        </Row>
        <div className={styles.page}>
          <Pagination
            defaultCurrent={1}
            pageSize={pageSize}
            current={pageNum}
            total={count}
            onChange={(page, pageSize) => {
              this.pageChange(page, pageSize);
            }}
          />
        </div>
      </div>
    );
  }
}
