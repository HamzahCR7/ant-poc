import React, { useState } from "react";
// import {Button,Space, Input, Select, Form} from 'antd';
import "./login.css";
import { Form, Input, Button, Space, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserApi from './services/userApi';
import axios from "axios";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loginError, setErrorAlert] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  // const { data, loading, error, makePostRequest } = UserApi();
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      // Example of a POST request
      const requestBody = { useremail: values?.useremail, userpass: values?.password };
      // let response = await makePostRequest('authenticate', requestBody);
      // console.log("result ",data)
      const response: any = await axios.post(`http://localhost:4000/api/authenticate`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      console.log('data', response?.data);
      if (response?.data) {
        setLoginSuccess('Log in Successful');
        sessionStorage.setItem('useremail', (values?.useremail));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      // console.error('Error:', error.message);

      // Handle errors as needed
      setErrorAlert("Something went wrong");
      setTimeout(() => {
        setErrorAlert(null);
      }, 2000);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    console.log(form?.getFieldError("useremail"));
  };

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* {errorALert && <div style={{ color: 'red' }}>{errorALert}</div>} */}
        {loginError && (
          <Alert
            message="Error"
            description={loginError}
            type="error"
            showIcon
            closable
            onClose={() => setErrorAlert(null)}
          />
        )}
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* {errorALert && <div style={{ color: 'red' }}>{errorALert}</div>} */}
        {loginSuccess && (
          <Alert
            message="Success"
            description={loginSuccess}
            type="success"
            showIcon
            closable
            onClose={() => setErrorAlert(null)}
          />
        )}
      </Space>
      <div className="login-page">
        <Space className="user">
        <UserOutlined className="user-icon" />

        </Space>
        <Form style={{ width: "400px" }} onFinish={onFinish} form={form}>
          <Form.Item label="User Email" name="useremail">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    form.isFieldsTouched() &&
                    form
                      ?.getFieldsError()
                      .some((field) => field.errors.length > 0)
                  }>
                  Submit
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
