import React from 'react';
import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';

const ButtonRenderer = (props) => {
  return (
    <div>
      <Button
        disabled={props.disableSubmitButton}
        // style={{ width: '100%' }}
        type='button'
        color='primary'
        variant='contained'
        onClick={() => {
          return props.functionOfButtonRenderer();
        }}>
        Submit
      </Button>
    </div>
  );
};

export default ButtonRenderer;
/*---------------------------------------------------------------------Styles--------------------------------*/
