import axios from "axios";

export const fetchData = async (countryState, setCountryState) => {
    try {
        // fetch spinner
        setCountryState({
            ...countryState,
            loading: true,
        });

        //  fetch data
        const dataUrl = `https://restcountries.com/v3.1/all`;
        const response = await axios.get(dataUrl);
        setCountryState({
            ...countryState,
            countries: response.data,
            loading: false,
        });
    } catch (error) {
        setCountryState({
            ...countryState,
            loading: false,
            errorMessage: "Sorry Something went wrong",
        });
    }
};