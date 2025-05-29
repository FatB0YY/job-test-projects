import { NextFunction, Request, Response } from 'express'

import { movies } from '@/mock'

class ListController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 20
      const offset = parseInt(req.query.offset as string) || 0
      const search = (req.query.search as string)?.toLowerCase() || ''

      // Поиск по title или description (регистр не учитывается)
      let filteredMovies: typeof movies = []
      if (search) {
        filteredMovies = movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search) ||
            movie.description.toLowerCase().includes(search),
        )
      } else {
        filteredMovies = movies
      }

      const paginatedMovies = filteredMovies.slice(offset, offset + limit)
      const hasMore = offset + limit < filteredMovies.length
      const total = filteredMovies.length

      return res.json({
        data: paginatedMovies,
        total,
        hasMore,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new ListController()
