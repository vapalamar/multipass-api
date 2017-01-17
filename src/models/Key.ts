import db from './db';

export default class Key {

  static async get(owner: string) {
    try {
      const key = await (db as any).query('keys/all', { key: owner });

      if (key.rows.length) {
        return key.rows[0].value;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async add(data) {
    return await db.post(data);
  }

  static async del(nickname: string) {
    const key = await Key.get(nickname);

    if (key) {
      return await db.remove(key);
    }
  }
}