/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-30 17:01:58
 * @LastEditTime : 2019-12-30 18:59:29
 * @FilePath: /weChatSalesSystem/src/app.ts
 */
export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

export function modifyRouteProps(props: any, { route }: any): void {
  const {title} = route;
  // 设置title
  document.title = title||"后台管理系统";
  return { ...props };
}
