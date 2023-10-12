import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ProductsTable, ProductForm } from './components';
import { IProduct } from './services/models';
import { Button, Drawer, Stack, Typography } from '@mui/joy';
import { useState } from 'react';

function App() {
  const [drawerState, setDrawerState] = useState<{ isOpen: boolean, prod: IProduct | null }>({ isOpen: false, prod: null });

  const handleClickRow = (prod: IProduct) => {
    console.log(`clicked row ${JSON.stringify(prod)}`);
    setDrawerState({ isOpen: true, prod: prod });
  }

  const handleDrawerClose = () => {
    setDrawerState({ isOpen: false, prod: null });
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
            spacing={2}
          >
            <Button onClick={() => setDrawerState({ isOpen: true, prod: null })} variant="solid" size="lg" sx={{ width: 256 }}> Add Product</Button>
          </Stack>
          <ProductsTable handleClickRow={handleClickRow} />
        </Stack>
        <Drawer anchor="right" open={drawerState.isOpen} onClose={handleDrawerClose}>
          {drawerState.prod ? <ProductForm prod={drawerState.prod} handleDone={handleDrawerClose} /> : <ProductForm handleDone={handleDrawerClose} />}
        </Drawer>
      </div>
    </>
  );
}

export default App;
