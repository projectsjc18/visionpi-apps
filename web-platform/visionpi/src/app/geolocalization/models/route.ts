import { Checkpoint } from './checkpoint';

export class Route {
  fleet: string;
  user: string;
  operator: string;
  collective: string;
  route: string;
  checkpoints: Checkpoint[];
  updated_at: string;
}
