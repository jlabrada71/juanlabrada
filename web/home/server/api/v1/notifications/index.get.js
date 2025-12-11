// curl -H "Content-Type: application/json" 'https://juanlabrada.com/api/v1/messages' >messages.json
import MessageRepository from "./message-repository"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const messageRepository = new MessageRepository(config.MONGO_URL, config.MONGO_DB)
  const result = await messageRepository.select({})

  return result
  // debug('=======')
  // debug(Object.keys(req))
  // debug(req.query)
  // const messageRepository = new MessageRepository()
  // try {
  //   const result = await messageRepository.select(req.query)
  //   debug(result)
  //   returnResult(result, res)
  // } catch (e) {
  //   log(e.stack, 'message-routes')
  //   returnResult('Error', res)
  // }
})
