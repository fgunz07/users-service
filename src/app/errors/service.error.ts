abstract class ServiceError extends Error {
  abstract name: string;
  abstract fault: string;
  abstract data: string;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ServiceError.prototype);
  }

  abstract serialize(): { name: string; fault: string; data: string; message: string }
}

export default ServiceError;
