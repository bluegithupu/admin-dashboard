# React 后台管理系统

这是一个基于 React 18 + Vite + Ant Design 构建的现代化后台管理系统，用于学习 React 和前端开发。

## 功能特性

- ✨ 现代化的 React 18 hooks 架构
- 🎨 基于 Ant Design 的精美UI界面
- 📊 集成 ECharts 图表库，支持饼图、柱状图、折线图
- 🔗 完整的路由系统
- 📱 响应式设计，适配移动端
- 🔄 异步数据加载与状态管理
- 🎯 用户管理的完整增删改查功能

## 技术栈

- **React 18** - 前端框架
- **Vite** - 构建工具
- **Ant Design** - UI组件库
- **ECharts** - 图表库
- **React Router** - 路由管理
- **Axios** - HTTP客户端

## 项目结构

```
src/
├── components/          # 公共组件
│   └── Layout.jsx      # 布局组件
├── pages/              # 页面组件
│   ├── Dashboard.jsx   # 概览页
│   └── UserManagement.jsx # 用户管理页
├── services/           # API服务
│   └── api.js         # API接口定义
├── utils/              # 工具函数
│   └── chartUtils.js  # 图表工具
├── App.jsx            # 主应用组件
├── App.css            # 全局样式
└── main.jsx           # 应用入口
```

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问：http://localhost:5173

## 页面功能

### 概览页 (/)
- 数据分布饼图：展示产品分类数据
- 数据对比柱状图：展示月度数据对比
- 趋势分析折线图：展示周度数据趋势
- 所有图表支持响应式布局和交互

### 用户管理页 (/users)
- 用户列表展示：支持分页、搜索
- 添加用户：表单验证、数据提交
- 编辑用户：数据回显、更新
- 删除用户：确认提示、批量操作
- 状态管理：活跃/非活跃状态切换

## 学习要点

### React Hooks 使用
- `useState` - 状态管理
- `useEffect` - 副作用处理
- `useRef` - DOM引用管理

### 组件化开发
- 功能组件拆分
- Props传递
- 事件处理
- 条件渲染

### 异步数据处理
- API接口调用
- 加载状态管理
- 错误处理

### 图表集成
- ECharts初始化
- 图表配置
- 响应式适配
- 内存管理

### UI组件库使用
- Ant Design组件
- 表单验证
- 表格操作
- 模态框使用

## 构建部署

```bash
npm run build
```

生成的静态文件将输出到 `dist` 目录。

## 扩展建议

1. 添加更多图表类型
2. 实现用户权限管理
3. 集成真实的后端API
4. 添加单元测试
5. 优化性能和用户体验

---

这个项目包含了现代前端开发的核心概念，适合学习 React 和前端开发技术栈。
