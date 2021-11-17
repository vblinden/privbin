import memory from './memory';
import planetscale from './planetscale';

const backend = () => {
  switch (process.env.BACKEND) {
    case 'planetscale':
      return planetscale();
    case 'memory':
      return memory();
    default:
      throw 'The backend you provided is not yet supported.';
  }
};

export default backend;
