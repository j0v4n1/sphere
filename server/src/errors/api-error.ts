export default class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static unauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }
  static incorrectDataError() {
    return new ApiError(400, 'Неверные данные');
  }
  static notFoundError(reason: string) {
    return new ApiError(404, `При попытки найти ${reason} произошла ошибка`);
  }
  static serverSideError(reason: string) {
    return new ApiError(500, `Проблема с ${reason} на стороне сервера`);
  }
  static badRequestError() {
    return new ApiError(500, `Не корректный запрос с клиента`);
  }
}
