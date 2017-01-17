import db from './db';

export default class Lock {

  static async get(owner: string) {
    try {
      const lock = await (db as any).query('locks/all', { key: owner });

      if (lock.rows.length) {
        return lock.rows[0].value;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async add(data) {
    return await db.post(data);
  }

  static async addKeys(data) {
    const lock = await Lock.get(data.owner);

    if (lock) {
      lock.trusted.push(...data.trusted);

      return db.put(lock);
    }
  }

  static async del(nickname: string) {
    const user = await Lock.get(nickname);

    if (user) {
      return await db.remove(user);
    }
  }
}