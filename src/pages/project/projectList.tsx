import React, { Component } from 'react';
import { Row, Col, message, Pagination, Table, Tooltip } from 'antd';
import ProJectCard from '../../components/proJect-card';
import styles from './projectList.less';
import { getProjectList, getSonProjectList } from '../../server';
import { arrTrans, scrollTopDOM } from '../../utils/utils'; // 首先第一步引入地址必须要对（有分别暴露 和默认暴露 我用的时候分别暴露 ）如果是这里form左边红说明是暴露的问题  右边飘红的话是引用地址有问题  检出不出来明天截图给我
import { Instance } from '../../types/typing.Instance';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddPie from '@/components/add-pie';
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
    //这是标准时间  需要进行转换所以使用了moment第三方包(后端直接给你字符串的话不需要转)
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

  // 获取子组件区域DOM用于计算添加按钮的高度
  private sonProjectRef: any = null;

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
    // 控制显示添加子项目
    isShowAddSonProject: false,
    // 添加按钮展示的位置初始值
    calcHeight: 12,
  };

  // 获取列表数据
  private getData() {
    //清空子项目数据（目的:不能让之前的子项目数据遗留）
    this.setState({ currentProject: {}, sonProjectData: [] });
    // 列表滚动顶部
    scrollTopDOM('scrollFlag');

    // 获取数据需要的参数 将参数传给接口方法
    const { name, pageSize, pageNum, id } = this.state;
    getProjectList({ name, pageSize, pageNum, id })
      .then((intetface_res: any) => {
        // 接收的数据进行结构构
        let { data, count } = intetface_res;
        // 将数组转为二维数组每4项一组
        if (data && data[0]) data = arrTrans(4, data);
        // 将二维数组存储进去（这时候调用rander方法渲染）
        this.setState({ data, count });
      })
      .catch((e: any) => {
        // 抛出错误
        message.error(e.message);
        //有错是清空数据
        this.setState({ data: [], count: 0 });
      });
  }

  // 获取子项目数据(num:实际调接口中用不到) getSonProjectList两个命名一样 但是①一个自己class类中额方法 ②一个是尾部传进来的方法
  private getSonProjectList(projectId: string, num: number) {
    getSonProjectList(projectId, num)
      .then((intetface_res: any) => {
        this.setState({ sonProjectData: intetface_res.data }, () => {
          // sonProjectRef table这个组件的ref
          if (this.sonProjectRef) {
            let height = this.sonProjectRef.offsetHeight;
            // 如果table的高度过高取一般设置为水平垂直居中位置 不够高放在最下边居中位置
            this.setState({ calcHeight: height > 450 ? height * 0.5 : 12 });
          } else {
            // 为空时候也放在最下边
            this.setState({ calcHeight: 12 });
          }
        });
      })
      .catch((e: any) => {
        message.error(e.message);
        this.setState({ sonProjectData: [] });
      });
  }

  // 页数发生改变
  private pageChange = (pageNum: number, pageSize: any) => {
    // 将值更更新到state中存储用于调接口时候用
    this.setState({ pageNum });
    // 接着调获取项目caed的数据接口
    this.getData();
  };

  // 点击某一个card
  private clickProjectChange = (flag: boolean, currentProject?: any) => {
    // flag为false直接清空table中的数据 true时候进行调接口
    if (flag) {
      const { projectId, sonProjectCount } = currentProject;

      // @ts-ignore 如果ID相同时候关闭子项目table进行清空
      if (projectId === this.state.currentProject.projectId) {
        this.setState({ currentProject: {}, sonProjectData: [] });
        return false;
      }
      // 先清空一次数据为了出动画 如果后去去除动画这条没用
      this.setState({ currentProject, sonProjectData: [] });
      // 拿到父项目id取调接口（sonProjectCount这个值调后端接口时候没有用我写只是模拟数据再页面真实一点）
      this.getSonProjectList(projectId, sonProjectCount);
    } else {
      this.setState({ currentProject: {}, sonProjectData: [] });
    }
  };

  // 子项目编辑（没有写逻辑没有原型图）
  private sonProjectEditChange = (record: any) => {
    console.log(record, '子项目编辑');
  };

  // 子项目删除（没技术含量没写 给个二次提示弹框就好了 调接口也按照调用server中的方法 再server中再这是一个调用接口地址的方法）
  private sonProjectDelChange = (record: any) => {
    console.log(record, '子项目删除');
  };

  // 点击添加子项目按钮时候方法
  private addSonProjectModelChange() {
    this.setState(
      (state: any) => ({ isShowAddSonProject: !state.isShowAddSonProject }),
      () => {
        console.log(this.state.isShowAddSonProject ? '添加弹框展示' : '添加弹框隐藏');
      },
    );
  }

  // 创建子项目列表
  private createdSonProjectTable() {
    // 展示得数据
    const { sonProjectData, calcHeight } = this.state;

    return (
      // 展示隐藏通过此类名做动画fadenum（不想要直接删掉）
      <div
        className={`${styles.fadenum} ${styles.sonProject_table}`}
        key="table"
        ref={e => (this.sonProjectRef = e)}
      >
        <Table
          // 这些都是传给antd Table 属性
          columns={this.sonProjectColumns}
          dataSource={sonProjectData}
          key={'project'}
          rowKey={(record: any) => record.sonProjectId}
          pagination={false}
          className={styles.sonProject_table}
        />
        {/* calcHeight是设置table多时候的控制添加按钮悬浮的 */}
        <div className={styles.addSonProject} style={{ bottom: calcHeight }}>
          {/* 这个是添加的按钮 */}
          <Tooltip placement="top" title="添加">
            <AddPie onClick={() => this.addSonProjectModelChange()} />
          </Tooltip>
        </div>
      </div>
    );
  }

  // 第一次获取数据 执行componentDidMount调用接口
  componentDidMount() {
    // 初始化请求一次
    this.getData();
  }

  // 你说你不懂的地方你在看嘛？？？
  render() {
    // 数据从state结构
    const { pageSize, pageNum, count, currentProject, sonProjectData } = this.state;

    // 将要渲染得虚拟节点
    let vNode: any[] = [];

    // 遍历项目列表
    this.state.data.map((item: any[], index: number) => {
      vNode.push(
        // 这给你讲过了就不写了
        <Row gutter={16} key={index}>
          {item.map((i: Instance.Project) => (
            <Col span={6} className={styles.gutter_box} key={i.projectId}>
              {/* ProJectCard并不是antd中的组件 是自己写的注意上边的引用 */}
              <ProJectCard
                proJect={i}
                currentProject={currentProject}
                // 组件传值将方法传给子组件 让子组件执行方法
                clickProjectChange={(itemInfo: any, flag: boolean) =>
                  this.clickProjectChange(itemInfo, flag)
                }
              />
            </Col>
          ))}
        </Row>,
      );

      // @ts-ignore  重点：渲染子项目的table列表的地方 如果点击的card id和 当前一行中其中一个caed的id相同时候往vnode中push这个table也就是下面调用的createdSonProjectTable方法
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
