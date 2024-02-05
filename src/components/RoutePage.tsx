import { Routes, Route } from 'react-router-dom'
import { Vendors, DashBoard, Product } from './index';
import DataProvider from "../Context/DataProvider"


function RoutePage({ isShow }: { isShow: boolean }) {

  return (
    <>
      <DataProvider>
        <Routes>
          <Route path='/dashboard' element={<DashBoard isShow={isShow} />} />
          <Route path='/vendors' element={<Vendors isShow={isShow} />} />
          <Route path='/products' element={<Product isShow={isShow} />} />
        </Routes>
      </DataProvider>
    </>
  )
}

export default RoutePage;
