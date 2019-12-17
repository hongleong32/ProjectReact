import React, { useContext } from 'react';
import UserContext from './UserContext';

function CountryLiveView() {
    const { countryTrackList, removeItemFromCountryTrackList } = useContext(UserContext);

    /**
     * Use unique country id to remove selected item from list
     * @param {number} id 
     */
    const removeItem = (id) => {
        removeItemFromCountryTrackList(id);
    }

    // Create list of elements
    const countryLiveList = countryTrackList.map(item => {
        const weatherIconUrl = "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png";;
        return (
            <div className="grid-element" key={item.id} onClick={removeItem.bind(this, item.id)}>
                <p>{item.intervalSec} seconds refresh</p>
                <p>{item.name}</p>
                <p>{item.main.temp}°C</p>
                <img src={weatherIconUrl} alt="" />
            </div>
        )
    });

    return (
        <div>
            <p>Max number can be track: 3</p>
            <div className="grid-container grid-container--fit">
                {countryLiveList}
            </div>
        </div>
    )
}

export default CountryLiveView;
