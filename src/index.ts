type FlagTypes = string | number | boolean;

export default class DiviConfigParser {
	private flags: { [flagName: string]: FlagTypes[] } = {};

	constructor(fileContents: string = '') {
	}

	private convertValueArray(value: FlagTypes | FlagTypes[]): FlagTypes[] {
		if (!Array.isArray(value)) {
			return [value];
		}
		return value;
	}

	setFlag(flagName: string, value: FlagTypes | FlagTypes[]): void {
		this.flags[flagName] = this.convertValueArray(value);
	}

	isFlagSet(flagName: string): boolean {
		return flagName in this.flags;
	}

	addValueToFlag(flagName: string, value: FlagTypes | FlagTypes[]): void {
		if (!this.isFlagSet(flagName)) {
			this.setFlag(flagName, []);
		}

		this.flags[flagName].push(...this.convertValueArray(value));
	}

	getFlagContents(flagName: string): FlagTypes | FlagTypes[] {
		const contents = this.flags[flagName];
		if (!contents) {
			return undefined;
		} else if (contents.length > 1) {
			return contents;
		} else if (contents.length === 1) {
			return contents[0];
		}
	}

}
