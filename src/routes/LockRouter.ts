import { Router, Request, Response, NextFunction } from 'express';
import Lock from './../models/Lock';

class LockRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const data = await Lock.get(req.params.owner);

    res.send(data);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const additionRes = await Lock.add(req.body);

    res.send(additionRes);
  }

  async addKeys(req: Request, res: Response, next: NextFunction) {
    const updateRes = await Lock.addKeys(req.body);

    res.send(updateRes);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const deleteRes = await Lock.del(req.body.owner);

    res.send(deleteRes);
  }

  private init() {
    this.router.get('/:owner', this.get);
    this.router.delete('/', this.delete);
    this.router.post('/', this.add);
    this.router.put('/', this.addKeys);
  }
}

export default new LockRouter().router;