import React, {useState, useEffect} from 'react';
import './App.css';
import './fonts/GermaniaOne-Regular.woff';
import CountUp from 'react-countup';

function App() {
    const [currentWR, setCurrentWR] = useState(50);
    const [prevWR, setPrevWR] = useState(0);
    const wrTransitionTime = 1;
    let timer;
    let hueDegree = Math.round((currentWR)*120/100);

    useEffect(() => {
        hueDegree = Math.round((currentWR)*120/100);
    }, [currentWR]);

    const handleRandomChange = () => {
        const newCurrentWR = Math.floor(Math.random()*(100));
        setPrevWR(currentWR);
        setCurrentWR(newCurrentWR);
        clearTimeout(timer);
        timer = setTimeout(function(){
            setPrevWR(newCurrentWR);
        }, wrTransitionTime*1000);
    }
    const countUpRef = React.useRef(null);

    return (
        <div className="App">
            <header className="germania" style={{color: "white"}}>
            Here's some text!
            </header>
            <div style={{
                color: "hsl("+hueDegree+",100%,55%)",
                transition: "all "+wrTransitionTime+"s ease",
                WebkitTransition: "all "+wrTransitionTime+"s ease",
                MozTransition: "all "+wrTransitionTime+"s ease"
            }}>
            <CountUp
                start={prevWR}
                end={currentWR}
                duration={wrTransitionTime}
                suffix="%"
                useEasing={true}
                easingFn={(t, b, c, d) => {
            		if ((t/=d/2) < 1) return c/2*t*t + b;
            		return -c/2 * ((--t)*(t-2) - 1) + b;
                }}
                className="percentage-display"
            >
                {({countUpRef})} => {
                    <div ref={countUpRef}/>
                }
            </CountUp>
            </div>
            <hr />
            <button
              onClick={handleRandomChange}
            >
              Randomize
            </button>

        </div>
    );
}

//https://css-tricks.com/animating-number-counters/

export default App;
