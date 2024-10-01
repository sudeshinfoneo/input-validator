import Validator from "./Classes/Validator";
const validate = (value) => new Validator(value);

export const validateJson = (data, rules) => {
    let allErrors = {};

    for (const field in rules) {
        const value = data[field] || '';
        const validations = rules[field];
        let validator = new Validator(value);

        for (const rule of validations) {
            if (rule.type === 'required') {
                validator.required(rule.message);
            }
            if(rule.type === 'Object') {
                validator.Object(rule.message);
            }
            if (rule.type === 'string') {
                validator.string(rule.message);
            }
            if (rule.type === 'minLength') {
                validator.minLength(rule.value, rule.message);
            }
            if (rule.type === 'maxLength') {
                validator.maxLength(rule.value, rule.message);
            }
            if (rule.type === 'email') {
                validator.email(rule.message);
            }
            if (rule.type === 'matches') {
                validator.matches(data[rule.field], rule.fieldName, rule.message);
            }
            if (rule.type === 'number') {
                validator.number(rule.message);
            }
            if (rule.type === 'regex') {
                validator.regex(rule.pattern, rule.message);
            }
            if(rule.type === 'pattern') {
                validator.regex(rule.value, rule.message);
            }
        }

        const errors = validator.getErrors();
        if (errors.length > 0) {
            allErrors[field] = errors[0];
        }
    }

    return {
        isValid: Object.keys(allErrors).length === 0,
        errors: allErrors
    };
};

export default validate