function changeToKoreanDate(timestamp: Date | string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = year + "." + month + "." + day;

  return dateStr;
}

export default changeToKoreanDate;
