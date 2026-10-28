import React, { useState } from 'react';
import { ThemeConfig } from '../types/calculator';
import { soundFX } from '../utils/audio';
import { Delete } from 'lucide-react';

interface ProgrammerCalculatorProps {
  theme: ThemeConfig;
}

type BitSize = 'QWORD' | 'DWORD' | 'WORD' | 'BYTE';
type NumBase = 'HEX' | 'DEC' | 'OCT' | 'BIN';

export const ProgrammerCalculator: React.FC<ProgrammerCalculatorProps> = ({ theme }) => {
  const [val, setVal] = useState<bigint>(0n);
  const [activeBase, setActiveBase] = useState<NumBase>('DEC');
  const [bitSize, setBitSize] = useState<BitSize>('QWORD');

  const maskForSize = (size: BitSize): bigint => {
    switch (size) {
      case 'BYTE':
        return 0xffn;
      case 'WORD':
        return 0xffffn;
      case 'DWORD':
        return 0xffffffffn;
      case 'QWORD':
      default:
        return 0xffffffffffffffffn;
    }
  };

  const applyMask = (n: bigint): bigint => {
    return n & maskForSize(bitSize);
  };

  // String representations
  const hexStr = (val & maskForSize(bitSize)).toString(16).toUpperCase() || '0';
  const decStr = (val & maskForSize(bitSize)).toString(10) || '0';
  const octStr = (val & maskForSize(bitSize)).toString(8) || '0';
  const binRaw = (val & maskForSize(bitSize)).toString(2) || '0';
  // format binary into 4-bit nibbles
  const binFormatted = binRaw.padStart(Math.ceil(binRaw.length / 4) * 4, '0').match(/.{1,4}/g)?.join(' ') || binRaw;

  const handleInputDigit = (d: string) => {
    soundFX.playForTheme(theme.soundType);
    try {
      const baseNum = activeBase === 'HEX' ? 16 : activeBase === 'DEC' ? 10 : activeBase === 'OCT' ? 8 : 2;
      const currentStr = (val & maskForSize(bitSize)).toString(baseNum);
      const nextStr = currentStr === '0' ? d : currentStr + d;
      const parsed = BigInt(activeBase === 'HEX' ? `0x${nextStr}` : activeBase === 'OCT' ? `0o${nextStr}` : activeBase === 'BIN' ? `0b${nextStr}` : nextStr);
      setVal(applyMask(parsed));
    } catch {}
  };

  const handleClear = () => {
    soundFX.playForTheme(theme.soundType, false, true);
    setVal(0n);
  };

  const handleBackspace = () => {
    soundFX.playForTheme(theme.soundType, false, true);
    const baseNum = activeBase === 'HEX' ? 16 : activeBase === 'DEC' ? 10 : activeBase === 'OCT' ? 8 : 2;
    const currentStr = (val & maskForSize(bitSize)).toString(baseNum);
    if (currentStr.length > 1) {
      const nextStr = currentStr.slice(0, -1);
      const parsed = BigInt(activeBase === 'HEX' ? `0x${nextStr}` : activeBase === 'OCT' ? `0o${nextStr}` : activeBase === 'BIN' ? `0b${nextStr}` : nextStr);
      setVal(applyMask(parsed));
    } else {
      setVal(0n);
    }
  };

  const isDigitEnabled = (d: string) => {
    const hexDigits = ['A', 'B', 'C', 'D', 'E', 'F'];
    if (hexDigits.includes(d)) return activeBase === 'HEX';
    if (d >= '8' && d <= '9') return activeBase === 'HEX' || activeBase === 'DEC';
    if (d >= '2' && d <= '7') return activeBase !== 'BIN';
    return true; // 0 and 1 are always enabled
  };

  const btnBase =
    'relative select-none flex items-center justify-center font-normal transition-all duration-100 active:scale-[0.98] cursor-pointer rounded-[4px] h-10 sm:h-11';

  return (
    <div className="flex flex-col gap-2 w-full text-white font-sans text-sm select-none p-1">
      {/* Bit Size toggle */}
      <div className="flex items-center justify-between text-xs px-1 text-[#8e8e8e]">
        <div className="flex items-center gap-1 font-mono">
          {(['QWORD', 'DWORD', 'WORD', 'BYTE'] as BitSize[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                setBitSize(s);
                soundFX.playForTheme(theme.soundType);
              }}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                bitSize === s ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Base Display list: HEX, DEC, OCT, BIN */}
      <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1 font-mono text-xs">
        <div
          onClick={() => setActiveBase('HEX')}
          className={`flex items-baseline justify-between p-1 rounded cursor-pointer transition-colors ${
            activeBase === 'HEX' ? 'bg-white/10 text-amber-400 font-bold' : 'text-[#8e8e8e] hover:text-white'
          }`}
        >
          <span className="w-8">HEX</span>
          <span className="truncate">{hexStr}</span>
        </div>

        <div
          onClick={() => setActiveBase('DEC')}
          className={`flex items-baseline justify-between p-1 rounded cursor-pointer transition-colors ${
            activeBase === 'DEC' ? 'bg-white/10 text-amber-400 font-bold' : 'text-[#8e8e8e] hover:text-white'
          }`}
        >
          <span className="w-8">DEC</span>
          <span className="truncate">{decStr}</span>
        </div>

        <div
          onClick={() => setActiveBase('OCT')}
          className={`flex items-baseline justify-between p-1 rounded cursor-pointer transition-colors ${
            activeBase === 'OCT' ? 'bg-white/10 text-amber-400 font-bold' : 'text-[#8e8e8e] hover:text-white'
          }`}
        >
          <span className="w-8">OCT</span>
          <span className="truncate">{octStr}</span>
        </div>

        <div
          onClick={() => setActiveBase('BIN')}
          className={`flex items-baseline justify-between p-1 rounded cursor-pointer transition-colors ${
            activeBase === 'BIN' ? 'bg-white/10 text-amber-400 font-bold' : 'text-[#8e8e8e] hover:text-white'
          }`}
        >
          <span className="w-8">BIN</span>
          <span className="truncate text-[11px]">{binFormatted}</span>
        </div>
      </div>

      {/* Programmer Keypad */}
      <div className="grid grid-cols-5 gap-[2px] pt-1">
        {/* Row 1: A B C C ⌫ */}
        <button
          disabled={!isDigitEnabled('A')}
          onClick={() => handleInputDigit('A')}
          className={`${btnBase} ${isDigitEnabled('A') ? theme.btnSci : 'opacity-25 cursor-default'}`}
        >
          A
        </button>
        <button
          disabled={!isDigitEnabled('B')}
          onClick={() => handleInputDigit('B')}
          className={`${btnBase} ${isDigitEnabled('B') ? theme.btnSci : 'opacity-25 cursor-default'}`}
        >
          B
        </button>
        <button
          disabled={!isDigitEnabled('C')}
          onClick={() => handleInputDigit('C')}
          className={`${btnBase} ${isDigitEnabled('C') ? theme.btnSci : 'opacity-25 cursor-default'}`}
        >
          C
        </button>
        <button onClick={handleClear} className={`${btnBase} ${theme.btnSpecial}`}>
          C
        </button>
        <button onClick={handleBackspace} className={`${btnBase} ${theme.btnOp}`}>
          <Delete className="w-4 h-4" />
        </button>

        {/* Row 2: D E F << >> */}
        <button
          disabled={!isDigitEnabled('D')}
          onClick={() => handleInputDigit('D')}
          className={`${btnBase} ${isDigitEnabled('D') ? theme.btnSci : 'opacity-25 cursor-default'}`}
        >
          D
        </button>
        <button
          disabled={!isDigitEnabled('E')}
          onClick={() => handleInputDigit('E')}
          className={`${btnBase} ${isDigitEnabled('E') ? theme.btnSci : 'opacity-25 cursor-default'}`}
        >
          E
        </button>
        <button
          disabled={!isDigitEnabled('F')}
          onClick={() => handleInputDigit('F')}
          className={`${btnBase} ${isDigitEnabled('F') ? theme.btnSci : 'opacity-25 cursor-default'}`}
        >
          F
        </button>
        <button
          onClick={() => {
            soundFX.playForTheme(theme.soundType);
            setVal(applyMask(val << 1n));
          }}
          className={`${btnBase} ${theme.btnOp}`}
          title="Bit Shift Left (<<)"
        >
          &lt;&lt;
        </button>
        <button
          onClick={() => {
            soundFX.playForTheme(theme.soundType);
            setVal(applyMask(val >> 1n));
          }}
          className={`${btnBase} ${theme.btnOp}`}
          title="Bit Shift Right (>>)"
        >
          &gt;&gt;
        </button>

        {/* Row 3: 7 8 9 AND OR */}
        <button
          disabled={!isDigitEnabled('7')}
          onClick={() => handleInputDigit('7')}
          className={`${btnBase} ${isDigitEnabled('7') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          7
        </button>
        <button
          disabled={!isDigitEnabled('8')}
          onClick={() => handleInputDigit('8')}
          className={`${btnBase} ${isDigitEnabled('8') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          8
        </button>
        <button
          disabled={!isDigitEnabled('9')}
          onClick={() => handleInputDigit('9')}
          className={`${btnBase} ${isDigitEnabled('9') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          9
        </button>
        <button
          onClick={() => {
            soundFX.playForTheme(theme.soundType);
            setVal(applyMask(~val));
          }}
          className={`${btnBase} ${theme.btnOp}`}
          title="Bitwise NOT (~)"
        >
          NOT
        </button>
        <button
          onClick={() => {
            soundFX.playForTheme(theme.soundType);
            setVal(0n);
          }}
          className={`${btnBase} ${theme.btnOp}`}
        >
          CLR
        </button>

        {/* Row 4: 4 5 6 */}
        <button
          disabled={!isDigitEnabled('4')}
          onClick={() => handleInputDigit('4')}
          className={`${btnBase} ${isDigitEnabled('4') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          4
        </button>
        <button
          disabled={!isDigitEnabled('5')}
          onClick={() => handleInputDigit('5')}
          className={`${btnBase} ${isDigitEnabled('5') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          5
        </button>
        <button
          disabled={!isDigitEnabled('6')}
          onClick={() => handleInputDigit('6')}
          className={`${btnBase} ${isDigitEnabled('6') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          6
        </button>
        <button
          onClick={() => {
            soundFX.playForTheme(theme.soundType);
            setVal(applyMask(val * 2n));
          }}
          className={`${btnBase} ${theme.btnOp}`}
        >
          ×2
        </button>
        <button
          onClick={() => {
            soundFX.playForTheme(theme.soundType);
            setVal(applyMask(val / 2n));
          }}
          className={`${btnBase} ${theme.btnOp}`}
        >
          ÷2
        </button>

        {/* Row 5: 1 2 3 0 */}
        <button
          disabled={!isDigitEnabled('1')}
          onClick={() => handleInputDigit('1')}
          className={`${btnBase} ${isDigitEnabled('1') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          1
        </button>
        <button
          disabled={!isDigitEnabled('2')}
          onClick={() => handleInputDigit('2')}
          className={`${btnBase} ${isDigitEnabled('2') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          2
        </button>
        <button
          disabled={!isDigitEnabled('3')}
          onClick={() => handleInputDigit('3')}
          className={`${btnBase} ${isDigitEnabled('3') ? theme.btnNum : 'opacity-25 cursor-default'}`}
        >
          3
        </button>
        <button
          onClick={() => handleInputDigit('0')}
          className={`${btnBase} ${theme.btnNum} col-span-2`}
        >
          0
        </button>
      </div>
    </div>
  );
};
