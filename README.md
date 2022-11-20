# Check-Etherium-balance
Test project, which display balance of Ehtereum native token and all ERC-20 tokens with their name and amount for given address.
## Installation
1. Clone this repo.
2. Create ```.env``` file with next variables or store it in variables environment:
  ```   ETHEREUM_NODE=/*enter address of your node (I use Infura, so if you wish, you can create a free account and use Infura API to connect)*/
        MORALIS_API=/*enter Moralis API*/
 ```
3. Run ```npm i```. Then choose how you want to execute this project: using TypeScript or recompile it in JavaScript and then run.
####                _If you want to execute TypeScript code._
1. Run ```npm run dev```. 
####                _If you want to execute JavaScript code._
1. Run ```npm run build```.
2. Run ```npm run start```.
## How to launch application
Because this is web-server, you run this application via Postman, or any analog (I prefer Insomnia). You need to create a POST request, specifying the address field in its body with a value equal to the wallet address:
```
{
	"address": "*wallet_address*"
}
```
It will redirect you to GET endpoint (as mention in task) and return in response current balance of this wallet. After entering a new wallet address, config file will be rewrote and a new file with name ```resultWALLET_ADDRESS``` will appear in the ```/job_result``` folder.
Sceduled job executes every minute based on the system time (when the seconds value changes from 59 to 0).
