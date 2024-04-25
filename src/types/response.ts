export type ErrorResponseType = {
  error: string,
  // 400 -> Can not process request
  // 404 -> Can not find anything you are searching for 
  // 405 -> Method not allowed
  code?: 404 | 405 | 400,
  stack?: string
};
