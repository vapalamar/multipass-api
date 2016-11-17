import db from './db';
import config from './../config';

export default class User {
  static async get(email) {
    return await db.get(email);
  }

  static async update(data) {
    const user = await User.get(data.email);
    const updatedUser = {
      _id: data.email,
      name: data.name,
      pass: data.pass
    };

    Object.assign(user, updatedUser);

    return await db.put(user);
  }

  static async add(data) {
    return await db.put({
      _id: data.email,
      name: data.name,
      pass: data.pass
    });
  }
}