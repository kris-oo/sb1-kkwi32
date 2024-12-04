<script setup lang="ts">
defineProps<{
  content?: string;
  style?: Record<string, any>;
}>();
</script>

<template>
  <div class="text-component" :style="style">
    {{ content || '文本内容' }}
  </div>
</template>

<style scoped>
.text-component {
  min-width: 50px;
  min-height: 20px;
}
</style>