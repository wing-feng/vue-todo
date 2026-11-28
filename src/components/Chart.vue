<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

// 1. 接收父组件传来的历史记录数组
const props = defineProps({
  historyList: Array,
});

// 用来挂载图表的 DOM 元素
const chartDom = ref(null);
let myChart = null;

// 2. 初始化图表的方法
const initChart = () => {
  if (!chartDom.value) return;
  myChart = echarts.init(chartDom.value);
  updateChart();
};

// 3. 核心逻辑：统计出现次数并更新图表
const updateChart = () => {
  if (!myChart) return;

  // 如果没数据，清空图表
  if (props.historyList.length === 0) {
    myChart.clear();
    return;
  }

  // 第一步：统计频率（把 ['火锅', '面', '火锅'] 变成 { 火锅: 2, 面: 1 }）
  const countMap = {};
  props.historyList.forEach((item) => {
    countMap[item] = (countMap[item] || 0) + 1;
  });

  // 第二步：转换成 ECharts 需要的格式
  const chartData = Object.keys(countMap).map((key) => {
    return { name: key, value: countMap[key] };
  });

  // 第三步：配置图表
  const option = {
    title: {
      text: "干饭偏好统计",
      left: "center",
      textStyle: { fontSize: 16, color: "#666" },
    },
    tooltip: { trigger: "item" },
    series: [
      {
        name: "抽中次数",
        type: "pie", // 饼图
        radius: ["40%", "70%"], // 环形图
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  myChart.setOption(option);
};

// 4. 挂载时初始化，并监听数据变化
onMounted(() => {
  initChart();
});

// 只要历史记录变了，图表就跟着重绘
watch(
  () => props.historyList,
  () => {
    updateChart();
  },
  { deep: true },
);
</script>

<template>
  <!-- 必须给一个宽高固定的盒子，否则图表显示不出来 -->
  <div
    ref="chartDom"
    style="width: 100%; height: 250px; margin-top: 20px"
  ></div>
</template>
