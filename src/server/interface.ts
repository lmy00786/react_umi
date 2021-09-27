import axios from '../utils/axios';
import { PramasType } from '../types/typing.pramas.d';
export const reqProjectList = (params: PramasType.ProjectList) =>
  axios.post('v1/project/list', params);
export const reqSonProjectList = (id: string) => axios.get(`v1/soProject/list?id=${id}`);
