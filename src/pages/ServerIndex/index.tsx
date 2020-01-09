import React, { useEffect, useState, useRef, RefObject } from 'react';
import echarts, { EChartOption } from 'echarts';
import ModalTitle from '../../components/ModalTitle';
import TSpin from '../../components/TSpin';
import { IData, IOperation, IOperationItemTagList, IQuickEntry, IContactUs } from './interface';

import styles from './index.less';
import { getServerIndexData } from '@/api';

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
    operationList: [],
    lineEchart: {
      itemList: [],
      dateList: [],
      dataList: [],
    },
    transformationEchart: {
      itemList: [],
      dataList: [],
    },
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

  // 联系我们
  const [contactUs] = useState<Array<IContactUs>>([
    {
      title: '电话客服',
      subTitle: '400-123-1234',
      icon: 'icon-dianhua',
      color: '#5089f6',
    },
    {
      title: '邮箱联系',
      subTitle: '740905172@qq.com',
      icon: 'icon-youxiang',
      color: '#61b174',
    },
  ]);

  /* 图表处理 */
  useEffect(() => {
    const { lineEchart, transformationEchart } = data;

    if (transformationChart.current) {
      const { dataList, itemList } = transformationEchart;
      // 转化情况图表数据
      const transformationOption: EChartOption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          data: itemList,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
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
            label: {
              show: true,
              position: 'top',
            },
            data: (() => dataList.map(({ value, label }) => ({ value, name: label })))(),
          },
        ],
      };

      const transformation = echarts.init(transformationChart.current);
      transformation.setOption(transformationOption);
    }

    if (lineChart.current) {
      const { dataList, dateList, itemList } = lineEchart;
      // 订单情况图表数据
      const lineOption: EChartOption = {
        title: {
          subtext: '近七日订单走势',
          subtextStyle: {
            lineHeight: 30,
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: itemList,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dateList,
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: (() =>
          dataList.map(item => ({
            name: item.label,
            type: 'line',
            stack: '总量',
            data: item.value,
          })))(),
      };
      const line = echarts.init(lineChart.current);
      line.setOption(lineOption);
    }
  }, [data]);

  useEffect(() => {
    getData();
    return () => window.cancelRequestFn && window.cancelRequestFn();
  }, []);

  const getData = async () => {
    const data = await getServerIndexData();
    setData(data);
  };

  const { operationList } = data;

  return (
    <div className={styles.serverIndexWrapper}>
      {/* 左侧数据概览 */}
      <div className={styles.serverLeftContainer}>
        {/* 运营概况 */}
        <div className={styles.serverOperationalCon}>
          <ModalTitle title="运营概况" />
          <TSpin isLoading={!Boolean(data.operationList.length)}>
            <div className={styles.serverOperationalList}>
              {operationList.map((item: IOperation, index: number) => (
                <OperationListItem data={item} key={index} />
              ))}
            </div>
          </TSpin>
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
            <TSpin isLoading={!Boolean(data.operationList.length)}>
              <div className={styles.lineChart} ref={lineChart} />
            </TSpin>
          </div>
          <div className={styles.transformationOverview}>
            <ModalTitle title="转化概况" />
            <TSpin isLoading={!Boolean(data.operationList.length)}>
              <div className={styles.transformationChart} ref={transformationChart} />
            </TSpin>
          </div>
        </div>
      </div>

      {/* 右侧公告 */}
      <div className={styles.serverRightAside}>
        {/* 联系我们 */}
        <div className={styles.contactUs}>
          {contactUs.map((item: IContactUs, index: number) => (
            <div className={styles.contactUsItem} key={index}>
              <i className={`iconfont ${item.icon}`} />
              <div className={styles.contactUsItemInfo}>
                <h1 className={styles.contactUsItemTitle}>{item.title}</h1>
                <p className={styles.contactUsItemSubTitle}>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerIndex;
