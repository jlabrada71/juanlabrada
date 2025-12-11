// curl 'localhost:3000/api/analytics'
import AnalyticsRepository from "./analytics-repository"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const analyticsRepository = new AnalyticsRepository(config.MONGO_URL, config.MONGO_DB)
  const result = await analyticsRepository.select({})

  return result
})
