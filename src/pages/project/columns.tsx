import React from 'react';
import moment from 'moment';
export const sonProjectColumns = () => {
  return [
    {
      title: '子项目编码',
      dataIndex: 'projectNum',
      key: 'projectNum',
    },
    {
      title: '子项目名称',
      dataIndex: 'sonProjectName',
      key: 'sonProjectName',
    },
    {
      title: '开始日期',
      dataIndex: 'sonProjectStartTime',
      key: 'sonProjectStartTime',
      render: (time: Date) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '结束日期',
      dataIndex: 'sonProjectEndTime',
      key: 'sonProjectEndTime',
      render: (time: Date) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '项目状态',
      dataIndex: 'sonProjectState',
      key: 'sonProjectState',
    },
    {
      title: '描述',
      dataIndex: 'sonProjectPs',
      key: 'sonProjectPs',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <>
          <a>编辑</a>
          <a>删除</a>
        </>
      ),
    },
  ];
};
