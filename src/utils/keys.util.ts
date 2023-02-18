export function publicKey(): string {
  const key = process.env.PUBLIC_KEY as string;
  return key;
}

export function privateKey(): string {
  const key = process.env.PRIVATE_KEY as string;
  return key;
}
