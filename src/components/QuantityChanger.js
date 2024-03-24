import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

// const useStyles = makeStyles({
//   containerOfQuantityChanger: {
//     width: '100%',
//   },
//   input: {
//     width: '100%',
//   },
// });

const QuantityChanger = (props) => {
  const [value, setValue] = useState('');
  // const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  // if (value !== '') {
  //   setDisableSubmitButton(false);
  // }

  const classes = useStyles();

  return (
    <div className={classes.containerOfQuantityChanger}>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          // props.defineStateOfSubmitButton(disableSubmitButton);
          props.functionOfQuantityChanger(e.target.value);
        }}
        className={classes.input}
      />
    </div>
  );
};

export default QuantityChanger;

/*----------------------------------------------Styles-------------------------------------------------------------*/
const useStyles = makeStyles({});
