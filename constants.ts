import { DefectInfo, DefectType } from './types';

export const DEFECT_CLASSES: Record<string, DefectInfo> = {
  [DefectType.NORMAL]: {
    name: 'Normal',
    description: 'The solar cell shows no visible defects. The crystalline structure is uniform with consistent electroluminescence.',
    severity: 'Low',
  },
  [DefectType.MICROCRACK]: {
    name: 'Microcrack',
    description: 'Fine cracks within the cell material, often barely visible but capable of growing over time, leading to power loss.',
    severity: 'Medium',
  },
  [DefectType.FINGER_INTERRUPTION]: {
    name: 'Finger Interruption',
    description: 'Breaks in the fine grid lines (fingers) on the cell surface, reducing current collection efficiency.',
    severity: 'Medium',
  },
  [DefectType.BROKEN_CELL]: {
    name: 'Broken Cell',
    description: 'Significant physical breakage or separation of the cell wafer, causing substantial power loss.',
    severity: 'Critical',
  },
  [DefectType.HOTSPOT]: {
    name: 'Hotspot',
    description: 'Localized area of high heat generation due to defects or shading, which can damage the module permanently.',
    severity: 'High',
  },
};

export const CHART_DATA = [
  { name: 'Normal', value: 45, fill: '#10b981' },
  { name: 'Microcrack', value: 25, fill: '#f59e0b' },
  { name: 'Finger Int.', value: 15, fill: '#3b82f6' },
  { name: 'Broken', value: 5, fill: '#ef4444' },
  { name: 'Hotspot', value: 10, fill: '#f97316' },
];
