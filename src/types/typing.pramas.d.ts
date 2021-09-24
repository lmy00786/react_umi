export declare namespace PramasType {
  interface ProjectList {
    name: string | undefined; // 模糊匹配名称
    pageSize: number; // 条数
    pageNum: number; // 页数
    id?: string | undefined; // 子项目id必传
  }
}
