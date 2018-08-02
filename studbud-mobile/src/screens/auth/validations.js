export const signupValidations = values => {
  const errors = {};
  const requiredFields = ["name", "email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.name && values.name.length < 5) {
    errors.name = "Please enter your full name";
  }
  if (values.email && values.email.length < 6) {
    errors.description = "Please enter a valid email address";
  }
  if (values.password && values.passowrd.length < 6) {
    errors.description = "Password too short";
  }

  return errors;
};
