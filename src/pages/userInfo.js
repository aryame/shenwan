import React from 'react';
import { Form } from 'antd';
import useUserInfo from './hooks'
import './index.css'; 

function UserInfo() {
    const userName = localStorage.getItem('userName')
    const [info] = useUserInfo(userName)
    return (
      <div>
        <div className='userinfo'>
            <Form>
                <Form.Item label="用户名">
                   {info.userName} 
                </Form.Item>
                <Form.Item label="邮箱">
                   {info.email} 
                </Form.Item>
                <Form.Item label="手机号">
                   {info?.phone?.phoneNumber}
                   <a className='phoneVerified'>{!info?.phone?.isVerified && '未验证'}</a>
                </Form.Item>
                <Form.Item label="密码：">
                   <a>修改密码</a>
                </Form.Item>
            </Form>
        </div>
      </div>
    );
  }
  
  export default UserInfo;