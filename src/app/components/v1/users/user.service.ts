import * as userDAL from "./user.dal";
import { IUser } from "./user.model";
import { dalTry } from "../../catch";

type Page = { data: IUser[]; page: number; totalPage: number };

export function index(
  limit: number,
  currentPage: number
): Promise<Page | undefined> {
  return dalTry(async () => {
    const skip = limit * (currentPage - 1);
    const count = await userDAL.count();
    const users = await userDAL.all(limit, skip);
    const totalPage = Math.round(count / limit);
    const page: Page = {
      data: users,
      page: currentPage,
      totalPage,
    };
    return page;
  });
}

export function store(data: IUser): Promise<IUser> {
  return dalTry(async () => {
    const user = await userDAL.store(data);
    return user;
  });
}

export function find(id: string): Promise<IUser | null> {
  return dalTry(async () => {
    const user = await userDAL.find(id);
    return user;
  });
}

export function update(id: string, data: IUser): Promise<IUser | null> {
  return dalTry(async () => {
    const user = await userDAL.update(id, data);
    return user;
  });
}

export function del(id: string): Promise<IUser | null> {
  return dalTry(async () => {
    const user = await userDAL.del(id);
    return user;
  });
}
