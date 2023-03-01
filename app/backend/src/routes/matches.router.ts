import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import { authorizationValidate, idTeamsValidate } from '../middlewares/matches.middleware';

const matchesRouter = Router();

const controller = new MatchesController();

matchesRouter.get('/', controller.selectMatches.bind(controller));
matchesRouter.post(
  '/',
  authorizationValidate,
  idTeamsValidate,
  controller.matchInProgress.bind(controller),
);
matchesRouter.patch('/:id/finish', authorizationValidate, controller.updMatch.bind(controller));
matchesRouter.patch(
  '/:id',
  authorizationValidate,
  controller.updMatchInProgress.bind(controller),
);

export default matchesRouter;
