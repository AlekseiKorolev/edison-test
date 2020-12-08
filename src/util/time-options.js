const timeFormat = time => (time < 10 ? "0" + time : time);

export const timeOptions = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes() + 1;
  const time = [""];
  for (let h = hours; h < 23; h++) {
    for (
      let m = h === hours ? 15 * Math.ceil(minutes / 15) : 0;
      m < 60;
      m += 15
    ) {
      time.push(
        `${timeFormat(m === 60 ? h + 1 : h)} : ${timeFormat(m === 60 ? 0 : m)}`
      );
    }
  }
  return time.map((t, index) => (
    <option key={`option${index}`} value={t}>
      {t}
    </option>
  ));
};
