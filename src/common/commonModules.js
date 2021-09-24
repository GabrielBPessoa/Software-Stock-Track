import dayjs from 'dayjs'

export class CommonModules {
	async validateDate(expirationDate) {
		const parsedExpirationDate = this.parseDateString(expirationDate)
		const parsedCurrentDate = this.parseCurrentDate()
		const isExpirationDateAfterCurrentDate =
			dayjs(parsedExpirationDate).isAfter(parsedCurrentDate)
		if (!isExpirationDateAfterCurrentDate) {
			return false
		}
		const dateDifference = parsedExpirationDate.diff(
			parsedCurrentDate,
			'day'
		)
		if (dateDifference <= 6) {
			return false
		} else {
			return true
		}
	}

	parseCurrentDate() {
		const parsedDate = dayjs()
		return parsedDate
	}

	parseDateString(dateString) {
		const parsedDayString = dateString.slice(0, 2)
		const parsedMonthSring = dateString.slice(3, 5)
		const parsedYearString = dateString.slice(6, 11)
		const parsedDateString = new Date(
			parsedYearString,
			parseInt(parsedMonthSring) - 1,
			parsedDayString
		)
		return dayjs(parsedDateString)
	}
}
