import { Container } from 'typedi'
import { Bootstrapper } from './services/Bootstrapper'

export async function webcrafter(): Promise<void> {
  await Container.get(Bootstrapper).start()
}
