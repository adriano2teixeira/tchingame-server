import redisClient from "./redis";

class Cache {
  client: any;

  constructor() {
    this.client = redisClient;
  }

  async get(key: string) {
    this.client.get(key);
  }

  async add(key: string, value: string) {
    this.client.set(key, value);
  }

  async remove(key: string) {
    this.client.del(key);
  }
}

export default new Cache();
