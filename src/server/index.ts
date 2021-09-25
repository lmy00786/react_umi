import { reqProjectList, reqSonProjectList } from './interface';
import { PramasType } from '../types/typing.pramas.d';
import { nanoid } from 'nanoid';
// 获取项目列表
export const getProjectList = function(params: PramasType.ProjectList) {
  return new Promise((resolve, reject) => {
    reqProjectList(params)
      .then((intetface_res: any) => {
        let arr = [];
        for (let i = 0; i < 24; i++) {
          arr.push({
            projectId: nanoid(),
            projectName: `迁移阿里云${i + 1}`,
            projectNamePs: '百威迁移项目',
            projectNum: `0${params.pageNum}0${i + 1}`,
            projectType: '迁云',
            projectDepartment: '云化技术与架构',
            projectPrincipal: `刘${params.pageNum}_${i + 1}`,
            sonProjectCount: parseInt(Math.random() * 200 + ''),
          });
        }
        intetface_res = {
          code: '0000',
          count: 120,
          data: arr,
        };
        intetface_res?.code === '0000' ? resolve(intetface_res) : reject(intetface_res);
      })
      .catch((e: any) => reject(e));
  });
};
// 获取子项目没有设置分页直接传入id（后期有分页需求自己修改）
export const getSonProjectList = function(projectId: string) {
  return new Promise((resolve, reject) => {
    reqSonProjectList(projectId)
      .then((intetface_res: any) => {
        let arr = [],
          j = Math.floor(Math.random() * (8 - 5 + 1) + 5);
        for (let i = 0; i < j; i++) {
          arr.push({
            sonProjectId: nanoid(),
            sonProjectName: `子名称${i}`,
            projectNum: `S00${i + 1}`,
            sonProjectStartTime: new Date(),
            sonProjectEndTime: new Date(),
            sonProjectState: '启用',
            sonProjectPs: `子项目描述${nanoid()}`,
          });
        }
        intetface_res = {
          code: '0000',
          count: j,
          data: arr,
        };
        intetface_res?.code === '0000' ? resolve(intetface_res) : reject(intetface_res);
      })
      .catch((e: any) => reject(e));
  });
};
