import { reqProjectList, reqSonProjectList } from './interface';
import { PramasType } from '../types/typing.pramas.d';
import { nanoid } from 'nanoid';
// 获取项目列表
export const getProjectList = function(params: PramasType.ProjectList) {
  return new Promise((resolve, reject) => {
    reqProjectList(params)
      .then((intetface_res: any) => {
        let arr = [];
        for (let i = 0; i < params.pageSize; i++) {
          arr.push({
            projectId: nanoid(),
            projectName: `迁移阿里云${i + 1}`,
            projectNamePs: '百威迁移项目',
            projectNum: `0${params.pageNum}0${i + 1}`,
            projectType: '迁云',
            projectDepartment: '云化技术与架构',
            projectPrincipal: `刘${params.pageNum}_${i + 1}`,
            sonProjectCount: Math.floor(Math.random() * (8 - 2 + 1) + 2),
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
export const getSonProjectList = function(projectId: string, num: number) {
  return new Promise((resolve, reject) => {
    reqSonProjectList(projectId)
      .then((intetface_res: any) => {
        let arr = [];
        for (let i = 0; i < num; i++) {
          arr.push({
            sonProjectId: nanoid(),
            sonProjectName: `子名称${i}`,
            projectNum: `S00${i + 1}`,
            sonProjectStartTime: new Date(),
            sonProjectEndTime: new Date(),
            sonProjectState: parseInt(Math.random() * 100 + '') % 2 === 0 ? '启用' : '停用',
            sonProjectPs: `子项目描述${nanoid()}`,
          });
        }
        intetface_res = {
          code: '0000',
          count: num,
          data: arr,
        };
        intetface_res?.code === '0000' ? resolve(intetface_res) : reject(intetface_res);
      })
      .catch((e: any) => reject(e));
  });
};
