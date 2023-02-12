import User, { IUser } from "./user.model";

export async function count(): Promise<number> {
  return await User.count();
}

export async function all(
  limit: number,
  skip: number
): Promise<IUser[]> {
  return await User.find().limit(limit).skip(skip);
}

export async function store(data: IUser): Promise<IUser> {
  const user = new User(data);
  await user.save();
  return user;
}

export async function find(id: string): Promise<IUser | null> {
  const user = await User.findOne({ _id: id });
  return user;
}

export async function update(id: string, data: IUser): Promise<IUser | null> {
  const user = await User.findOneAndUpdate({ _id: id }, data, { new: true });
  return user;
}

export async function del(id: string): Promise<IUser | null> {
  const user = await User.findOneAndDelete({ _id: id }, { new: true });
  return user;
}
