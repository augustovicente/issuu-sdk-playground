import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

function App() {
    return (
        <div className="app">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main">
                <Main />
            </div>
        </div>
    )
}

export default App
