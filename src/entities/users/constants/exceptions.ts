const exceptions = {
  InvalidIdBadRequest: {
    status: 400,
    message:
      'Invalid userId. Id length must be 24 characters, and include only numbers and a-f (A-F) letters of the Latin alphabet',
    error: 'Bad Request',
  },
  InvalidBodyBadRequest: {
    status: 400,
    message: [
      'username must be longer than or equal to 3 characters, username must be a string',
      'password must be longer than or equal to 4 characters, password should not be empty',
      'email must be an email',
    ],
    error: 'Bad Request',
  },
  NotFound: {
    status: 404,
    message: 'User not found',
    error: 'Not Found',
  },
  Conflict: {
    status: 409,
    message: 'User with the same username or email already exists',
    error: 'Conflict',
  },
};

export default exceptions;
