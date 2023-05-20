// pages/api/tasks.ts

import { NextApiRequest, NextApiResponse } from 'next'

// 飞布接口，用于操作数据库
import { createTask, editTask, deleteTask, getTasks } from '@/utils/task'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req

  switch (method) {
    case 'GET':
      const tasks = await getTasks(query.userId)
      res.status(200).json({ tasks })
      break

    case 'POST':
      // 处理创建或更新任务的请求
      const { taskId, taskData } = req.body
      try {
        // 获取任务的当前版本号
        const result = await getTasks(query.userId)

        const currentVersion = result[0]?.version ?? 0

        // 新建任务
        if (currentVersion === 0) {
          await createTask(taskData)
          res.status(200).end()
          return
        }

        // 检查传入的任务数据的版本号是否比当前版本号新
        if (taskData.version > currentVersion) {
          // 将任务数据插入到数据库中
          await editTask(taskId, taskData)
        }
        res.status(200).end()
      } catch (error) {
        // 如果出现错误，将错误信息返回给客户端
        res.status(500).json({ error })
      }
      break

    case 'PUT':
      const editedTask = await editTask(query.taskId, body)
      res.status(200).json({ editedTask })
      break

    case 'DELETE':
      const deletedTask = await deleteTask(query.taskId)
      res.status(200).json({ deletedTask })
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
