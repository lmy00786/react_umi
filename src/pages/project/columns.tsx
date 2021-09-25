import React from 'react';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
export const sonProjectColumns = () => {
  return [
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
      render: () => (
        <>
          <a style={{ marginRight: 8 }}>
            <EditOutlined />
            编辑
          </a>
          <a>
            {' '}
            <DeleteOutlined />
            删除
          </a>
        </>
      ),
    },
  ];
};
