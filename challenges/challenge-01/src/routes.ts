import { Routes } from './@types/index.js'
import { taskModel } from './models/task-model.js'
import { buildPath } from './utils/build-path.js'

export const routes: Routes = [
  {
    path: buildPath('/tasks'),
    handler: taskModel,
  },
  {
    path: buildPath('/tasks/:id'),
    handler: taskModel,
  },
  {
    path: buildPath('/tasks/:id/complete'),
    handler: taskModel,
  },
]
