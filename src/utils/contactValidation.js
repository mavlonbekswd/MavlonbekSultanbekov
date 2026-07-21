const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {string} name
 * @param {string} value
 * @returns {string}
 */
export const validateContactField = (name, value) => {
  const normalizedValue = value.trim();

  if (name === 'name' && !normalizedValue) return 'form-name-required';
  if (name === 'email' && !normalizedValue) return 'form-email-required';
  if (name === 'email' && !emailPattern.test(normalizedValue)) {
    return 'form-email-invalid';
  }
  if (name === 'subject' && !normalizedValue) {
    return 'form-subject-required';
  }
  if (name === 'message' && !normalizedValue) {
    return 'form-message-required';
  }
  if (name === 'message' && normalizedValue.length < 10) {
    return 'form-message-too-short';
  }

  return '';
};

/**
 * @param {Record<string, string>} values
 * @returns {{
 *   errors: Record<string, string>;
 *   isSpam: boolean;
 *   isValid: boolean;
 * }}
 */
export const validateContactForm = (values) => {
  const errors = /** @type {Record<string, string>} */ ({});

  ['name', 'email', 'subject', 'message'].forEach((field) => {
    const error = validateContactField(field, values[field] || '');
    if (error) errors[field] = error;
  });

  return {
    errors,
    isSpam: Boolean(values.company?.trim()),
    isValid: Object.keys(errors).length === 0,
  };
};
