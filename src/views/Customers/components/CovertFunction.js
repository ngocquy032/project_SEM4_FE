export function compareDateTimeSchedule(booking) {
    const [startHour, startMinute] = booking?.schedule.start_time;
    const [year, month, day] = booking?.schedule.date_schedule;
    const scheduleDate = new Date(year, month - 1, day, startHour, startMinute);
    const nowInVietnam = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
    const diffInMs = scheduleDate - nowInVietnam;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours
    }

    export function compareDateSchedule(booking) {
        const [year, month, day] = booking.schedule.date_schedule;
        const scheduleDate = new Date(year, month - 1, day); 
        const nowInVietnam = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
        nowInVietnam.setHours(0, 0, 0, 0); 

        if (nowInVietnam > scheduleDate) {
            return true;
        } else {
            return false;
        }
    }


