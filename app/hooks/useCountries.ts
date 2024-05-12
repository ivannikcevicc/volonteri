import { Country, City } from "country-state-city";
const country = Country.getCountryByCode("ME");
const cities = City.getCitiesOfCountry("ME");
const formattedCities = cities?.map((city) => ({
  countryName: country?.name,
  cityName: city.name,
  countryFlag: country?.flag,
  lat: city.latitude,
  lng: city.longitude,
}));
const useCountries = () => {
  const getAllCities = () => {
    console.log(formattedCities);
    return formattedCities;
  };
  const getByValue = (value: string) => {
    return formattedCities?.find((item) => item.cityName === value);
  };
  return {
    getAllCities,
    getByValue,
  };
};
export default useCountries;
