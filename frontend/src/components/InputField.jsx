import React from "react";
import PropTypes from "prop-types";

function InputField({ label, placeholder, type, onChange, value, id, name }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white">{label}:</label>
      <input
        type={type}
        id={id}
        name={name}
        required
        className="bg-slate-200 w-full px-3 py-2 focus:outline-none focus:border-slate-400 rounded-md border-2 border-white"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputField;
