import { resolve } from 'path'
import { Express } from 'express'
import { createExpressServer } from 'routing-controllers'

export async function buildExpressServer(): Promise<Express> {
  const controllers = [resolve(__dirname, '../controllers/**/*.ts')]
  const routePrefix = '/api'

  // build the express app
  const app = createExpressServer({ controllers, routePrefix })

  return app
}
