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

/*----------------------------------------------------------------------------------------------------------*/
const useStyles = makeStyles({
  appContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
});
