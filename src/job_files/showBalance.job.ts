import {CronJob} from 'cron';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IWalletService } from '../wallet/wallet.service.interface';
import { IShowBalanceJob } from './showBalance.job.interface';
import fs from 'fs/promises';
import fsSync from 'fs';

@injectable()
export class ShowBalanceJob implements IShowBalanceJob {
	constructor(@inject(TYPES.WalletService) private walletService: IWalletService) {}
	createJob(): CronJob {
		const job = new CronJob(
			'* * * * *',
			async () => {
				const walletAddress = JSON.parse(await fs.readFile('config.json', 'utf8')).address;
				const pathPart = JSON.parse(await fs.readFile('config.json', 'utf8')).path;
				const result = await this.walletService.getTokens(walletAddress);
				await fs.writeFile(pathPart + walletAddress + '.json', JSON.stringify(result));
			}
		);
		return job;
	}
}