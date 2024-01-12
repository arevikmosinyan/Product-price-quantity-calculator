import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import QuantityChanger from './QuantityChanger';
import ButtonRenderer from './ButtonRenderer';

const AgGridSection = (props) => {
  const classes = useStyles();

  const [
    dataFromChildQuantityChangerComponent,
    setDataFromChildQuantityChangerComponent,
  ] = useState('hello');
  const stateRef = useRef();
  stateRef.current = dataFromChildQuantityChangerComponent;

  const [rowData, setRowData] = useState(
    JSON.parse(localStorage.getItem('rowData')) || [],
  );

  const [initial, setInitial] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});
  // const [selectedProductId, setSelectedProductId] = useState('');
  const [enableDeleteButton, setEnableDeleteButton] = useState(false);
  const [enableSelectAllButton, setEnableSelectAllButton] = useState(false);
  // const [theCellWhichMustNotBeSelected, setTheCellWhichMustNotBeSelected] =
  //   useState(null);
  const [percentage, setPercentage] = useState(0);
  const [submittingProductId, setSubmittingProductId] = useState(null);
  // const [updatingSubmittingProductId, setUpdatingSubmittingProductId] =
  //   useState(null);
  const [submittingProductQuantity, setSubmittingProductQuantity] = useState(0);

  // const [cellId, setCellId] = useState(null);
  // const [clickedNode, setClickedNode] = useState(null);
  // const [clickedRowUUID, setClickedRowUUID] = useState(null);
  // const [clickedRowUUIDState, setClickedRowUUIDState] = useState(null);
  // const [newProductState, setNewProductState] = useState(props.newProduct);
  // const [newProductIdState, setNewProductIdState] = useState(
  //   props.newProduct.id,
  // );

  // const [updatedRowData, setUpdatedRowData] = useState([]);

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
      filter: false,
      valueSetter: (params) => {
        if (numberRegex.test(params.newValue)) {
          params.data.percentageToIncreaseTheSoldProductPrice = params.newValue;
          setPercentage(params.newValue);
          return true;
        } else {
          return false;
        }
      },
    },
    {
      field: 'defaultQuantityToBeChanged',
      headerName: 'Bought quantity',
      filter: false,
      cellRenderer: QuantityChanger,
      cellRendererParams: {
        functionOfQuantityChanger: handleDataFromChild,
      },
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
        functionOfButtonRenderer: updateDataOfTheBoughtProduct,
        // parameterForfunctionOfButtonRenderer:
        //   dataFromChildQuantityChangerComponent,
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
  /*-------------------------------------------------------------------------------------------------------------------------*/

  // console.log(rowData, 'rowData out of function');

  function handleDataFromChild(data) {
    console.log(data + 'data');
    setDataFromChildQuantityChangerComponent(data);
  }
  console.log(JSON.stringify(rowData) + 'rowData out of function1111111');

  function updateDataOfTheBoughtProduct() {
    console.log(rowData, 'rowData in the function'); //rowData tesnum em miayn reload ic heto

    // rowData.forEach((obj, index) => {
    //   console.log(`Object at index ${index}: ${JSON.stringify(obj)}`);
    // });

    // console.log(
    //   `dataFromChildQuantityChangerComponent in the function ${stateRef.current}`, //ok chi yete dataFromChildQuantityChangerComponent em console.log anum
    // );
    console.log(5);

    let result = rowData.map((elem, index) => {
      // console.log(elem.quantity + 'elem.quantity');
      // console.log(stateRef.current + 'stateRef.current');
      console.log(4);
      console.log(rowData + 'rowData');
      return elem;
    });
    console.log(6);
    // console.log(
    //   `difference: ${rowData.map((obj, index) => {
    //     return JSON.stringify({
    //       ...obj,
    //       quantity: obj.quantity - stateRef.current,
    //     });
    //   })}`,
    // );
    //   //   // const selectedNodes = gridRef.current.api.getSelectedNodes();
    //   //   // console.log(selectedNodes); //[{...data,parent...},{...data,parent...}]
    //   //   // const selectedData = selectedNodes.map((node) => node.data);
    //   //   // console.log(selectedData); // [{name:'apple',price:500,quantity:5,id:45216},{name:'peach',price:600,quantity:6,id:4521654263}]

    // let boughtProduct = rowData.find((singleProduct) => {
    // console.log(`${JSON.stringify(singleProduct)}`); //ok
    // console.log(`props.newProduct.id: ${props.newProduct.id}`); //undefined
    // console.log(`props.newProduct: ${JSON.stringify(props.newProduct)}`); //{}
    // console.log(`singleProduct.id: ${singleProduct.id}`); //ok
    // console.log(`singleProduct: ${JSON.stringify(singleProduct)}`); //ok
    // console.log(`submittingProductId: ${submittingProductId}`); //null/im tvac initial value-n e
    // console.log(`updatingSubmittingProductId:${updatingSubmittingProductId}`);
    // console.log(`cellId:${cellId}`);
    // return submittingProductId === singleProduct.id;
    // });

    // let boughtProductName = boughtProduct.name;

    // let boughtProductQuantity = boughtProduct.quantity;

    // let boughtProductPrice = boughtProduct.price;

    // console.log(`${boughtProduct} after hi`); //undefined after hi

    //   //   // /* let TotalSumToAddToProductsThatAreNotBought = boughtProductPrice * 0.01 * percentage */
    //   //   // let TotalSumToSubtractedFromProductsThatAreNotBought;

    //   //   // /*  if (!percentage) {
    //   //   //     TotalSumToSubtractedFromProductsThatAreNotBought = boughtProductPrice//Եթե տոկոս չեն տալիս
    //   //   //     } else { */
    //   //   // TotalSumToSubtractedFromProductsThatAreNotBought =
    //   //   //   boughtProductPrice * 0.01 * percentage;
    //   //   // /*  } */

    //   //   // let countOfProductsWithoutBoughtProduct = rowData.length - 1;

    //   //   // let sumToSubtractFromTheSingleProductPriceWhichIsNotBought =
    //   //   //   TotalSumToSubtractedFromProductsThatAreNotBought /
    //   //   //   countOfProductsWithoutBoughtProduct;

    //   //   // let result = rowData.map((elem, index) => {
    //   //   //   if (elem.nameOfProduct === boughtProductName) {
    //   //   //     return {
    //   //   //       nameOfProduct: elem.nameOfProduct,
    //   //   //       /*  priceOfSingle: elem.priceOfSingle - TotalSumToAddToProductsThatAreNotBought, */
    //   //   //       priceOfSingle:
    //   //   //         elem.priceOfSingle +
    //   //   //         TotalSumToSubtractedFromProductsThatAreNotBought,
    //   //   //       quantity: elem.quantity - 1,
    //   //   //     };
    //   //   //   } else {
    //   //   //     return {
    //   //   //       nameOfProduct: elem.nameOfProduct,
    //   //   //       priceOfSingle:
    //   //   //         elem.priceOfSingle -
    //   //   //         sumToSubtractFromTheSingleProductPriceWhichIsNotBought,
    //   //   //       quantity: elem.quantity,
    //   //   //     };
    //   //   //   }
    //   //   // });
    setRowData(result);
    return result;
  }
  /*----------------------------------------------onCellClick+++---------------------------------------------------*/
  const cellClickedListener = useCallback(
    (event) => {
      if (
        event.column.getColId() === 'defaultQuantityToBeChanged' ||
        event.column.getColId() === 'percentageToIncreaseTheSoldProductPrice' ||
        event.column.getColId() === 'submitChanges'
      ) {
        const rowNode = event.node;
        // setTheCellWhichMustNotBeSelected(rowNode);

        if (rowNode.isSelected()) {
          rowNode.setSelected(false);
        }
      }
      // const cellId = event.column.getColDef().field;
      // setCellId(cellId);
      // console.log(`cellId11111111111: ${cellId}2222`); //cellId11111111111: submitChanges2222
      // setClickedNode(event.node);
      // setClickedRowID(event.data.id);
      // console.log('clickedRowUUID updated: event.data.id', event.data.id); //ok//sa AGGridi tvac ID-n e
      // console.log('cellClicked  : event', event); //ok
      setEnableDeleteButton(true);
      // setSelectedProductId(props.newProduct.id);
      setSubmittingProductId(event.data.id);
      setSubmittingProductQuantity(event.data.quantity);
      // console.log(`submittingProductId:${submittingProductId}555555555555`);
      // console.log(`${props.newProduct.id} onCellClicked props.newProduct.id`); //undefined//sa im tvac uuid-n e
    },
    [props.newProduct.id],
  );

  useEffect(() => {
    // console.log(`submittingProductId:${submittingProductId}77777777`);
    // setUpdatingSubmittingProductId(() => {
    //   return submittingProductId;
    // });
    // console.log(
    //   `submittingProductQuantity:${submittingProductQuantity}  88888888`,
    // );
    // console.log(
    //   `${
    //     submittingProductQuantity - stateRef.current
    //   }:submittingProductQuantity- dataFromChild`,
    // );
  }, [submittingProductId, submittingProductQuantity]);

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
    // console.log(selectedNodes); //[{...data,parent...},{...data,parent...}]
    const selectedData = selectedNodes.map((node) => node.data);
    // console.log(selectedData); // [{name:'apple',price:500,quantity:5,id:45216},{name:'peach',price:600,quantity:6,id:4521654263}]

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
        if (selectedProduct) {
          return [...prevRowData, selectedProduct];
        }

        return prevRowData;
      });
    }
  }, [props.newProduct, selectedProduct]);

  /*------------------------------------------------Setting in the localStorage the updated rowData------------------------ */

  useEffect(() => {
    if (!initial) {
      setInitial(true); //to prevent updating the rowdata with an empty line on  mount phass
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

  // const frameworkComponents = {
  //   quantityEditor: QuantityEditor,
  // };

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
        {/* <div className={classes.agGrid}> */}
        <div class='ag-theme-alpine' style={{ height: '80%', width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection='multiple'
            onCellClicked={cellClickedListener}
            onSelectionChanged={onSelectionChanged}
            // frameworkComponents={{ QuantityChanger: QuantityChanger }}
            // isRowSelectable={isRowSelectable}
          />
          {/* </div> */}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AgGridSection;
/*----------------------------------------------Styles-------------------------------------------------------------*/
const useStyles = makeStyles({
  agGridContainerWithButton: {
    width: 1200,
    height: 800,
  },
  commonButton: {
    marginTop: 15,
    marginBottom: 15,
  },
});
