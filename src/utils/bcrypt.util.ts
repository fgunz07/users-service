import bcrypt from "bcrypt";

export async function hashPassword(pass: string): Promise<string | undefined> {
  try {
    return await bcrypt.hash(pass, 10);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function comparePassword(
  pass: string,
  hash: string
): Promise<boolean | undefined> {
  try {
    return await bcrypt.compare(pass, hash);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
