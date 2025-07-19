import axios from 'axios';

// 创建axios实例
const api = axios.create({
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    console.log('发送请求:', config);
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// 模拟API服务（因为没有真实的后端服务）
export const apiService = {
  // 获取概览数据
  getDashboardData: async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      pieData: [
        { value: 335, name: '产品A' },
        { value: 310, name: '产品B' },
        { value: 234, name: '产品C' },
        { value: 135, name: '产品D' },
        { value: 148, name: '产品E' }
      ],
      barData: {
        categories: ['一月', '二月', '三月', '四月', '五月', '六月'],
        values: [120, 132, 101, 134, 90, 230]
      },
      lineData: {
        categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        values: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    };
  },

  // 获取用户列表
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        role: 'admin',
        status: 'active',
        createTime: '2024-01-15T08:30:00.000Z'
      },
      {
        id: 2,
        name: '李四',
        email: 'lisi@example.com',
        role: 'user',
        status: 'active',
        createTime: '2024-02-20T14:20:00.000Z'
      },
      {
        id: 3,
        name: '王五',
        email: 'wangwu@example.com',
        role: 'user',
        status: 'inactive',
        createTime: '2024-03-10T09:15:00.000Z'
      },
      {
        id: 4,
        name: '赵六',
        email: 'zhaoliu@example.com',
        role: 'user',
        status: 'active',
        createTime: '2024-04-05T16:45:00.000Z'
      },
      {
        id: 5,
        name: '孙七',
        email: 'sunqi@example.com',
        role: 'admin',
        status: 'inactive',
        createTime: '2024-05-12T11:30:00.000Z'
      }
    ];
  },

  // 创建用户
  createUser: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: Date.now(),
      ...userData,
      createTime: new Date().toISOString()
    };
  },

  // 更新用户
  updateUser: async (id, userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id,
      ...userData,
      updateTime: new Date().toISOString()
    };
  },

  // 删除用户
  deleteUser: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, id };
  },


    // 获取角色列表
    getRoles: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
  
      return [{
        "id": 1,
        "status": "active",
        "name": "admin",
        "describe": "超级管理员"
    },
    {
        "id": 2,
        "status": "inactive",
        "name": "role1",
        "describe": "角色1"
    }
    ]
    }


};

// 使用真实API的示例（可以根据需要替换）
export const realApiService = {
  // 获取GitHub用户信息（示例）
  getGitHubUser: async (username) => {
    try {
      const response = await api.get(`https://api.github.com/users/${username}`);
      return response;
    } catch (error) {
      throw new Error(`获取用户信息失败: ${error.message}`);
    }
  },

  // 获取随机用户数据
  getRandomUsers: async (count = 10) => {
    try {
      const response = await api.get(`https://randomuser.me/api/?results=${count}`);
      return response.results;
    } catch (error) {
      throw new Error(`获取随机用户数据失败: ${error.message}`);
    }
  },

  // 获取天气数据（示例）
  getWeatherData: async (city) => {
    try {
      // 注意：实际使用时需要API密钥
      const response = await api.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
      return response;
    } catch (error) {
      throw new Error(`获取天气数据失败: ${error.message}`);
    }
  }
};




export default api;