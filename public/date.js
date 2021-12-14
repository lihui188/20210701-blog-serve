function formatNowDate() {
    const date = new Date()
    const nowYear = date.getFullYear()
    const month = date.getMonth() + 1
    const nowMonth = String(month).padStart(2, "0")
    const nowDay = String(date.getDate()).padStart(2, "0")
    const nowHour = String(date.getHours()).padStart(2, "0")
    const nowMinute = String(date.getMinutes()).padStart(2, "0")
    const nowSecond = String(date.getSeconds()).padStart(2, "0")
    return `${nowYear}-${nowMonth}-${nowDay} ${nowHour}:${nowMinute}:${nowSecond}`
  }
  module.exports = {
      formatNowDate
  }
  