import { FlagName, FlagTypes } from './FlagNames';

export default class DiviConfigParser {
	private flags: {
		[flagName: FlagName | string]:
			| FlagTypes[FlagName]
			| FlagTypes[FlagName][];
	} = {};

	constructor(fileContents: string = '') {
		this.fromString(fileContents);
	}

	private ensureValueIsInArray(
		value: FlagTypes[FlagName] | FlagTypes[FlagName][]
	): FlagTypes[FlagName][] {
		if (!Array.isArray(value)) {
			return [value];
		}
		return value;
	}

	setFlag<F extends FlagName>(flagName: F, value: FlagTypes[F]): void {
		this.flags[flagName] = value;
	}

	unsetFlag<F extends FlagName>(flagName: F): void {
		this.flags[flagName] = null;
		delete this.flags[flagName];
	}

	isFlagSet<F extends FlagName>(flagName: F): boolean {
		return flagName in this.flags;
	}

	addValueToFlag<F extends FlagName>(flagName: F, value: FlagTypes[F]): void {
		this.flags[flagName] = this.isFlagSet(flagName)
			? this.ensureValueIsInArray(this.flags[flagName])
			: [];
		(this.flags[flagName] as FlagTypes[FlagName][]).push(value);
	}

	getFlagContents<F extends FlagName>(flagName: F): FlagTypes[F] {
		return this.flags[flagName] as FlagTypes[F];
	}

	private isStringDiviConfigFlag(flagString: string): boolean {
		return flagString.charAt(0) !== '#' && flagString.includes('=');
	}

	fromString(fileContents: string): void {
		const lines = fileContents.split('\n');

		for (const line of lines) {
			if (this.isStringDiviConfigFlag(line)) {
				const [flagName, value]: [FlagName, FlagTypes[FlagName]] =
					line.split('=') as [FlagName, FlagTypes[FlagName]];

				if (this.isFlagSet(flagName)) {
					this.addValueToFlag(flagName, value);
				} else {
					this.setFlag(flagName, value);
				}
			}
		}
	}

	private flagValuePairToString(
		flag: FlagName,
		value: FlagTypes[FlagName]
	): string {
		if (typeof value === 'undefined') {
			console.warn('unable to parse value:', value, 'for flag:', flag);
			return;
		}
		return flag + '=' + value.toString() + '\n';
	}

	private flagWithMultipleValuesToString(
		flag: FlagName,
		values: string[]
	): string {
		let result = '';
		for (const value of values) {
			result += this.flagValuePairToString(flag, value);
		}
		return result;
	}

	toString(): string {
		let diviConfigString = '';

		for (const flag in this.flags) {
			const flagContents = this.getFlagContents(flag as FlagName);

			console.log(flagContents);
			if (Array.isArray(flagContents)) {
				console.log('flag is array', flagContents);
				diviConfigString += this.flagWithMultipleValuesToString(
					flag as FlagName,
					flagContents
				);
			} else {
				console.log('flag is not array', flagContents);
				diviConfigString += this.flagValuePairToString(
					flag as FlagName,
					flagContents
				);
			}
		}

		return diviConfigString;
	}
}
