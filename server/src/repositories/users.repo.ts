import { usersTable, UserInsert, UserSelect } from "../models/users.model";
import { db } from "../models/dp.pool";
import { eq } from "drizzle-orm";

export class UsersRepository {
  static async create(user: UserInsert) {
    return (
      await db
        .insert(usersTable)
        .values(user)
        .returning({ id: usersTable.id, username: usersTable.username })
    )?.[0];
  }

  static async findById(id: string): Promise<UserSelect | undefined> {
    return (await db.select().from(usersTable).where(eq(usersTable.id, id)))[0];
  }

  static async findByUsername(
    username: string
  ): Promise<UserSelect | undefined> {
    return (
      await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username))
    )[0];
  }
}
