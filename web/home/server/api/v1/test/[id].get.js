// curl 'localhost:3000/api/test/12?a=test&b=test2'
export default defineEventHandler((event) => {

  const config = useRuntimeConfig()
  const cookies = parseCookies(event)
  const query = getQuery(event)
  return { a: query.a, b: query.b, config, cookies, context: event.context }
})
