import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import ProJectCard from '../../components/proJect-card';
import styles from './projectList.css';
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
  getData() {
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
  componentDidMount() {
    this.getData();
  }
  render() {
    let card = this.state.data.map((item: any) => (
      <Col span={6} className={styles.gutter_box} key={item.projectId}>
        <ProJectCard proJect={item} />
      </Col>
    ));
    return <Row gutter={16}>{card}</Row>;
  }
}
