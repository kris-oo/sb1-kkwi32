<script setup lang="ts">
import { ref } from 'vue';
import { componentList } from '../../constants/componentList';
import type { ComponentMeta } from '../../types/editor';

const components = ref(componentList);

const onDragStart = (event: DragEvent, component: ComponentMeta) => {
  if (!component.type || component.children) return; // Prevent dragging parent nodes
  
  if (event.dataTransfer) {
    event.dataTransfer.setData('component', JSON.stringify({
      type: component.type,
      props: {},
      style: {},
    }));
    event.dataTransfer.effectAllowed = 'copy';
  }
};
</script>

<template>
  <div class="component-panel">
    <div class="panel-header">组件列表</div>
    <div class="components-container">
      <template v-for="category in components" :key="category.type">
        <div class="category-title">{{ category.label }}</div>
        <div class="component-list">
          <div
            v-for="component in category.children"
            :key="component.type"
            class="component-item"
            draggable="true"
            @dragstart="(e) => onDragStart(e, component)"
          >
            <el-icon><component :is="component.icon" /></el-icon>
            <span>{{ component.label }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .panel-header {
    padding: 12px 16px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  }
  
  .components-container {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
  
  .category-title {
    font-size: 14px;
    color: #666;
    margin: 16px 0 8px;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  .component-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .component-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    
    &:hover {
      background: #f5f5f5;
    }
    
    .el-icon {
      font-size: 16px;
    }
  }
}
</style>