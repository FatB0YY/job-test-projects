import { Router } from 'express'

import { listRouter } from './list.routes'

const router = Router()

router.use('/list', listRouter)

export { router }
