import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Button, Input, Form } from "antd";

const SignupForm = () => {

  const [addUser] = useMutation(ADD_USER)
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async () => {

    try {

      const { data } = await addUser({
        variables: { ...userFormData },

      });

      console.log(data.addUser.user);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
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
<div>Signup</div>
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
        value={userFormData.email}
        label="Email"

        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >

        <Input name="email" />
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

export default SignupForm;
