import { defineStore } from 'pinia';
import type { ComponentSchema } from '../types/editor';
import { cloneDeep } from 'lodash-es';

export const useEditorStore = defineStore('editor', {
  state: () => ({
    canvas: {
      components: [] as ComponentSchema[],
      selectedId: '',
      scale: 1,
    },
    isDragging: false,
    dragStartPos: { x: 0, y: 0 },
  }),
  
  getters: {
    selectedComponent(): ComponentSchema | undefined {
      return this.canvas.components.find(c => c.id === this.canvas.selectedId);
    }
  },

  actions: {
    addComponent(component: ComponentSchema) {
      this.canvas.components.push(cloneDeep(component));
    },
    
    removeComponent(id: string) {
      const index = this.canvas.components.findIndex(c => c.id === id);
      if (index > -1) {
        this.canvas.components.splice(index, 1);
        if (this.canvas.selectedId === id) {
          this.canvas.selectedId = '';
        }
      }
    },
    
    updateComponent(id: string, updates: Partial<ComponentSchema>) {
      const component = this.canvas.components.find(c => c.id === id);
      if (component) {
        Object.assign(component, updates);
      }
    },
    
    updateComponentStyle(id: string, style: Partial<Record<string, any>>) {
      const component = this.canvas.components.find(c => c.id === id);
      if (component) {
        component.style = { ...component.style, ...style };
      }
    },
    
    setSelectedId(id: string) {
      this.canvas.selectedId = id;
    },

    startDrag(pos: { x: number; y: number }) {
      this.isDragging = true;
      this.dragStartPos = pos;
    },

    endDrag() {
      this.isDragging = false;
    }
  },
});