import { useState, useEffect, useRef } from 'react'
import { createSet, checkSet, checkAll } from "./Helper.js"
import { clsx } from 'clsx';
import { read } from 'xlsx';

function App() {
    const [allCards, setAllCards] = useState(() => createSet())
    const [currentCards, setCurrentCards] = useState([])
    const [usedCards, setUsedCards] = useState([])
    const [selectedCards,setSelectedCards] = useState([])
    const [won, setWon] = useState(false)
    const [time, setTime] = useState(0)
    const [wonTime, setWonTime] = useState(0)
    const [removingCards, setRemovingCards] = useState([]);

    useEffect(() => { //for start of game
        const temp = []
        const first = []
        for (let i=0; i<allCards.length;i++) {
            if (i<12) {
                temp.push(allCards[i])
            } else {
                first.push(allCards[i])
            }
        }
        setCurrentCards(temp)
        setAllCards(first)
    }, [])

    useEffect(() =>  { //time
        const interval = setInterval(() => {
            setTime(prev => prev + 1);
          }, 1000);
          return () => clearInterval(interval);
    },[])

    const readableTime = time > 60 ? Math.floor(time/60)+":"+ (time%60 < 10 ? "0"+time%60 : time%60) : time

    function selectCard(card) {
        if (!selectedCards.includes(card)) {
            setSelectedCards(prev => [...prev, card])
        } else {
            setSelectedCards(prev => prev.filter(c => c !== card))
        }
    }

    if (selectedCards.length === 3) {
        if (checkSet(selectedCards[0], selectedCards[1], selectedCards[2])) {
            console.log('correct')
            setRemovingCards(selectedCards);
            setTimeout(() => {
                const temp = [];
                const used = [];
                let idx = 1;
                const currentLen = currentCards.length;
                for (let i = 0; i < currentCards.length; i++) {
                    if (selectedCards.includes(currentCards[i])) {
                        used.push(currentCards[i]);
                        if (allCards.length > 2 && currentLen !== 15) {
                            temp.push(allCards[allCards.length - idx]);
                        }
                        idx += 1;
                    } else {
                        temp.push(currentCards[i]);
                    }
                }
                const newAll = [...allCards];
                if (newAll.length > 2) {
                    newAll.pop();
                    newAll.pop();
                    newAll.pop();
                }
                setAllCards(newAll);
                setCurrentCards(temp);
                setUsedCards(used);
                setRemovingCards([]);
            }, 500)
        }
        setSelectedCards([])
    }

    useEffect( () => {
        if (allCards.length > 0 && !checkAll(currentCards) && currentCards.length === 12) {
            console.log("yayay")
            setAllCards(prev => {
                if (prev.length < 3) return prev
                const newAll = [...prev];
                const curr = [...currentCards, newAll.pop(), newAll.pop(), newAll.pop()];
    
                setCurrentCards(curr);
                return newAll;
            })
        }    
    }, [usedCards])

    
    useEffect(() => {
        if (!checkAll(currentCards) && allCards.length === 0) {
            setWon(true)
        }
    },[allCards])

    if (!checkAll(currentCards) && allCards.length === 0 && setWon === false) {
        setWon(true)
        setWonTime(readableTime)
    }

    function newGame() {
        setWon(false)
        const allTemp = createSet()
        const temp = []
        const first = []
        for (let i=0; i<allTemp.length;i++) {
            if (i<12) {
                temp.push(allTemp[i])
            } else {
                first.push(allTemp[i])
            }
        }
        setCurrentCards(temp)
        setAllCards(first)
        setUsedCards([])
        setTime(0)
        setWonTime(0)
    }

    console.log("total", checkAll(currentCards))

    const cardElems = currentCards.map((card, index) => {
        const className=clsx(['card', card.num, card.color, card.shape, card.fill, [selectedCards.includes(card) && "selected"], [won && "unclickable"], [removingCards.includes(card) && "removing"]])
        let text = ""
        if (card.shape === "circle") {
            if (card.fill === "hollow") {
                text = "○"
            } else if (card.fill === "striped") {
                text = "◍"
            } else {
                text = "●"
            }
        } else if (card.shape === "square") {
            if (card.fill === "hollow") {
                text = "□"
            } else if (card.fill === "striped") {
                text = "▥"
            } else {
                text = "∎"
            }
        } else {
            if (card.fill === "hollow") {
                text = "✰"
            } else if (card.fill === "striped") {
                text = "✯"
            } else {
                text = "★"
            }
        }
        text = text.repeat(card.num)
        return (
            <span className={className} key={index} onClick={() => selectCard(card)}>{text}</span>
        )
    })

    return (
        <main>
            <section className="info">
                <h2>Cards left: {allCards.length},{currentCards.length}</h2>
                <h2>Time: {won ? wonTime : readableTime}</h2>
                <h2>Used Cards {usedCards.length}</h2>
            </section>
            <section className="cards">
                { cardElems }
            </section>
            <section className="new-game">
                <button onClick={newGame}>New Game</button>
                {won && <button>New Game</button>}
            </section>
            
        </main>
    )
}

export default App
