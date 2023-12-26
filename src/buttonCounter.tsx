import React, { useEffect, useState } from "react";
import {Button,Space, Input, Select} from 'antd';
import {UserOutlined} from '@ant-design/icons'

const ButtonCount = () => {
const [count, setCount] = useState(0);
const [isLoading, setLoading] = useState(false);
const[ loadingSucess, setLoadingSucess] = useState(false);
const [user, setUser] = useState('');
const options = ['Java', 'Javascript','Python','C','Cpp','MySql','Dot Net'];
const [optionSelect, setOption] = useState('');
const handleButtonClick = (value: any) => {
    console.log(count)
  if (value == "increase") {
    setCount(count + 1);
  } else {
    setCount(count - 1);
  }
};

const loadResponse = ()=> {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setLoadingSucess(true)

    },2000);
}

const handleInput = (event:React.ChangeEvent<HTMLInputElement>)=> {
  setUser(event?.target?.value);
}

const handleOptions = (value: string) => {
  setOption(value)
}
// useEffect(() => {
// return () => {
//     setCount(0);
// }
// });

return (
  <>
    <p>--------------------------Ant Buttons--------------------------------</p>
    <Space>
      <Button type="primary" onClick={() => handleButtonClick("increase")}>
        Increament
      </Button>
      <Button type="primary" onClick={() => handleButtonClick("decrease")}>
        Decease
      </Button>
    </Space>
    <Space>
      {isLoading}
      <Button type="primary" onClick={loadResponse} loading={isLoading}>
        Data{isLoading ? "Loading" : loadingSucess ? " Loaded" : ""}
      </Button>
    </Space>
    <p>{count}</p>
    <p>
      ------------------------------------------ANt
      Input--------------------------------
    </p>
    <Space>
      <Input type="checkbox" id="subscribe" name="subscribe"></Input>
      <label htmlFor="subscribe">Subscribe</label>
      <Input type="email" placeholder="enter your mail id"></Input>
    </Space>
    <div>
      <Input type="search" placeholder="Search"></Input>
    </div>
    <div>
      <Input type="file"></Input>
    </div>
    <div>
      <Input type="range" min="0" max="100"></Input>
    </div>
    <div>
      <input type="radio" id="option1" name="options" value="option1" />
      <label htmlFor="option1">Option 1</label>

      <input type="radio" id="option2" name="options" value="option2" />
      <label htmlFor="option2">Option 2</label>
    </div>
    <Space>
      <Input
        type="text"
        onChange={handleInput}
        placeholder="Enter Username"
        maxLength={10}
        allowClear
        prefix={<UserOutlined />}
      ></Input>
      <div>{user}</div>
    </Space>
    <p>
      --------------------------------------------ANt
      Select--------------------------
    </p>
    <Space>
      <p>Select your favorite language</p>
      <Select
        mode="multiple"
        style={{ width: "200px" }}
        placeholder="Select Here"
        maxTagCount={2} onChange={handleOptions} autoFocus defaultActiveFirstOption defaultValue={options[0]}
      >
        {options.map((option, index) => {
          return (
            <Select.Option key={index} value={option}>
              {option}
            </Select.Option>
          );
        })}
      </Select>
      {optionSelect}
    </Space>
  </>
);
};

export default ButtonCount;