import { Request, Response, NextFunction } from 'express';

export interface IWalletController {
	addAddress: (req: Request, res: Response, next: NextFunction) => void;
	showBalance: (req: Request, res: Response, next: NextFunction) => void;
}
