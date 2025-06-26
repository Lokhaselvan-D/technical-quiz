import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-700">🎉 Quiz Completed!</h2>
        <p className="text-xl font-medium text-gray-700">
          Your Score: <span className="text-green-800 font-bold">{state?.score}</span>
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
