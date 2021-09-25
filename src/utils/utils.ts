import _ from 'lodash';
// 一维数组转换为二维数组
export const arrTrans = (num: number, arr: any[]) => {
  const newArr: any[] = []; // 声明数组
  let cloneArr = _.cloneDeep(arr);
  arr.forEach((item, index) => {
    const page = Math.floor(index / num); // 计算该元素为第几个素组内
    if (!newArr[page]) {
      // 判断是否存在
      newArr[page] = [];
    }
    newArr[page].push(item);
  });
  return newArr;
};
// 滚动到顶部
export const scrollTopDOM = function scrollTopDOM(className: string) {
  var dom = window.document.getElementsByClassName(className)[0];
  dom ? (dom.scrollTop = 0) : null;
};
