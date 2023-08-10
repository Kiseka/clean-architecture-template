import { RequestValidationError } from "../errors/request-validation-error";
import { isEmpty } from "./commons";

type ValidationRule = {
    value: any
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    format?: RegExp;
};

export type ValidationResult = {
    field: string;
    errors: string[];
};

export const validationErrors = (rules: Record<string, ValidationRule>): ValidationResult[] => {
    const validationResults: ValidationResult[] = [];
    for (const field in rules) {
        const fieldRules = rules[field];
        const value = fieldRules.value || ''; // Default to empty string if value not provided

        const fieldErrors: string[] = [];

        if (fieldRules.required && isEmpty(value)) {
            fieldErrors.push("This field is required");
        }

        if (fieldRules.minLength !== undefined && value.length < fieldRules.minLength) {
            fieldErrors.push(`Minimum length is ${fieldRules.minLength}`);
        }

        if (fieldRules.maxLength !== undefined && value.length > fieldRules.maxLength) {
            fieldErrors.push(`Maximum length is ${fieldRules.maxLength}`);
        }

        if (fieldRules.format && !fieldRules.format.test(value)) {
            fieldErrors.push("Invalid format");
        }

        if (fieldErrors.length > 0) {
            validationResults.push({
                field: field,
                errors: fieldErrors,
            });
        }
    }
    return validationResults;
}

export const validateFields = (rules: Record<string, ValidationRule>) => {
    const validationResults: ValidationResult[] = validationErrors(rules);
    if (validationResults.length > 0) {
        const error = new RequestValidationError()
        error.messages = validationResults
        throw error;
    }
}

// Example usage
// const validationRules = {
//     firstName: { value: "Marvo", required: true, minLength: 5 },
//     password: { value: "password", required: true, minLength: 5, format: /^[a-zA-Z0-9]+$/ },
// };

// const validationResults = validateFields(validationRules);

// console.log(validationResults);
