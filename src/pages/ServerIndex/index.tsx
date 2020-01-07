import React, { useEffect, useState, useRef, RefObject } from 'react';
import echarts, { EChartOption } from 'echarts';
import { updateUser } from '@/actions';
import ModalTitle from '../../components/ModalTitle';
import { IData, IOperation, IOperationItemTagList, IQuickEntry } from './interface';

import styles from './index.less';

/**
 * 运营概况列表项
 * @param param0
 */
const OperationListItem = ({ data }: { data: IOperation }) => {
  const { color, icon, list } = data;
  return (
    <div className={styles.operationListItem}>
      <div className={styles.iconWrapper}>
        <i className={`iconfont ${icon}`} style={{ color }} />
      </div>
      <div className={styles.tagList}>
        {list.map(({ title, num, msg }: IOperationItemTagList, index: number) => (
          <div key={index} className={styles.tagItem}>
            <span className={styles.tagTitle}>{title}</span>
            <span className={styles.tagNum} style={{ color }}>
              {num}
            </span>
            <span className={styles.tagMsg}>{msg || ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 快速入口列表项
 * @param param0
 */
const QuickENtryListItem = ({ data }: { data: IQuickEntry }) => {
  return (
    <div className={styles.quickEntryListItem}>
      <div className={styles.itemCon}>
        <i className={`iconfont ${data.icon}`} style={{ color: data.color }} />
        <span className={styles.title}>{data.title}</span>
      </div>
    </div>
  );
};

/**
 * 后台主页
 * @param props
 */
const ServerIndex = (props: any) => {
  const lineChart = useRef<HTMLDivElement>(null);
  const transformationChart = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<IData>({
    operationList: [
      {
        icon: 'icon-huabanfuben',
        color: '#ed6a68',
        list: [
          {
            title: '代发货订单',
            num: 0,
          },
          {
            title: '售后订单',
            num: 0,
          },
          {
            title: '本月成交订单',
            num: 0,
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
            num: 0,
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
            num: 0,
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
            num: 0,
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
            num: 0,
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
  });

  // 快速入口
  const [quickEntry] = useState<Array<IQuickEntry>>([
    {
      title: '发布商品',
      url: '',
      icon: 'icon-fabu',
      color: '#f5c661',
    },
    {
      title: '订单管理',
      url: '',
      icon: 'icon-huabanfuben',
      color: '#6657ec',
    },
    {
      title: '订单分析',
      url: '',
      icon: 'icon-shujufenxi',
      color: '#ed9657',
    },
    {
      title: '优惠券',
      url: '',
      icon: 'icon-youhuiquan',
      color: '#ed6765',
    },
  ]);

  useEffect(() => {
    const transformationOption: EChartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%',
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      legend: {
        data: ['访客人数', '下单买家数', '支付买家数'],
      },

      series: [
        {
          name: '转化图',
          type: 'funnel',
          left: '0',
          top: 40,
          bottom: 0,
          width: '100%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'top',
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: [
            { value: 60, name: '访客人数' },
            { value: 40, name: '下单买家数' },
            { value: 20, name: '支付买家数' },
          ],
        },
      ],
    };
    if (transformationChart.current) {
      const transformation = echarts.init(transformationChart.current);
      transformation.setOption(transformationOption);
    }
  }, []);

  const { operationList } = data;

  return (
    <div className={styles.serverIndexWrapper}>
      {/* 左侧数据概览 */}
      <div className={styles.serverLeftContainer}>
        {/* 运营概况 */}
        <div className={styles.serverOperationalCon}>
          <ModalTitle title="运营概况" />
          <div className={styles.serverOperationalList}>
            {operationList.map((item: IOperation, index: number) => (
              <OperationListItem data={item} key={index} />
            ))}
          </div>
        </div>

        {/* 快捷入口 */}
        <div className={styles.serverQuickEntry}>
          <ModalTitle title="快速入口" />
          <div className={styles.serverQuickList}>
            {quickEntry.map((item: IQuickEntry, index: number) => (
              <QuickENtryListItem key={index} data={item} />
            ))}
          </div>
        </div>

        {/* 订单情况 */}
        <div className={styles.orderOverview}>
          <div className={styles.orderLineChart}>
            <ModalTitle title="订单概况" />
            <div className={styles.lineChart} ref={lineChart} />
          </div>
          <div className={styles.transformationOverview}>
            <ModalTitle title="转化概况" />
            <div className={styles.transformationChart} ref={transformationChart} />
          </div>
        </div>
      </div>

      {/* 右侧公告 */}
      <div className={styles.serverRightAside} />
    </div>
  );
};

export default ServerIndex;
