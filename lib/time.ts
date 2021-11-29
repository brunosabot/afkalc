import { Dayjs } from "dayjs";

export function getDuration(time: number) {
  const seconds = time % 60;
  const fullMinutes = (time - seconds) / 60;
  const minutes = fullMinutes % 60;
  const fullHours = (fullMinutes - minutes) / 60;
  const hours = fullHours % 24;
  const fullDays = (fullHours - hours) / 24;

  return `${fullDays > 0 ? `${fullDays}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${
    minutes > 0 ? `${minutes}m ` : ""
  }${seconds > 0 ? `${seconds}s ` : ""}`;
}

export function getFrom(date: Dayjs, offset: number) {
  return date.add(offset, "s").fromNow();
}
