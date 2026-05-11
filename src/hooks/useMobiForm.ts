import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ValidatorFn } from '../utils/validators';

export interface UseMobiFormConfig<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidatorFn[]>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

/**
 * M.O.B.I.™ Standard Form State Hook.
 * Manages form values, touched state, errors, dynamic validation, and form submissions.
 * Supports synchronous and asynchronous onSubmit handlers with submitting state.
 */
export function useMobiForm<T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
  onSubmit
}: UseMobiFormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to validate a single field against its assigned validation rules
  const validateField = useCallback((field: keyof T, value: unknown) => {
    const rules = validationRules[field];
    if (!rules) return null;

    for (const rule of rules) {
      const errorMsg = rule(value);
      if (errorMsg) return errorMsg;
    }
    return null;
  }, [validationRules]);

  // Set standard value for a field and validate if touched or has existing error
  const setFieldValue = useCallback((field: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [field]: value }));

    if (touched[field] || errors[field]) {
      const errorMsg = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: errorMsg ?? undefined
      }));
    }
  }, [touched, errors, validateField]);

  // Set a specific field error directly (without going through full validation)
  const setFieldError = useCallback((field: keyof T, msg: string | null) => {
    setErrors(prev => ({
      ...prev,
      [field]: msg ?? undefined
    }));
  }, []);

  // Mark a field as touched and run its validation
  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
    if (isTouched) {
      const errorMsg = validateField(field, values[field]);
      setErrors(prev => ({
        ...prev,
        [field]: errorMsg ?? undefined
      }));
    }
  }, [values, validateField]);

  // Change handler generator for input, textarea, and select components
  const handleChange = useCallback((field: keyof T) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFieldValue(field, value);
  }, [setFieldValue]);

  // Blur/Focus out handler generator to set touched status
  const handleBlur = useCallback((field: keyof T) => () => {
    setFieldTouched(field, true);
  }, [setFieldTouched]);

  // Validates all fields registered under validation rules
  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key in validationRules) {
      const field = key as keyof T;
      const errorMsg = validateField(field, values[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  // Form submission handler with automated validation and loading state wrapping
  const handleSubmit = useCallback((e?: FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Mark only validated fields as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    for (const key in validationRules) {
      allTouched[key] = true;
    }
    setTouched(prev => ({ ...prev, ...allTouched }));

    const isValid = validateForm();
    if (isValid && onSubmit) {
      // Use async/await + finally to guarantee isSubmitting is always cleared
      const run = async () => {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      };
      run();
    }
  }, [values, validationRules, validateForm, onSubmit]);

  // Reset form states back to initial configuration
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm
  };
}
export type { ValidatorFn };
