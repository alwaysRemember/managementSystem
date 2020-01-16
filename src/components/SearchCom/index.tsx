import React from 'react';
import { Button } from 'antd';

import { setClassName } from '@/utils';
import TSpin from '../TSpin';
import SearchItem from '../SearchItem';

import { ISearchCom, ISearchComButton } from './interface';
import { ISearchItem } from '../SearchItem/interface';

import styles from './index.less';

/**
 * 公共操作栏
 * @param param0
 */
const SearchCom = ({ searchList, isLoading, rows, searchButtonList }: ISearchCom) => {
  return (
    <div className={styles.searchWrapper}>
      <TSpin isLoading={isLoading} rows={rows}>
        <div className={styles.searchContainer}>
          {/* 遍历操作框项 */}
          {searchList.map((item: ISearchItem, index: number) => (
            <div
              className={setClassName([
                styles.searchItem,
                item.type === 'checkBox' ? styles.searchItemCheckBox : '',
              ])}
              key={index}
            >
              <span className={styles.searchItemLabel}>{item.label}</span>
              <div className={styles.searchItemVal}>
                <SearchItem {...item} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.searchSearchBtn}>
          {searchButtonList.map(
            ({ icon, type, loading, onClick, children }: ISearchComButton, index: number) => (
              <Button icon={icon} type={type} loading={loading} onClick={onClick} key={index}>
                {children}
              </Button>
            ),
          )}
        </div>
      </TSpin>
    </div>
  );
};

export default SearchCom;
