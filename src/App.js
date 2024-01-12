import CreatingProduct from './components/CreatingProductSection';
import { makeStyles } from '@material-ui/core';

function App() {
  const classes = useStyles();
  return (
    <div className={classes.containerOfCreatingProductComponent}>
      <CreatingProduct />
    </div>
  );
}

export default App;
/*------------------------------------------------------------Styles------------------------------------------ */

const useStyles = makeStyles({
  containerOfCreatingProductComponent: {
    backgroundColor: 'rgb(174, 83, 83)', //rose
    border: '2px rgb(20, 33, 155) solid',
    borderRadius: 15,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

/*----------------------------------------------------------------------------------------------------------*/
