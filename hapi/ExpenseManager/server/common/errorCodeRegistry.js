module.exports = {

  generic: {
    requestValidationError: 10001,
  },

  auth: {
    authTokenRequired: 10101,
    invalidAuthToken : 10102,
  },

  user: {
    create: {
      validationError      : 11101,
      usernameAndEmailTaken: 11102,
      usernameTaken        : 11103,
      emailTaken           : 11104,
    },
    login: {
      invalidCredentials: 11201,
      invalidUsername   : 11202,
      invalidPassword   : 11203,
    },
    authToken: {
      validationError: 11301,
    },
  },

  balance: {
    index: {
      invalidQueryParams: 11401,
      unspecifiedError  : 11402
    }
  }

};
