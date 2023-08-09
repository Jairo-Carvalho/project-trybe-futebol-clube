import { ICRUDModelReader } from '../ICRUDModel';
import { ILeaderboardAway, ILeaderboardRequest } from './ILeaderboard';

export type ILeaderboardModel = ICRUDModelReader<ILeaderboardRequest | ILeaderboardAway>;
