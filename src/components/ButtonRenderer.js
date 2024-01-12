import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ButtonRenderer = (props) => {
  const classes = useStyles();

  // const handleSubmit = useCallback(() => {
  //   // props.functionOfButtonRenderer(props.parameterForfunctionOfButtonRenderer);
  //   props.functionOfButtonRenderer();
  //   // console.log(
  //   //   'Data from parent:',
  //   //   props.parameterForfunctionOfButtonRenderer,
  //   // );
  // }, [props]);
  function handleSubmit() {
    props.functionOfButtonRenderer();
  }

  return (
    <div>
      <Button
        color='primary'
        variant='contained'
        onClick={handleSubmit}
        className={classes.submitButton}>
        Submit
      </Button>
    </div>
  );
};

export default ButtonRenderer;
/*---------------------------------------------------------------------Styles--------------------------------*/
const useStyles = makeStyles((theme) => ({
  submitButton: {},
}));
