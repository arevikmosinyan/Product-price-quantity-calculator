import React from 'react';
import { useState } from 'react';

const PercentageChanger = (props) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);

          props.functionOfPercentageChanger(e.target.value);
        }}
        // style={{ width: '100%' }}
      />
    </div>
  );
};

export default PercentageChanger;
