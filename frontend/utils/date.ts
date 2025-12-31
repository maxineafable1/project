import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export function getStartEndDateFromWeek(localDateTime: string) {
  const splitWeek = localDateTime.split('T')[0]

  const startDate = dayjs(splitWeek).format('ll')
  const endDate = dayjs(splitWeek).endOf('week').format('ll')

  return { startDate, endDate }
}