<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEditorStore } from '../../store/editor';
import {
  calculateComponentPosition,
  createComponent,
} from '../../utils/canvas';
import DraggableComponent from './DraggableComponent.vue';
import type { ComponentSchema } from '../../types/editor';

const store = useEditorStore();
const canvasRef = ref<HTMLDivElement>();

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  const componentData = event.dataTransfer?.getData('component');
  if (!componentData || !canvasRef.value) return;

  const position = calculateComponentPosition(event, canvasRef.value);
  if (!position) return;

  const component = createComponent(componentData, position);
  store.addComponent(component);
};

const onDragover = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy';
  }
};

const onCanvasClick = (event: MouseEvent) => {
  if (event.target === canvasRef.value) {
    store.setSelectedId('');
  }
};
</script>

<template>
  <div
    ref="canvasRef"
    class="editor-canvas"
    @drop="onDrop"
    @dragover="onDragover"
    @click="onCanvasClick"
  >
    <DraggableComponent
      v-for="component in store.canvas.components"
      :key="component.id"
      :component="component"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  padding: 20px;
  background: linear-gradient(90deg, #f5f5f5 1px, transparent 1%) center,
    linear-gradient(#f5f5f5 1px, transparent 1%) center, #fff;
  background-size: 20px 20px;
}
</style>
