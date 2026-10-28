import React, { useState } from 'react';
import { evaluatePythonExpression } from '../utils/pythonScriptGenerator';
import { AngleUnit, ThemeConfig } from '../types/calculator';
import { Play, RotateCcw, ArrowUpRight, Code, BookOpen } from 'lucide-react';

interface PythonTerminalProps {
  theme: ThemeConfig;
  angleUnit: AngleUnit;
  onSendResultToCalculator: (value: string) => void;
  onOpenScriptModal: () => void;
}

interface TerminalLog {
  id: string;
  command: string;
  output: string;
  isError: boolean;
  time: string;
}

export const PythonTerminal: React.FC<PythonTerminalProps> = ({
  theme,
  angleUnit,
  onSendResultToCalculator,
  onOpenScriptModal,
}) => {
  const [inputCode, setInputCode] = useState('math.sqrt(144) + math.sin(math.radians(30)) * 10');
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      command: 'import math',
      output: 'Módulo math carregado com sucesso.',
      isError: false,
      time: '00:00',
    },
    {
      id: 'init-2',
      command: 'math.sqrt(144) + math.sin(math.radians(30)) * 10',
      output: '17.0',
      isError: false,
      time: '00:00',
    },
  ]);

  const runCode = (codeToRun?: string) => {
    const code = (codeToRun || inputCode).trim();
    if (!code) return;

    const evalRes = evaluatePythonExpression(code, angleUnit);
    const newLog: TerminalLog = {
      id: String(Date.now()),
      command: code,
      output: evalRes.error ? `Erro: ${evalRes.error}` : String(evalRes.result),
      isError: Boolean(evalRes.error),
      time: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [...prev, newLog]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  const PRESET_FORMULAS = [
    {
      name: 'Fórmula de Bhaskara (Delta & Raízes)',
      code: '((-(-5) + math.sqrt((-5)**2 - 4 * 1 * 6)) / (2 * 1))',
      desc: 'x = (-b ± √(b² - 4ac)) / 2a',
    },
    {
      name: 'Hipotenusa (Pitágoras)',
      code: 'math.hypot(3, 4)',
      desc: 'c = √(a² + b²)',
    },
    {
      name: 'Juros Compostos',
      code: '1000 * ((1 + 0.05) ** 12)',
      desc: 'M = P · (1 + i)ᵗ',
    },
    {
      name: 'Fatorial Duplo & Combinações',
      code: 'math.factorial(10) / (math.factorial(3) * math.factorial(7))',
      desc: 'C(10, 3) combinações',
    },
    {
      name: 'Trigonometria com Radianos',
      code: 'math.sin(math.pi / 6) + math.cos(math.pi / 3)',
      desc: 'sin(30°) + cos(60°)',
    },
  ];

  return (
    <div className="flex flex-col h-full font-mono text-xs select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-slate-100 text-sm">Terminal Python Interativo</h3>
        </div>

        <button
          onClick={onOpenScriptModal}
          className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 transition-all font-sans text-xs flex items-center gap-1 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ver Script .py Completo</span>
        </button>
      </div>

      {/* Terminal Output Stream */}
      <div className="flex-1 bg-black/60 rounded-xl p-3 border border-white/10 overflow-y-auto space-y-2.5 max-h-[280px] scrollbar-thin">
        {logs.map((log) => (
          <div key={log.id} className="space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span className="text-emerald-400 font-semibold">&gt;&gt;&gt; {log.command}</span>
              <span>{log.time}</span>
            </div>
            <div
              className={`p-2 rounded-lg flex items-center justify-between gap-2 ${
                log.isError
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-white/5 text-slate-200'
              }`}
            >
              <span className="font-bold text-sm tracking-wide">{log.output}</span>
              {!log.isError && log.output !== 'Módulo math carregado com sucesso.' && (
                <button
                  onClick={() => onSendResultToCalculator(log.output)}
                  className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 transition-colors flex items-center gap-1 font-sans text-[11px] cursor-pointer"
                  title="Enviar este valor para a calculadora"
                >
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Usar</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Input Bar */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-emerald-400 font-bold text-sm px-1">&gt;&gt;&gt;</span>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ex: math.sqrt(256) + 2**8"
          className="flex-1 bg-black/50 border border-white/15 focus:border-emerald-400 focus:outline-none rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600 font-mono text-xs"
        />
        <button
          onClick={() => runCode()}
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold flex items-center gap-1 cursor-pointer shadow-md transition-all"
          title="Executar código Python"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Executar</span>
        </button>
        <button
          onClick={() => setLogs([])}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Limpar terminal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Presets Gallery */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-[11px] font-sans font-semibold text-slate-400 mb-1.5">
          Fórmulas Rápidas Prontas:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_FORMULAS.map((f, i) => (
            <button
              key={i}
              onClick={() => {
                setInputCode(f.code);
                runCode(f.code);
              }}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 font-sans text-[10px] text-left transition-colors cursor-pointer"
              title={`${f.desc}: ${f.code}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
