import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchResultBox from './SearchResultBox';
import UserContext from './UserContext';
import MyProvider from './MyProvider';
import CountryLiveView from './CountryLiveView';


function Main() {
    const {
        updateCountrySearchResult,
        updateInputCountryName,
        clearSearchResult,
        inputText
    } = useContext(UserContext);

    /**
     * Handle api call to get data from open weather map
     * @param {*} event 
     */
    const handleSearchCountry = (event) => {
        if (inputText === "") {
            clearSearchResult();
            return;
        }

        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputText + "&APPID=f68878e1cfbb341360627e14e3240013&units=metric")
            .then(response => response.json())
            .then(response => {
                updateCountrySearchResult(response);
            })
    }

    /**
     * Update country name that user key in
     * @param {*} event 
     */
    const saveInputCountryName = (event) => {
        updateInputCountryName(event.target.value);
    }

    return (
        <div>
            <SearchResultBox />
            <br />
            <div className="center-container">
                <input name="countryName" placeholder="Country Name" onChange={saveInputCountryName}></input>
                <br />
                <button onClick={handleSearchCountry}>Search</button>
            </div>
            <CountryLiveView />
        </div>
    );
}

ReactDOM.render(
    <MyProvider>
        <Main />
    </MyProvider>
    , document.getElementById('root'));