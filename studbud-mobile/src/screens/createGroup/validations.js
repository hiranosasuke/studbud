export const createGroupValidations = values => {
  const errors = {};
  const requiredFields = ["name", "description", "location", "tags"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.name && values.name.length < 5) {
    errors.name = "Name too short";
  }
  if (values.description && values.description.length < 6) {
    errors.description = "Description too short";
  }
  if (values.description && values.description.length > 256) {
    errors.description = "Description too long";
  }
  if (values.name && values.name.length > 32) {
    errors.name = "Name too long";
  }

  return errors;
};
