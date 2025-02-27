import React from "react";

const InputField = ({ label, type = "text", placeholder, icon, value, onChange, name }) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <div className="input-group">
        {icon && <span className="input-group-text">{icon}</span>}
        <input
          type={type}
          name = {name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="form-control" 
        />
      </div>
    </div>
  );
};

export default InputField;
