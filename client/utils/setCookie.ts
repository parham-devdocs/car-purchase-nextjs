import { getDate } from "date-fns"


function setCookie(cookieName:string,cookie:string) {
    const date=new Date()
    date.setDate(date.getDate()+ (60 * 60*1000 *3))
    const expires=`expires + ${date.toUTCString()}`
    document.cookie = cookieName + "=" + encodeURIComponent(cookie) + ";" + expires + ";path=/";
}

export default setCookie