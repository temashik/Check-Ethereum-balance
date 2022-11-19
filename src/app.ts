import { Server } from 'http';
import express, { Express, json, urlencoded } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { WalletController } from './wallet/wallet.controller';
import { ShowBalanceJob } from './job_files/showBalance.job';
import { CronJob } from 'cron';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	job: CronJob;

	constructor(
		@inject(TYPES.WalletController) private walletController: WalletController,
		@inject(TYPES.ShowBalanceJob) private showBalanceJob: ShowBalanceJob,
		) {
		this.app = express();
		this.job = showBalanceJob.createJob();
		this.port = +(process.env.PORT || 8000);
	}

	useRoutes(): void {
		this.app.use('/', this.walletController.router);
	}

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.job.start();
		this.server = this.app.listen(this.port);
	}

	public close(): void {
		this.server.close;
	}
}