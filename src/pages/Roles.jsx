import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Space,
    Popconfirm,
    message,
    Spin,
    Row,
    Col,
    Card,
    Dropdown
} from 'antd';


const Roles = () => {

    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);

    // 筛选和搜索状态
    const [statusFilter, setStatusFilter] = useState('');
    const [nameSearch, setNameSearch] = useState('');



    // 表格列定义
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '描述',
            dataIndex: 'describe',
            key: 'describe',
        }
    ]

    //获取用户列表
    useEffect(() => {
        fetchRoles();
    }, []);

    // 筛选和搜索效果
    useEffect(() => {
        filterRoles();
    }, [roles, nameSearch]);

    // 获取数据
    const fetchRoles = async () => {
        try {
            setLoading(true);
            const rolesData = [{
                "id": 1,
                "name": "admin",
                "describe": "超级管理员"
            },
            {
                "id": 2,
                "name": "role1",
                "describe": "角色1"
            }
            ]
            setRoles(rolesData)
        } catch (error) {
            message.error('获取用户列表失败');
            console.error('获取用户列表失败:', error);
        } finally {
            setLoading(false);
        }
    };


    // 筛选角色数据
    const filterRoles = () => {
        let filtered = roles;

        // 名称搜索过滤
        if (nameSearch) {
            filtered = filtered.filter(role =>
                role.name.toLowerCase().includes(nameSearch.toLowerCase())
            );
        }

        setFilteredRoles(filtered);
    };


    return (
        <div>
            {/* 现代化搜索区域 */}
            <div style={{
                background: '#fafafa',
                borderRadius: 12,
                padding: '16px 20px',
                marginBottom: 20,
                border: '1px solid #f0f0f0'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    flexWrap: 'wrap'
                }}>
                    {/* 搜索输入框 */}
                    <div style={{ flex: 1, minWidth: 240 }}>
                        <Input
                            placeholder="搜索角色名称..."
                            value={nameSearch}
                            onChange={(e) => setNameSearch(e.target.value)}
                            allowClear
                            size="large"
                            style={{
                                borderRadius: 8,
                                backgroundColor: 'white',
                                border: '1px solid #e8e8e8'
                            }}
                        />
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredRoles}
                rowKey="id"
                loading={loading}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `第 ${range[0]}-${range[1]} 条，共 ${total} 条数据`,
                    style: {
                        padding: '16px 24px',
                        borderTop: '1px solid #f0f0f0'
                    }
                }}
                style={{
                    borderRadius: 0
                }}
            />
        </div>
    );

}

export default Roles;