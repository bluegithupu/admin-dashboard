# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 开发命令

```bash
# 启动开发服务器 (运行在 http://localhost:5173)
npm run dev

# 构建生产版本
npm run build

# 运行代码检查
npm run lint

# 预览生产构建
npm run preview
```

## 架构概览

这是一个基于 React 18 和现代 Web 技术构建的后台管理系统，用于学习目的。应用程序遵循基于组件的架构，具有清晰的关注点分离。

### 核心技术栈
- **React 18** 基于 hooks 的函数组件
- **Vite** 作为构建工具和开发服务器
- **Ant Design** UI 组件库，配置中文语言环境 (zhCN)
- **React Router DOM** 客户端路由
- **Axios** HTTP 请求库，配置拦截器
- **ECharts** 数据可视化图表库

### 项目结构
```
src/
├── components/Layout.jsx      # 主要布局组件，包含侧边栏导航
├── pages/                     # 路由级别的页面组件
│   ├── Dashboard.jsx         # 图表和数据可视化页面
│   ├── UserManagement.jsx    # 用户管理页面，包含高级筛选的 CRUD 操作
│   └── Roles.jsx             # 角色管理页面，包含名称搜索筛选功能
├── services/api.js           # 集中式 API 层，包含模拟数据
├── utils/chartUtils.js       # ECharts 配置工具函数
├── App.jsx                   # 根组件，包含路由设置
└── main.jsx                  # 应用程序入口点
```

### 关键架构模式

**API 层**: 集中在 `src/services/api.js` 中，使用 axios 拦截器处理请求/响应。目前使用模拟数据并模拟网络延迟，以提供真实的开发体验。

**图表管理**: 通过 `src/utils/chartUtils.js` 集成 ECharts，提供可重用的图表配置和初始化工具函数。图表会被正确销毁以防止内存泄漏。

**布局系统**: 单一布局组件 (`src/components/Layout.jsx`) 包装所有页面，使用 Ant Design 的 Layout 组件提供一致的导航和响应式设计。

**状态管理**: 使用 React hooks (`useState`, `useEffect`, `useRef`) 进行本地组件状态管理。未实现外部状态管理库。

**路由**: 简单的 React Router 设置，包含两个主要路由:
- `/` - 包含数据可视化的概览页
- `/users` - 包含 CRUD 操作的用户管理页

### 组件模式

**概览页**: 演示异步数据加载、ECharts 集成和响应式网格布局。图表在 useEffect 中初始化并进行适当的清理。

**用户管理页**: 复杂组件，展示:
- 实时搜索和筛选
- 表格列标题集成的状态筛选
- 基于标签的现代 UI 筛选显示
- CRUD 操作的模态表单
- 乐观的 UI 更新

### 数据流

所有 API 调用都通过集中的 `apiService` 进行，提供:
- 一致的错误处理
- 加载状态管理
- 具有真实延迟的模拟数据
- 正确的 async/await 模式

### 样式方法

- 使用 Ant Design 组件保持 UI 一致性
- 针对特定组件需求使用自定义内联样式
- 在 `App.css` 中使用全局样式，包含 CSS 重置和响应式工具
- 现代设计语言，具有圆角、阴影和适当的间距

### 开发说明

该应用程序设计为学习项目，展示现代 React 开发模式。所有组件都包含中文注释并遵循一致的命名约定。模拟 API 服务可以通过更新 `apiService` 方法轻松替换为真实的后端端点。