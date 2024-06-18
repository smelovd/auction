import './App.css';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ItemPage from './components/ItemPage/ItemPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="items">
          <Route path=':id' element={<ItemPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
