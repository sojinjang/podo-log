function changeToKoreanTime(timestamp: Date) {
  const date = new Date(timestamp);
  return date.toLocaleString("ko-KR");
}

export default changeToKoreanTime;
