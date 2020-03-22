declare var require: any;
export class DateFormatter {
  dateFormat = require("dateformat");

  timeStampFormatter(t) {
    return this.dateFormat(t, "YYYY-MM-DDThh:mm:ss");
  }

  isoDateTime(t) {
    return this.dateFormat(t, "isoDateTime");
  }
}
