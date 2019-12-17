import React, { useContext, useState } from 'react';
import UserContext from './UserContext';

function SearchResultBox() {
    const { countrySearchResult, addInCountryTrackList } = useContext(UserContext);
    const [intervalText, setIntervalText] = useState("");

    console.log('SearchResultBox', countrySearchResult);

    if (countrySearchResult.id) {
        let text = countrySearchResult.name;
        const handleAddInCountryList = () => {
            console.log('got country data');
        }
        const addInList = () => {
            const number = isNaN(intervalText) || intervalText === "" ? undefined : parseInt(intervalText);
            console.log('number', number, intervalText);
            addInCountryTrackList(countrySearchResult, number);
        };

        return (
            <div>
                <div className="center-search-result-box" onMouseOver={handleAddInCountryList} onClick={addInList}>
                    <p>{text}</p>
                </div>
                <div className="center-container">
                    <input name="intervalValue" placeholder="Write interval in seconds" onChange={(event) => { setIntervalText(event.target.value) }}></input>
                </div>
            </div>
        )
    } else if (countrySearchResult.cod) {
        return (
            <div className="center-search-result-box">
                <p>{countrySearchResult.message}</p>
            </div>
        )
    } else {
        return (
            <div className="center-search-result-box">
                <p>empty</p>
            </div>
        )
    }

}

export default SearchResultBox;
