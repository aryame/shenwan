import React, { useState } from 'react';
import { Checkbox, Form, Input, Col, Row, message } from 'antd';
import './index.css';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemeber] = useState(true)
    const navigate = useNavigate()
    const submit = () => {
        if (username && password) {
            login('/login', {username, password})
            .then(res => {
                if (res.code === '200') {
                    localStorage.setItem('active', 1)
                    if (remember) {
                        localStorage.setItem('userName', username)
                        localStorage.setItem('password', "******") // 加密
                    } else {
                        localStorage.setItem('userName', '')
                        localStorage.setItem('password', "")
                    }
                    if (username === 'admin') {
                        navigate('/userInfo')
                      } else {
                        navigate('/operation')
                      }
                }
            })
            .catch((error) => {
                console.log(error);
                message.error(error);
            });
        }
        
    };

    return (
        <div className='login'>
            <h2>欢迎登录</h2>
            <Form>
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input placeholder="账号" value={username}  onChange={(e) => setUsername(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Checkbox style={{ float: 'left'}} checked={remember} onChange={(e) => setRemeber(e.target.checked)}>记住账号和密码</Checkbox>
                </Form.Item>
                <Row >
                    <Col span={4}>
                        <Form.Item name="forget">
                            <a>忘记密码</a>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={8}>
                        <Form.Item name="logon">
                            <a>立即注册</a>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <button onClick={submit} className="loginBtn">
                        登录
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};
  
export default Login;