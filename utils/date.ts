import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export function getStartEndDateFromWeek(yearWeek: string) {
  const splitWeek = yearWeek.split('-')

  const targetYear = +splitWeek[0];
  const targetWeek = +splitWeek[1] + 1; // to match the sqlite week

  const dateInTargetYear = dayjs().year(targetYear).startOf('year');

  const startOfWeek = dateInTargetYear.week(targetWeek).startOf('week');
  const endOfWeek = dateInTargetYear.week(targetWeek).endOf('week');

  return {
    startOfWeek: startOfWeek.format('ll'),
    endOfWeek: endOfWeek.format('ll'),
  }
}