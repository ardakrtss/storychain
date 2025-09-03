import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL
})

redis.on('error', (err) => console.log('Redis Client Error', err))

export async function rateLimit(identifier: string, window: number, max: number) {
  try {
    await redis.connect()
    
    const key = `rate_limit:${identifier}`
    const current = await redis.get(key)
    
    if (current === null) {
      await redis.setEx(key, window, '1')
      await redis.disconnect()
      return { success: true, remaining: max - 1 }
    }
    
    const count = parseInt(current)
    
    if (count >= max) {
      await redis.disconnect()
      return { success: false, remaining: 0 }
    }
    
    await redis.incr(key)
    await redis.disconnect()
    
    return { success: true, remaining: max - count - 1 }
  } catch (error) {
    console.error('Rate limit error:', error)
    // Fallback: allow request if Redis fails
    return { success: true, remaining: max - 1 }
  }
}

export async function getRateLimitInfo(identifier: string) {
  try {
    await redis.connect()
    const key = `rate_limit:${identifier}`
    const current = await redis.get(key)
    const ttl = await redis.ttl(key)
    await redis.disconnect()
    
    return {
      current: current ? parseInt(current) : 0,
      ttl: ttl > 0 ? ttl : 0
    }
  } catch (error) {
    return { current: 0, ttl: 0 }
  }
}
