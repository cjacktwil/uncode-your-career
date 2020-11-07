
import React, { useState } from 'react';
import { Button, Input, Form } from "antd";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';



const LoginForm = () => {
  const [login] = useMutation(LOGIN_USER)
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });


      console.log(data.login.user);
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
<>
Login
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={handleFormSubmit}
      onFinishFailed={onFinishFailed}

    >

      <Form.Item
        onChange={handleInputChange}
        value={userFormData.username}
        label="Username"

        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >

        <Input name="username" />
      </Form.Item>

      <Form.Item onChange={handleInputChange}
        value={userFormData.password}
        label="Password"

        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name="password" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
</>

  );
};

export default LoginForm;
