import React, { useEffect, useRef, useState } from 'react';
import { Card, Row, Col, Spin, message } from 'antd';
import { 
  initChart, 
  getPieChartOption, 
  getBarChartOption, 
  getLineChartOption 
} from '../utils/chartUtils';
import { apiService } from '../services/api';

const Dashboard = () => {
  // 图表实例引用
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  
  // 加载状态
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDashboardData();
        setChartData(data);
      } catch (error) {
        message.error('获取数据失败');
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 初始化图表
  useEffect(() => {
    if (!chartData) return;

    // 初始化饼图
    const pieChart = initChart('pie-chart');
    if (pieChart) {
      pieChart.setOption(getPieChartOption(chartData.pieData));
      pieChartRef.current = pieChart;
    }

    // 初始化柱状图
    const barChart = initChart('bar-chart');
    if (barChart) {
      barChart.setOption(getBarChartOption(chartData.barData));
      barChartRef.current = barChart;
    }

    // 初始化折线图
    const lineChart = initChart('line-chart');
    if (lineChart) {
      lineChart.setOption(getLineChartOption(chartData.lineData));
      lineChartRef.current = lineChart;
    }

    // 窗口大小改变时重新调整图表大小
    const handleResize = () => {
      pieChartRef.current?.resize();
      barChartRef.current?.resize();
      lineChartRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      pieChartRef.current?.dispose();
      barChartRef.current?.dispose();
      lineChartRef.current?.dispose();
    };
  }, [chartData]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        <Spin size="large" tip="正在加载数据..." />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>概览页</h1>
      
      <Row gutter={[16, 16]}>
        {/* 饼图卡片 */}
        <Col xs={24} lg={8}>
          <Card title="数据分布 - 饼图" style={{ height: 400 }}>
            <div 
              id="pie-chart"
              style={{ 
                width: '100%', 
                height: 300
              }}
            />
          </Card>
        </Col>
        
        {/* 柱状图卡片 */}
        <Col xs={24} lg={8}>
          <Card title="数据对比 - 柱状图" style={{ height: 400 }}>
            <div 
              id="bar-chart"
              style={{ 
                width: '100%', 
                height: 300
              }}
            />
          </Card>
        </Col>
        
        {/* 折线图卡片 */}
        <Col xs={24} lg={8}>
          <Card title="趋势分析 - 折线图" style={{ height: 400 }}>
            <div 
              id="line-chart"
              style={{ 
                width: '100%', 
                height: 300
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;