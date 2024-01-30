import React, { useEffect, useRef } from 'react';
import AgGridSection from './AgGridSection';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreatingProductSection = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [newProduct, setNewProduct] = useState({});
  const [errorForNameField, setErrorForNameField] = useState(false);
  const [errorForPriceField, setErrorForPriceField] = useState(false);
  const [errorForQuantityField, setErrorForQuantityField] = useState(false);
  const [
    errorForPriceFieldIfItStartsWithZero,
    setErrorForPriceFieldIfItStartsWithZero,
  ] = useState(false);
  const [
    errorForQuantityFieldIfItStartsWithZero,
    setErrorForQuantityFieldIfItStartsWithZero,
  ] = useState(false);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);
  const addANewProductRef = useRef(null);

  const classes = useStyles();

  /*----------------------------------------------validation for inputs-------------------------------------------------*/
  const latinLettersRegex = /^[a-zA-Z]+$/;
  const numberRegex = /^\d+$/;
  const numberRegexToCheckIfTheNumberStartsWithZeroOrNot = /^[1-9]\d*$/;

  const nameIncludesOnlyLatinLetters = latinLettersRegex.test(name?.trim());
  const priceIncludesOnlyNumber = numberRegex.test(price?.trim());
  const priceMustNotStartWithZero =
    numberRegexToCheckIfTheNumberStartsWithZeroOrNot.test(price?.trim());
  const quantityIncludesOnlyNumber = numberRegex.test(quantity?.trim());
  const quantityMustNotStartWithZero =
    numberRegexToCheckIfTheNumberStartsWithZeroOrNot.test(quantity?.trim());

  useEffect(() => {
    if (!nameIncludesOnlyLatinLetters && name?.trim()) {
      setErrorForNameField(true);
    } else {
      setErrorForNameField(false);
    }
  }, [name, nameIncludesOnlyLatinLetters]);

  useEffect(() => {
    if (!priceIncludesOnlyNumber && price?.trim()) {
      setErrorForPriceField(true);
    } else {
      setErrorForPriceField(false);
    }
  }, [price, priceIncludesOnlyNumber]);

  useEffect(() => {
    if (!priceMustNotStartWithZero && price?.trim()) {
      setErrorForPriceFieldIfItStartsWithZero(true);
    } else {
      setErrorForPriceFieldIfItStartsWithZero(false);
    }
  }, [price, priceMustNotStartWithZero]);

  useEffect(() => {
    if (!quantityIncludesOnlyNumber && quantity?.trim()) {
      setErrorForQuantityField(true);
    } else {
      setErrorForQuantityField(false);
    }
  }, [quantity, quantityIncludesOnlyNumber]);

  useEffect(() => {
    if (!quantityMustNotStartWithZero && quantity?.trim()) {
      setErrorForQuantityFieldIfItStartsWithZero(true);
    } else {
      setErrorForQuantityFieldIfItStartsWithZero(false);
    }
  }, [quantity, quantityMustNotStartWithZero]);

  /*-----------------------------------------------------------------------------------------------------------------------*/

  /*------------------------------------------------navigating to the next input field when pressing the 'tab' key-------*/

  function goToTheNextInputFieldWhenPressingTab(event) {
    if (event.key === 'Tab') {
      if (nameRef) {
        priceRef.current.focus();
      }
      if (priceRef) {
        quantityRef.current.focus();
      }
      if (quantityRef) {
        addANewProductRef.current.focus();
      }
    }
  }

  /*--------------------------------------------------------------------------------------------------------------------*/

  /*---------------------------------------------Adding  a new product------------------------------------------------------*/

  function onCreate() {
    setNewProduct({
      ...newProduct,
      name: name,
      quantity: quantity,
      price: price,
      id: uuidv4(),
      defaultQuantityToBeChanged: 0,
      previouslyBoughtQuantity: 0,
    });
    setName('');
    setQuantity('');
    setPrice('');
  }

  /*--------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div className={classes.containerOfInputsAndAgGridComponent}>
      <div className={classes.containerOfInputs}>
        <TextField
          value={name}
          ref={nameRef}
          onChange={(e) => setName(e.target.value)}
          label='Name of the product'
          variant='outlined'
          helperText={
            errorForNameField ? 'Please enter only Latin letters.' : ''
          }
        />
        <TextField
          value={price}
          ref={priceRef}
          onChange={(e) => setPrice(e.target.value)}
          label='Price of the product'
          variant='outlined'
          helperText={
            errorForPriceField
              ? 'Please enter only digits.'
              : errorForPriceFieldIfItStartsWithZero
              ? 'Price can not start with zero'
              : ''
          }
        />
        <TextField
          value={quantity}
          ref={quantityRef}
          onChange={(e) => setQuantity(e.target.value)}
          label='Quantity of the product'
          variant='outlined'
          helperText={
            errorForQuantityField
              ? 'Please enter only digits.'
              : errorForQuantityFieldIfItStartsWithZero
              ? 'Quantity can not start with zero'
              : ''
          }
        />
        <Button
          disabled={
            quantity.length < 1 ||
            name.length < 3 ||
            price.length < 1 ||
            errorForNameField ||
            errorForPriceField ||
            errorForPriceFieldIfItStartsWithZero ||
            errorForQuantityField ||
            errorForQuantityFieldIfItStartsWithZero
          }
          ref={addANewProductRef}
          onKeyPress={(e) => e.key === 'Enter' && onCreate()}
          onClick={onCreate}
          color='primary'
          variant='contained'>
          Add a new product
        </Button>
      </div>
      <div className={classes.containerOfAgGridComponent}>
        <AgGridSection newProduct={newProduct} />
      </div>
    </div>
  );
};

export default CreatingProductSection;
/*----------------------------------------------Styles-------------------------------------------------------------*/
const useStyles = makeStyles({
  containerOfInputsAndAgGridComponent: {
    // backgroundColor: 'green',
  },
  containerOfInputs: {
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px rgb(20, 33, 155) solid',
    borderRadius: 15,
    padding: 20,
    margin: 50,
    // backgroundColor: 'blue',
    height: '10%',
  },
  containerOfAgGridComponent: {
    // backgroundColor: 'yellow',
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px rgb(20, 33, 155) solid',
    borderRadius: 15,
    padding: 20,
    margin: 50,
  },
});
