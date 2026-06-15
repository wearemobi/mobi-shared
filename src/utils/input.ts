export function filterNumericKeys(e: { key: string, preventDefault: () => void }, allowNegative = false) {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', '.'];
  if (allowNegative) allowedKeys.push('-');
  if (!allowedKeys.includes(e.key) && isNaN(Number(e.key))) {
    e.preventDefault();
  }
}
