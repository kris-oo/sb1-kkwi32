<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEditorStore } from '../../store/editor';
import type { ComponentSchema } from '../../types/editor';

const props = defineProps<{
  component: ComponentSchema;
}>();

const store = useEditorStore();
const startPos = ref({ x: 0, y: 0 });
const elementRef = ref<HTMLElement>();

const isSelected = computed(() => store.canvas.selectedId === props.component.id);

const onMouseDown = (event: MouseEvent) => {
  if (!elementRef.value) return;
  
  event.stopPropagation();
  store.setSelectedId(props.component.id);
  
  const { left, top } = elementRef.value.getBoundingClientRect();
  startPos.value = {
    x: event.clientX - left,
    y: event.clientY - top,
  };
  
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
  if (!elementRef.value) return;
  
  const newLeft = event.clientX - startPos.value.x;
  const newTop = event.clientY - startPos.value.y;
  
  store.updateComponentStyle(props.component.id, {
    left: `${newLeft}px`,
    top: `${newTop}px`,
  });
};

const onMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};
</script>

<template>
  <div
    ref="elementRef"
    class="draggable-wrapper"
    :style="{
      position: 'absolute',
      left: component.style.left,
      top: component.style.top,
    }"
    :class="{ 'is-selected': isSelected }"
    @mousedown="onMouseDown"
  >
    <component
      :is="component.type"
      v-bind="component.props"
      :style="{ ...component.style, position: undefined, left: undefined, top: undefined }"
    />
    <div v-if="isSelected" class="resize-handles">
      <div v-for="handle in ['nw','n','ne','w','e','sw','s','se']" 
           :key="handle"
           :class="['resize-handle', handle]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.draggable-wrapper {
  cursor: move;
  user-select: none;
  min-width: 50px;
  min-height: 30px;

  &.is-selected {
    outline: 2px solid #1890ff;
    outline-offset: 2px;
  }
}

.resize-handles {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border: 1px solid #1890ff;
  pointer-events: all;
  
  &.nw { top: -4px; left: -4px; cursor: nw-resize; }
  &.n  { top: -4px; left: 50%; transform: translateX(-50%); cursor: n-resize; }
  &.ne { top: -4px; right: -4px; cursor: ne-resize; }
  &.w  { top: 50%; left: -4px; transform: translateY(-50%); cursor: w-resize; }
  &.e  { top: 50%; right: -4px; transform: translateY(-50%); cursor: e-resize; }
  &.sw { bottom: -4px; left: -4px; cursor: sw-resize; }
  &.s  { bottom: -4px; left: 50%; transform: translateX(-50%); cursor: s-resize; }
  &.se { bottom: -4px; right: -4px; cursor: se-resize; }
}
</style>