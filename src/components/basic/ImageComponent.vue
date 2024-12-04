<script setup lang="ts">
defineProps<{
  src?: string;
  alt?: string;
  style?: Record<string, any>;
}>();
</script>

<template>
  <el-image 
    :src="src || 'https://placeholder.co/300x200'" 
    :alt="alt"
    :style="style"
    fit="cover"
  />
</template>