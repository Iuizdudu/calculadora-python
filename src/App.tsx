/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AngleUnit, AppMode, CalcOperation, ConverterCategory, HistoryItem, ThemeId } from './types/calculator';
import { THEMES } from './utils/themes';
import { calculateBinary, calculateUnary, cleanPrecision } from './utils/mathEngine';
import { soundFX } from './utils/audio';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { DateCalculator } from './components/DateCalculator';
import { Converter } from './components/Converter';
import { ProgrammerCalculator } from './components/ProgrammerCalculator';
import { SettingsModal } from './components/SettingsModal';
import { NavigationMenu } from './components/NavigationMenu';
import { HistoryFlyout } from './components/HistoryFlyout';
import { PythonScriptModal } from './components/PythonScriptModal';
import { PythonTerminal } from './components/PythonTerminal';
import { WitchHat, CatEars } from './components/ThemeDecorations';
import {
  Menu,
  History,
  Settings,
  Maximize2,
  Minus,
  Square,
  X,
  Calculator as CalcIcon,
} from 'lucide-react';

export default function App() {
  // App mode: standard (default) | scientific | date | programmer | converter
  const [appMode, setAppMode] = useState<AppMode>('standard');
  const [converterCat, setConverterCat] = useState<ConverterCategory>('currency');

  // Calculator basic arithmetic state
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<CalcOperation | null>(null);
  const [waitingForNewOperand, setWaitingForNewOperand] = useState<boolean>(false);
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('deg');
  const [isSecond, setIsSecond] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [pythonSyncCode, setPythonSyncCode] = useState<string>('import math');

  // Modals & Panels
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState<boolean>(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState<boolean>(false);

  // Themes and Sound
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('calc_theme');
    return (saved as ThemeId) || 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calc_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const theme = THEMES[currentThemeId] || THEMES.dark;

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('calc_theme', currentThemeId);
  }, [currentThemeId]);

  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history.slice(-50)));
  }, [history]);

  useEffect(() => {
    soundFX.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Digit handler
  const handleDigit = useCallback(
    (digit: string) => {
      if (waitingForNewOperand || display === '0' || display === 'Erro' || display === '∞') {
        setDisplay(digit);
        setWaitingForNewOperand(false);
      } else {
        setDisplay((prev) => (prev.length < 18 ? prev + digit : prev));
      }
      setPythonSyncCode(`entrada = ${digit}`);
    },
    [display, waitingForNewOperand]
  );

  // Decimal comma / dot handler
  const handleDot = useCallback(() => {
    if (waitingForNewOperand) {
      setDisplay('0.');
      setWaitingForNewOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  }, [display, waitingForNewOperand]);

  // Clear All (C)
  const handleClear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewOperand(false);
    setPythonSyncCode('import math');
  }, []);

  // Clear Entry (CE)
  const handleClearEntry = useCallback(() => {
    setDisplay('0');
  }, []);

  // Backspace
  const handleBackspace = useCallback(() => {
    if (waitingForNewOperand || display === 'Erro' || display === '∞') {
      setDisplay('0');
      return;
    }
    if (display.length > 1) {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display, waitingForNewOperand]);

  // Binary operations (+, -, *, /, ^, yroot)
  const handleOperation = useCallback(
    (nextOp: CalcOperation) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
        setExpression(`${inputValue} ${nextOp === '*' ? '×' : nextOp === '/' ? '÷' : nextOp}`);
        setPythonSyncCode(`result = ${inputValue} ${nextOp} ...`);
      } else if (operation) {
        if (waitingForNewOperand) {
          setOperation(nextOp);
          setExpression(`${previousValue} ${nextOp === '*' ? '×' : nextOp === '/' ? '÷' : nextOp}`);
          return;
        }

        const { result, pythonCode } = calculateBinary(previousValue, inputValue, operation);
        if (isNaN(result)) {
          setDisplay('Erro');
          setPreviousValue(null);
          setOperation(null);
          setExpression('');
          setPythonSyncCode(pythonCode);
          return;
        }

        setDisplay(String(result));
        setPreviousValue(result);
        setExpression(`${result} ${nextOp === '*' ? '×' : nextOp === '/' ? '÷' : nextOp}`);
        setPythonSyncCode(pythonCode);
      }

      setWaitingForNewOperand(true);
      setOperation(nextOp);
    },
    [display, previousValue, operation, waitingForNewOperand]
  );

  // Equals (=) handler
  const handleEquals = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation !== null) {
      const { result, pythonCode } = calculateBinary(previousValue, inputValue, operation);

      const opSymbol =
        operation === '*' ? '×' : operation === '/' ? '÷' : operation === '^' ? '^' : operation;
      const fullExpr = `${previousValue} ${opSymbol} ${inputValue} =`;

      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Erro');
        setExpression(fullExpr);
        setPythonSyncCode(pythonCode);
      } else {
        setDisplay(String(result));
        setExpression(fullExpr);
        setPythonSyncCode(`resultado = ${result}  # ${pythonCode}`);

        const newHistoryItem: HistoryItem = {
          id: String(Date.now()),
          timestamp: new Date(),
          expression: fullExpr,
          result: String(result),
          pythonCode,
        };
        setHistory((prev) => [newHistoryItem, ...prev]);
      }

      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewOperand(true);
    }
  }, [display, previousValue, operation]);

  // Scientific unary operations (sin, cos, sqr, sqrt, etc.)
  const handleUnary = useCallback(
    (func: string) => {
      const inputValue = parseFloat(display);
      if (isNaN(inputValue)) return;

      const { result, displayLabel, pythonCode } = calculateUnary(inputValue, func, angleUnit);

      if (isNaN(result)) {
        setDisplay('Erro');
        setExpression(displayLabel + ' =');
        setPythonSyncCode(pythonCode);
        return;
      }

      setDisplay(String(result));
      setExpression(`${displayLabel} =`);
      setPythonSyncCode(`resultado = ${result}  # ${pythonCode}`);
      setWaitingForNewOperand(true);

      const newHistoryItem: HistoryItem = {
        id: String(Date.now()),
        timestamp: new Date(),
        expression: `${displayLabel} =`,
        result: String(result),
        pythonCode,
      };
      setHistory((prev) => [newHistoryItem, ...prev]);
    },
    [display, angleUnit]
  );

  // Memory Actions
  const handleMemoryAction = useCallback(
    (action: 'mc' | 'mr' | 'm+' | 'm-' | 'ms') => {
      const currentVal = parseFloat(display) || 0;
      switch (action) {
        case 'mc':
          setMemory(0);
          setPythonSyncCode('# Memória limpa');
          break;
        case 'mr':
          setDisplay(String(cleanPrecision(memory)));
          setWaitingForNewOperand(true);
          setPythonSyncCode(`display = memory  # ${memory}`);
          break;
        case 'm+':
          setMemory((prev) => cleanPrecision(prev + currentVal));
          setWaitingForNewOperand(true);
          setPythonSyncCode(`memory += ${currentVal}`);
          break;
        case 'm-':
          setMemory((prev) => cleanPrecision(prev - currentVal));
          setWaitingForNewOperand(true);
          setPythonSyncCode(`memory -= ${currentVal}`);
          break;
        case 'ms':
          setMemory(currentVal);
          setWaitingForNewOperand(true);
          setPythonSyncCode(`memory = ${currentVal}`);
          break;
      }
    },
    [display, memory]
  );

  // Insert Constant
  const handleInsertConstant = useCallback((constName: 'pi' | 'e' | 'rand') => {
    let val = 0;
    let py = '';
    if (constName === 'pi') {
      val = cleanPrecision(Math.PI);
      py = 'resultado = math.pi';
    } else if (constName === 'e') {
      val = cleanPrecision(Math.E);
      py = 'resultado = math.e';
    } else {
      val = cleanPrecision(Math.random());
      py = 'import random; resultado = random.random()';
    }
    setDisplay(String(val));
    setPythonSyncCode(py);
    setWaitingForNewOperand(true);
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (appMode !== 'standard' && appMode !== 'scientific') return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        handleDot();
      } else if (e.key === '+' || e.key === '-') {
        handleOperation(e.key as CalcOperation);
      } else if (e.key === '*') {
        handleOperation('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperation('/');
      } else if (e.key === '^') {
        handleOperation('^');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appMode, handleDigit, handleDot, handleOperation, handleEquals, handleBackspace, handleClear]);

  // Get current mode title for subheader
  const getModeTitle = () => {
    switch (appMode) {
      case 'scientific':
        return 'Científica';
      case 'date':
        return 'Cálculo de data';
      case 'programmer':
        return 'Programador';
      case 'converter': {
        const catNames: Record<ConverterCategory, string> = {
          currency: 'Moeda',
          volume: 'Volume',
          length: 'Comprimento',
          weight: 'Peso e massa',
          temperature: 'Temperatura',
          energy: 'Energia',
          area: 'Área',
          speed: 'Velocidade',
          time: 'Tempo',
          power: 'Potência',
        };
        return `Conversor: ${catNames[converterCat] || 'Moeda'}`;
      }
      case 'standard':
      default:
        return 'Padrão';
    }
  };

  return (
    <div
      className={`min-h-screen ${theme.containerBg} ${theme.fontFamily} flex items-center justify-center p-0 sm:p-4 md:p-6 transition-colors duration-200 select-none`}
    >
      {/* Windows Native Calculator Window Frame */}
      <div
        className={`w-full max-w-[420px] sm:rounded-lg ${theme.calculatorBody} ${theme.calculatorBorder} flex flex-col overflow-visible relative transition-all duration-200 min-h-screen sm:min-h-[640px]`}
      >
        {/* Halloween Theme Special: Witch Hat tilted on top-left corner */}
        {theme.id === 'halloween' && <WitchHat />}

        {/* Cats Theme Special: Pointy Cat Ears at the top */}
        {theme.id === 'cats' && <CatEars />}

        {/* 1. Title bar (Window Chrome: Icon + "Calculadora" + Minimize/Maximize/Close) */}
        <div className="h-8 px-3 flex items-center justify-between text-xs text-[#a0a0a0] bg-transparent border-b border-transparent">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-xs bg-[#0078d4] flex items-center justify-center text-white">
              <CalcIcon className="w-2.5 h-2.5" />
            </div>
            <span className="text-[12px] font-normal text-[#cfcfcf]">Calculadora</span>
          </div>

          <div className="flex items-center">
            <button
              className="w-10 h-8 flex items-center justify-center hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors"
              title="Minimizar"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAppMode((m) => (m === 'standard' ? 'scientific' : 'standard'))}
              className="w-10 h-8 flex items-center justify-center hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors"
              title="Alternar Modo Padrão / Científica"
            >
              <Square className="w-3 h-3" />
            </button>
            <button
              className="w-10 h-8 flex items-center justify-center hover:bg-red-600 text-[#a0a0a0] hover:text-white transition-colors"
              title="Fechar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Subheader Bar (☰ Title ⤢ ... 🕓 ⚙️) matching reference screenshot */}
        <div className="px-3 pt-1 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 rounded hover:bg-white/10 text-[#e0e0e0] hover:text-white transition-colors cursor-pointer"
              title="Abrir menu de navegação"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                if (appMode === 'standard') setAppMode('scientific');
                else if (appMode === 'scientific') setAppMode('standard');
                else setIsMenuOpen(true);
              }}
              className="flex items-center gap-1.5 cursor-pointer group"
              title="Clique para alternar modo"
            >
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {getModeTitle()}
              </span>
              <Maximize2 className="w-3.5 h-3.5 text-[#8a8a8a] group-hover:text-white transition-colors" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {(appMode === 'standard' || appMode === 'scientific') && (
              <button
                onClick={() => setIsHistoryOpen(true)}
                className="p-2 rounded hover:bg-white/10 text-[#cfcfcf] hover:text-white transition-colors cursor-pointer relative"
                title="Histórico de operações"
              >
                <History className="w-4 h-4" />
                {history.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            )}

            {/* BOTÃO DE CONFIGURAÇÃO (Onde o usuário personaliza temas e opções) */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded hover:bg-white/10 text-[#cfcfcf] hover:text-white transition-colors cursor-pointer"
              title="Configurações & Temas"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Main Calculator Content Body */}
        <div className="flex-1 flex flex-col justify-end px-3 pb-3">
          {(appMode === 'standard' || appMode === 'scientific') && (
            <>
              {/* Display & Memory Row */}
              <Display
                display={display}
                expression={expression}
                pythonCode={pythonSyncCode}
                theme={theme}
                memory={memory}
                onMemoryAction={handleMemoryAction}
              />

              {/* Keypad Grid (Padrão ou Científica) */}
              <Keypad
                mode={appMode}
                theme={theme}
                angleUnit={angleUnit}
                isSecond={isSecond}
                activeOperation={operation}
                onDigit={handleDigit}
                onDot={handleDot}
                onOperation={handleOperation}
                onEquals={handleEquals}
                onClear={handleClear}
                onClearEntry={handleClearEntry}
                onBackspace={handleBackspace}
                onUnary={handleUnary}
                onToggleSecond={() => setIsSecond((prev) => !prev)}
                onToggleAngle={() => setAngleUnit((prev) => (prev === 'deg' ? 'rad' : 'deg'))}
                onInsertConstant={handleInsertConstant}
              />
            </>
          )}

          {appMode === 'date' && <DateCalculator theme={theme} />}

          {appMode === 'programmer' && <ProgrammerCalculator theme={theme} />}

          {appMode === 'converter' && <Converter initialCategory={converterCat} theme={theme} />}
        </div>
      </div>

      {/* Navigation Drawer Menu (☰) matching Windows Calculator */}
      <NavigationMenu
        isOpen={isMenuOpen}
        currentMode={appMode}
        currentConverterCategory={converterCat}
        onClose={() => setIsMenuOpen(false)}
        onSelectMode={(mode, cat) => {
          setAppMode(mode);
          if (cat) setConverterCat(cat);
        }}
        onOpenPythonTerminal={() => setIsTerminalModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* History Slide-Over Flyout (🕓) */}
      <HistoryFlyout
        isOpen={isHistoryOpen}
        history={history}
        theme={theme}
        onClose={() => setIsHistoryOpen(false)}
        onSelectResult={(val) => {
          setDisplay(val);
          setWaitingForNewOperand(true);
        }}
        onClearHistory={() => setHistory([])}
        onDeleteHistoryItem={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
      />

      {/* Settings & Themes Modal (⚙️) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        currentTheme={currentThemeId}
        soundEnabled={soundEnabled}
        onClose={() => setIsSettingsOpen(false)}
        onSelectTheme={(id) => setCurrentThemeId(id)}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenPythonScript={() => setIsScriptModalOpen(true)}
        onOpenPythonTerminal={() => setIsTerminalModalOpen(true)}
      />

      {/* Standalone Python Script Viewer / Downloader (.py) */}
      <PythonScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />

      {/* Interactive Python Terminal Dialog */}
      {isTerminalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
          <div className="bg-[#1f1f1f] border border-[#333333] rounded-xl w-full max-w-2xl max-h-[85vh] p-4 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#333333]">
              <span className="text-sm font-semibold text-white">Terminal Python Interativo</span>
              <button
                onClick={() => setIsTerminalModalOpen(false)}
                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <PythonTerminal
                theme={theme}
                angleUnit={angleUnit}
                onSendResultToCalculator={(val) => {
                  setDisplay(val);
                  setWaitingForNewOperand(true);
                  setAppMode('standard');
                  setIsTerminalModalOpen(false);
                }}
                onOpenScriptModal={() => {
                  setIsTerminalModalOpen(false);
                  setIsScriptModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
