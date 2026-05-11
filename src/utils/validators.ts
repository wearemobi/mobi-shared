export type ValidatorFn = (value: unknown) => string | null;

/**
 * Standard suite of validation functions for M.O.B.I.™ form inputs.
 */
export const mobiValidators = {
  /**
   * Validates that a value is present (not empty, null, undefined, or empty string/array).
   */
  required: (msg = 'This field is required'): ValidatorFn =>
    (value: unknown) => {
      if (value === undefined || value === null || value === '') return msg;
      if (typeof value === 'string' && value.trim() === '') return msg;
      if (Array.isArray(value) && value.length === 0) return msg;
      return null;
    },

  /**
   * Validates email string format using standard email regex.
   */
  email: (msg = 'Invalid email address format'): ValidatorFn =>
    (value: unknown) => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(String(value)) ? null : msg;
    },

  /**
   * Validates that a value represents a valid number.
   */
  number: (msg = 'Value must be a valid number'): ValidatorFn =>
    (value: unknown) => {
      if (value === undefined || value === null || value === '') return null;
      const parsed = Number(value);
      return isNaN(parsed) ? msg : null;
    },

  /**
   * Validates a minimum numeric value constraint.
   */
  min: (minValue: number, msg?: string): ValidatorFn =>
    (value: unknown) => {
      if (value === undefined || value === null || value === '') return null;
      const num = Number(value);
      if (isNaN(num)) return 'Value must be a valid number';
      return num < minValue ? (msg ?? `Value must be at least ${minValue}`) : null;
    },

  /**
   * Validates a maximum numeric value constraint.
   */
  max: (maxValue: number, msg?: string): ValidatorFn =>
    (value: unknown) => {
      if (value === undefined || value === null || value === '') return null;
      const num = Number(value);
      if (isNaN(num)) return 'Value must be a valid number';
      return num > maxValue ? (msg ?? `Value must be at most ${maxValue}`) : null;
    },

  /**
   * Validates a minimum string length constraint.
   */
  minLength: (minLen: number, msg?: string): ValidatorFn =>
    (value: unknown) => {
      if (!value) return null;
      const str = typeof value === 'string' ? value : String(value);
      return str.length < minLen ? (msg ?? `Must be at least ${minLen} characters`) : null;
    },

  /**
   * Validates a maximum string length constraint.
   */
  maxLength: (maxLen: number, msg?: string): ValidatorFn =>
    (value: unknown) => {
      if (!value) return null;
      const str = typeof value === 'string' ? value : String(value);
      return str.length > maxLen ? (msg ?? `Must be at most ${maxLen} characters`) : null;
    },

  /**
   * Validates currency / money format.
   * Strips prefix currency symbols (like $) and commas, then verifies numeric validity.
   */
  money: (msg = 'Value must be a valid money format'): ValidatorFn =>
    (value: unknown) => {
      if (value === undefined || value === null || value === '') return null;
      const cleaned = String(value).replace(/[^0-9.]/g, '');
      const num = Number(cleaned);
      if (isNaN(num)) return msg;
      // Accept decimals only up to two places
      const dotIndex = cleaned.indexOf('.');
      if (dotIndex !== -1 && cleaned.split('.')[1].length > 2) {
        return msg;
      }
      return null;
    },

  /**
   * Validates a string against a custom regex pattern.
   */
  pattern: (regex: RegExp, msg = 'Value does not match the required format'): ValidatorFn =>
    (value: unknown) => {
      if (!value) return null;
      return regex.test(String(value)) ? null : msg;
    },
};
