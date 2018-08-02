export const createProfileValidations = values => {
  const errors = {};
  const requiredFields = ["handle", "status", "skills"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.handle && values.handle.length < 5) {
    errors.handle = "Handle too short";
  }

  return errors;
};
