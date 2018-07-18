const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMeetupInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is Required";
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
