import React, { useState } from 'react';
import { ConverterCategory, ThemeConfig } from '../types/calculator';
import {
  Coins,
  Box,
  Ruler,
  Scale,
  Thermometer,
  Flame,
  Grid,
  Activity,
  Clock,
  Zap,
  ArrowUpDown,
} from 'lucide-react';

interface ConverterProps {
  initialCategory?: ConverterCategory;
  theme: ThemeConfig;
}

interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

interface CategoryDef {
  id: ConverterCategory;
  title: string;
  icon: React.ReactNode;
  units: UnitDef[];
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'currency',
    title: 'Moeda',
    icon: <Coins className="w-4 h-4" />,
    units: [
      { id: 'BRL', name: 'Real Brasileiro', symbol: 'R$', toBase: (v) => v / 5.62, fromBase: (v) => v * 5.62 },
      { id: 'USD', name: 'Dólar Americano', symbol: 'US$', toBase: (v) => v, fromBase: (v) => v },
      { id: 'EUR', name: 'Euro', symbol: '€', toBase: (v) => v * 1.08, fromBase: (v) => v / 1.08 },
      { id: 'GBP', name: 'Libra Esterlina', symbol: '£', toBase: (v) => v * 1.28, fromBase: (v) => v / 1.28 },
      { id: 'JPY', name: 'Iene Japonês', symbol: '¥', toBase: (v) => v * 0.0066, fromBase: (v) => v / 0.0066 },
      { id: 'BTC', name: 'Bitcoin', symbol: '₿', toBase: (v) => v * 67000, fromBase: (v) => v / 67000 },
    ],
  },
  {
    id: 'volume',
    title: 'Volume',
    icon: <Box className="w-4 h-4" />,
    units: [
      { id: 'ml', name: 'Mililitros', symbol: 'mL', toBase: (v) => v * 0.001, fromBase: (v) => v * 1000 },
      { id: 'l', name: 'Litros', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      { id: 'm3', name: 'Metros Cúbicos', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v * 0.001 },
      { id: 'gal', name: 'Galões (EUA)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { id: 'cup', name: 'Xícaras (EUA)', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    ],
  },
  {
    id: 'length',
    title: 'Comprimento',
    icon: <Ruler className="w-4 h-4" />,
    units: [
      { id: 'mm', name: 'Milímetros', symbol: 'mm', toBase: (v) => v * 0.001, fromBase: (v) => v * 1000 },
      { id: 'cm', name: 'Centímetros', symbol: 'cm', toBase: (v) => v * 0.01, fromBase: (v) => v * 100 },
      { id: 'm', name: 'Metros', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', name: 'Quilômetros', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v * 0.001 },
      { id: 'in', name: 'Polegadas', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: 'ft', name: 'Pés', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'yd', name: 'Jardas', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'mi', name: 'Milhas', symbol: 'mi', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    ],
  },
  {
    id: 'weight',
    title: 'Peso e massa',
    icon: <Scale className="w-4 h-4" />,
    units: [
      { id: 'mg', name: 'Miligramas', symbol: 'mg', toBase: (v) => v * 0.000001, fromBase: (v) => v * 1000000 },
      { id: 'g', name: 'Gramas', symbol: 'g', toBase: (v) => v * 0.001, fromBase: (v) => v * 1000 },
      { id: 'kg', name: 'Quilogramas', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      { id: 't', name: 'Toneladas', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v * 0.001 },
      { id: 'lb', name: 'Libras', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: 'oz', name: 'Onças', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    ],
  },
  {
    id: 'temperature',
    title: 'Temperatura',
    icon: <Thermometer className="w-4 h-4" />,
    units: [
      { id: 'C', name: 'Graus Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
      { id: 'F', name: 'Graus Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => (v * 9) / 5 + 32 },
      { id: 'K', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    id: 'energy',
    title: 'Energia',
    icon: <Flame className="w-4 h-4" />,
    units: [
      { id: 'J', name: 'Joules', symbol: 'J', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kJ', name: 'Quilojoules', symbol: 'kJ', toBase: (v) => v * 1000, fromBase: (v) => v * 0.001 },
      { id: 'cal', name: 'Calorias térmicas', symbol: 'cal', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      { id: 'kcal', name: 'Quilocalorias (alimentares)', symbol: 'kcal', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      { id: 'kwh', name: 'Quilowatts-hora', symbol: 'kWh', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
      { id: 'btu', name: 'BTU', symbol: 'BTU', toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
    ],
  },
  {
    id: 'area',
    title: 'Área',
    icon: <Grid className="w-4 h-4" />,
    units: [
      { id: 'cm2', name: 'Centímetros quadrados', symbol: 'cm²', toBase: (v) => v * 0.0001, fromBase: (v) => v * 10000 },
      { id: 'm2', name: 'Metros quadrados', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ha', name: 'Hectares', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v * 0.0001 },
      { id: 'km2', name: 'Quilômetros quadrados', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v * 0.000001 },
      { id: 'ft2', name: 'Pés quadrados', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: 'ac', name: 'Acres', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    ],
  },
  {
    id: 'speed',
    title: 'Velocidade',
    icon: <Activity className="w-4 h-4" />,
    units: [
      { id: 'kmh', name: 'Quilômetros por hora', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'ms', name: 'Metros por segundo', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      { id: 'mph', name: 'Milhas por hora', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'knot', name: 'Nós', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
  {
    id: 'time',
    title: 'Tempo',
    icon: <Clock className="w-4 h-4" />,
    units: [
      { id: 'ms', name: 'Milissegundos', symbol: 'ms', toBase: (v) => v * 0.001, fromBase: (v) => v * 1000 },
      { id: 's', name: 'Segundos', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
      { id: 'min', name: 'Minutos', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: 'h', name: 'Horas', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'd', name: 'Dias', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: 'wk', name: 'Semanas', symbol: 'sem', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: 'yr', name: 'Anos', symbol: 'anos', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    ],
  },
  {
    id: 'power',
    title: 'Potência',
    icon: <Zap className="w-4 h-4" />,
    units: [
      { id: 'w', name: 'Watts', symbol: 'W', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kw', name: 'Quilowatts', symbol: 'kW', toBase: (v) => v * 1000, fromBase: (v) => v * 0.001 },
      { id: 'hp', name: 'Cavalos-vapor (hp)', symbol: 'hp', toBase: (v) => v * 745.7, fromBase: (v) => v / 745.7 },
      { id: 'cv', name: 'Cavalo-vapor métrico (cv)', symbol: 'cv', toBase: (v) => v * 735.5, fromBase: (v) => v / 735.5 },
    ],
  },
];

export const Converter: React.FC<ConverterProps> = ({ initialCategory = 'currency', theme }) => {
  const [currentCategory, setCurrentCategory] = useState<ConverterCategory>(initialCategory);
  const activeCat = CATEGORIES.find((c) => c.id === currentCategory) || CATEGORIES[0];

  const [fromUnitId, setFromUnitId] = useState<string>(activeCat.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(activeCat.units[1]?.id || activeCat.units[0].id);
  const [fromValue, setFromValue] = useState<string>('1');

  // Change category handler
  const handleCategoryChange = (catId: ConverterCategory) => {
    setCurrentCategory(catId);
    const targetCat = CATEGORIES.find((c) => c.id === catId)!;
    setFromUnitId(targetCat.units[0].id);
    setToUnitId(targetCat.units[1]?.id || targetCat.units[0].id);
    setFromValue('1');
  };

  const unitFrom = activeCat.units.find((u) => u.id === fromUnitId) || activeCat.units[0];
  const unitTo = activeCat.units.find((u) => u.id === toUnitId) || activeCat.units[1] || activeCat.units[0];

  // Calculate conversion
  const numericInput = parseFloat(fromValue) || 0;
  const baseValue = unitFrom.toBase(numericInput);
  const convertedValue = unitTo.fromBase(baseValue);

  // Format result
  const formattedResult =
    Math.abs(convertedValue) < 0.0001 && convertedValue !== 0
      ? convertedValue.toExponential(4)
      : parseFloat(convertedValue.toFixed(6)).toString();

  const handleSwap = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  return (
    <div className="flex flex-col gap-4 text-white font-sans text-sm select-none p-1">
      {/* Category Horizontal Carousel/Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {CATEGORIES.map((c) => {
          const isSelected = c.id === currentCategory;
          return (
            <button
              key={c.id}
              onClick={() => handleCategoryChange(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isSelected
                  ? 'border-white/40 bg-white/15 text-white font-semibold'
                  : 'border-white/5 bg-black/20 text-[#8e8e8e] hover:text-white'
              }`}
            >
              {c.icon}
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>

      {/* Input Unit & Value */}
      <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#9d9d9d] font-medium">De</span>
            <select
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
              className="bg-[#2b2b2b] text-white border border-[#383838] rounded px-2.5 py-1 text-xs focus:outline-none cursor-pointer"
            >
              {activeCat.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full bg-[#1b1b1b] border border-[#333333] focus:border-white/40 focus:outline-none rounded-lg px-4 py-2.5 text-2xl font-light text-white"
              placeholder="0"
            />
            <span className="absolute right-3 top-3 text-sm text-[#8e8e8e] font-medium">
              {unitFrom.symbol}
            </span>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-1">
          <button
            onClick={handleSwap}
            className="p-1.5 rounded-full bg-[#333333] hover:bg-[#444444] text-white border border-[#444444] transition-colors cursor-pointer"
            title="Inverter unidades"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Output Unit & Value */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#9d9d9d] font-medium">Para</span>
            <select
              value={toUnitId}
              onChange={(e) => setToUnitId(e.target.value)}
              className="bg-[#2b2b2b] text-white border border-[#383838] rounded px-2.5 py-1 text-xs focus:outline-none cursor-pointer"
            >
              {activeCat.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="w-full bg-[#1b1b1b] border border-[#333333] rounded-lg px-4 py-2.5 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-light text-emerald-400 truncate mr-2">
              {formattedResult}
            </span>
            <span className="text-sm text-[#8e8e8e] font-medium shrink-0">{unitTo.symbol}</span>
          </div>
        </div>
      </div>

      {/* Conversion Rate summary line */}
      <div className="text-xs text-[#8e8e8e] px-1 font-mono">
        1 {unitFrom.symbol} = {parseFloat(unitTo.fromBase(unitFrom.toBase(1)).toFixed(6))}{' '}
        {unitTo.symbol}
      </div>
    </div>
  );
};
