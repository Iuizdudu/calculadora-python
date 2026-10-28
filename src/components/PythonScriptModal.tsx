import React, { useState } from 'react';
import { generatePythonScript } from '../utils/pythonScriptGenerator';
import { X, Copy, Check, Download, Terminal, Play } from 'lucide-react';

interface PythonScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonScriptModal: React.FC<PythonScriptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const pythonScript = generatePythonScript();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([pythonScript], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora_cientifica.py';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Código Python Nativo (calculadora_cientifica.py)
              </h2>
              <p className="text-xs text-neutral-400">
                Script completo com interface gráfica (Tkinter) e modo CLI para executar no seu computador
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Baixar arquivo calculadora_cientifica.py"
            >
              <Download className="w-4 h-4" />
              <span>Baixar .py</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-neutral-700"
              title="Copiar código para a área de transferência"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions banner */}
        <div className="px-6 py-2.5 bg-neutral-800/40 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <Play className="w-3.5 h-3.5 text-amber-400" />
            <span>Como rodar no terminal do seu computador:</span>
            <code className="px-2 py-0.5 rounded bg-black/60 text-emerald-400 font-mono">
              python calculadora_cientifica.py
            </code>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <span>Modo CLI direto:</span>
            <code className="px-2 py-0.5 rounded bg-black/60 text-cyan-400 font-mono">
              python calculadora_cientifica.py --cli
            </code>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#0d1117] text-neutral-300 font-mono text-xs leading-relaxed select-text">
          <pre className="whitespace-pre-wrap">{pythonScript}</pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between text-xs text-neutral-400">
          <span>Python 3.8+ · Biblioteca padrão (math, tkinter, json) · Sem dependências externas</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
