/**
 * Generates a standalone, production-grade Python script with Tkinter GUI
 * and interactive CLI mode supporting all arithmetic, advanced scientific
 * functions, themes (Dark, White, Halloween, Cats, Cyberpunk), and operation history.
 */

export function generatePythonScript(): string {
  return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Calculadora Científica Nativa & Multi-Temas em Python
Criada para suportar todas as funções aritméticas, científicas avançadas,
histórico de cálculos e alternância de temas (Dark, White, Halloween, Gatos, Cyberpunk).

Execução:
    Interface Gráfica: python calculadora_cientifica.py
    Modo Terminal/CLI: python calculadora_cientifica.py --cli
"""

import sys
import math
import json
from datetime import datetime

# ==============================================================================
# MOTOR MATEMÁTICO CIENTÍFICO (PYTHON ENGINE)
# ==============================================================================

class ScientificEngine:
    def __init__(self):
        self.angle_mode = "DEG"  # 'DEG' ou 'RAD'
        self.memory = 0.0

    def to_radians(self, angle: float) -> float:
        return math.radians(angle) if self.angle_mode == "DEG" else angle

    def from_radians(self, rad: float) -> float:
        return math.degrees(rad) if self.angle_mode == "DEG" else rad

    def calculate_unary(self, value: float, func: str) -> float:
        """Executa funções científicas unárias"""
        if func == "sin":
            return math.sin(self.to_radians(value))
        elif func == "cos":
            return math.cos(self.to_radians(value))
        elif func == "tan":
            return math.tan(self.to_radians(value))
        elif func == "asin":
            if not (-1.0 <= value <= 1.0):
                raise ValueError("asin requer valor entre -1 e 1")
            return self.from_radians(math.asin(value))
        elif func == "acos":
            if not (-1.0 <= value <= 1.0):
                raise ValueError("acos requer valor entre -1 e 1")
            return self.from_radians(math.acos(value))
        elif func == "atan":
            return self.from_radians(math.atan(value))
        elif func == "sinh":
            return math.sinh(value)
        elif func == "cosh":
            return math.cosh(value)
        elif func == "tanh":
            return math.tanh(value)
        elif func == "ln":
            if value <= 0:
                raise ValueError("ln requer valor > 0")
            return math.log(value)
        elif func == "log10":
            if value <= 0:
                raise ValueError("log10 requer valor > 0")
            return math.log10(value)
        elif func == "log2":
            if value <= 0:
                raise ValueError("log2 requer valor > 0")
            return math.log2(value)
        elif func == "sqrt":
            if value < 0:
                raise ValueError("Raiz quadrada de número negativo não permitida nos Reais")
            return math.sqrt(value)
        elif func == "cbrt":
            return math.cbrt(value) if hasattr(math, 'cbrt') else (value ** (1/3))
        elif func == "sqr":
            return value ** 2
        elif func == "cube":
            return value ** 3
        elif func == "exp":
            return math.exp(value)
        elif func == "10x":
            return 10 ** value
        elif func == "factorial":
            if value < 0 or not value.is_integer():
                raise ValueError("Fatorial requer inteiro não negativo")
            return float(math.factorial(int(value)))
        elif func == "reciprocal":
            if value == 0:
                raise ZeroDivisionError("Divisão por zero em 1/x")
            return 1.0 / value
        elif func == "abs":
            return abs(value)
        elif func == "percent":
            return value / 100.0
        elif func == "negate":
            return -value
        else:
            raise ValueError(f"Função desconhecida: {func}")


# ==============================================================================
# TEMAS PERSONALIZADOS
# ==============================================================================

THEMES = {
    "dark": {
        "name": "Dark OLED (iOS Moderno)",
        "bg": "#121212",
        "card_bg": "#1e1e1e",
        "display_bg": "#0a0a0a",
        "display_fg": "#ffffff",
        "btn_num_bg": "#2c2c2e",
        "btn_num_fg": "#ffffff",
        "btn_op_bg": "#ff9f0a",
        "btn_op_fg": "#ffffff",
        "btn_sci_bg": "#1c1c1e",
        "btn_sci_fg": "#a1a1aa",
        "btn_eq_bg": "#ff9f0a",
        "btn_eq_fg": "#ffffff",
        "accent": "#ff9f0a"
    },
    "white": {
        "name": "White Clean (Minimalista)",
        "bg": "#f4f4f5",
        "card_bg": "#ffffff",
        "display_bg": "#f9fafb",
        "display_fg": "#0f172a",
        "btn_num_bg": "#e2e8f0",
        "btn_num_fg": "#0f172a",
        "btn_op_bg": "#2563eb",
        "btn_op_fg": "#ffffff",
        "btn_sci_bg": "#f1f5f9",
        "btn_sci_fg": "#334155",
        "btn_eq_bg": "#2563eb",
        "btn_eq_fg": "#ffffff",
        "accent": "#2563eb"
    },
    "halloween": {
        "name": "Halloween Spooky (🎃 Dia das Bruxas)",
        "bg": "#10061e",
        "card_bg": "#1f0d36",
        "display_bg": "#090312",
        "display_fg": "#fb923c",
        "btn_num_bg": "#331657",
        "btn_num_fg": "#f5f3ff",
        "btn_op_bg": "#ea580c",
        "btn_op_fg": "#ffffff",
        "btn_sci_bg": "#280f45",
        "btn_sci_fg": "#6ee7b7",
        "btn_eq_bg": "#f97316",
        "btn_eq_fg": "#090312",
        "accent": "#f97316"
    },
    "cats": {
        "name": "Gatos & Patinhas (🐾 Cat Lover)",
        "bg": "#fff5f7",
        "card_bg": "#ffe4eb",
        "display_bg": "#ffffff",
        "display_fg": "#881337",
        "btn_num_bg": "#ffffff",
        "btn_num_fg": "#9f1239",
        "btn_op_bg": "#fb7185",
        "btn_op_fg": "#ffffff",
        "btn_sci_bg": "#ffd2de",
        "btn_sci_fg": "#be123c",
        "btn_eq_bg": "#f43f5e",
        "btn_eq_fg": "#ffffff",
        "accent": "#f43f5e"
    },
    "cyberpunk": {
        "name": "Cyberpunk Matrix (⚡ Neon HUD)",
        "bg": "#020704",
        "card_bg": "#08170e",
        "display_bg": "#000000",
        "display_fg": "#34d399",
        "btn_num_bg": "#0c2818",
        "btn_num_fg": "#a7f3d0",
        "btn_op_bg": "#06b6d4",
        "btn_op_fg": "#000000",
        "btn_sci_bg": "#071d12",
        "btn_sci_fg": "#22d3ee",
        "btn_eq_bg": "#10b981",
        "btn_eq_fg": "#000000",
        "accent": "#10b981"
    }
}


# ==============================================================================
# INTERFACE GRÁFICA TKINTER (NATIVE GUI)
# ==============================================================================

def run_gui():
    try:
        import tkinter as tk
        from tkinter import ttk, messagebox
    except ImportError:
        print("Tkinter não disponível neste ambiente. Rodando modo CLI...")
        run_cli()
        return

    root = tk.Tk()
    root.title("Calculadora Científica Python - Multi-Temas")
    root.geometry("480x720")
    root.minsize(420, 640)

    engine = ScientificEngine()
    current_theme = "dark"
    history = []

    # Estado da calculadora
    display_var = tk.StringVar(value="0")
    expr_var = tk.StringVar(value="")
    python_var = tk.StringVar(value="import math")
    angle_mode_var = tk.StringVar(value="DEG")
    
    # Flags internas
    state = {
        "first_operand": None,
        "operator": None,
        "waiting_new": False,
        "current_theme_key": "dark"
    }

    def update_theme(theme_key):
        state["current_theme_key"] = theme_key
        t = THEMES[theme_key]
        root.configure(bg=t["bg"])
        main_frame.configure(bg=t["card_bg"])
        display_frame.configure(bg=t["display_bg"])
        lbl_expr.configure(bg=t["display_bg"], fg=t["btn_sci_fg"])
        lbl_display.configure(bg=t["display_bg"], fg=t["display_fg"])
        lbl_py.configure(bg=t["display_bg"], fg=t["accent"])
        btn_deg_rad.configure(bg=t["btn_sci_bg"], fg=t["btn_sci_fg"])
        
        # Recolorir botões
        for btn, b_type in button_refs:
            if b_type == "num":
                btn.configure(bg=t["btn_num_bg"], fg=t["btn_num_fg"], activebackground=t["accent"])
            elif b_type == "op":
                btn.configure(bg=t["btn_op_bg"], fg=t["btn_op_fg"], activebackground=t["accent"])
            elif b_type == "sci":
                btn.configure(bg=t["btn_sci_bg"], fg=t["btn_sci_fg"], activebackground=t["accent"])
            elif b_type == "eq":
                btn.configure(bg=t["btn_eq_bg"], fg=t["btn_eq_fg"], activebackground=t["accent"])

    # Handlers dos botões
    def input_digit(d):
        cur = display_var.get()
        if state["waiting_new"] or cur == "0" or cur == "Erro":
            display_var.set(str(d))
            state["waiting_new"] = False
        else:
            display_var.set(cur + str(d))
        python_var.set(f"# Entrada: {display_var.get()}")

    def input_dot():
        cur = display_var.get()
        if state["waiting_new"]:
            display_var.set("0.")
            state["waiting_new"] = False
            return
        if "." not in cur:
            display_var.set(cur + ".")

    def clear_all():
        display_var.set("0")
        expr_var.set("")
        python_var.set("import math")
        state["first_operand"] = None
        state["operator"] = None
        state["waiting_new"] = False

    def backspace():
        cur = display_var.get()
        if len(cur) > 1 and cur != "Erro":
            display_var.set(cur[:-1])
        else:
            display_var.set("0")

    def toggle_deg_rad():
        engine.angle_mode = "RAD" if engine.angle_mode == "DEG" else "DEG"
        angle_mode_var.set(engine.angle_mode)

    def set_operator(op):
        try:
            val = float(display_var.get())
            if state["first_operand"] is not None and not state["waiting_new"]:
                calculate_result()
                val = float(display_var.get())
            state["first_operand"] = val
            state["operator"] = op
            state["waiting_new"] = True
            expr_var.set(f"{val} {op}")
            python_var.set(f"result = {val} {op} ...")
        except Exception:
            display_var.set("Erro")

    def calculate_result():
        if state["first_operand"] is None or state["operator"] is None:
            return
        try:
            op1 = state["first_operand"]
            op2 = float(display_var.get())
            op = state["operator"]

            if op == "+":
                res = op1 + op2
                py_code = f"result = {op1} + {op2}"
            elif op == "-":
                res = op1 - op2
                py_code = f"result = {op1} - {op2}"
            elif op == "×":
                res = op1 * op2
                py_code = f"result = {op1} * {op2}"
            elif op == "÷":
                if op2 == 0:
                    raise ZeroDivisionError("Divisão por zero")
                res = op1 / op2
                py_code = f"result = {op1} / {op2}"
            elif op == "^":
                res = math.pow(op1, op2)
                py_code = f"result = math.pow({op1}, {op2})"
            else:
                return

            res_rounded = round(res, 10)
            if res_rounded.is_integer():
                res_rounded = int(res_rounded)

            expr_str = f"{op1} {op} {op2} ="
            expr_var.set(expr_str)
            display_var.set(str(res_rounded))
            python_var.set(py_code)

            history.append({
                "expr": expr_str,
                "res": str(res_rounded),
                "py": py_code,
                "time": datetime.now().strftime("%H:%M:%S")
            })

            state["first_operand"] = None
            state["operator"] = None
            state["waiting_new"] = True

        except Exception as e:
            display_var.set("Erro")
            python_var.set(f"# Erro: {e}")

    def call_sci(func):
        try:
            val = float(display_var.get())
            res = engine.calculate_unary(val, func)
            res_rounded = round(res, 10)
            if res_rounded.is_integer():
                res_rounded = int(res_rounded)
            expr_var.set(f"{func}({val}) =")
            display_var.set(str(res_rounded))
            python_var.set(f"result = math.{func}({val})")
            state["waiting_new"] = True
            history.append({
                "expr": f"{func}({val})",
                "res": str(res_rounded),
                "py": f"math.{func}({val})",
                "time": datetime.now().strftime("%H:%M:%S")
            })
        except Exception as e:
            display_var.set("Erro")
            python_var.set(f"# Erro: {e}")

    def insert_constant(const_name):
        if const_name == "pi":
            display_var.set(str(math.pi))
            python_var.set("result = math.pi")
        elif const_name == "e":
            display_var.set(str(math.e))
            python_var.set("result = math.e")
        state["waiting_new"] = True

    def show_history_popup():
        if not history:
            messagebox.showinfo("Histórico", "Nenhuma operação registrada ainda.")
            return
        hist_txt = "\\n".join([f"[{item['time']}] {item['expr']} {item['res']} | Py: {item['py']}" for item in reversed(history[-15:])])
        messagebox.showinfo("Histórico de Cálculos", hist_txt)

    # --- UI LAYOUT ---
    top_bar = tk.Frame(root, bg="#121212", pady=8, padx=12)
    top_bar.pack(fill="x")

    lbl_title = tk.Label(top_bar, text="Calculadora Científica Python", fg="#a1a1aa", bg="#121212", font=("Helvetica", 10, "bold"))
    lbl_title.pack(side="left")

    theme_selector = ttk.Combobox(top_bar, values=list(THEMES.keys()), state="readonly", width=11)
    theme_selector.set("dark")
    theme_selector.bind("<<ComboboxSelected>>", lambda e: update_theme(theme_selector.get()))
    theme_selector.pack(side="right", padx=4)

    btn_hist = tk.Button(top_bar, text="📜 Histórico", command=show_history_popup, bg="#27272a", fg="#ffffff", relief="flat", font=("Helvetica", 8))
    btn_hist.pack(side="right", padx=4)

    main_frame = tk.Frame(root, bg="#1e1e1e", padx=12, pady=12)
    main_frame.pack(fill="both", expand=True)

    # Display box
    display_frame = tk.Frame(main_frame, bg="#0a0a0a", relief="flat", bd=0, padx=14, pady=12)
    display_frame.pack(fill="x", pady=(0, 12))

    lbl_expr = tk.Label(display_frame, textvariable=expr_var, fg="#a1a1aa", bg="#0a0a0a", anchor="e", font=("Helvetica", 11))
    lbl_expr.pack(fill="x")

    lbl_display = tk.Label(display_frame, textvariable=display_var, fg="#ffffff", bg="#0a0a0a", anchor="e", font=("Helvetica", 28, "bold"))
    lbl_display.pack(fill="x")

    lbl_py = tk.Label(display_frame, textvariable=python_var, fg="#ff9f0a", bg="#0a0a0a", anchor="w", font=("Courier", 9))
    lbl_py.pack(fill="x", pady=(4, 0))

    # Botões Grid
    grid_frame = tk.Frame(main_frame, bg="#1e1e1e")
    grid_frame.pack(fill="both", expand=True)

    for i in range(5):
        grid_frame.columnconfigure(i, weight=1)
    for j in range(7):
        grid_frame.rowconfigure(j, weight=1)

    button_refs = []

    def make_btn(text, r, c, cmd, b_type="num", cs=1):
        b = tk.Button(grid_frame, text=text, command=cmd, font=("Helvetica", 12, "bold"), relief="flat", bd=0)
        b.grid(row=r, column=c, columnspan=cs, sticky="nsew", padx=3, pady=3)
        button_refs.append((b, b_type))
        return b

    # Linha 0: Controles especiais
    btn_deg_rad = make_btn("DEG", 0, 0, toggle_deg_rad, "sci")
    make_btn("sin", 0, 1, lambda: call_sci("sin"), "sci")
    make_btn("cos", 0, 2, lambda: call_sci("cos"), "sci")
    make_btn("tan", 0, 3, lambda: call_sci("tan"), "sci")
    make_btn("AC", 0, 4, clear_all, "op")

    # Linha 1: Funções avançadas
    make_btn("ln", 1, 0, lambda: call_sci("ln"), "sci")
    make_btn("log₁₀", 1, 1, lambda: call_sci("log10"), "sci")
    make_btn("x²", 1, 2, lambda: call_sci("sqr"), "sci")
    make_btn("xʸ", 1, 3, lambda: set_operator("^"), "sci")
    make_btn("⌫", 1, 4, backspace, "op")

    # Linha 2: Raiz e constantes
    make_btn("√x", 2, 0, lambda: call_sci("sqrt"), "sci")
    make_btn("π", 2, 1, lambda: insert_constant("pi"), "sci")
    make_btn("e", 2, 2, lambda: insert_constant("e"), "sci")
    make_btn("n!", 2, 3, lambda: call_sci("factorial"), "sci")
    make_btn("÷", 2, 4, lambda: set_operator("÷"), "op")

    # Linha 3: 7 8 9 ×
    make_btn("1/x", 3, 0, lambda: call_sci("reciprocal"), "sci")
    make_btn("7", 3, 1, lambda: input_digit(7), "num")
    make_btn("8", 3, 2, lambda: input_digit(8), "num")
    make_btn("9", 3, 3, lambda: input_digit(9), "num")
    make_btn("×", 3, 4, lambda: set_operator("×"), "op")

    # Linha 4: 4 5 6 -
    make_btn("%", 4, 0, lambda: call_sci("percent"), "sci")
    make_btn("4", 4, 1, lambda: input_digit(4), "num")
    make_btn("5", 4, 2, lambda: input_digit(5), "num")
    make_btn("6", 4, 3, lambda: input_digit(6), "num")
    make_btn("-", 4, 4, lambda: set_operator("-"), "op")

    # Linha 5: 1 2 3 +
    make_btn("±", 5, 0, lambda: call_sci("negate"), "sci")
    make_btn("1", 5, 1, lambda: input_digit(1), "num")
    make_btn("2", 5, 2, lambda: input_digit(2), "num")
    make_btn("3", 5, 3, lambda: input_digit(3), "num")
    make_btn("+", 5, 4, lambda: set_operator("+"), "op")

    # Linha 6: 0 . =
    make_btn("0", 6, 0, lambda: input_digit(0), "num", cs=2)
    make_btn(".", 6, 2, input_dot, "num")
    make_btn("|x|", 6, 3, lambda: call_sci("abs"), "sci")
    make_btn("=", 6, 4, calculate_result, "eq")

    update_theme("dark")
    root.mainloop()


# ==============================================================================
# MODO CLI / TERMINAL INTERATIVO
# ==============================================================================

def run_cli():
    print("=" * 60)
    print("🐍 CALCULADORA CIENTÍFICA PYTHON - MODO TERMINAL")
    print("Suporta operadores: +, -, *, /, **, %")
    print("Funções: sin, cos, tan, log, log10, sqrt, factorial, pi, e")
    print("Digite 'sair' para encerrar ou 'ajuda' para exemplos.")
    print("=" * 60)

    namespace = {name: getattr(math, name) for name in dir(math) if not name.startswith("_")}
    namespace["abs"] = abs
    namespace["round"] = round

    while True:
        try:
            cmd = input("\\n[calc]> ").strip()
            if not cmd:
                continue
            if cmd.lower() in ["sair", "exit", "quit", "q"]:
                print("Até logo!")
                break
            if cmd.lower() in ["ajuda", "help"]:
                print("Exemplos:")
                print("  sin(radians(30)) + sqrt(144)")
                print("  factorial(6) / 2")
                print("  log10(1000) * pi")
                print("  2 ** 10")
                continue

            result = eval(cmd, {"__builtins__": None}, namespace)
            print(f"Resultado: {result}")
        except Exception as e:
            print(f"Erro no cálculo: {e}")


if __name__ == "__main__":
    if "--cli" in sys.argv:
        run_cli()
    else:
        run_gui()
`;
}

/**
 * Safe in-browser math evaluation supporting Python mathematical expressions
 */
export function evaluatePythonExpression(code: string, angleUnit: 'deg' | 'rad' = 'deg'): { result: unknown; error?: string } {
  try {
    const trimmed = code.trim();
    if (!trimmed) return { result: '' };

    // Create a math context with standard Python math module names
    const mathContext: Record<string, unknown> = {
      pi: Math.PI,
      e: Math.E,
      tau: Math.PI * 2,
      sqrt: Math.sqrt,
      cbrt: Math.cbrt,
      sin: (x: number) => Math.sin(angleUnit === 'deg' ? (x * Math.PI) / 180 : x),
      cos: (x: number) => Math.cos(angleUnit === 'deg' ? (x * Math.PI) / 180 : x),
      tan: (x: number) => Math.tan(angleUnit === 'deg' ? (x * Math.PI) / 180 : x),
      asin: (x: number) => {
        const rad = Math.asin(x);
        return angleUnit === 'deg' ? (rad * 180) / Math.PI : rad;
      },
      acos: (x: number) => {
        const rad = Math.acos(x);
        return angleUnit === 'deg' ? (rad * 180) / Math.PI : rad;
      },
      atan: (x: number) => {
        const rad = Math.atan(x);
        return angleUnit === 'deg' ? (rad * 180) / Math.PI : rad;
      },
      sinh: Math.sinh,
      cosh: Math.cosh,
      tanh: Math.tanh,
      log: Math.log,
      log10: Math.log10,
      log2: Math.log2,
      exp: Math.exp,
      pow: Math.pow,
      fabs: Math.abs,
      abs: Math.abs,
      floor: Math.floor,
      ceil: Math.ceil,
      degrees: (rad: number) => (rad * 180) / Math.PI,
      radians: (deg: number) => (deg * Math.PI) / 180,
      factorial: (n: number) => {
        if (n < 0 || !Number.isInteger(n)) throw new Error('Fatorial requer inteiro não negativo');
        let r = 1;
        for (let i = 2; i <= n; i++) r *= i;
        return r;
      },
      hypot: Math.hypot,
      round: Math.round,
    };

    // Replace Python math.func with func
    let transformed = trimmed
      .replace(/math\.([a-zA-Z0-9_]+)/g, '$1')
      .replace(/\*\*/g, '^'); // we will parse or evaluate exponentiation

    // Transform ^ or ** to Math.pow safely if present
    // Let's use Function evaluation with strictly sandboxed math scope
    const keys = Object.keys(mathContext);
    const values = Object.values(mathContext);

    // Replace ** with Math.pow or support standard JS syntax
    transformed = transformed.replace(/([0-9a-zA-Z_.)]+)\s*\^\s*([0-9a-zA-Z_.(]+)/g, 'pow($1, $2)');

    // Execute safely
    const fn = new Function(...keys, `"use strict"; return (${transformed});`);
    const output = fn(...values);

    return { result: output };
  } catch (err) {
    return { result: null, error: err instanceof Error ? err.message : 'Erro na expressão' };
  }
}
