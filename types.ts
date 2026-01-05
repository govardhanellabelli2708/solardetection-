export interface AnalysisResult {
  category: 'Normal' | 'Microcrack' | 'Finger Interruption' | 'Broken Cell' | 'Hotspot';
  confidence: number;
  description: string;
  recommendation: string;
}

export enum DefectType {
  NORMAL = 'Normal',
  MICROCRACK = 'Microcrack',
  FINGER_INTERRUPTION = 'Finger Interruption',
  BROKEN_CELL = 'Broken Cell',
  HOTSPOT = 'Hotspot'
}

export interface DefectInfo {
  name: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}
