const TAIWAN_YEAR_BASE = 1911;
class DateUtils {
    static converTaiwan(calendarStr) {
        if (calendarStr == null || calendarStr == undefined || calendarStr == '') {
            return;
        }
        let time = Date.parse(calendarStr);
        let date = new Date(time);
        let year = date.getFullYear();
        let taiwanYear = year - TAIWAN_YEAR_BASE;
        return '民國' + taiwanYear + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
    }

    static converCalendar(taiwanCalendar) {
        if (taiwanCalendar == null || taiwanCalendar == undefined || taiwanCalendar == '') {
            return;
        }
        let reg = /\d+/g;
        let result = taiwanCalendar.match(reg);
        if (result.length == 3) {
            let month = Number.parseInt(result[1]);
            let day = Number.parseInt(result[2]);
            let year = Number.parseInt(result[0]);
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            return TAIWAN_YEAR_BASE + year + '-' + month + '-' + day;
        }
        return '';
    }
}

module.exports = DateUtils;
