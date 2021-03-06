import React from 'react';
import Arrow from '../../assets/icons/arrow-select.png';

function Select({ label, children, style, handleChange, fieldName, value }) {
  return (
    <div>
      {label && <span className="text-lg leading-none">{label}</span>}
      <select
        value={value}
        style={{
          backgroundImage: `url(${Arrow})`,
          backgroundSize: '15px',
          backgroundPositionY: 'center',
          backgroundPositionX: '95%',
        }}
        name={fieldName}
        onChange={handleChange}
        className={`bg-no-repeat cursor-pointer rounded-md w-full h-12 px-3.5 text-lg outline-none focus:outline-none font-normal ${style} hover:bg-gray-100`}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;
