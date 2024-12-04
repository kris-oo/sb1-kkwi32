<script setup lang="ts">
import { computed } from 'vue';
import { useEditorStore } from '../../store/editor';
import { componentList } from '../../constants/componentList';
import type { PropMeta } from '../../types/editor';

const store = useEditorStore();

const selectedComponent = computed(() => store.selectedComponent);
const componentMeta = computed(() => {
  if (!selectedComponent.value) return null;

  for (const category of componentList) {
    const meta = category.children?.find(
      (c) => c.type === selectedComponent.value?.type
    );
    if (meta) return meta;
  }
  return null;
});

const updateProp = (name: string, value: any) => {
  if (!selectedComponent.value) return;

  store.updateComponent(selectedComponent.value.id, {
    props: { ...selectedComponent.value.props, [name]: value },
  });
};

const updateStyle = (name: string, value: any) => {
  if (!selectedComponent.value) return;
  store.updateComponentStyle(selectedComponent.value.id, { [name]: value });
};
</script>

<template>
  <div class="property-panel">
    <div class="panel-header">属性面板</div>
    <div class="panel-content">
      <template v-if="selectedComponent">
        <div class="panel-section">
          <div class="section-title">组件属性</div>
          <template v-if="componentMeta?.props">
            <div
              v-for="prop in componentMeta.props"
              :key="prop.name"
              class="prop-item"
            >
              <div class="prop-label">{{ prop.label }}</div>
              <el-input
                v-if="prop.type === 'string'"
                v-model="selectedComponent.props[prop.name]"
                @input="(value) => updateProp(prop.name, value)"
                size="small"
              />
            </div>
          </template>
        </div>

        <div class="panel-section">
          <div class="section-title">样式属性</div>
          <div class="prop-item">
            <div class="prop-label">宽度</div>
            <el-input
              v-model="selectedComponent.style.width"
              @input="(value) => updateStyle('width', value)"
              size="small"
            >
              <template #append>px</template>
            </el-input>
          </div>
          <div class="prop-item">
            <div class="prop-label">高度</div>
            <el-input
              v-model="selectedComponent.style.height"
              @input="(value) => updateStyle('height', value)"
              size="small"
            >
              <template #append>px</template>
            </el-input>
          </div>
        </div>
      </template>
      <div v-else class="empty-state">请选择一个组件以编辑其属性</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.property-panel {
  height: 100%;
  display: flex;
  flex-direction: column;

  .panel-header {
    padding: 12px 16px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }

  .panel-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
}

.panel-section {
  margin-bottom: 20px;

  .section-title {
    font-weight: bold;
    margin-bottom: 12px;
    color: #333;
    font-size: 14px;
  }
}

.prop-item {
  margin-bottom: 12px;

  .prop-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
  }
}

.empty-state {
  color: #999;
  text-align: center;
  padding: 20px;
}
</style>
