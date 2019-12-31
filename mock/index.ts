/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:44:12
 * @LastEditTime : 2019-12-31 18:01:30
 * @FilePath: /managementSystem/mock/index.ts
 */
export default {
  'POST /api/login': (req: any, res: any) => {
    res.json({
      code: 0,
      data: { ...req.body, sessionid: '12312312312312312' },
      message: '成功',
    });
  },
};
