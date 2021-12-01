import Queue from 'bull';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, 'redis://127.0.0.1:6379'),
  name: job.key,
  handle: job.handle,
}))

export default {
  queues,
  add(name, data, options) {
    const queue = this.queues.find(queue => queue.name === name);
    
    return queue.bull.add(data, options);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name);
        console.log(err);
      });
    })
  }
};