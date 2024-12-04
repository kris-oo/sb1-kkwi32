<script setup lang="ts">
import { ref } from 'vue';
import Canvas from './components/editor/Canvas.vue';
import ComponentPanel from './components/editor/ComponentPanel.vue';
import PropertyPanel from './components/editor/PropertyPanel.vue';
</script>

<template>
  <div class="editor-layout">
    <div class="editor-header">
      <h1>低代码平台</h1>
    </div>
    <div class="editor-container">
      <div class="editor-sidebar">
        <ComponentPanel />
      </div>
      <div class="editor-main">
        <div class="canvas-container">
          <Canvas />
        </div>
      </div>
      <div class="editor-properties">
        <PropertyPanel />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.editor-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  .editor-header {
    height: 60px;
    border-bottom: 1px solid #ddd;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    h1 {
      font-size: 20px;
      color: #333;
      margin: 0;
    }
  }

  .editor-container {
    flex: 1;
    display: flex;
    overflow: hidden;
    background-color: #f5f7f9;

    .editor-sidebar {
      width: 280px;
      border-right: 1px solid #ddd;
      background-color: #fff;
      display: flex;
      flex-direction: column;
    }

    .editor-main {
      flex: 1;
      overflow: hidden;
      padding: 20px;

      .canvas-container {
        height: 100%;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .editor-properties {
      width: 300px;
      border-left: 1px solid #ddd;
      background-color: #fff;
    }
  }
}
</style>
