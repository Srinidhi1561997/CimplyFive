import * as Constants from '../Constants';

export const validateString = (value) => {
    if(value!==''){
    return Constants.SIMPLE_STRING.test(value);
    }
};

export const validateAlphaNumeric = value => {
    if(value!==''){
    return Constants.ALPHA_NUMERIC.test(value);
  }
};

export const validateAlphaNumericWithSpace = value => {
    if (value !== '') {
      return Constants.ALPHA_NUMERIC_WITH_WHITESPACE.test(value);
  }
};

export const validatePhoneNumber = (phone_number) => {
    return Constants.RE_PHONE_NO.test(phone_number);
};

export const validateEmail = (email) => {
    return Constants.GMAIL.test(email);
};