import { reqProjectList } from './interface';
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
            projectName_ps: '百威迁移项目',
            projectNum: `0${params.pageNum}0${i + 1}`,
            projectType: '迁云',
            projectDepartment: '云化技术与架构',
            projectPrincipal: `刘${i + 1}`,
            projectChildLength: `10${+i}`,
          });
        }
        intetface_res = {
          code:'0000',
          count: parseInt(Math.random() * 120 + ''),
          data: arr,
        };
        intetface_res?.code === '0000'? resolve(intetface_res):reject(intetface_res)
      })
      .catch((e:any) => reject(e));
  });
};
