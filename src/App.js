import Slider from './Components/Slider'
import './App.css';
import ContactForm from "./Components/ContactForm";

function App() {
  return (
    <div className="App">

        <div className="top-bar"></div>
        <div className="nav-bar">
        </div>
        <div className={'container'}>
            <div className="header-logo">
                <img className="logo" src={"https://www.eliston.com.au/wp-content/uploads/2019/01/el-logo-desktop.svg"} />
            </div>

            <div className="contacts">
                <ul>
                    <li><i className="fas fa-map-marker-alt"></i><span className={'desktop'}>VISIT OUR SALES CENTRE</span></li>
                    <li><i className="fas fa-phone-alt"></i><span className={'desktop'}>1300 354 786</span></li>
                </ul>
            </div>

            <div className={'slider-content'}>
                <div className={'slider-content-left'}>
                    <h1>Two stunning new Townhome Releases Launching Early 2021</h1>
                    <button className={'button green mobile'}>Register</button>
                </div>
                <div className={'slider-content-right'}>
                    <ContactForm  />
                </div>
            </div>
        </div>
        <Slider />

    </div>
  );
}

export default App;
