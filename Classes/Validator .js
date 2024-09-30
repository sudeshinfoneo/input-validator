class Validator {
    constructor(value) {
        this.value = value;
        this.errors = [];
    }

    required(message = 'Value is required') {
        if (this.value === undefined || this.value === null || this.value === '') {
            this.errors.push(message);
        }
        return this;
    }

    Object(message = 'Value must be an object') {
        if (typeof this.value !== 'object' || Array.isArray(this.value) || this.value.value === null || this.value.value === '' || this.value.value === undefined) {
            this.errors.push(message);
        }
        return this;
    }

    string(message = 'Value must be a string') {
        if (typeof this.value !== 'string') {
            this.errors.push(message);
        }
        return this;
    }

    minLength(length, message = `Minimum length is ${length} characters`) {
        if (this.value !== undefined && this.value.length < length) {
            this.errors.push(message);
        }
        return this;
    }

    maxLength(length, message = `Maximum length is ${length} characters`) {
        if (this.value !== undefined && this.value.length > length) {
            this.errors.push(message);
        }
        return this;
    }

    email(message = 'Value must be a valid email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.value)) {
            this.errors.push(message);
        }
        return this;
    }

    matches(compareValue, fieldName = '', message = `Value must match ${fieldName}`) {
        if (this.value !== compareValue) {
            this.errors.push(message);
        }
        return this;
    }

    number(message = 'Value must be a number') {
        if (typeof this.value !== 'number') {
            this.errors.push(message);
        }
        return this;
    }

    regex(pattern, message = 'Value does not match the required format') {
        if (!pattern.test(this.value)) {
            this.errors.push(message);
        }
        return this;
    }

    getErrors() {
        return this.errors;
    }

    isValid() {
        return this.errors.length === 0;
    }
}

export default Validator;