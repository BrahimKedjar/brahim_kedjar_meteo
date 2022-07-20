import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GET_API_URL, geoApiOptions } from "../../Api";

const Search = ({onSearchChange}) => {
    const [search , setsearch] = useState(null);
    const loadoptions = (inputData) => {
        return (fetch(`${GET_API_URL}/cities?minPopulation=100000&namePrefix=${inputData}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude} `,
                            label: `${city.name} ${city.countryCode} `
                        }
                    })
                }
            })
            .catch(err => console.error(err)));
    }
    const handleOnChange = (searchData) =>{
        setsearch(searchData)
        onSearchChange(searchData)
    }

    
    return (
    <AsyncPaginate
         placeholder="input city to search..."
         debounceTimeout={600}
         value={search}
         onChange={handleOnChange}
         loadOptions={loadoptions}
       />
    )
}

export default Search;