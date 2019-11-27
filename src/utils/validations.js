let required = (propertyType) => {
    return v => (v && v.length > 0) || `You must input a ${propertyType}`;
}
let minLength = (propertyType, minLength) => {
    return v =>
        (v && v.length >= minLength) ||
        `${propertyType} must be at least ${minLength} characters`;
}
let maxLength = (propertyType, maxLength) => {
    return v =>
        (v && v.length <= maxLength) ||
        `${propertyType} must be less than ${maxLength} characters`;
}

let emailFormat = () => {
    // let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // return v => v && regex.test(v) || "Must be a valid email";
    return true;
}

export default {
    required,
    minLength,
    maxLength,
    emailFormat
}