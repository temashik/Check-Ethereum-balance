import { injectable } from "inversify";
import { IWalletService } from "./wallet.service.interface";
import Web3 from 'web3';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import 'dotenv/config';

@injectable()
export class WalletService implements IWalletService {
	async getTokens(walletAddress: string): Promise<object> {
		const web3ApiKey = process.env.MORALIS_API;
		const web3 = new Web3(process.env.INFURA_API || 'http://localhost:8546');
		const tokens = new Map();
		tokens.set('timestamp', new Date());
		tokens.set('Etherium native token balance', web3.utils.fromWei(await web3.eth.getBalance(walletAddress), 'ether'));
		await Moralis.start({
			apiKey: web3ApiKey,
		});
		const chain = EvmChain.ETHEREUM;

  		const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    		address: walletAddress,
   			chain,
  		});
		const result = JSON.parse(JSON.stringify(response));
		result.forEach((elem: any) => {
			tokens.set(elem.token.name, elem.value);
		});
		return Object.fromEntries(tokens.entries());
	}
}