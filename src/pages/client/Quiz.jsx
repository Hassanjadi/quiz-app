import axios from "axios";
import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

const Quiz = () => {
  const { state, handleFunction } = useContext(GlobalContext);
  const {
    data,
    setData,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    correctAnswers,
    setCorrectAnswers,
    incorrectAnswers,
    setIncorrectAnswers,
    timeRemaining,
    setTimeRemaining,
  } = state;

  const { handleAnswerClick, handleReset } = handleFunction;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
        );

        setData(result.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        // Time's up, display results
        setCurrentQuestionIndex(data.length);
      }
    }, 1000); // Update every second

    return () => clearTimeout(timer);
  }, [timeRemaining, data.length]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pt-24 bg-gray-50">
      {currentQuestionIndex < data.length && (
        <div
          key={data[currentQuestionIndex].question}
          className="shadow-lg relative w-2/4 flex flex-col px-10 py-20 gap-3 rounded-md bg-white"
        >
          <div className="font-semibold text-white w-24 p-2 rounded-md text-center -mt-4 absolute right-10 top-0 bg-violet-600 border-b-2 border-violet-900 shadow-md">
            {currentQuestionIndex + 1}/{data.length}
          </div>
          <div className="font-semibold text-black w-16 p-1 rounded-md text-center bg-slate-100 hover:bg-slate-200 border-b-4 border-slate-300">
            {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}
          </div>
          <h1 className="font-semibold text-xl">
            {data[currentQuestionIndex].question}
          </h1>
          <div className="grid grid-cols-2 gap-5">
            {data[currentQuestionIndex].incorrect_answers.map(
              (answer, index) => (
                <div
                  key={index}
                  className="rounded-xl text-white font-semibold p-5 bg-violet-600 hover:bg-violet-500 border-b-4 border-violet-900 cursor-pointer"
                  onClick={() => handleAnswerClick(false)}
                >
                  <p>{answer}</p>
                </div>
              )
            )}
            <div
              className="rounded-xl text-white font-semibold p-5 bg-violet-600 hover:bg-violet-500 border-b-4 border-violet-900 cursor-pointer"
              onClick={() => handleAnswerClick(true)}
            >
              <p>{data[currentQuestionIndex].correct_answer}</p>
            </div>
          </div>
        </div>
      )}

      {currentQuestionIndex === data.length && (
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <div className="text-center space-y-5">
            <div>
              <img src="" alt="" />
            </div>
            <p className="text-xl font-semibold">
              Selamat, Anda telah menyelesaikan kuis! 🏆
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p>Jawaban Benar</p>
                <div className="bg-violet-600  text-white p-10 text-3xl font-bold rounded-lg">
                  {correctAnswers}
                </div>
              </div>
              <div className="space-y-2">
                <p>Jawab Salah</p>
                <div className="bg-violet-600 text-white p-10 text-3xl font-bold rounded-lg">
                  {incorrectAnswers}
                </div>
              </div>
              <div className="space-y-2">
                <p>Jumlah Jawab</p>
                <div className="bg-violet-600 text-white p-10 text-3xl font-bold rounded-lg">
                  {correctAnswers + incorrectAnswers}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Link
                onClick={handleReset}
                className="bg-violet-600 hover:bg-violet-500 border-b-4 border-violet-900 p-3 rounded-md text-white"
              >
                Play Again
              </Link>
              <Link
                to={"/"}
                className="bg-slate-200 hover:bg-slate-100 border-b-4 border-slate-300 p-3 rounded-md text-neutal-900"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
