import { Router, Request, Response, NextFunction } from 'express';
import Key from './../models/Key';

class KeyRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const data = await Key.get(req.params.owner);

    res.send(data);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const additionRes = await Key.add(req.body);

    res.send(additionRes);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const deleteRes = await Key.del(req.body.owner);

    res.send(deleteRes);
  }

  private init() {
    this.router.get('/:owner', this.get);
    this.router.delete('/', this.delete);
    this.router.post('/', this.add);
  }
}

export default new KeyRouter().router;