const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGroupInput(data) {
  let errors = {};

  //Make sure all empty field are turned into strings.
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.tags = !isEmpty(data.tags) ? data.tags : "";
  data.meetups = !isEmpty(data.meetups) ? data.meetups : "";
  data.users = !isEmpty(data.users) ? data.users : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is required";
  }

  if (Validator.isEmpty(data.tags)) {
    errors.tags = "Please add some tags to describe your group";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
