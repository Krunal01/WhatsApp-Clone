import moment from "moment";
import { isDate } from "moment";

export function displayDate(date = new Date()) {
  try {
    if (typeof date !== "string") moment().calendar();
    // return `${date.getDate()}/${
    //   date.getMonth() + 1
    // }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return moment(date).calendar();
  } catch (error) {
    // let date = new Date();
    // return `${date.getDate()}/${
    //   date.getMonth() + 1
    // }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    let date = new Date();
    return moment(date).calendar();
  }
}
