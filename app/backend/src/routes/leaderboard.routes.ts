import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderBoardController.getHomeTeam(req, res));
router.get('/away', (req: Request, res: Response) => leaderBoardController.getAwayTeam(req, res));

export default router;
