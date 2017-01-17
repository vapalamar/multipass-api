import db from './db';

export default class User {
  static async getAll() {
    const users = await (db as any).query('users/all');

    return users.rows;
  }

  static async get(nickname: string) {
    try {
      const user = await (db as any).query('users/all', { key: nickname });

      if (user.rows.length) {
        return user.rows[0].value;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async update(data) {
    const user = await User.get(data.nickname);

    if (user) {
      Object.assign(user, data);

      return await db.put(user);
    }
  }

  static async add(data) {
    const user = await User.get(data.nickname);

    if (!user) {
      return await db.post(data);
    }
  }

  static async del(nickname: string) {
    const user = await User.get(nickname);

    if (user) {
      return await db.remove(user);
    }
  }
}