import { Service } from 'typedi'

@Service()
export class Config {
  get port(): number {
    return process.env.PORT ? parseInt(process.env.PORT) : 3000
  }

  get db(): URL {
    return new URL(process.env.DB!)
  }
}
