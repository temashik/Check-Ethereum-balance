import { CronJob } from "cron";

export interface IShowBalanceJob {
	createJob: () => CronJob;
}