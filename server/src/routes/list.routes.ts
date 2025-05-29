import { Router } from 'express'

import listController from '@/controllers/listController'

const listRouter = Router()

listRouter.get('/', listController.getAll as any)

export { listRouter }
