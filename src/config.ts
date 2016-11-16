import * as fs from 'fs';

const config = {
  key: fs.readFileSync(__dirname + './../server.key'),
  cert: fs.readFileSync(__dirname + './../server.crt')
};

export default config;