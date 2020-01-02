import React, { useState, useEffect } from 'react';
import { Input, Icon, Button } from 'antd';
import { login } from '../../api';

import styles from './index.less';
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true); // 是否可点击
  const [inputDisabled, setInputDisabled] = useState(false); // 是否可输入
  const [btnLoading, setBtnLoading] = useState(false); // 是否loading状态

  useEffect(() => {
    // 判断用户名密码是否符合要求
    if (userName && password && password.length > 5) {
      btnDisabled && setBtnDisabled(false);
    } else {
      !btnDisabled && setBtnDisabled(true);
    }
  }, [userName, password]);

  const btnClick = () => {
    setBtnLoading(true);
    setInputDisabled(true);
    login({ password, userName }).then((res: any) => {
      // TODO 进行登录后操作
    });
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <h1>xxx管理系统</h1>
        <ul className={styles.inputWrapper}>
          <li>
            <Input
              disabled={inputDisabled}
              value={userName}
              allowClear={true}
              addonBefore={<Icon type="user" />}
              className={styles.inputItem}
              placeholder="请输入用户名"
              onChange={e => setUserName(e.target.value)}
            />
          </li>
          <li>
            <Input.Password
              disabled={inputDisabled}
              allowClear={true}
              value={password}
              addonBefore={<Icon type="unlock" theme="filled" />}
              className={styles.inputItem}
              placeholder="请输入密码"
              onChange={e => setPassword(e.target.value)}
            />
          </li>
        </ul>
        <p className={styles.msg}>请输入至少6位密码!</p>

        <Button
          type="primary"
          loading={btnLoading}
          disabled={btnDisabled}
          className={styles.loginBtn}
          onClick={btnClick}
        >
          登录
        </Button>
      </div>
    </div>
  );
};

export default Login;
