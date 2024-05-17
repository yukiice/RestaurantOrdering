import Redis from 'ioredis';
import { RedisConfig } from './redisConfig';
const redis = new Redis({
...RedisConfig
})
export default redis;