// Error Message Response Type
export type ErrorResponseType = {
  error: string,
  // 400 -> Can not process request
  // 404 -> Can not find anything you are searching for 
  // 405 -> Method not allowed
  code?: 404 | 405 | 400,
  stack?: string
};

// Success Message Response Type
export type MessageResponseType = {
  message: string,
  // 200 -> Okay response.
  // 202 -> Request accepted for processing but the result is not finished yet.
  // 203 -> Server responded with a cached result
  code?: 200 | 202 | 203,
};

export type MixedResponseType = ErrorResponseType | MessageResponseType;

/**
 * Endpoint: [ GET ] /users
 * Get All Users
* */
export type UserResponseType = {
  user: {},
} & MixedResponseType;
