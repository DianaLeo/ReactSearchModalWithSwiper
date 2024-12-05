import logo from './logo.svg';
import './App.css';
import SearchComponent from './Components/SearchComponent/SearchComponent';
import SearchModal from './Components/SearchModal/SearchModal'
import {useModalStore} from './stores/useModalStore'

function App() {
  const { setModalOptions } = useModalStore()

  return (
    <div className="App">

      {/* <SearchComponent/> */}
      <button 
        onClick={
          ()=>setModalOptions({isOpen: true})
        }
      >Search</button>
      <SearchModal />
    </div>
  );
}

export default App;
