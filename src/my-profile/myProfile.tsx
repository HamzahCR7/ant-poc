import React, { useState } from "react";
import "./myProfile.css";
import { Form, Input, Space, Select, Button,message, Upload} from "antd";
import { UserOutlined,UploadOutlined } from "@ant-design/icons";
import Profile from "./modals/profile";

const MyProfile = () => {
  const username = sessionStorage.getItem("username")
    ? sessionStorage.getItem("username")
    : null;
  const [form] = Form.useForm();
  const options: String[] = ['India', 'Pakistan', 'Australia', 'Singapore', 'China', 'Qatar', 'England'];
  const jobs: string[] = ['Angular Developer','Java Developer','Sales Executive','Intern','Pyton Developer'];
  const workMode: string[] = ['Hybrid', 'Work From Office','Work from Home','Part time'];
  const [optionSelect, setOption] = useState<string>('');
  const [job, selectJob] = useState<string>('');
  const [mode, selectedMode] = useState<string>('');
  const [cvFile, setCvFile] = useState(null);


  const onFormFinish = (values: any) => {
    console.log('form success');
    // console.log(values);
    const updatedValues: Profile = {
      ...values,
      cv: cvFile,
    };

    console.log(updatedValues);
    console.log("CV File:", cvFile);
  }
  
  const jobsSelected = (value: string) => {
    selectJob(value);
    form.setFieldsValue({...form,jobPosition : value } );

  }
  const workSelected = (value: any) => {
    selectedMode(value);
    form.setFieldsValue({...form, workingMode: value } );
  }

  const handleFileChange = (file: any) => {
    if (file.uid) {
      message.success(`${file.name} file uploaded successfully`);
      setCvFile(file);
    } else {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const onFormFailed = (values: any) => {
    console.log('form failed');
    console.log(values);
  }
  const handleOptions = (value: string) => {
    setOption(value);
    // form.setFieldsValue({["address.country"]: value});
    form.setFieldsValue({ address: { ...form.getFieldValue('address'), country: value } });

  }
  return (
    <>
      <h3 style={{marginLeft: '45em',marginBottom: '1em'}}>Hi {username}</h3>
      <div className="my-profile">
        <h3 className="job-heading">Job Seeker Application</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFormFinish}
          onFinishFailed={onFormFailed}
          form={form}
        >
          <Form.Item<Profile>
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input style={{ width: '300px' }} placeholder="First Name" />
          </Form.Item>
          <Form.Item<Profile>
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input style={{ width: '300px' }} placeholder="Last Name"/>
          </Form.Item>
          <Form.Item<Profile>
            label="Address"
            name={["address", "street1"]}
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input style={{ width: '500px' }} placeholder="street1" />
          </Form.Item>
          <Form.Item<Profile>
            name={["address", "street2"]}
            // rules={[{ required: true, message: 'Please input yo' }]}
          >
            <Input style={{ width: '500px', marginLeft: '18em' }} placeholder="street2" />
          </Form.Item>
          <div style={{ display: 'flex', marginLeft: '18em' }}>
            <Form.Item<Profile>
              name={["address", "city"]}
              style={{ marginRight: '10px', flex: 1 }}
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <Input style={{ width: '100%' }} placeholder="City" />
            </Form.Item>
            <Form.Item<Profile>
              name={["address", "state"]}
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Please input your state!' }]}
            >
              <Input style={{ width: '100%' }} placeholder="State" />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', marginLeft: '18em' }}>
            <Form.Item<Profile>
              name={["address", "postCode"]}
              style={{ marginRight: '10px', flex: 1 }}
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <Input type="number" style={{ width: '100%' }} placeholder="Post Code/ Zip Code" />
            </Form.Item>
            <Form.Item<Profile>
              name={["address", "country"]}
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Please input your state!' }]}
            >
              <Space>
                <Select
                  style={{ width: "200px" }}
                  placeholder="Select Country"
                  onChange={handleOptions}
                >
                  {options.map((option, index) => {
                    return (
                      <Select.Option key={index} value={option}>
                        {option}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Space>
            </Form.Item>
          </div>
          <Form.Item<Profile>
            label="Phone Number"
            name={["phone"]}
            rules={[{ required: true, message: 'Please input your phone!' }]}

            >
             <Input type="number" placeholder="Enter your Phone Number" />
          </Form.Item>
          <Form.Item<Profile>
            label="Position for which you are applying for?"
              name="jobPosition"
              rules={[{ required: true, message: 'Please input your job preferrence!' }]}
            >
              <Space>
                <Select
                  style={{ width: "200px" }}
                  placeholder="Select A Job"
                  onChange={jobsSelected}
                >
                  {jobs.map((jobs, index) => {
                    return (
                      <Select.Option key={index} value={jobs}>
                        {jobs}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Space>
            </Form.Item>
            <Form.Item<Profile>
            label="Working Mode?"
              name="workingMode"
              rules={[{ required: true, message: 'Please input a working mode!' }]}
            >
              <Space>
                <Select
                  style={{ width: "200px" }}
                  placeholder="Select A Mode"
                  onChange={workSelected}
                >
                  {workMode.map((work, index) => {
                    return (
                      <Select.Option key={index} value={work}>
                        {work}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Space>
            </Form.Item>
            <Form.Item label="Upload CV" extra="Upload your CV in PDF or Word format"             
            rules={[{ required: true, message: 'Please upload a cv!' }]}
>
          <Upload
            name="cv"
            accept=".pdf, .doc, .docx"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={(info) => handleFileChange(info.file as any)}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            {/* {cvFile} */}
            {cvFile && <span style={{ marginLeft: '8px' }}>{(cvFile as any).name}</span>}

          </Upload>
        </Form.Item>
          <Space>
            <Button htmlType="submit" type="primary" > Submit</Button>
          </Space>
        </Form>
      </div>
    </>
  );
};

export default MyProfile;
