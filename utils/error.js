export const errorThrower = (statusCode, message) => {
    //creating a new javascript error
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}