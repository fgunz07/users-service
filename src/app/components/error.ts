import AbstractDALError from "../errors/dal.error";
import AbstractRequestError from "../errors/request.error";
import AbstractServiceError from "../errors/service.error";

export class DALError extends AbstractDALError {
  public name = "DALError";
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DALError.prototype);
  }

  serialize(): { name: string; message: string } {
    return {
      name: this.name,
      message: this.message,
    };
  }
}

export class RequestError extends AbstractRequestError {
  public name = "RequestError";
  constructor(message: string, public status: number, public data: string) {
    super(message);

    Object.setPrototypeOf(this, RequestError.prototype);
  }

  serialize(): { name: string; status: number; data: string; message: string } {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}

export class ServiceError extends AbstractServiceError {
  public name = "ServiceError";
  constructor(message: string, public fault: string, public data: string) {
    super(message);

    Object.setPrototypeOf(this, ServiceError.prototype);
  }

  serialize(): { name: string; fault: string; data: string; message: string } {
    return {
      name: this.name,
      fault: this.fault,
      data: this.data,
      message: this.message,
    };
  }
}
