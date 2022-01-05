import { useEffect, useState } from "react";
import HeroSec from "./Hero_sec";
import win from '../win.gif'
import Footer from "./Footer";

const Home = () => {

    let [mainnum, setMainnum] = useState(null);
    let [won, setWon] = useState(false);
    let [finaltime, setFinaltime] = useState(0);

    let [timer, setTimer] = useState(0);
    let [usernum, setUsernum] = useState(1);
    let [tried, setTried] = useState([]);
    let [tip, setTip] = useState('');


    useEffect(() => {
        setMainnum(generateNum());
        const interval = setInterval(() => {
            setTimer( timer => timer + 1 );
        }, 1000);
        return () => clearInterval(interval)
    }, [])
    
    const generateNum = () => {
        return Math.floor(Math.random() * 100) + 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(parseInt(usernum) === mainnum){
            setFinaltime(timer);
            setTried([...tried, usernum]);
            setWon(true);
        } else {
            mainnum > usernum ? setTip(`Number is greater than ${usernum}`) : mainnum < usernum ? setTip(`Number is less than ${usernum}`) : console.log(1);
            setTried([...tried, usernum]);
        }
    }

    const newGame = () => {
        setWon(false);
        setUsernum(1);
        setTried([]);
        setTimer(0);
        setMainnum(generateNum());
        setTip('');
    }

    return <>
        <div>
            <HeroSec />
            <div className="container d-flex justify-content-center my-2">
                <div className="game-contain p-4">
                    {
                        !won ? <>
                            <h6 className="fw-bold">I am thinking of a number between 1-100</h6>
                            <p className="fw-bold fs-6">can you guess it?</p>

                            <form className="d-flex align-items-center flex-column" onSubmit={handleSubmit}>
                                <input type="number" min="1" max="100" value={usernum} required onChange={(e) => setUsernum(e.target.value)} />

                                <p className="tip mb-0 mt-3">{tip}</p>

                                <button type="submit" className="guess-btn mt-4" >guess</button>
                            </form>

                            <p className="mt-4">Tried Number(s)</p>
                            <div className="trials-contain">
                                {
                                    tried.map((trial, index) => (
                                        <p className="trials" key={index}>{trial}</p>
                                    ))
                                }
                            </div>

                            {/* Stats */}
                            <div className="row g-2 mt-3 w-100">
                                <div className="col-6">
                                    <div className="stats-card">
                                        <p>Time</p>
                                        <p className="value">{  Math.floor(timer/60) > 9 ? Math.floor(timer/60) : '0' + Math.floor(timer/60)  } : { timer % 60 > 9 ? timer % 60 : '0' + (timer % 60) }</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <button className="restart-btn" onClick={newGame}>new game</button>
                                </div>
                            </div>
                        </>
                        : <>
                            <div className="celeb-img">
                                <img src={win} alt="" />
                            </div>
                            <h4 className="fw-bold mb-3">Congrats you beat my game</h4>
                            <p>Actual number is { mainnum }</p>
                            <p>You tried { tried.length } times before you guessed the number</p>
                            <p>It took you {  Math.floor(finaltime/60) > 9 ? Math.floor(finaltime/60) : '0' + Math.floor(finaltime/60)  } : { finaltime % 60 > 9 ? finaltime % 60 : '0' + finaltime % 60 } to guess the number</p>
                            <button onClick={newGame} className="mt-3 newgame-btn">play again</button>
                        </>
                    }
                    
                </div>
            </div>
            <Footer />
        </div>
    </>
}

export default Home;