import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ProductsTable, ProductForm } from './components';
import { IProduct } from './services/models';
import { Button, Drawer, FormControl, FormLabel, IconButton, Input, Stack, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useLazyGetProductsQuery } from './services/api';
import { Search } from '@mui/icons-material';

function App() {
  const [trigger, { isSuccess, isUninitialized, data }] = useLazyGetProductsQuery();
  const [drawerState, setDrawerState] = useState<{ isOpen: boolean, prod: IProduct | null }>({ isOpen: false, prod: null });
  const [prods, setProd] = useState<IProduct[]>([]);
  const [scrumMaster, setScrumMaster] = useState('');
  const [developer, setDeveloper] = useState('');
  const handleClickRow = (prod: IProduct) => {
    setDrawerState({ isOpen: true, prod: prod });
  }

  const handleDrawerClose = () => {
    setDrawerState({ isOpen: false, prod: null });
  }

  useEffect(() => {
    if (isSuccess) {
      setProd(data as IProduct[]);
    }
  }, [data, isSuccess, setProd]);


  useEffect(() => {
    if (isUninitialized) {
      trigger({}, false);
    }
  }, [isUninitialized, trigger]);

  const handleSearch = () => {
    console.log('got here');
    let query: {
      scrumMasterName?: string;
      developer?: string;
    } = {};
    if (scrumMaster) {
      query.scrumMasterName = scrumMaster.trim().replace(/\s/g, '+');
    }
    if (developer) {
      query.developer = developer.trim().replace(/\s/g, '+');;
    }
    trigger(query, false);
  }

  return (
    <>
      <ToastContainer position="top-left" />
      <div className="App">
        <Stack spacing={5} alignItems={'center'} marginTop={10}>
          <Typography level="h1">BC Government Ministry of Education and Child Care Product Catalog</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={5}
          >
            <Stack direction="row" spacing={2} >
              <FormControl>
                <FormLabel> Search by Scrum Master</FormLabel>
                <Input value={scrumMaster} onChange={(e) => { setScrumMaster(e.target.value); }} />
              </FormControl>
              <FormControl>
                <FormLabel> Search by developer</FormLabel>
                <Input value={developer} onChange={(e) => { setDeveloper(e.target.value); }} />
              </FormControl>
              <IconButton onClick={handleSearch}><Search /></IconButton>
            </Stack>
            <Button onClick={() => setDrawerState({ isOpen: true, prod: null })} variant="solid" size="lg" sx={{ width: 256, height: 50 }}> Add Product</Button>
          </Stack>
          <ProductsTable handleClickRow={handleClickRow} data={prods} />
        </Stack>
        <Drawer anchor="right" open={drawerState.isOpen} onClose={handleDrawerClose}>
          {drawerState.prod ? <ProductForm prod={drawerState.prod} handleDone={handleDrawerClose} /> : <ProductForm handleDone={handleDrawerClose} />}
        </Drawer>
      </div>
    </>
  );
}

export default App;
