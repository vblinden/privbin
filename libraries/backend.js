import memory from './memory';
import database from './database';

const backend = () => {
  switch (process.env.BACKEND) {
    case 'database':
      return database();
    case 'memory':
      return memory();
    default:
      throw 'The backend you provided is not yet supported.';
  }
};

export default backend;
