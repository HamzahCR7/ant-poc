import React, { useState } from "react";
import './register.css';
import { Form, Input, Button, Space, Alert } from "antd";
import RegisterUser from "./modal/Register";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [form] = Form.useForm();
    const [passwordErr, setPassErr] = useState<any>('');
    const [emailErr, setEmailErr] = useState(false);
    const [registerError, setErrorAlert] = useState<string | null>(null);
  const [registerSuccess, setregisterSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        let hasEmailError = false;
        let hasPassError = false;
        if (values?.userpassword.toLowerCase() !== values?.confirmPassword.toLowerCase()) {
            setPassErr('Both Passwords are not the same');
            form.setFields([{name: 'confirmPassword',errors:['Both Passwords are not the same']}]);
            hasPassError = true;
        } else {
            setPassErr('');
            hasPassError = false;
        }

        if (!values?.useremail) {
            setEmailErr(true);
            hasEmailError = true;
        } else {
            setEmailErr(false);
            hasEmailError = false;
        }
        console.log(values);
        if(!hasEmailError && !hasPassError){
            sendData(values);
        }
    }

    const sendData = async(values: RegisterUser)=> {
        let {useremail, userpassword} = values;
        let payload = {
            useremail, userpass:userpassword
        };
        try{
            const response = await axios.post('http://localhost:4000/api/user-login',payload,
            {
                headers: {
                  'Content-Type': 'application/json',
                }
            });
            console.log(response);
            if(response?.status == 200) {
                setregisterSuccess('Registertion Successful');
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
            } 
           
        } catch (error: any) {
            console.log(error);
            if(error?.response?.status == 401) {
                setErrorAlert('User with same mail already exists! Please try with other email');
            }else {
                setErrorAlert('Something Went Wrong');

            }
        }

    }

    const onInput = () => {
        setEmailErr(false);
    }

    const onValuesChange = (changedValues: any) => {
        // Handle the logic for enabling/disabling the submit button based on input values
        const { useremail, userpassword, confirmPassword } = changedValues;

        // Add any other conditions if needed
        const isSubmitDisabled = !useremail || !userpassword || !confirmPassword;

        form.setFieldsValue({
            // You can update other fields as needed
        });

        form.setFields([{ name: 'useremail', errors: [] }]);
        setEmailErr(false);

        form.setFields([{ name: 'userpassword', errors: [] }]);
        setPassErr('');
    };

    return (
        <>
         <Space direction="vertical" style={{ width: "100%" }}>
        {/* {errorALert && <div style={{ color: 'red' }}>{errorALert}</div>} */}
        {registerError && (
          <Alert
            message="Error"
            description={registerError}
            type="error"
            showIcon
            closable
            onClose={() => setErrorAlert(null)}
          />
        )}
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* {errorALert && <div style={{ color: 'red' }}>{errorALert}</div>} */}
        {registerSuccess && (
          <Alert
            message="Success"
            description={registerSuccess}
            type="success"
            showIcon
            closable
            onClose={() => setErrorAlert(null)}
          />
        )}
      </Space>
        
        <Space>
            <div className="register-page">
                <Space className="user">
                    <UserOutlined className="user-icon" />
                </Space>
                <Form style={{ width: "400px" }} onFinish={onFinish} onValuesChange={onValuesChange} form={form}>
                    <Form.Item<RegisterUser> label="User Email" name="useremail" rules={[{ required: true, message: 'Please enter your email' }]}>
                        <Input onInput={onInput} />
                        {emailErr && <span style={{ color: 'orange' }}>Email Can't be Empty</span>}
                    </Form.Item>
                    <Form.Item<RegisterUser> label="Password" name="userpassword" rules={[{ required: true, message: 'Please enter your password' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<RegisterUser> label="Confirm Password" name="confirmPassword" labelCol={{ span: 5 }} wrapperCol={{ span: 24 }} rules={[{ required: true, message: 'Please confirm your password' }]}>
                        <Input.Password />
                    </Form.Item>
                    {/* {passwordErr && <p style={{ color: 'orange' }}>{passwordErr}</p>} */}
                    <div style={{ textAlign: "center" }}>
                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // disabled={
                                    //     form.isFieldsTouched() &&
                                    //     form
                                    //         ?.getFieldsError()
                                    //         .some((field) => field.errors.length > 0)
                                    // }
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
                <Space> Already a registered User? Click to <span style={{ textDecoration: 'underline', 'cursor': 'pointer' }} onClick={() => navigate('/login')}> Login</span> </Space>
            </div>
        </Space>
        </>
    );
};

export default Register;
