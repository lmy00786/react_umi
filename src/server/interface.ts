import axios from '../utils/axios';
import { PramasType } from '../types/typing.pramas.d';
// 这里是专门写地址的
export const reqProjectList = (params: PramasType.ProjectList) =>
  axios.post('v1/project/list', params); //（v1/project/list这个树后端提供）
export const reqSonProjectList = (id: string) => axios.get(`v1/soProject/list?id=${id}`);
