import React from 'react';
import { AngleUnit, CalcOperation, ThemeConfig } from '../types/calculator';
import { soundFX } from '../utils/audio';
import { Delete } from 'lucide-react';

interface KeypadProps {
  mode: 'standard' | 'scientific';
  theme: ThemeConfig;
  angleUnit: AngleUnit;
  isSecond: boolean;
  activeOperation: CalcOperation | null;
  onDigit: (digit: string) => void;
  onDot: () => void;
  onOperation: (op: CalcOperation) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onBackspace: () => void;
  onUnary: (func: string) => void;
  onToggleSecond: () => void;
  onToggleAngle: () => void;
  onInsertConstant: (constName: 'pi' | 'e' | 'rand') => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  mode,
  theme,
  angleUnit,
  isSecond,
  activeOperation,
  onDigit,
  onDot,
  onOperation,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  onUnary,
  onToggleSecond,
  onToggleAngle,
  onInsertConstant,
}) => {
  const handlePressSound = (isEquals = false, isDelete = false) => {
    soundFX.playForTheme(theme.soundType, isEquals, isDelete);
  };

  const btnBase =
    'relative select-none flex items-center justify-center font-normal transition-all duration-100 active:scale-[0.98] cursor-pointer';

  // =========================================================================
  // MODO PADRÃO (STANDARD MODE) - Exactly matching user's reference screenshot
  // 4 columns x 6 rows
  // =========================================================================
  if (mode === 'standard') {
    return (
      <div className="grid grid-cols-4 gap-[2px] sm:gap-1 w-full select-none pt-1">
        {/* Row 1: % | CE | C | ⌫ */}
        <button
          onClick={() => {
            handlePressSound();
            onUnary('percent');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14`}
          title="Porcentagem"
        >
          %
        </button>
        <button
          onClick={() => {
            handlePressSound(false, true);
            onClearEntry();
          }}
          className={`${btnBase} ${theme.btnSpecial} h-12 sm:h-14 font-medium`}
          title="Limpar entrada atual (CE)"
        >
          CE
        </button>
        <button
          onClick={() => {
            handlePressSound(false, true);
            onClear();
          }}
          className={`${btnBase} ${theme.btnSpecial} h-12 sm:h-14 font-medium`}
          title="Limpar tudo (C)"
        >
          C
        </button>
        <button
          onClick={() => {
            handlePressSound(false, true);
            onBackspace();
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14`}
          title="Apagar dígito (Backspace)"
        >
          <Delete className="w-5 h-5" />
        </button>

        {/* Row 2: 1/x | x² | ²√x | ÷ */}
        <button
          onClick={() => {
            handlePressSound();
            onUnary('reciprocal');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14 text-base italic`}
          title="1 dividido por x"
        >
          ¹/x
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('sqr');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14 text-base`}
          title="x ao quadrado"
        >
          x²
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('sqrt');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14 text-base`}
          title="Raiz quadrada de x"
        >
          ²√x
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('/');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14 ${
            activeOperation === '/' ? theme.btnOpActive : ''
          }`}
          title="Dividir"
        >
          ÷
        </button>

        {/* Row 3: 7 | 8 | 9 | × */}
        <button
          onClick={() => {
            handlePressSound();
            onDigit('7');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          7
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('8');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          8
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('9');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          9
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('*');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14 ${
            activeOperation === '*' ? theme.btnOpActive : ''
          }`}
          title="Multiplicar"
        >
          ×
        </button>

        {/* Row 4: 4 | 5 | 6 | − */}
        <button
          onClick={() => {
            handlePressSound();
            onDigit('4');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          4
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('5');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14 relative`}
        >
          {theme.id === 'cats' && (
            <span className="absolute top-1 right-1.5 text-[9px] opacity-60">🐾</span>
          )}
          5
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('6');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          6
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('-');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14 ${
            activeOperation === '-' ? theme.btnOpActive : ''
          }`}
          title="Subtrair"
        >
          −
        </button>

        {/* Row 5: 1 | 2 | 3 | + */}
        <button
          onClick={() => {
            handlePressSound();
            onDigit('1');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          1
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('2');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          2
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('3');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          3
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('+');
          }}
          className={`${btnBase} ${theme.btnOp} h-12 sm:h-14 ${
            activeOperation === '+' ? theme.btnOpActive : ''
          }`}
          title="Somar"
        >
          +
        </button>

        {/* Row 6: +/- | 0 | , | = */}
        <button
          onClick={() => {
            handlePressSound();
            onUnary('negate');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14 text-lg`}
          title="Mais ou Menos (+/-)"
        >
          +/-
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('0');
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14`}
        >
          0
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDot();
          }}
          className={`${btnBase} ${theme.btnNum} h-12 sm:h-14 font-semibold`}
          title="Vírgula decimal"
        >
          ,
        </button>
        <button
          onClick={() => {
            handlePressSound(true);
            onEquals();
          }}
          className={`${btnBase} ${theme.btnEquals} h-12 sm:h-14`}
          title="Igual (=)"
        >
          =
        </button>
      </div>
    );
  }

  // =========================================================================
  // MODO CIENTÍFICO (SCIENTIFIC MODE) - Faithful to Windows Scientific Calculator!
  // The 3x3 numeric keypad (7 8 9 / 4 5 6 / 1 2 3 / +/- 0 ,) IS PRESERVED INTACT!
  // 5 columns layout:
  // Col 1: Scientific function
  // Cols 2, 3, 4: Classic Telephone Numpad (7 8 9, 4 5 6, 1 2 3, +/- 0 ,)
  // Col 5: Basic Operators (÷, ×, −, +, =)
  // Top rows: DEG/RAD, Trig (sin, cos, tan), constants (pi, e), clear & backspace
  // =========================================================================
  return (
    <div className="flex flex-col gap-[2px] sm:gap-1 w-full select-none pt-1">
      {/* Scientific Subheader Controls: DEG/RAD switch & 2nd shift */}
      <div className="flex items-center justify-between gap-1 mb-1 px-0.5 text-xs">
        <button
          onClick={() => {
            handlePressSound();
            onToggleAngle();
          }}
          className="px-3 py-1 rounded-[3px] bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold cursor-pointer transition-colors"
          title="Alternar Graus (DEG) e Radianos (RAD)"
        >
          {angleUnit.toUpperCase()}
        </button>

        <button
          onClick={() => {
            handlePressSound();
            onToggleSecond();
          }}
          className={`px-3 py-1 rounded-[3px] text-xs font-semibold cursor-pointer transition-colors ${
            isSecond ? 'bg-amber-500 text-black font-bold' : 'bg-white/10 hover:bg-white/15 text-white'
          }`}
          title="Funções inversas (2nd)"
        >
          2ⁿᵈ
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              handlePressSound();
              onInsertConstant('pi');
            }}
            className="px-2.5 py-1 rounded-[3px] bg-white/10 hover:bg-white/15 text-white font-serif text-sm cursor-pointer transition-colors"
            title="Constante Pi (π)"
          >
            π
          </button>
          <button
            onClick={() => {
              handlePressSound();
              onInsertConstant('e');
            }}
            className="px-2.5 py-1 rounded-[3px] bg-white/10 hover:bg-white/15 text-white font-serif text-sm cursor-pointer transition-colors"
            title="Constante de Euler (e)"
          >
            e
          </button>
        </div>
      </div>

      {/* Row 0 of Scientific: Trigonometry & Common Functions */}
      <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? 'asin' : 'sin');
          }}
          className={`${btnBase} ${theme.btnSci} h-10 sm:h-11`}
        >
          {isSecond ? 'sin⁻¹' : 'sin'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? 'acos' : 'cos');
          }}
          className={`${btnBase} ${theme.btnSci} h-10 sm:h-11`}
        >
          {isSecond ? 'cos⁻¹' : 'cos'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? 'atan' : 'tan');
          }}
          className={`${btnBase} ${theme.btnSci} h-10 sm:h-11`}
        >
          {isSecond ? 'tan⁻¹' : 'tan'}
        </button>
        <button
          onClick={() => {
            handlePressSound(false, true);
            onClear();
          }}
          className={`${btnBase} ${theme.btnSpecial} h-10 sm:h-11 font-medium`}
          title="Limpar tudo (C)"
        >
          C
        </button>
        <button
          onClick={() => {
            handlePressSound(false, true);
            onBackspace();
          }}
          className={`${btnBase} ${theme.btnOp} h-10 sm:h-11`}
          title="Apagar dígito (Backspace)"
        >
          <Delete className="w-4 h-4" />
        </button>
      </div>

      {/* Row 1 of Scientific: Hyperbolics & Quick roots */}
      <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
        <button
          onClick={() => {
            handlePressSound();
            onUnary('sinh');
          }}
          className={`${btnBase} ${theme.btnSci} h-10 sm:h-11`}
        >
          sinh
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('cosh');
          }}
          className={`${btnBase} ${theme.btnSci} h-10 sm:h-11`}
        >
          cosh
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('tanh');
          }}
          className={`${btnBase} ${theme.btnSci} h-10 sm:h-11`}
        >
          tanh
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('factorial');
          }}
          className={`${btnBase} ${theme.btnSci} h-10 sm:h-11`}
          title="Fatorial (n!)"
        >
          n!
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('percent');
          }}
          className={`${btnBase} ${theme.btnOp} h-10 sm:h-11`}
          title="Porcentagem (%)"
        >
          %
        </button>
      </div>

      {/* Row 2: x² | ( | ) | 1/x | ÷ */}
      <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? 'cube' : 'sqr');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-12`}
        >
          {isSecond ? 'x³' : 'x²'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? 'cbrt' : 'sqrt');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-12`}
        >
          {isSecond ? '³√x' : '²√x'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('abs');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-12`}
        >
          |x|
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('reciprocal');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-12 text-sm italic`}
        >
          ¹/x
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('/');
          }}
          className={`${btnBase} ${theme.btnOp} h-11 sm:h-12 ${
            activeOperation === '/' ? theme.btnOpActive : ''
          }`}
          title="Dividir"
        >
          ÷
        </button>
      </div>

      {/* Row 3: xʸ | [ 7 ] [ 8 ] [ 9 ] | × */}
      <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
        <button
          onClick={() => {
            handlePressSound();
            onOperation(isSecond ? 'yroot' : '^');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-13 ${
            activeOperation === '^' || activeOperation === 'yroot' ? theme.btnOpActive : ''
          }`}
          title="Potência xʸ ou raiz ʸ√x"
        >
          {isSecond ? 'ʸ√x' : 'xʸ'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('7');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          7
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('8');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          8
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('9');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          9
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('*');
          }}
          className={`${btnBase} ${theme.btnOp} h-11 sm:h-13 ${
            activeOperation === '*' ? theme.btnOpActive : ''
          }`}
          title="Multiplicar"
        >
          ×
        </button>
      </div>

      {/* Row 4: 10ˣ / exp | [ 4 ] [ 5 ] [ 6 ] | − */}
      <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? '2x' : '10x');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-13`}
          title="10 elevado a x"
        >
          {isSecond ? '2ˣ' : '10ˣ'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('4');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          4
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('5');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13 relative`}
        >
          {theme.id === 'cats' && (
            <span className="absolute top-1 right-1 text-[9px] opacity-60">🐾</span>
          )}
          5
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('6');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          6
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('-');
          }}
          className={`${btnBase} ${theme.btnOp} h-11 sm:h-13 ${
            activeOperation === '-' ? theme.btnOpActive : ''
          }`}
          title="Subtrair"
        >
          −
        </button>
      </div>

      {/* Row 5: log₁₀ | [ 1 ] [ 2 ] [ 3 ] | + */}
      <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? 'log2' : 'log10');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-13`}
          title="Logaritmo base 10"
        >
          {isSecond ? 'log₂' : 'log'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('1');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          1
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('2');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          2
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('3');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          3
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onOperation('+');
          }}
          className={`${btnBase} ${theme.btnOp} h-11 sm:h-13 ${
            activeOperation === '+' ? theme.btnOpActive : ''
          }`}
          title="Somar"
        >
          +
        </button>
      </div>

      {/* Row 6: ln / eˣ | [ +/- ] [ 0 ] [ , ] | = */}
      <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
        <button
          onClick={() => {
            handlePressSound();
            onUnary(isSecond ? 'exp' : 'ln');
          }}
          className={`${btnBase} ${theme.btnSci} h-11 sm:h-13`}
          title="Logaritmo natural ln ou eˣ"
        >
          {isSecond ? 'eˣ' : 'ln'}
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onUnary('negate');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13 text-lg`}
          title="Inverter sinal (+/-)"
        >
          +/-
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDigit('0');
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13`}
        >
          0
        </button>
        <button
          onClick={() => {
            handlePressSound();
            onDot();
          }}
          className={`${btnBase} ${theme.btnNum} h-11 sm:h-13 font-semibold`}
          title="Vírgula decimal"
        >
          ,
        </button>
        <button
          onClick={() => {
            handlePressSound(true);
            onEquals();
          }}
          className={`${btnBase} ${theme.btnEquals} h-11 sm:h-13`}
          title="Igual (=)"
        >
          =
        </button>
      </div>
    </div>
  );
};
