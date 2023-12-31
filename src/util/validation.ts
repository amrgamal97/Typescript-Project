// User Inputs Validations
export interface Validation {
  value: string | number;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
}

export function validationChecker(inputValidation: Validation): boolean {
  let validationState: boolean = true;

  if (inputValidation.required) {
    validationState =
      validationState && inputValidation.value.toString().trim().length >= 0;
  }

  if (
    inputValidation.minLength != null &&
    typeof inputValidation.value === "string"
  ) {
    validationState =
      validationState &&
      inputValidation.value.length >= inputValidation.minLength;
  }

  if (
    inputValidation.maxLength != null &&
    typeof inputValidation.value === "string"
  ) {
    validationState =
      validationState &&
      inputValidation.value.length <= inputValidation.maxLength;
  }

  if (
    inputValidation.min != null &&
    typeof inputValidation.value === "number"
  ) {
    validationState =
      validationState && inputValidation.value >= inputValidation.min;
  }
  if (
    inputValidation.max != null &&
    typeof inputValidation.value === "number"
  ) {
    validationState =
      validationState && inputValidation.value <= inputValidation.max;
  }

  return validationState;
}
