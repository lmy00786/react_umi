import React, { Component } from 'react';
import { Row, Col, message, Pagination } from 'antd';
import ProJectCard from '../../components/proJect-card';
import styles from './projectList.less';
import { getProjectList } from '../../server';
export default class project extends Component {
  state = {
    data: [],
    count: 0,
    name: '', // 模糊匹配名称
    pageSize: 12, // 条数
    pageNum: 1, // 页数
    id: '', // 子项目id必传
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

  // 页数发生改变
  private pageChange = (pageNum: number, pageSize: any) => {
    this.setState({ pageNum });
    this.getData();
  };

  componentDidMount() {
    // 初始化请求一次
    this.getData();
  }

  render() {
    let card = this.state.data.map((item: any) => (
      <Col span={6} className={styles.gutter_box} key={item.projectId}>
        <ProJectCard proJect={item} />
      </Col>
    ));

    const { pageSize, pageNum, count } = this.state;

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
