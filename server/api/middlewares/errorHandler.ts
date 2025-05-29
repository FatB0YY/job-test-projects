import { NextFunction, Request, Response } from 'express'

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({ message: 'Route not found' })
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack)

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  })
}
