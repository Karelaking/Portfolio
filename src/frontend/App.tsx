// import About from './pages/about/About';
import Home from './pages/home/Home';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div className="max-w-screen h-full">
            <Home />
            {/* <About /> */}
        </div>
    );
};

export default App;
