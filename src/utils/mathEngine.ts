import { AngleUnit, CalcOperation } from '../types/calculator';

// Factorial calculation with safety bounds
export function calculateFactorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n > 170) return Infinity; // JS max float limit
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Convert angle to radians if needed
export function toRadians(val: number, unit: AngleUnit): number {
  return unit === 'deg' ? (val * Math.PI) / 180 : val;
}

// Convert radians to angle unit
export function fromRadians(rad: number, unit: AngleUnit): number {
  return unit === 'deg' ? (rad * 180) / Math.PI : rad;
}

// Format numbers nicely, avoiding JS float artifacts like 0.1 + 0.2
export function cleanPrecision(num: number): number {
  if (!Number.isFinite(num)) return num;
  // Use precision 12 to eliminate rounding noise
  return parseFloat(Number(num.toPrecision(12)).toString());
}

// Format number for realistic calculator display
export function formatDisplayNumber(value: string | number): string {
  if (typeof value === 'string') {
    if (value === 'Error' || value === 'NaN' || value === 'Infinity' || value === '-Infinity') {
      return value;
    }
    if (value.endsWith('.')) {
      const numPart = value.slice(0, -1);
      return formatDisplayNumber(numPart) + '.';
    }
    if (value.includes('.') && value.endsWith('0')) {
      const [intPart, decPart] = value.split('.');
      return formatDisplayNumber(intPart) + '.' + decPart;
    }
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 'Erro';
  if (!isFinite(num)) return num > 0 ? '∞' : '-∞';

  const absNum = Math.abs(num);
  // If number is huge or microscopic, use exponential
  if ((absNum >= 1e11 || (absNum > 0 && absNum < 1e-7)) && absNum !== 0) {
    return num.toExponential(6).replace('e+', 'e');
  }

  // Format with locale grouping (commas for thousands)
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

// Perform binary operations
export function calculateBinary(
  prev: number,
  curr: number,
  op: CalcOperation
): { result: number; pythonCode: string } {
  let res = 0;
  let py = '';

  switch (op) {
    case '+':
      res = prev + curr;
      py = `${prev} + ${curr}`;
      break;
    case '-':
      res = prev - curr;
      py = `${prev} - ${curr}`;
      break;
    case '*':
      res = prev * curr;
      py = `${prev} * ${curr}`;
      break;
    case '/':
      if (curr === 0) {
        return { result: NaN, pythonCode: `${prev} / 0  # ZeroDivisionError` };
      }
      res = prev / curr;
      py = `${prev} / ${curr}`;
      break;
    case '^':
      res = Math.pow(prev, curr);
      py = `math.pow(${prev}, ${curr})`;
      break;
    case 'yroot':
      if (curr === 0) return { result: NaN, pythonCode: `# Erro raiz de índice 0` };
      res = Math.pow(prev, 1 / curr);
      py = `math.pow(${prev}, 1 / ${curr})`;
      break;
  }

  return {
    result: cleanPrecision(res),
    pythonCode: py,
  };
}

// Scientific unary operations
export function calculateUnary(
  val: number,
  func: string,
  angleUnit: AngleUnit
): { result: number; displayLabel: string; pythonCode: string } {
  let result = 0;
  let displayLabel = '';
  let pythonCode = '';

  switch (func) {
    case 'sin': {
      const rad = toRadians(val, angleUnit);
      result = Math.sin(rad);
      displayLabel = `sin(${val})`;
      pythonCode = angleUnit === 'deg' ? `math.sin(math.radians(${val}))` : `math.sin(${val})`;
      break;
    }
    case 'cos': {
      const rad = toRadians(val, angleUnit);
      result = Math.cos(rad);
      displayLabel = `cos(${val})`;
      pythonCode = angleUnit === 'deg' ? `math.cos(math.radians(${val}))` : `math.cos(${val})`;
      break;
    }
    case 'tan': {
      const rad = toRadians(val, angleUnit);
      result = Math.tan(rad);
      displayLabel = `tan(${val})`;
      pythonCode = angleUnit === 'deg' ? `math.tan(math.radians(${val}))` : `math.tan(${val})`;
      break;
    }
    case 'asin': {
      if (val < -1 || val > 1) {
        return { result: NaN, displayLabel: `asin(${val})`, pythonCode: `# ValueError: asin fora de [-1, 1]` };
      }
      const rad = Math.asin(val);
      result = fromRadians(rad, angleUnit);
      displayLabel = `sin⁻¹(${val})`;
      pythonCode = angleUnit === 'deg' ? `math.degrees(math.asin(${val}))` : `math.asin(${val})`;
      break;
    }
    case 'acos': {
      if (val < -1 || val > 1) {
        return { result: NaN, displayLabel: `acos(${val})`, pythonCode: `# ValueError: acos fora de [-1, 1]` };
      }
      const rad = Math.acos(val);
      result = fromRadians(rad, angleUnit);
      displayLabel = `cos⁻¹(${val})`;
      pythonCode = angleUnit === 'deg' ? `math.degrees(math.acos(${val}))` : `math.acos(${val})`;
      break;
    }
    case 'atan': {
      const rad = Math.atan(val);
      result = fromRadians(rad, angleUnit);
      displayLabel = `tan⁻¹(${val})`;
      pythonCode = angleUnit === 'deg' ? `math.degrees(math.atan(${val}))` : `math.atan(${val})`;
      break;
    }
    case 'sinh':
      result = Math.sinh(val);
      displayLabel = `sinh(${val})`;
      pythonCode = `math.sinh(${val})`;
      break;
    case 'cosh':
      result = Math.cosh(val);
      displayLabel = `cosh(${val})`;
      pythonCode = `math.cosh(${val})`;
      break;
    case 'tanh':
      result = Math.tanh(val);
      displayLabel = `tanh(${val})`;
      pythonCode = `math.tanh(${val})`;
      break;
    case 'ln':
      if (val <= 0) return { result: NaN, displayLabel: `ln(${val})`, pythonCode: `# ValueError: log(x <= 0)` };
      result = Math.log(val);
      displayLabel = `ln(${val})`;
      pythonCode = `math.log(${val})`;
      break;
    case 'log10':
      if (val <= 0) return { result: NaN, displayLabel: `log₁₀(${val})`, pythonCode: `# ValueError: log10(x <= 0)` };
      result = Math.log10(val);
      displayLabel = `log₁₀(${val})`;
      pythonCode = `math.log10(${val})`;
      break;
    case 'log2':
      if (val <= 0) return { result: NaN, displayLabel: `log₂(${val})`, pythonCode: `# ValueError: log2(x <= 0)` };
      result = Math.log2(val);
      displayLabel = `math.log2(${val})`;
      pythonCode = `math.log2(${val})`;
      break;
    case 'sqrt':
      if (val < 0) return { result: NaN, displayLabel: `√(${val})`, pythonCode: `# ValueError: sqrt(x < 0)` };
      result = Math.sqrt(val);
      displayLabel = `√(${val})`;
      pythonCode = `math.sqrt(${val})`;
      break;
    case 'cbrt':
      result = Math.cbrt(val);
      displayLabel = `³√(${val})`;
      pythonCode = `math.cbrt(${val})`;
      break;
    case 'sqr':
      result = val * val;
      displayLabel = `(${val})²`;
      pythonCode = `(${val}) ** 2`;
      break;
    case 'cube':
      result = val * val * val;
      displayLabel = `(${val})³`;
      pythonCode = `(${val}) ** 3`;
      break;
    case 'exp':
      result = Math.exp(val);
      displayLabel = `e^(${val})`;
      pythonCode = `math.exp(${val})`;
      break;
    case '10x':
      result = Math.pow(10, val);
      displayLabel = `10^(${val})`;
      pythonCode = `10 ** ${val}`;
      break;
    case '2x':
      result = Math.pow(2, val);
      displayLabel = `2^(${val})`;
      pythonCode = `2 ** ${val}`;
      break;
    case 'factorial':
      result = calculateFactorial(val);
      displayLabel = `${val}!`;
      pythonCode = `math.factorial(${Math.floor(val)})`;
      break;
    case 'reciprocal':
      if (val === 0) return { result: NaN, displayLabel: `1/0`, pythonCode: `# ZeroDivisionError: 1/0` };
      result = 1 / val;
      displayLabel = `1/(${val})`;
      pythonCode = `1 / ${val}`;
      break;
    case 'abs':
      result = Math.abs(val);
      displayLabel = `|${val}|`;
      pythonCode = `abs(${val})`;
      break;
    case 'percent':
      result = val / 100;
      displayLabel = `${val}%`;
      pythonCode = `${val} / 100`;
      break;
    case 'negate':
      result = -val;
      displayLabel = `-(${val})`;
      pythonCode = `-(${val})`;
      break;
    default:
      result = val;
      displayLabel = String(val);
      pythonCode = String(val);
  }

  return {
    result: cleanPrecision(result),
    displayLabel,
    pythonCode,
  };
}
