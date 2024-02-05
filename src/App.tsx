// import ExcelData from './Graph/ExcelData';
import { useState } from 'react';
import './App.css'
import { Header } from './components/index';
import Page from './components/Page';


function App() {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <>
      <Header setIsShow={setIsShow} />
      <Page isShow={isShow} />
    </>
  )
}

export default App;
