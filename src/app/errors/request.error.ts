abstract class RequestError extends Error {
  abstract name: string;
  abstract status: number;
  abstract data: string;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, Request.prototype);
  }

  abstract serialize(): {
    name: string;
    status: number;
    data: string;
    message: string;
  };
}

export default RequestError;
