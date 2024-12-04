import type { ComponentMeta } from '../types/editor';

export const componentList: ComponentMeta[] = [
  {
    type: 'basic',
    label: '基础组件',
    children: [
      {
        type: 'text-component',
        label: '文字',
        icon: 'Document',
        category: 'basic',
        props: [
          { name: 'content', label: '内容', type: 'string' }
        ],
        events: []
      },
      {
        type: 'button-component',
        label: '按钮',
        icon: 'Pointer',
        category: 'basic',
        props: [
          { name: 'text', label: '文本', type: 'string' }
        ],
        events: []
      },
      {
        type: 'image-component',
        label: '图片',
        icon: 'Picture',
        category: 'basic',
        props: [
          { name: 'src', label: '图片地址', type: 'string' },
          { name: 'alt', label: '替代文本', type: 'string' }
        ],
        events: []
      }
    ]
  },
  {
    type: 'form',
    label: '表单组件',
    children: [
      {
        type: 'el-input',
        label: '输入框',
        icon: 'Edit',
        category: 'form',
        props: [
          { name: 'placeholder', label: '占位文本', type: 'string' }
        ],
        events: []
      },
      {
        type: 'el-select',
        label: '下拉框',
        icon: 'List',
        category: 'form',
        props: [],
        events: []
      }
    ]
  },
  {
    type: 'chart',
    label: '图表组件',
    children: [
      {
        type: 'line-chart',
        label: '折线图',
        icon: 'TrendCharts',
        category: 'chart',
        props: [],
        events: []
      },
      {
        type: 'bar-chart',
        label: '柱状图',
        icon: 'Histogram',
        category: 'chart',
        props: [],
        events: []
      }
    ]
  },
  {
    type: 'three',
    label: '3D组件',
    children: [
      {
        type: 'model-viewer',
        label: '模型查看器',
        icon: 'Monitor',
        category: 'three',
        props: [],
        events: []
      },
      {
        type: 'scene-container',
        label: '场景容器',
        icon: 'Monitor',
        category: 'three',
        props: [],
        events: []
      }
    ]
  }
];