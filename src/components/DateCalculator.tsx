import React, { useState } from 'react';
import { ThemeConfig } from '../types/calculator';
import { Calendar, ArrowRightLeft, Plus, Minus } from 'lucide-react';

interface DateCalculatorProps {
  theme: ThemeConfig;
}

export const DateCalculator: React.FC<DateCalculatorProps> = ({ theme }) => {
  const [tab, setTab] = useState<'diff' | 'add_sub'>('diff');

  // Difference Mode state
  const todayStr = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState<string>(todayStr);
  const [toDate, setToDate] = useState<string>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split('T')[0];
  });

  // Add/Subtract Mode state
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [opType, setOpType] = useState<'add' | 'sub'>('add');
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(1);
  const [days, setDays] = useState<number>(0);

  // Compute Difference
  const computeDiff = () => {
    const d1 = new Date(fromDate + 'T00:00:00');
    const d2 = new Date(toDate + 'T00:00:00');
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (totalDays === 0) {
      return { totalDays: 0, text: 'Mesmo dia' };
    }

    // Approximate breakdown
    let start = d1 < d2 ? d1 : d2;
    let end = d1 < d2 ? d2 : d1;

    let yDiff = end.getFullYear() - start.getFullYear();
    let mDiff = end.getMonth() - start.getMonth();
    let dDiff = end.getDate() - start.getDate();

    if (dDiff < 0) {
      mDiff -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      dDiff += prevMonth.getDate();
    }
    if (mDiff < 0) {
      yDiff -= 1;
      mDiff += 12;
    }

    const parts: string[] = [];
    if (yDiff > 0) parts.push(`${yDiff} ${yDiff === 1 ? 'ano' : 'anos'}`);
    if (mDiff > 0) parts.push(`${mDiff} ${mDiff === 1 ? 'mês' : 'meses'}`);
    if (dDiff > 0) parts.push(`${dDiff} ${dDiff === 1 ? 'dia' : 'dias'}`);

    return {
      totalDays,
      text: parts.length > 0 ? parts.join(', ') : `${totalDays} dias`,
    };
  };

  // Compute Add/Sub result
  const computeAddSub = () => {
    const d = new Date(baseDate + 'T00:00:00');
    const multiplier = opType === 'add' ? 1 : -1;

    d.setFullYear(d.getFullYear() + years * multiplier);
    d.setMonth(d.getMonth() + months * multiplier);
    d.setDate(d.getDate() + days * multiplier);

    return d.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const diffResult = computeDiff();
  const addSubResult = computeAddSub();

  return (
    <div className="flex flex-col gap-4 text-white font-sans text-sm select-none p-1">
      {/* Segmented Mode Selector */}
      <div className="flex items-center gap-1 p-1 bg-black/30 rounded-lg border border-white/10">
        <button
          onClick={() => setTab('diff')}
          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            tab === 'diff' ? 'bg-white/15 text-white font-semibold' : 'text-[#8e8e8e] hover:text-white'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Diferença entre datas</span>
        </button>
        <button
          onClick={() => setTab('add_sub')}
          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            tab === 'add_sub' ? 'bg-white/15 text-white font-semibold' : 'text-[#8e8e8e] hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Adicionar ou subtrair</span>
        </button>
      </div>

      {/* Difference Mode */}
      {tab === 'diff' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#9d9d9d] mb-1 font-medium">De</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-[#2b2b2b] border border-[#383838] focus:border-white/40 focus:outline-none rounded px-3 py-2 text-white font-sans text-sm cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-[#9d9d9d] mb-1 font-medium">Para</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full bg-[#2b2b2b] border border-[#383838] focus:border-white/40 focus:outline-none rounded px-3 py-2 text-white font-sans text-sm cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-[#333333]">
            <div className="text-xs text-[#9d9d9d] font-medium">Diferença</div>
            <div className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
              {diffResult.text}
            </div>
            <div className="text-xs text-[#8e8e8e] mt-1">
              {diffResult.totalDays} {diffResult.totalDays === 1 ? 'dia no total' : 'dias no total'}
            </div>
          </div>
        </div>
      )}

      {/* Add / Subtract Days Mode */}
      {tab === 'add_sub' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#9d9d9d] mb-1 font-medium">Data base</label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full bg-[#2b2b2b] border border-[#383838] focus:border-white/40 focus:outline-none rounded px-3 py-2 text-white font-sans text-sm cursor-pointer"
            />
          </div>

          {/* Operation choice: Adicionar ou Subtrair */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpType('add')}
              className={`flex-1 py-1.5 rounded border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                opType === 'add'
                  ? 'border-white/40 bg-white/10 text-white'
                  : 'border-[#383838] text-[#8e8e8e] hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Adicionar</span>
            </button>
            <button
              onClick={() => setOpType('sub')}
              className={`flex-1 py-1.5 rounded border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                opType === 'sub'
                  ? 'border-white/40 bg-white/10 text-white'
                  : 'border-[#383838] text-[#8e8e8e] hover:text-white'
              }`}
            >
              <Minus className="w-3.5 h-3.5 text-rose-400" />
              <span>Subtrair</span>
            </button>
          </div>

          {/* Input numbers for years, months, days */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] text-[#9d9d9d] mb-1">Anos</label>
              <input
                type="number"
                min="0"
                max="100"
                value={years}
                onChange={(e) => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#2b2b2b] border border-[#383838] rounded px-2.5 py-1.5 text-center text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#9d9d9d] mb-1">Meses</label>
              <input
                type="number"
                min="0"
                max="1200"
                value={months}
                onChange={(e) => setMonths(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#2b2b2b] border border-[#383838] rounded px-2.5 py-1.5 text-center text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#9d9d9d] mb-1">Dias</label>
              <input
                type="number"
                min="0"
                max="36500"
                value={days}
                onChange={(e) => setDays(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-[#2b2b2b] border border-[#383838] rounded px-2.5 py-1.5 text-center text-white text-sm"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#333333]">
            <div className="text-xs text-[#9d9d9d] font-medium">Data resultante</div>
            <div className="text-xl sm:text-2xl font-light text-white tracking-tight mt-1 capitalize">
              {addSubResult}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
