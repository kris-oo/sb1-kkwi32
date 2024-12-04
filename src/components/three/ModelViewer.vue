<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const props = defineProps<{
  style?: Record<string, any>;
}>();

const containerRef = ref<HTMLElement>();
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;

const init = () => {
  if (!containerRef.value) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, containerRef.value.clientWidth / containerRef.value.clientHeight, 0.1, 1000);
  
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight);
  containerRef.value.appendChild(renderer.domElement);
  
  controls = new OrbitControls(camera, renderer.domElement);
  
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 20, 10);
  scene.add(light);
  
  camera.position.z = 5;
  
  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<template>
  <div ref="containerRef" :style="{ width: '300px', height: '200px', ...style }" />
</template>