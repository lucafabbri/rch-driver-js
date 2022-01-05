export class InactivityAndPendings {
	inactive: boolean | null = null;
	pendingFiles: number | null = null;
	maxPendingFiles: number = 25;
	firstPendingFileDateTime: string | null = null;

	constructor(data: string) {
		const regex = /^(?<inactivity>[01]) *(?<pendingFiles>[\d]{1,2})\/(?<maxPendingFiles>[1][1]|[2][5]) ?(?<firstPendingFileDateTime>[\d]{2}\/[\d]{2}\/[\d]{4} [\d]{2}:[\d]{2}:[\d]{2})?$/;
		var match = regex.exec(data);
		if (match) {
			var groups = match?.groups;
			if (groups) {
				this.inactive = groups['inactive'] == '1';
				this.pendingFiles = parseInt(groups['pendingFiles']);
				this.maxPendingFiles = parseInt(groups['maxPendingFiles']);
				if (groups['firstPendingFileDateTime']) {
					this.firstPendingFileDateTime = groups['firstPendingFileDateTime'];
				}
			}
		}
	}
}