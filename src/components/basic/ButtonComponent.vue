<script setup lang="ts">
defineProps<{
  text?: string;
  style?: Record<string, any>;
}>();
</script>

<template>
  <el-button :style="style">
    {{ text || '按钮' }}
  </el-button>
</template>