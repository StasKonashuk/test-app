const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const validateForm = (formValues) => {
  const result = {};

  const entries = Object.entries(formValues);

  for (let [key, value] of entries) {
    result[key] = {
      isValid: true,
    };

    if (!value) {
      result[key].isValid = false;
      result[key].errorMsg = `${key} is required`;
    }

    if (key === "email" && value && !isValidEmail(value)) {
      result[key].isValid = false;
      result[key].errorMsg = "Invalid email address";
    }
  }

  return result;
};
