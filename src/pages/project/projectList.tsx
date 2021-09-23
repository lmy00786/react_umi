import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { nanoid } from 'nanoid';
import ProJectCard from '../../components/proJect-card';
import styles from './projectList.css';

export default class project extends Component {
  state = {
    data: [],
    count: 0,
  };
  componentDidMount() {
    this.getData();
  }
  getData() {
    let intetface_res = {
      count: 10,
      data: [
        {
          projectId: nanoid(),
          projectName: '迁移阿里云1',
          projectName_ps: '百威迁移项目',
          projectNum: '00001',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云2',
          projectName_ps: '百威迁移项目',
          projectNum: '00002',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云3',
          projectName_ps: '百威迁移项目',
          projectNum: '00003',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云4',
          projectName_ps: '百威迁移项目',
          projectNum: '00004',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云5',
          projectName_ps: '百威迁移项目',
          projectNum: '00005',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云6',
          projectName_ps: '百威迁移项目',
          projectNum: '00006',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云7',
          projectName_ps: '百威迁移项目',
          projectNum: '00007',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云8',
          projectName_ps: '百威迁移项目',
          projectNum: '00008',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云9',
          projectName_ps: '百威迁移项目',
          projectNum: '00009',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
        {
          projectId: nanoid(),
          projectName: '迁移阿里云10',
          projectName_ps: '百威迁移项目',
          projectNum: '000010',
          projectType: '迁云',
          projectDepartment: '云化技术与架构',
          projectPrincipal: '刘',
          projectChildLength: '10',
        },
      ],
    };
    const { data, count } = intetface_res;
    this.setState({ data, count });
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
