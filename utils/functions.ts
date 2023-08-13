export function convertTimestampToReadableDate(timestamp: number) {
  const date = new Date(timestamp)
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const formattedDate = new Intl.DateTimeFormat('en-AU', options).format(date)
  return formattedDate
}
