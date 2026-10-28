export type AngleUnit = 'deg' | 'rad';

export type AppMode = 'standard' | 'scientific' | 'date' | 'programmer' | 'converter';

export type ConverterCategory =
  | 'currency'
  | 'volume'
  | 'length'
  | 'weight'
  | 'temperature'
  | 'energy'
  | 'area'
  | 'speed'
  | 'time'
  | 'power';

export type ThemeId =
  | 'dark'
  | 'white'
  | 'halloween'
  | 'cats'
  | 'cyberpunk'
  | 'retro'
  | 'dracula'
  | 'coffee'
  | 'galaxy'
  | 'forest'
  | 'sunset';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  iconName: string; // Lucide icon identifier (NO EMOJIS)
  badge: string;
  description: string;
  containerBg: string;
  bodyBg: string;
  calculatorBody: string;
  calculatorBorder: string;
  displayBg: string;
  displayTextColor: string;
  displaySubTextColor: string;
  displayBorder: string;
  btnNum: string;
  btnNumActive: string;
  btnNumText: string;
  btnOp: string;
  btnOpActive: string;
  btnOpText: string;
  btnSci: string;
  btnSciActive: string;
  btnSciText: string;
  btnSpecial: string;
  btnSpecialText: string;
  btnEquals: string;
  btnEqualsActive: string;
  btnEqualsText: string;
  accentColor: string;
  soundType: 'click' | 'spooky' | 'meow' | 'cyber' | 'retro';
  fontFamily: string;
}

export interface HistoryItem {
  id: string;
  timestamp: Date;
  expression: string;
  result: string;
  pythonCode: string;
}

export type CalcOperation = '+' | '-' | '*' | '/' | '^' | 'yroot';
