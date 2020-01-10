export default {
  operationList: [
    {
      icon: 'icon-huabanfuben',
      color: '#ed6a68',
      list: [
        {
          title: '代发货订单',
          num: 5,
        },
        {
          title: '售后订单',
          num: 0,
        },
        {
          title: '本月成交订单',
          num: 1,
          msg: '上月：0',
        },
      ],
    },
    {
      icon: 'icon-tongji',
      color: '#ed6a68',
      list: [
        {
          title: '今日营业额',
          num: 0,
          msg: '昨日：0',
        },
        {
          title: '今日支付订单',
          num: 2,
          msg: '昨日：0',
        },
        {
          title: '支付人数',
          num: 0,
          msg: '昨日：0',
        },
      ],
    },
    {
      icon: 'icon-yonghufangkeshu',
      color: '#5089f6',
      list: [
        {
          title: '新增分销商',
          num: 0,
          msg: '昨日：0',
        },
        {
          title: '待审核分销商',
          num: 4,
        },
        {
          title: '总分销商',
          num: 0,
        },
      ],
    },
    {
      icon: 'icon-qianbao',
      color: '#5089f6',
      list: [
        {
          title: '待处理会员提现',
          num: 0,
        },
        {
          title: '待处理佣金提现',
          num: 7,
        },
        {
          title: '本月提现佣金',
          num: 0,
          msg: '上月：0',
        },
      ],
    },
    {
      icon: 'icon-huiyuan',
      color: '#61b174',
      list: [
        {
          title: '新增会员',
          num: 8,
          msg: '昨日：0',
        },
        {
          title: '今日活跃用户',
          num: 0,
          msg: '昨日：0',
        },
        {
          title: '总会员数',
          num: 0,
        },
      ],
    },
    {
      icon: 'icon-shangpin',
      color: '#61b174',
      list: [
        {
          title: '出售中商品',
          num: 0,
        },
        {
          title: '仓库中商品',
          num: 0,
        },
        {
          title: '库存预警',
          num: 0,
        },
      ],
    },
  ],
  lineEchart: {
    itemList: ['订单量', '付款订单', '售后订单'],
    dateList: [
      '2019/01/01',
      '2019/01/02',
      '2019/01/03',
      '2019/01/04',
      '2019/01/05',
      '2019/01/06',
      '2019/01/07',
    ],
    dataList: [
      {
        label: '订单量',
        value: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        label: '付款订单',
        value: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        label: '售后订单',
        value: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  },
  transformationEchart: {
    itemList: ['访客人数', '下单买家数', '支付买家数'],
    dataList: [
      { value: 60, label: '访客人数' },
      { value: 40, label: '下单买家数' },
      { value: 20, label: '支付买家数' },
    ],
  },
};
