import { useState, useCallback } from 'react';
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
export function useMobiForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit
}: UseMobiFormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to validate a single field against its assigned validation rules
  const validateField = useCallback((field: keyof T, value: any) => {
    const rules = validationRules[field];
    if (!rules) return null;

    for (const rule of rules) {
      const errorMsg = rule(value);
      if (errorMsg) return errorMsg;
    }
    return null;
  }, [validationRules]);

  // Set standard value for a field and validate if touched or has existing error
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    if (touched[field] || errors[field]) {
      const errorMsg = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: errorMsg ? errorMsg : undefined
      }));
    }
  }, [touched, errors, validateField]);

  // Mark a field as touched and run its validation
  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
    if (isTouched) {
      const errorMsg = validateField(field, values[field]);
      setErrors(prev => ({
        ...prev,
        [field]: errorMsg ? errorMsg : undefined
      }));
    }
  }, [values, validateField]);

  // Change handler generator for input, textarea, and select components
  const handleChange = useCallback((field: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Mark all fields under rules as touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    for (const key in initialValues) {
      allTouched[key] = true;
    }
    setTouched(allTouched);

    const isValid = validateForm();
    if (isValid && onSubmit) {
      setIsSubmitting(true);
      try {
        const result = onSubmit(values);
        if (result instanceof Promise) {
          return result
            .then(() => {
              setIsSubmitting(false);
            })
            .catch((err) => {
              setIsSubmitting(false);
              throw err;
            });
        }
      } catch (err) {
        setIsSubmitting(false);
        throw err;
      }
      setIsSubmitting(false);
    }
  }, [values, initialValues, validateForm, onSubmit]);

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
    setErrors,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm
  };
}
export type { ValidatorFn };
