import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ShowBalanceJob } from './job_files/showBalance.job';
import { IShowBalanceJob } from './job_files/showBalance.job.interface';
import { TYPES } from './types';
import { WalletController } from './wallet/wallet.controller';
import { IWalletController } from './wallet/wallet.controller.interface'
import { WalletService } from './wallet/wallet.service';
import { IWalletService } from './wallet/wallet.service.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<IWalletController>(TYPES.WalletController).to(WalletController);
	bind<IWalletService>(TYPES.WalletService).to(WalletService).inSingletonScope();
	bind<IShowBalanceJob>(TYPES.ShowBalanceJob).to(ShowBalanceJob);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();