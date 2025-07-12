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
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  DownOutlined
} from '@ant-design/icons';
import { apiService } from '../services/api';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  
  // 筛选和搜索状态
  const [statusFilter, setStatusFilter] = useState('');
  const [emailSearch, setEmailSearch] = useState('');

  // 获取用户列表
  useEffect(() => {
    fetchUsers();
  }, []);

  // 筛选和搜索效果
  useEffect(() => {
    filterUsers();
  }, [users, statusFilter, emailSearch]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await apiService.getUsers();
      setUsers(userData);
    } catch (error) {
      message.error('获取用户列表失败');
      console.error('获取用户列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 筛选用户数据
  const filterUsers = () => {
    let filtered = users;

    // 按状态筛选
    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // 按邮箱搜索
    if (emailSearch) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(emailSearch.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 状态筛选菜单
  const statusFilterMenu = {
    items: [
      {
        key: '',
        label: '全部状态',
        onClick: () => setStatusFilter('')
      },
      {
        key: 'active',
        label: '活跃',
        onClick: () => setStatusFilter('active')
      },
      {
        key: 'inactive',
        label: '非活跃',
        onClick: () => setStatusFilter('inactive')
      }
    ]
  };

  // 表格列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span style={{ 
          color: role === 'admin' ? '#f50' : '#108ee9' 
        }}>
          {role === 'admin' ? '管理员' : '普通用户'}
        </span>
      ),
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>状态</span>
          <Dropdown 
            menu={statusFilterMenu}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button 
              type="text" 
              size="small"
              icon={<FilterOutlined />}
              style={{ 
                color: statusFilter ? '#1677ff' : '#999',
                padding: '2px 4px'
              }}
            >
              <DownOutlined style={{ fontSize: '10px' }} />
            </Button>
          </Dropdown>
          {statusFilter && (
            <span style={{ 
              fontSize: '12px', 
              color: '#1677ff',
              marginLeft: 4
            }}>
              ({statusFilter === 'active' ? '活跃' : '非活跃'})
            </span>
          )}
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ 
          color: status === 'active' ? '#52c41a' : '#999' 
        }}>
          {status === 'active' ? '活跃' : '非活跃'}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime) => formatDate(createTime),
      sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 打开新增/编辑模态框
  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  // 删除用户
  const handleDelete = async (id) => {
    try {
      await apiService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      message.success('删除成功！');
    } catch (error) {
      message.error('删除失败');
      console.error('删除用户失败:', error);
    }
  };

  // 提交表单
  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        // 编辑用户
        await apiService.updateUser(editingUser.id, values);
        setUsers(users.map(user => 
          user.id === editingUser.id 
            ? { ...user, ...values }
            : user
        ));
        message.success('用户信息更新成功！');
      } else {
        // 新增用户
        const newUser = await apiService.createUser(values);
        setUsers([...users, newUser]);
        message.success('用户添加成功！');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error(editingUser ? '更新用户失败' : '添加用户失败');
      console.error('操作用户失败:', error);
    }
  };

  // 重置筛选条件
  const handleReset = () => {
    setStatusFilter('');
    setEmailSearch('');
  };

  return (
    <div>
      {/* 页面标题和操作区域 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24 
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>用户管理</h1>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: 14 }}>
            管理系统用户信息，支持搜索和筛选
          </p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
          style={{ 
            borderRadius: 8,
            height: 40,
            padding: '0 24px',
            fontSize: 14,
            fontWeight: 500
          }}
        >
          添加用户
        </Button>
      </div>

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
              placeholder="搜索用户邮箱..."
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              prefix={<SearchOutlined style={{ color: '#999' }} />}
              allowClear
              size="large"
              style={{ 
                borderRadius: 8,
                backgroundColor: 'white',
                border: '1px solid #e8e8e8'
              }}
            />
          </div>
          
          {/* 统计信息和重置按钮 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12,
            color: '#666',
            fontSize: 14
          }}>
            <span>
              显示 <strong style={{ color: '#1677ff' }}>{filteredUsers.length}</strong> / {users.length} 条记录
            </span>
            
            {(statusFilter || emailSearch) && (
              <>
                <div style={{ 
                  width: 1, 
                  height: 16, 
                  backgroundColor: '#e8e8e8' 
                }} />
                <Button 
                  type="text" 
                  size="small"
                  onClick={handleReset}
                  style={{ 
                    color: '#666',
                    fontSize: 12
                  }}
                >
                  清除筛选
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* 活跃筛选标签 */}
        {(statusFilter || emailSearch) && (
          <div style={{ 
            marginTop: 12,
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}>
            {statusFilter && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                backgroundColor: '#e6f4ff',
                color: '#1677ff',
                borderRadius: 6,
                fontSize: 12,
                border: '1px solid #91caff'
              }}>
                状态: {statusFilter === 'active' ? '活跃' : '非活跃'}
                <Button 
                  type="text" 
                  size="small"
                  onClick={() => setStatusFilter('')}
                  style={{ 
                    minWidth: 'auto',
                    width: 16,
                    height: 16,
                    padding: 0,
                    color: '#1677ff'
                  }}
                >
                  ×
                </Button>
              </span>
            )}
            {emailSearch && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                backgroundColor: '#f6ffed',
                color: '#52c41a',
                borderRadius: 6,
                fontSize: 12,
                border: '1px solid #b7eb8f'
              }}>
                邮箱: "{emailSearch}"
                <Button 
                  type="text" 
                  size="small"
                  onClick={() => setEmailSearch('')}
                  style={{ 
                    minWidth: 'auto',
                    width: 16,
                    height: 16,
                    padding: 0,
                    color: '#52c41a'
                  }}
                >
                  ×
                </Button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* 用户列表表格 */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <Table 
          columns={columns} 
          dataSource={filteredUsers}
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

      {/* 新增/编辑用户模态框 */}
      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="admin">管理员</Option>
              <Option value="user">普通用户</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">活跃</Option>
              <Option value="inactive">非活跃</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? '更新' : '添加'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;