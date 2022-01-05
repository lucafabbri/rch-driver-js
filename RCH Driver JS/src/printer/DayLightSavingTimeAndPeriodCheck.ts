import { PeriodicCheckStatus } from ".";

export class DayLightSavingTimeAndPeriodCheck {
	daylightSavingTime: boolean; //ora legale
	periodicCheck: PeriodicCheckStatus;
	constructor(data: string) {
		this.daylightSavingTime = data.charAt(1) == '1';
		if (data.charAt(2) == '1') {
			this.periodicCheck = PeriodicCheckStatus.WARNING;
		} else if (data.charAt(3) == '1') {
			this.periodicCheck = PeriodicCheckStatus.EXPIRED;
		} else {
			this.periodicCheck = PeriodicCheckStatus.OK;
		}
	}
}