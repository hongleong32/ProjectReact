import React, { useContext, useState } from 'react';
import UserContext from './UserContext';

function SearchResultBox() {
    const { countrySearchResult, addInCountryTrackList } = useContext(UserContext);
    const [intervalText, setIntervalText] = useState("");

    if (countrySearchResult.id) {
        let text = countrySearchResult.name;

        // To show hover response
        const handleAddInCountryList = () => {
            console.log('got country data');
        }

        // To call add data into track list
        const addInList = () => {
            const number = isNaN(intervalText) || intervalText === "" ? undefined : parseInt(intervalText);
            addInCountryTrackList(countrySearchResult, number);
        };

        // Catch interval value that user key in
        const updateIntervalText = (event) => {
            setIntervalText(event.target.value)
        }

        return (
            <div>
                <div className="center-search-result-box" onMouseOver={handleAddInCountryList} onClick={addInList}>
                    <p>{text}</p>
                </div>
                <div className="center-container">
                    <input name="intervalValue" placeholder="Write interval in seconds" onChange={updateIntervalText}></input>
                </div>
            </div>
        )
    } else if (countrySearchResult.cod) { // When data incorrect
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
