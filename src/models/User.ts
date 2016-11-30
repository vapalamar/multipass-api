import db from './db';

export default class User {
  static async getAll() {
    return await db.allDocs({
      include_docs: true
    });
  }

  static async get(email: string) {
    const users = await User.getAll();
    const user = users.rows.find(row => row.doc['email'] === email);

    if (user) {
      return user.doc;
    }
  }

  static async update(data) {
    const user = await User.get(data.email);

    if (user) {
      Object.assign(user, data);

      return await db.put(user);
    }
  }

  static async add(data) {
    const user = await User.get(data.email);

    if (!user) {
      return await db.post(data);
    }
  }

  static async del(email) {
    const user = await User.get(email);

    if (user) {
      return await db.remove(user);
    }
  }
}