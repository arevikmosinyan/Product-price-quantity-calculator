import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import QuantityChanger from './QuantityChanger';
import PercentageChanger from './PercentageChanger';
import ButtonRenderer from './ButtonRenderer';
import '../assets/styles/customStyles.css';

const AgGridSection = (props) => {
  const classes = useStyles();
  const [gridApiInitialized, setGridApiInitialized] = useState(false);

  const [
    dataFromChildQuantityChangerComponent,
    setDataFromChildQuantityChangerComponent,
  ] = useState(0);

  const stateOfQuantityChangerRef = useRef();
  stateOfQuantityChangerRef.current = +dataFromChildQuantityChangerComponent;

  const [
    dataFromChildPercentageChangerComponent,
    setDataFromChildPercentageChangerComponent,
  ] = useState(0);

  const stateOfPercentageChangerRef = useRef();
  stateOfPercentageChangerRef.current = dataFromChildPercentageChangerComponent;

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const disableSubmitButtonRef = useRef();
  disableSubmitButtonRef.current = disableSubmitButton;

  const [rowData, setRowData] = useState(
    JSON.parse(localStorage.getItem('rowData')) || [],
  );
  const rowDataRef = useRef();
  rowDataRef.current = rowData;

  const [initial, setInitial] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});

  const [enableDeleteButton, setEnableDeleteButton] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const [submittingProductId, setSubmittingProductId] = useState(null);
  const submittingProductIdRef = useRef();
  submittingProductIdRef.current = submittingProductId;
  const [submittingProductQuantity, setSubmittingProductQuantity] = useState(0);

  const gridRef = useRef(null);

  const latinLettersRegex = /^[a-zA-Z]+$/;
  const numberRegex = /^\d+$/;
  const numberRegexToCheckIfTheNumberStartsWithZeroOrNot = /^[1-9]\d*$/;

  /*-------------------------------------------------Columns of AG grid --------------------------------------------------*/
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'name',
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      valueSetter: (params) => {
        if (
          latinLettersRegex.test(params.newValue) &&
          params.newValue.length >= 3
        ) {
          params.data.name = params.newValue;
          return true;
        } else {
          return false;
        }
      },
    },
    {
      field: 'price',
      filter: true,
      valueSetter: (params) => {
        if (
          numberRegex.test(params.newValue) &&
          numberRegexToCheckIfTheNumberStartsWithZeroOrNot.test(params.newValue)
        ) {
          params.data.price = params.newValue;
          return true;
        } else {
          return false;
        }
      },
    },
    {
      field: 'quantity',
      filter: true,
      valueSetter: (params) => {
        if (
          numberRegex.test(params.newValue) &&
          numberRegexToCheckIfTheNumberStartsWithZeroOrNot.test(params.newValue)
        ) {
          params.data.quantity = params.newValue;
          return true;
        } else {
          return false;
        }
      },
    },

    {
      field: 'percentageToIncreaseTheSoldProductPrice',
      headerName: 'Percentage (%)',
      filter: false,
      cellRenderer: PercentageChanger,
      cellRendererParams: {
        functionOfPercentageChanger: handleDataFromChildPercentageChanger,
      },
      // valueSetter: (params) => {
      //   if (numberRegex.test(params.newValue)) {
      //     params.data.percentageToIncreaseTheSoldProductPrice = params.newValue;
      //     setPercentage(params.newValue);
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },
      editable: false,
      suppressCellSelection: true,
      cellStyle: { width: '' },
    },
    {
      field: 'defaultQuantityToBeChanged',
      headerName: 'Bought quantity',
      filter: false,
      cellRenderer: QuantityChanger,
      cellRendererParams: {
        functionOfQuantityChanger: handleDataFromChildQuantityChanger,
      },
      editable: false,
      suppressCellSelection: true,
      cellStyle: { width: '' },
    },
    {
      field: 'previouslyBoughtQuantity',
      headerName: 'Previously bought',
      filter: false,
      editable: false,
      suppressCellSelection: true,
      cellStyle: { width: '' },
    },
    {
      field: 'submitChanges',
      headerName: 'Actions',
      filter: false,
      cellRenderer: ButtonRenderer,
      cellRendererParams: {
        functionOfButtonRenderer: () => updateDataOfTheBoughtProduct(),
        disableSubmitButton: disableSubmitButtonRef.current,
      },
      editable: false,
      suppressCellSelection: true,
      cellStyle: { width: '' },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      editable: true,
    }),
    [],
  );

  useEffect(() => {
    if (gridRef.current && !gridApiInitialized) {
      const gridApi = gridRef.current.api;
      if (gridApi) {
        gridApi.sizeColumnsToFit();
        setGridApiInitialized(true);
      }
    }
  }, [gridApiInitialized]);
  /*-------------------------------------------------------------------------------------------------------------------------*/

  function totalSumToSubtractFromProductsThatAreNotBoughtFunc() {
    let productWhichWasSubmited = rowDataRef.current.find((elem) => {
      return submittingProductIdRef.current === elem.id;
    });

    return (
      0.01 *
      +stateOfPercentageChangerRef.current *
      +productWhichWasSubmited.price
    );
  }

  // function boughtQuantity() {
  //   let productWhichWasSubmited = rowDataRef.current.find((elem) => {
  //     return submittingProductIdRef.current === elem.id;
  //   });
  //   if (
  //     submittingProductIdRef.current === productWhichWasSubmited.id &&
  //     (stateOfQuantityChangerRef.current !== '0' ||
  //       stateOfQuantityChangerRef.current.trim() !== '')
  //   ) {
  //     return stateOfQuantityChangerRef.current;
  //   } else {
  //     return 'hello';
  //   }
  // }

  function updateDataOfTheBoughtProduct() {
    let totalSumToSubtractFromProductsThatAreNotBought =
      totalSumToSubtractFromProductsThatAreNotBoughtFunc();

    const result = rowDataRef.current.map((elem) => {
      let countOfProductsWithoutBoughtProduct = rowDataRef.current.length - 1;
      let sumToSubtractFromTheSingleProductPriceWhichIsNotBought;

      if (submittingProductIdRef.current === elem.id) {
        return {
          ...elem,
          quantity: elem.quantity - stateOfQuantityChangerRef.current,
          previouslyBoughtQuantity:
            elem.previouslyBoughtQuantity + stateOfQuantityChangerRef.current,
          price: +elem.price + totalSumToSubtractFromProductsThatAreNotBought,
        };
      } else {
        sumToSubtractFromTheSingleProductPriceWhichIsNotBought =
          totalSumToSubtractFromProductsThatAreNotBought /
          countOfProductsWithoutBoughtProduct;

        return {
          ...elem,
          price:
            +elem.price -
            sumToSubtractFromTheSingleProductPriceWhichIsNotBought,
        };
      }
    });

    setRowData(result);
    return result;
  }

  function handleDataFromChildQuantityChanger(data) {
    setDisableSubmitButton(false);
    console.log(
      disableSubmitButtonRef.current + 'disableSubmitButton in the function',
    );
    console.log(
      stateOfQuantityChangerRef.current + 'stateOfQuantityChangerRef.current',
    );
    console.log(data + 'data');
    setDataFromChildQuantityChangerComponent(data);
  }

  function handleDataFromChildPercentageChanger(data) {
    setDataFromChildPercentageChangerComponent(data);
  }
  console.log(
    disableSubmitButtonRef.current + 'disableSubmitButton out of function',
  );
  /*----------------------------------------------onCellClick+++---------------------------------------------------*/
  const cellClickedListener = (event) => {
    if (
      event.column.getColId() === 'defaultQuantityToBeChanged' ||
      event.column.getColId() === 'percentageToIncreaseTheSoldProductPrice' ||
      event.column.getColId() === 'submitChanges'
    ) {
      const rowNode = event.node;
      if (rowNode.isSelected()) {
        rowNode.setSelected(false);
      }
    }
    const boughtProduct = rowDataRef.current.find(
      (product) => product.id === event.data.id,
    );
    setSubmittingProductId(boughtProduct?.id);
    setEnableDeleteButton(true);
  };

  /*-------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------Checking if the cell is selected or not---------------------*/

  const onSelectionChanged = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const isNameFieldChecked = selectedNodes.find((node) => node.data.name);
    setEnableDeleteButton(!!isNameFieldChecked);
  };

  /*---------------------------------------------------------------------------------------------------------*/

  /*------------------------------------------------- Remove the product-------------------------------------*/
  function onRemove() {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const updatedRowData = rowData.filter((row) => !selectedData.includes(row));

    setRowData(updatedRowData);
    setEnableDeleteButton(false);
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*------------------------Row Data  (array of objects)---------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (!initial) {
      setInitial(true);
    } else {
      setRowData((prevRowData) => {
        if (props.newProduct) {
          return [...prevRowData, props.newProduct];
        }
        // if (selectedProduct) {
        //   return [...prevRowData, selectedProduct];
        // }

        return prevRowData;
      });
    }
  }, [props.newProduct]);

  /*------------------------------------------------Setting in the localStorage the updated rowData------------------------ */

  useEffect(() => {
    if (!initial) {
      setInitial(true); //to prevent updating the rowdata with an empty line on  mount phase
    } else {
      localStorage.setItem(
        'rowData',
        JSON.stringify(
          rowData.filter(
            (singleProduct) => Object.values(singleProduct).length,
          ),
        ),
      );

      //filter is used to prevent [], when reloading the page, as we still have an [] in local storage, because we have [] on mounting, and when we call remove function when deleted all items , the initial value of row data is setting in local storage const [rowData, setRowData] = useState(JSON.parse(localStorage.getItem('rowData')) || [], );
    }
  }, [rowData]);

  /*------------------------------------------------------------------------------------------------------------------------ */
  /*-------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div>
      <div className={classes.agGridContainerWithButton}>
        <Button
          onClick={onRemove}
          color='primary'
          variant='contained'
          disabled={!enableDeleteButton}
          className={classes.commonButton}>
          Delete selected products
        </Button>

        <div class='ag-theme-alpine' style={{ width: '100%', height: '100%' }}>
          <AgGridReact
            style={{ width: '100%' }}
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection='multiple'
            onCellClicked={cellClickedListener}
            onSelectionChanged={onSelectionChanged}
            domLayout='autoHeight' // Set the domLayout property to autoHeight
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AgGridSection;
/*----------------------------------------------Styles-------------------------------------------------------------*/
const useStyles = makeStyles({
  agGridContainerWithButton: {},
  commonButton: {
    marginTop: 15,
    marginBottom: 15,
  },
});
