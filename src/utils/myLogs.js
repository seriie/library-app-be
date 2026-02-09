export const myLogs = (icon, msg) => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const time = `[${hours}:${minutes}:${seconds}]`;
    const message = `${time} ${msg}`;

    return console.log(`${icon} ${message}`);
};