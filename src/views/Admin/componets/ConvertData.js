// Định nghĩa hàm và xuất trực tiếp
export function convertToDateString(arr) {
  if (Array.isArray(arr) && arr.length === 3) {
    const [year, month, day] = arr;
  
    // Đảm bảo ngày và tháng có 2 chữ số
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    
    return `${formattedDay}-${formattedMonth}-${year}`;
  }
  }

  export function convertDataToDateString(arr) {
    const [year, month, day] = arr;
  
    // Đảm bảo ngày và tháng có 2 chữ số
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  

 export function convertToTimeString(timeArray) {
  if (Array.isArray(timeArray) && timeArray.length === 2) {

    const [hours, minutes] = timeArray;
  
    // Đảm bảo giờ và phút có 2 chữ số bằng cách thêm số 0 nếu cần
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }
  }

  //yyyy-mm-dd
  export function convertDate(dateStr) {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
}

//dd-mm-yyyy
export function convertDatePut(dateStr) {
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}