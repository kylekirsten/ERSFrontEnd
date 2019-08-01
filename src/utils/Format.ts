
let TimeAgo = require('timeago.js');
export function convertTimestampToDate(timestamp : number) : string{   
    const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = new Date(timestamp*1);
    const year = date.getFullYear();
    const month = months_arr[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    // Display date time in MM-dd-yyyy h:m:s format
    const convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2);
    return convdataTime;
}
export function readableTimestampSubtract(timestamp : number) : string {
    return TimeAgo.format(timestamp);
}
export function uppercaseFirstLetter(text : string) : string {
    return text.charAt(0) + text.substring(1).toLowerCase();
}