/**
 * Form validation utilities
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Username validation rules
 */
export const usernameValidation = {
  required: "Kullanıcı adı gereklidir",
  minLength: {
    value: 3,
    message: "Kullanıcı adı en az 3 karakter olmalıdır",
  },
  maxLength: {
    value: 20,
    message: "Kullanıcı adı en fazla 20 karakter olabilir",
  },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir",
  },
};

/**
 * Email validation rules
 */
export const emailValidation = {
  required: "E-posta gereklidir",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Geçerli bir e-posta adresi giriniz",
  },
};

/**
 * Password validation rules
 */
export const passwordValidation = {
  required: "Şifre gereklidir",
  minLength: {
    value: 6,
    message: "Şifre en az 6 karakter olmalıdır",
  },
  maxLength: {
    value: 50,
    message: "Şifre en fazla 50 karakter olabilir",
  },
};

/**
 * Strong password validation rules
 */
export const strongPasswordValidation = {
  ...passwordValidation,
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir",
  },
};

/**
 * Board name validation rules
 */
export const boardNameValidation = {
  required: "Board adı gereklidir",
  minLength: {
    value: 3,
    message: "Board adı en az 3 karakter olmalıdır",
  },
  maxLength: {
    value: 50,
    message: "Board adı en fazla 50 karakter olabilir",
  },
  pattern: {
    value: /^[a-zA-Z0-9\s\-_]+$/,
    message: "Board adı sadece harf, rakam, boşluk, tire ve alt çizgi içerebilir",
  },
};

/**
 * Task title validation rules
 */
export const taskTitleValidation = {
  required: "Task başlığı gereklidir",
  minLength: {
    value: 3,
    message: "Task başlığı en az 3 karakter olmalıdır",
  },
  maxLength: {
    value: 100,
    message: "Task başlığı en fazla 100 karakter olabilir",
  },
};

/**
 * Task description validation rules
 */
export const taskDescriptionValidation = {
  maxLength: {
    value: 500,
    message: "Task açıklaması en fazla 500 karakter olabilir",
  },
};

/**
 * Column title validation rules
 */
export const columnTitleValidation = {
  required: "Kolon başlığı gereklidir",
  minLength: {
    value: 2,
    message: "Kolon başlığı en az 2 karakter olmalıdır",
  },
  maxLength: {
    value: 30,
    message: "Kolon başlığı en fazla 30 karakter olabilir",
  },
};

/**
 * Validate field against rules
 */
export function validateField(value: any, rules: ValidationRule): ValidationResult {
  // Check required
  if (rules.required && (!value || value.toString().trim() === "")) {
    return { isValid: false, message: "Bu alan gereklidir" };
  }

  // If field is empty and not required, it's valid
  if (!value || value.toString().trim() === "") {
    return { isValid: true };
  }

  const stringValue = value.toString();

  // Check minimum length
  if (rules.minLength && stringValue.length < rules.minLength) {
    return {
      isValid: false,
      message: `En az ${rules.minLength} karakter olmalıdır`,
    };
  }

  // Check maximum length
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return {
      isValid: false,
      message: `En fazla ${rules.maxLength} karakter olabilir`,
    };
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return { isValid: false, message: "Geçersiz format" };
  }

  // Check custom validation
  if (rules.custom) {
    const customResult = rules.custom(value);
    if (typeof customResult === "string") {
      return { isValid: false, message: customResult };
    }
    if (!customResult) {
      return { isValid: false, message: "Geçersiz değer" };
    }
  }

  return { isValid: true };
}

/**
 * Validate multiple fields
 */
export function validateFields(
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};

  Object.keys(rules).forEach((fieldName) => {
    const fieldValue = data[fieldName];
    const fieldRules = rules[fieldName];
    results[fieldName] = validateField(fieldValue, fieldRules);
  });

  return results;
}

/**
 * Check if validation results have any errors
 */
export function hasValidationErrors(
  results: Record<string, ValidationResult>
): boolean {
  return Object.values(results).some((result) => !result.isValid);
}

/**
 * Get first validation error message
 */
export function getFirstValidationError(
  results: Record<string, ValidationResult>
): string | null {
  for (const result of Object.values(results)) {
    if (!result.isValid && result.message) {
      return result.message;
    }
  }
  return null;
}

/**
 * Common validation functions
 */
export const validators = {
  isEmail: (email: string): boolean => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  },

  isUsername: (username: string): boolean => {
    return /^[a-zA-Z0-9_]+$/.test(username) && username.length >= 3 && username.length <= 20;
  },

  isStrongPassword: (password: string): boolean => {
    return (
      password.length >= 6 &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    );
  },

  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0;
  },

  isMinLength: (value: string, minLength: number): boolean => {
    return value.length >= minLength;
  },

  isMaxLength: (value: string, maxLength: number): boolean => {
    return value.length <= maxLength;
  },

  isAlphanumeric: (value: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(value);
  },

  isAlphanumericWithSpaces: (value: string): boolean => {
    return /^[a-zA-Z0-9\s]+$/.test(value);
  },
};
