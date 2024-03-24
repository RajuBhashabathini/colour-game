import { useEffect, useRef, useState } from "react";
import "./App.css";
import cardsData from "./mockData/cardsData";
import randomArray from "./random";

function App() {
  const [history, setHistory] = useState([]);
  const selectedItem = useRef(0);
  const [cardsDataState, setCardsDataState] = useState([]);
  const [cardsDataStateDuplicate, setCardsDataStateDuplicate] = useState([]);

  const updateUseref = () => {
    selectedItem.current = selectedItem.current + 1;
  };

  const remainingLength = cardsDataState.filter(
    (ele) => ele.found === true
  ).length;

  useEffect(() => {
    setCardsDataState(randomArray(cardsData));
    setCardsDataStateDuplicate(randomArray(cardsData));
  }, []);

  return (
    <div className="h-full p-3 bg-blue-200">
      <div className="flex justify-center items-center bg-lime-400">
        You have tried {selectedItem.current} times.
      </div>
      <div className=" ">
        {remainingLength !== cardsDataState.length ? (
          <div className="grid grid-rows-4 grid-cols-4 grid-flow-col gap-3 justify-items-center p-3">
            {cardsDataState.map((element, index) => {
              return (
                <div
                  key={element.id}
                  className={` flex items-center justify-center w-32 h-32 border border-slate-700 ${
                    element.found ? "cursor-not-allowed" : "cursor-pointer"
                  } `}
                  style={{
                    backgroundColor: element.found
                      ? element.colour
                      : element.show
                      ? element.colour
                      : "darkgray",
                  }}
                  onClick={() => {
                    let hii = history;

                    if (element.found !== true) {
                      if (
                        history &&
                        history.length > 0 &&
                        history[0].id === element.id
                      ) {
                        //! history.length > 0  implies its second click.
                        //! and we are checking whether user clickig same div twice
                        // alert("you can't click same div twice");
                      } else {
                        //! Main code starts here
                        hii.push(element);
                        updateUseref();
                        let showChange = cardsDataState.map((item) => {
                          if (item.id === element.id) {
                            return { ...item, show: true };
                          }
                          return item;
                        });
                        setCardsDataState(showChange);
                        if (
                          selectedItem.current > 0 &&
                          selectedItem.current % 2 === 0
                        ) {
                          if (hii[0]?.colour === hii[1]?.colour) {
                            const updatedHello = cardsDataState.map((item) => {
                              if (item.colour === hii[0].colour) {
                                return {
                                  ...item,
                                  found: true,
                                  show: false,
                                };
                              }
                              return item;
                            });
                            setTimeout(() => {
                              setCardsDataState(updatedHello);
                              setCardsDataStateDuplicate(updatedHello);

                              setHistory([]);
                              alert("Congrats You have good memory");
                            }, 500);
                          } else {
                            setTimeout(() => {
                              setCardsDataState(cardsDataStateDuplicate);
                              setHistory([]);
                              alert("try again");
                            }, 500);
                          }
                        } else {
                          //! This is first click so we are upadting the history only
                          setHistory(hii);
                        }
                      }
                    }
                  }}
                >
                  {element.found === true ? "" : "click me"}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="">Congats You have won the game</div>
            <button
              className="bg-blue-500 rounded-lg border border-indigo-400 p-3"
              onClick={() => {
                window.location.reload();
                selectedItem.current = 0;
                setCardsDataState(randomArray(cardsData));
              }}
            >
              Play Again...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
