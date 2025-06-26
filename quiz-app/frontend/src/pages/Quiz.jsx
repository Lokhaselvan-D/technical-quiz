// import { useState, useEffect } from 'react';
// import { submitScore } from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const questions = [
//   { question: '2 + 2 = ?', options: ['3', '4', '5'], answer: '4' },
//   { question: 'Capital of India?', options: ['Delhi', 'Mumbai', 'Chennai'], answer: 'Delhi' },
//   // Add 8 more...
// ];

// export default function Quiz() {
//   const [index, setIndex] = useState(0);
//   const [selected, setSelected] = useState('');
//   const [score, setScore] = useState(0);
//   const [time, setTime] = useState(600); // 10 min
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(t => t - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleNext = () => {
//     if (selected === questions[index].answer) setScore(score + 1);
//     setSelected('');
//     if (index + 1 < questions.length) setIndex(index + 1);
//     else handleSubmit();
//   };

//   const handleSubmit = async () => {
//     await submitScore({ userId: user.userId, score });
//     navigate('/result', { state: { score } });
//   };

//   return (
//     <div>
//       <h3>Time: {Math.floor(time / 60)}:{time % 60}</h3>
//       <h2>{questions[index].question}</h2>
//       {questions[index].options.map(opt => (
//         <button key={opt} onClick={() => setSelected(opt)} style={{ background: selected === opt ? 'lightgreen' : '' }}>
//           {opt}
//         </button>
//       ))}
//       <br />
//       <button onClick={handleNext}>Next</button>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { submitScore } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const questions = [
  { question: '2 + 2 = ?', options: ['3', '4', '5'], answer: '4' },
  { question: 'Capital of India?', options: ['Delhi', 'Mumbai', 'Chennai'], answer: 'Delhi' },
  { question: 'Who is known as the Father of Computers?', options: ['Charles Babbage', 'Alan Turing', 'Steve Jobs'], answer: 'Charles Babbage' },
  { question: 'What planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus'], answer: 'Mars' },
  { question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen'], answer: 'Carbon Dioxide' },
  { question: 'Who wrote the National Anthem of India?', options: ['Bankim Chandra', 'Rabindranath Tagore', 'Subhash Chandra Bose'], answer: 'Rabindranath Tagore' },
  { question: 'Which is the largest mammal in the world?', options: ['Elephant', 'Blue Whale', 'Giraffe'], answer: 'Blue Whale' },
  { question: 'What is the boiling point of water?', options: ['100°C', '50°C', '150°C'], answer: '100°C' },
  { question: 'Which continent is known as the Dark Continent?', options: ['Asia', 'Africa', 'Australia'], answer: 'Africa' },
  { question: 'How many colors are there in a rainbow?', options: ['5', '6', '7'], answer: '7' }
];


export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(600); // 10 minutes
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (selected === questions[index].answer) setScore(score + 1);
    setSelected('');
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    await submitScore({ userId: user.userId, score });
    navigate('/result', { state: { score } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-600">
            Question {index + 1} of {questions.length}
          </h2>
          <div className="text-gray-500 text-sm">
            ⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800">{questions[index].question}</h3>

        <div className="grid gap-4">
          {questions[index].options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`w-full px-4 py-2 rounded-lg border ${
                selected === opt
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-blue-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
  <button
    onClick={() => setIndex(index - 1)}
    disabled={index === 0}
    className={`px-6 py-2 rounded-xl font-medium transition 
      ${index === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
  >
    Previous
  </button>

  <button
    onClick={handleNext}
    disabled={!selected}
    className={`px-6 py-2 rounded-xl font-medium transition 
      ${selected ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
  >
    {index + 1 === questions.length ? 'Submit' : 'Next'}
  </button>
</div>

      </div>
    </div>
  );
}
