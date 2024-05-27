"use client";
import useCountries from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";
export type CountrySelectValue = {
  cityName: string;
  countryName: string;
  flag: string;
  lat: string;
  lng: string;
};

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export const CountrySelect = ({ value, onChange }: Props) => {
  const { getAllCities } = useCountries();

  return (
    <div>
      <Select
        placeholder="Bilo Gdje"
        isClearable
        options={getAllCities()}
        value={value}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.countryFlag}</div>
            <div>
              {option.cityName},{" "}
              <span className="text-neutral-500 ml-1">
                {option.countryName}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#bbf7d0",
          },
        })}
        onChange={(value) => onChange(value as CountrySelectValue)}
      ></Select>
    </div>
  );
};
