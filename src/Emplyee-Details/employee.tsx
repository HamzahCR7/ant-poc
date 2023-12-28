import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Employee } from "./modal/Employee";
import { useNavigate } from "react-router-dom";


const EmployeeDetails = () => {
    const [data, setData] = useState([]);
    const [filteredEmployeeData, setFilteredEmployeeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [moreInfo, setMoreInfo] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const columns: ColumnsType<Employee> = [
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Company',
            dataIndex: 'company',
        },
        {
            title: 'Domain',
            dataIndex: 'domain',
        },
        {
            title: 'EOY',
            dataIndex: 'yearsOfExperience',
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
        },
        {
            title: 'Base Location',
            'dataIndex': 'location'
        }

    ];
    useEffect(() => {
        if(!sessionStorage?.getItem('useremail')){
            navigate("/login");
          };
        setLoading(true);
        const fetchData = async () => {
            const employeeData = await axios.get('http://localhost:4000/api/user-data');
            const data = employeeData?.data?.data;
            setData(employeeData?.data?.data);
            filterData(data, searchQuery)
        }
        fetchData();
    }, []);

    useEffect(() => {
        filterData(data, searchQuery)
    }, [searchQuery, data]);

    const filterData = (data: any, query: string) => {
        const filteredData = data.filter((employee: any) => employee.employeeName.toLowerCase().includes(query.toLowerCase()));
        setFilteredEmployeeData(filteredData)
    }

    const onInput = (event: any) => {
        console.log(event.target.value);
        setSearchQuery(event.target.value)

    }

    const rowClicked = (value: any) => {
        return {
            onClick: () => handleClick(value)
        }
    }

    const handleClick = async (record: any) => {
        // console.log(record);
        const furtherInfo: any = await axios(`http://localhost:4000/api/user-data/${record?.employeeName}`);
        setMoreInfo(furtherInfo.data.data);
        console.log(furtherInfo.data.data);
        setIsModalOpen(true);


        console.log(moreInfo);
        moreInfo.map((data: Employee) => {
            console.log(data.employeeName)
        })
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Space>
                <Input type="search" size="large" onInput={onInput} placeholder="Search By Name" />
            </Space>
            <Table onRow={rowClicked} columns={columns} size="middle" dataSource={filteredEmployeeData} />
            <Space>
                {/* {moreInfo && Object.entries(moreInfo)?.map(([key,value])=>{
                <div>{value as any}</div>
            }) } */}
            </Space>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            {moreInfo && <Modal title="More Info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <>
                    {moreInfo.map((info: any, index: any) => (
                        <ul key={index}>
                            <li>Gender: {info.gender}</li>
                            <li>Education: {info.education}</li>
                            <li>Married Status: {info.marriedStatus}</li>
                            <li>Preferred Location: {info.prefferedLocation}</li>
                            <li>Expertise: {info.languages}</li>
                        </ul>
                    ))}
                </>

            </Modal>
            }
        </>

    )
};

export default EmployeeDetails;