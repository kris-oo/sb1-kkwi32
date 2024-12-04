<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
  style?: Record<string, any>;
}>();

const chartRef = ref<HTMLElement>();
let chart: echarts.ECharts | null = null;

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }]
    };
    chart.setOption(option);
  }
});

onUnmounted(() => {
  if (chart) {
    chart.dispose();
  }
});

watch(() => props.style, () => {
  if (chart) {
    chart.resize();
  }
}, { deep: true });
</script>

<template>
  <div ref="chartRef" :style="{ width: '300px', height: '200px', ...style }" />
</template>