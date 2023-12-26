import React, { useState } from "react";
// import {Button,Space, Input, Select, Form} from 'antd';
import "./login.css";
import { Form, Input, Button, Space, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loginError, setErrorAlert] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null >(null);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    if (values?.username && values?.password) {
      setLoginSuccess('Log in Successful');
      sessionStorage.setItem('username',JSON.stringify(values?.username));
      setTimeout(()=>{
        navigate("/my-profile");

      },2000);
    } else {
      setErrorAlert("Something went wrong");
      setTimeout (() => {
        setErrorAlert(null);
      },2000);
    }
    // console.log(form);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    console.log(form?.getFieldError("username"));
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
        <Form style={{ width: "400px" }} onFinish={onFinish} form={form}>
          <Form.Item label="Username" name="username">
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
                  }
                >
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
