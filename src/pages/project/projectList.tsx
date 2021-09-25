import React, { Component } from 'react';
import { Row, Col, message, Pagination, Table } from 'antd';
import ProJectCard from '../../components/proJect-card';
import styles from './projectList.less';
import { getProjectList, getSonProjectList } from '../../server';
import { sonProjectColumns } from './columns';
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

  // 创建子项目列表
  createdSonProjectTable() {
    const { sonProjectData } = this.state;
    const columns = sonProjectColumns();
    return (
      <Table
        columns={columns}
        dataSource={sonProjectData}
        key={'project'}
        rowKey={(record: any) => record.sonProjectId}
        pagination={false}
        className={styles.sonProject_table}
      />
    );
  }

  componentDidMount() {
    // 初始化请求一次
    this.getData();
  }

  render() {
    const { pageSize, pageNum, count, currentProject, sonProjectData } = this.state;

    let vNode = [];

    // 如果子项目列表有值创建table并插入到caedList中;
    if (Array.isArray(sonProjectData) && sonProjectData[0]) {
      vNode.push(this.createdSonProjectTable());
    }

    this.state.data.map((item: any) =>
      vNode.push(
        <Col span={6} className={styles.gutter_box} key={item.projectId}>
          <ProJectCard
            proJect={item}
            currentProject={currentProject}
            clickProjectItem={(itemInfo: any) => this.clickProjectItem(itemInfo)}
          />
        </Col>,
      ),
    );

    return (
      <div className={styles.view}>
        <Row className={styles.content} gutter={16}>
          {vNode}
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
