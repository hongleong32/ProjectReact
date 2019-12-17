/**
 * To setup auto tracking weather api call system in every <interval> seconds
 * @param {string} countryName 
 * @param {number} interval 
 * @param {(value)=>{}} callback 
 */
export function setupAutoTrack(countryName, interval, callback) {
    const timerId = setInterval(() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + countryName + "&APPID=f68878e1cfbb341360627e14e3240013&units=metric")
            .then(response => response.json())
            .then(response => {
                callback(response);
            })
    }, interval);

    return timerId;
}

/**
 * Clear interval feature by using <timerId> get from setInterval
 * @param {number} timerId 
 */
export function clearAutoTrack(timerId) {
    clearInterval(timerId);
}

export default function AutoTrackWeatherSystem() {

}