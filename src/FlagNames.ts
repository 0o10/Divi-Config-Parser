/**
 * @note This is not an extensive list of all daemon configuration flags.
 * More will be added as needed
 */
export declare interface FlagTypes {
	rpcuser: string;
	rpcpassword: string;
	rpcport: number;
	rpcallowip: string;
	rpcconnect: string;
	maxconnections: number;
	addnode: string | string[];
	server: 0 | 1;
	daemon: 0 | 1;
	testnet: 0 | 1;
	masternode: 0 | 1 | string;
	listen: 0 | 1;
	externalip: string;
	masternodeprivkey: string;
	vault: 0 | 1;
	vault_min: number;
	stakesplitthreshold: number;
	override_mnpayee: 0 | 1;
	regtest: 0 | 1;
	datadir: string;
}

export declare type FlagName = keyof FlagTypes;
