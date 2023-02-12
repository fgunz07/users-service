abstract class DALError extends Error {
  abstract name: string;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DALError.prototype);
  }

  abstract serialize(): { name: string; message: string; };
}

export default DALError;
