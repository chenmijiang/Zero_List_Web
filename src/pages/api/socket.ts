// @/pages/api/socket.ts

import { NextApiRequest, NextApiResponse } from 'next'

import { Server } from 'socket.io'
import http from 'http'

const server = http.createServer()
const io = new Server(server, {
  cors: {
    // 允许跨域
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  // 处理任务
  socket.on('message', (msg) => {
    //
    console.log('message: ' + msg)
    io.emit('message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (res.socket && !res.socket.server) {
    res.status(404).end('Error: socket.io should not be used with a custom server.\n')
    return
  }

  server.listen(8000, () => {
    console.log(`> Ready on http://localhost:8000`)
  })
}

export default handler
