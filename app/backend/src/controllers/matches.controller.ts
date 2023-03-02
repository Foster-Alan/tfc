import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import statusCode from '../utils/statusCode.util';

class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  public selectMatches = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const matches = await this._matchesService.selectAllInProgressMatches(inProgress as string);
        return res.status(statusCode.ok).json(matches);
      }
      const matches = await this._matchesService.selectAllMatches();
      return res.status(statusCode.ok).json(matches);
    } catch (error: unknown) {
      return res.status(statusCode.internalServerError).json({ message: error });
    }
  };

  public matchInProgress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await this
        ._matchesService
        .matchInProgress(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
      if (!match) {
        return res.status(statusCode.notFound).json({ message: 'There is no team with such id!' });
      }
      return res.status(statusCode.created).json(match);
    } catch (error: unknown) {
      return res.status(statusCode.internalServerError).json({ message: error });
    }
  };

  public updMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { status, message } = await this._matchesService.updMatch(id);
      return res.status(status).json(message);
    } catch (error: unknown) {
      return res.status(statusCode.internalServerError).json({ message: error });
    }
  };

  public updMatchInProgress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const match = await this
        ._matchesService
        .updMatchInProgress(id, homeTeamGoals, awayTeamGoals);
      if (!match) {
        return res.status(statusCode.notFound).json({ message: 'There is no match with such id!' });
      }
      return res.status(statusCode.ok).json(match);
    } catch (error: unknown) {
      return res.status(statusCode.internalServerError).json({ message: error });
    }
  };

  public allMatcheTeamIdAndProgres = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { inProgress } = req.body;
      const matches = await this._matchesService
        .allMatcheTeamIdAndProgres(id, inProgress);
      return res.status(statusCode.ok).json(matches);
    } catch (error: unknown) {
      return res.status(statusCode.internalServerError).json({ message: error });
    }
  };
}

export default MatchesController;
