import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { BaseContorller } from "../common/base.controller";
import { TYPES } from "../types";
import { IWalletController } from "./wallet.controller.interface";
import { IWalletService } from "./wallet.service.interface";
import url from 'url';
import fs from 'fs/promises';

@injectable()
export class WalletController extends BaseContorller implements IWalletController {
	constructor(@inject(TYPES.WalletService) private walletService: IWalletService) {
		super();
		this.bindRoutes([
		{ path: '/', method: 'post', func: this.addAddress }, 
		{ path: '/balance', method: 'get', func: this.showBalance }, 
	]);
	}
	async addAddress(req: Request, res: Response): Promise<void> {
		const config = {
			address: req.body.address,
			path: 'job_result/result'
		}
		fs.writeFile('config.json', JSON.stringify(config))
		res.redirect(`/balance?address=${req.body.address}`);
	}	
		  
	async showBalance(req: Request, res: Response): Promise<void> {
		const queryObject = url.parse(req.url, true).query;
		const walletAddress = queryObject.address as string;
		const result = await this.walletService.getTokens(walletAddress);
		res.send(result);
	}
}