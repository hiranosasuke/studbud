export const createMeetupValidations = values => {
  const errors = {};
  const requiredFields = ['title', 'description'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.title && values.title.length < 6) {
    errors.title = 'Title too short';
  }
  if (values.description && values.description.length < 6) {
    errors.description = 'Description too short';
  }

  return errors;
};
