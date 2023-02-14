import React from 'react'
import { CountryDropdown } from "react-country-region-selector";

const Label = (spanText, inputName, inputValue, inputType, formData, setFormData, handleChange) => {
    return (
      <>
        {spanText === "Gender:" ? (
          <label id="labelForGender">
            <span>{spanText}</span>
            {["male", "female", "other"].map((gender, index) => (
              <label key={index}>
                <input
                  name={inputName}
                  value={gender}
                  onChange={handleChange}
                  type={inputType}
                  checked={inputValue === gender}
                  required
                />
                <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
              </label>
            ))}
          </label>
        ) : spanText === "Country:" ? (
          <label>
            <span>{spanText}</span>
            <CountryDropdown
              className="countryDropdown"
              value={inputValue}
              onChange={(country) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, country: country },
                })
              }
              required
            />
          </label>
        ) : (
          <label>
            <span>{spanText}</span>
            <input
              name={inputName}
              value={inputValue}
              type={inputType}
              onChange={handleChange}
              required
            ></input>
          </label>
        )}
      </>
    );
  };

export default Label