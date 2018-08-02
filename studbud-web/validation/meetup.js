const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMeetupInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title is Required";
  } else if (Validator.isLength(data.title, { max: 32 })) {
    errors.title = "title cannot be longer than 32 characters";
  }
  if (Validator.isLength(data.description, { max: 256 })) {
    errors.description = "Description cannot be longer than 256 characters";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date is Required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
