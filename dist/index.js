import React from "react";
import FormGenerator from "./FormGenerator";
import propTypes from "prop-types";

const FormGeneratorWrapper = ({
  children,
  formSchema
}) => {
  let defaultValues = {};
  formSchema.forEach(field => {
    if (!field.defaultValue && (field.type === "radio" || field.type === "select")) {
      // when a user is filling out the form if their choice is the default value
      // and they make no interaction with the field the default value should be the one submitted.
      defaultValues = { ...defaultValues,
        [field.name]: field.options[0]
      };
    }

    if (field.defaultValue) {
      defaultValues = { ...defaultValues,
        [field.name]: field.defaultValue
      };
    }
  });
  return React.createElement(React.Fragment, null, children(defaultValues));
};

const AntdFormGenerator = ({
  onSubmit,
  formSchema,
  submitButton,
  innerClassName,
  outerClassName
}) => React.createElement(FormGeneratorWrapper, {
  formSchema: formSchema
}, defaultValues => React.createElement(FormGenerator, {
  outerClassName: outerClassName,
  innerClassName: innerClassName,
  formSchema: formSchema,
  defaultValues: defaultValues,
  submitFormAsync: onSubmit,
  renderSubmitButton: handleSubmit => submitButton(handleSubmit)
}));

AntdFormGenerator.propTypes = {
  innerClassName: propTypes.string,
  outerClassName: propTypes.string,
  formSchema: propTypes.arrayOf(propTypes.object).isRequired,
  onSubmit: propTypes.func,
  submitButton: propTypes.func.isRequired
};
export default AntdFormGenerator;