import logo from './logo.svg';
import './App.css';

import { Route, Routes, useNavigate } from "react-router-dom"
import SenderLocation from './components/SenderLocation';
import ReceiverLocation from './components/ReceiverLocation';
import GoogleMap from './components/GoogleMap';
import ImplementCustomHook from './components/ImplementCustomHook';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/sender' element={<SenderLocation/>}/>
        <Route path='/receiver' element={<ReceiverLocation/>} />
        <Route path='/test' element={<GoogleMap/>}/>
        <Route path='/' element={<ImplementCustomHook/>}/>
      </Routes>
    </div>
  );
}

export default App;
