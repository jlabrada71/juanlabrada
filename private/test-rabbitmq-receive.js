const Receiver = require('./lib/message-queue/receiver')

const receiver = new Receiver({ server: 'grouse.rmq.cloudamqp.com', vhost: 'icjeymnk' },
  { user: 'icjeymnk', password: 'kVy9xd4WlGpAcaRdl2rYuweOnxAO71T1' })

receiver.receive('test-queue', (message) => { console.log(message.content.toString()) })
