export interface IWalletService {
	getTokens: (address: string) => Promise<object>;
}