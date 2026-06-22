import {format, differenceInDays, ISOFormatOptions} from 'date-fns'

export const formatDate = (isoDate: any) => {
    if(!isoDate) return 
    return format(new Date(isoDate), 'd MMM yy')
}

export const dayDifference = (startDate: any, endDate: any) => {
   return differenceInDays(startDate, endDate)
}

export const formatDateForQuery = (date?: Date) =>
  date ? date.toISOString().split("T")[0] : "";