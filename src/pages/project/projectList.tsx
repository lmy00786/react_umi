import React, { Component } from 'react';
import { Row, Col, message, Pagination, Table } from 'antd';
import ProJectCard from '../../components/proJect-card';
import styles from './projectList.less';
import { getProjectList, getSonProjectList } from '../../server';
import { arrTrans, scrollTopDOM } from '../../utils/utils';
import { Instance } from '../../types/typing.Instance';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
export default class project extends Component {
  // 表格头部
  private sonProjectColumns = [
    {
      title: '子项目编码',
      dataIndex: 'projectNum',
    },
    {
      title: '子项目名称',
      dataIndex: 'sonProjectName',
    },
    {
      title: '开始日期',
      dataIndex: 'sonProjectStartTime',
      render: (time: Date) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '结束日期',
      dataIndex: 'sonProjectEndTime',
      render: (time: Date) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '项目状态',
      dataIndex: 'sonProjectState',
    },
    {
      title: '描述',
      dataIndex: 'sonProjectPs',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <>
          <a
            style={{ marginRight: 8 }}
            onClick={() => {
              this.sonProjectEditChange(record);
            }}
          >
            <EditOutlined />
            编辑
          </a>
          <a
            onClick={() => {
              this.sonProjectDelChange(record);
            }}
          >
            <DeleteOutlined />
            删除
          </a>
        </>
      ),
    },
  ];
  state = {
    // 项目列表数据
    data: [],
    // 项目列表数量
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
    // 清空子项目
    this.setState({ currentProject: {}, sonProjectData: [] });
    // 列表滚动顶部
    scrollTopDOM('scrollFlag');

    const { name, pageSize, pageNum, id } = this.state;
    getProjectList({ name, pageSize, pageNum, id })
      .then((intetface_res: any) => {
        let { data, count } = intetface_res;
        // 将数组转为二维数组
        if (data && data[0]) data = arrTrans(4, data);
        this.setState({ data, count });
      })
      .catch((e: any) => {
        message.error(e.message);
        this.setState({ data: [], count: 0 });
      });
  }

  // 获取子项目数据(num:实际调接口中用不到)
  private getSonProjectList(projectId: string, num: number) {
    getSonProjectList(projectId, num)
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
  private clickProjectChange = (flag: boolean, currentProject?: any) => {
    if (flag) {
      const { projectId, sonProjectCount } = currentProject;
      this.setState({ currentProject, sonProjectData: [] });
      this.getSonProjectList(projectId, sonProjectCount);
    } else {
      this.setState({ currentProject: {}, sonProjectData: [] });
    }
  };

  // 子项目编辑
  sonProjectEditChange = (record: any) => {
    console.log(record, '子项目编辑');
  };

  // 子项目删除
  sonProjectDelChange = (record: any) => {
    console.log(record, '子项目删除');
  };

  // 创建子项目列表
  createdSonProjectTable() {
    // 展示得数据
    const { sonProjectData } = this.state;

    return (
      // 展示隐藏通过此类名做动画fadenum（不想要直接删掉）
      <Row gutter={16} className={styles.fadenum} key="table">
        <Table
          columns={this.sonProjectColumns}
          dataSource={sonProjectData}
          key={'project'}
          rowKey={(record: any) => record.sonProjectId}
          pagination={false}
          className={styles.sonProject_table}
        />
      </Row>
    );
  }

  componentDidMount() {
    // 初始化请求一次
    this.getData();
  }

  render() {
    const { pageSize, pageNum, count, currentProject, sonProjectData } = this.state;

    // 将要渲染得虚拟节点
    let vNode: any[] = [];

    // 遍历项目列表
    this.state.data.map((item: any[], index: number) => {
      vNode.push(
        <Row gutter={16} key={index}>
          {item.map((i: Instance.Project) => (
            <Col span={6} className={styles.gutter_box} key={i.projectId}>
              <ProJectCard
                proJect={i}
                currentProject={currentProject}
                clickProjectChange={(itemInfo: any, flag: boolean) =>
                  this.clickProjectChange(itemInfo, flag)
                }
              />
            </Col>
          ))}
        </Row>,
      );

      // @ts-ignore
      const flag = item.find((i: Instance.Project) => currentProject?.projectId === i.projectId);
      if (flag) vNode.push(this.createdSonProjectTable());
    });
    return (
      <div className={styles.view}>
        <div className={`${styles.content} scrollFlag`}>{vNode}</div>
        <div className={styles.page}>
          <Pagination
            defaultCurrent={1}
            pageSize={pageSize}
            current={pageNum}
            total={count}
            onChange={(page, pageSize) => this.pageChange(page, pageSize)}
          />
        </div>
      </div>
    );
  }
}
