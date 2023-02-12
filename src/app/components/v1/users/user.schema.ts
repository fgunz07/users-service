import { checkSchema } from 'express-validator';
export default checkSchema({
  firstName: {
    notEmpty: true,
    errorMessage: 'First name is required',
  },
  middleName: {
    optional: {
      options: {
        nullable: true,
      },
    },
  },
  lastName: {
    notEmpty: true,
    errorMessage: 'Last name is required',
  },
  phone: {
    notEmpty: true,
    errorMessage: 'Phone is required',
  },
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'Invalid email',
    },
    notEmpty: true,
    errorMessage: 'Email is required',
  },
  password: {
    notEmpty: true,
    errorMessage: 'Password is required',
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: 'Password must be at least 8 characters',
    },
  },
  'address.country': {
    notEmpty: true,
    errorMessage: 'Country is required',
  },
  'address.province': {
    notEmpty: true,
    errorMessage: 'Province is required',
  },
  'address.city': {
    notEmpty: true,
    errorMessage: 'City is required',
  },
  'address.postal': {
    notEmpty: true,
    errorMessage: 'Postal code is required',
  },
});
