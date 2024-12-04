import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import './style.css';

// Import basic components
import TextComponent from './components/basic/TextComponent.vue';
import ButtonComponent from './components/basic/ButtonComponent.vue';
import ImageComponent from './components/basic/ImageComponent.vue';
import LineChart from './components/chart/LineChart.vue';
import ModelViewer from './components/three/ModelViewer.vue';

const app = createApp(App);
const pinia = createPinia();

// Register Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Register basic components
app.component('text-component', TextComponent);
app.component('button-component', ButtonComponent);
app.component('image-component', ImageComponent);
app.component('line-chart', LineChart);
app.component('model-viewer', ModelViewer);

app.use(pinia);
app.use(ElementPlus);

app.mount('#app');