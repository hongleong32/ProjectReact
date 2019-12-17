import React, { useReducer } from 'react';
import UserContext from './UserContext';
import { setupAutoTrack, clearAutoTrack } from './AutoTrackWeatherSystem';

const reducer = (state, action) => {
    if (action.type === "search_result") { // Update search country result data from open weather
        return {
            ...state,
            countrySearchResult: action.result
        }
    } else if (action.type === "add_to_list") { // Add country data into tracking list
        action.data.intervalSec = action.intervalSec;
        action.data.timerId = action.timerId;
        state.countryTrackList.push(action.data);
        return {
            ...state,
            countryTrackList: state.countryTrackList
        }
    } else if (action.type === "input_country_name") { // Catch country name that user key in
        return {
            ...state,
            inputText: action.result
        }
    } else if (action.type === "clear_search_result") { // Clear country result data
        return {
            ...state,
            countrySearchResult: {}
        }
    } else if (action.type === "remove_from_list") { // Remove country data from tracking list
        const list = state.countryTrackList;
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].id === action.id) {
                list.splice(i, 1);
                break;
            }
        }

        return {
            ...state,
            countryTrackList: state.countryTrackList
        }
    } else if (action.type === "update_track_country") { // Update country data on tracking list
        const list = state.countryTrackList;
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].id === action.id) {
                const timerId = list[i].timerId;
                action.data.timerId = timerId;
                list[i] = action.data;
                break;
            }
        }

        return {
            ...state,
            countryTrackList: state.countryTrackList
        }
    }

    return state;
}

function MyProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        countryTrackList: [],
        countrySearchResult: {},
        inputText: '',
        maxShowInList: 3
    });

    const {
        countryTrackList,
        countrySearchResult,
        inputText,
        maxShowInList
    } = state;

    // Call update country search result
    const updateCountrySearchResult = (result) => {
        dispatch({
            type: "search_result",
            result
        });
    }

    // Handle add country data into tracking list
    const addInCountryTrackList = (data, intervalSec = 10) => {
        const list = countryTrackList;
        let hasSameId = false;
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].id === data.id) {
                hasSameId = true;
                break;
            }
        }

        if (list.length < state.maxShowInList && !hasSameId) {
            const intervalInMili = intervalSec * 1000;
            const timerId = setupAutoTrack(data.name, intervalInMili, (data) => {
                updateTrackCountry(data);
            });
            dispatch({
                type: "add_to_list",
                data,
                timerId,
                intervalSec
            });
        }
    }

    // Handle remove country data from tracking list
    const removeItemFromCountryTrackList = (id) => {
        const list = state.countryTrackList;
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].id === id) {
                clearAutoTrack(list[i].timerId);
                break;
            }
        }
        dispatch({
            type: "remove_from_list",
            id
        });
    }

    // Update country name that user key in
    const updateInputCountryName = (result) => {
        dispatch({
            type: "input_country_name",
            result
        });
    }

    // Clear country data that been search
    const clearSearchResult = () => {
        dispatch({
            type: "clear_search_result"
        });
    }

    // update country data on tracking list
    const updateTrackCountry = (data) => {
        dispatch({
            type: "update_track_country",
            data
        });
    }

    return (
        <UserContext.Provider value={{
            countryTrackList,
            countrySearchResult,
            inputText,
            updateCountrySearchResult,
            addInCountryTrackList,
            removeItemFromCountryTrackList,
            updateInputCountryName,
            clearSearchResult,
            maxShowInList,
            updateTrackCountry,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default MyProvider;
