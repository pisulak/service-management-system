import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({ value, onChange }) {
  const [inputValue, setInputValue] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (value) {
      const [yyyy, mm, dd] = value.split("-");
      setInputValue(`${dd}/${mm}/${yyyy}`);
    }
  }, [value]);

  const handleInputChange = (e) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = raw;
    if (raw.length > 4) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`;
    } else if (raw.length > 2) {
      formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setInputValue(formatted);

    if (raw.length === 8) {
      const yyyy = raw.slice(4, 8);
      const mm = raw.slice(2, 4);
      const dd = raw.slice(0, 2);
      onChange(`${yyyy}-${mm}-${dd}`);
    }
  };

  const handleDateSelect = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;
    setInputValue(`${dd}/${mm}/${yyyy}`);
    setShowCalendar(false);
    onChange(dateString);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="DD/MM/YYYY"
        value={inputValue}
        onChange={handleInputChange}
        className="border p-2 w-full rounded"
      />

      <button
        type="button"
        onClick={() => setShowCalendar((prev) => !prev)}
        className="absolute top-2 right-2 bg-gray-200 px-2 rounded"
      >
        📅
      </button>

      {showCalendar && (
        <div className="absolute z-10 mt-2">
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={handleDateSelect}
            inline
            dateFormat="dd/MM/yyyy"
          />
        </div>
      )}
    </div>
  );
}
