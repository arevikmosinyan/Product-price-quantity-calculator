import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';

const QuantityChanger = (props) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  // function handleChangeOfInputedValue(e) {
  //   setValue(parseInt(e.target.value, 10));
  //   props.functionOfQuantityChanger(value);
  //   console.log(`${value}:value`);
  // }

  // function incremenet() {
  //   setValue(value + 1);
  //   console.log(value);
  // }

  // function decrement() {
  //   if (!value) {
  //     return;
  //   }
  //   setValue(value - 1);
  // }
  // console.log(`${value}:value`);
  return (
    <div className={classes.containerOfQuantityChanger}>
      {/* <span>{value}</span> */}
      <input
        value={value}
        type='number'
        onChange={(e) => {
          setValue(e.target.value);
          props.functionOfQuantityChanger(e.target.value);
          // console.log(`${value}:value`);
        }}
        className={classes.input}
      />
      {/* <Button onClick={incremenet}>+</Button>
      <Button onClick={decrement}>-</Button> */}
    </div>
  );
};

export default QuantityChanger;

/*----------------------------------------------Styles-------------------------------------------------------------*/
const useStyles = makeStyles((theme) => ({
  input: {
    width: '50%',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 'auto',
  },
}));
