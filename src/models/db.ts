import * as PouchDB from 'pouchdb';

const db = new PouchDB('http://localhost:5984/multipass');

export default db;