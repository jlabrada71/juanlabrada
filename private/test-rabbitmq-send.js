const Sender = require('./lib/message-queue/sender')

const sender = new Sender({ server: 'grouse.rmq.cloudamqp.com', vhost: 'icjeymnk' },
  { user: 'icjeymnk', password: 'kVy9xd4WlGpAcaRdl2rYuweOnxAO71T1' })

sender.send('test-queue', 'Hello World again!')
