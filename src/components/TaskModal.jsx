import { useState, useEffect, useRef } from 'react';

export default function TaskModal({ task, onClose, onClaim }) {
  if (task.type === 'quiz') return <QuizModal task={task} onClose={onClose} onClaim={onClaim} />;
  if (task.type === 'survey') return <SurveyModal task={task} onClose={onClose} onClaim={onClaim} />;
  return <VideoModal task={task} onClose={onClose} onClaim={onClaim} />;
}

// ---- VIDEO TASK MODAL ----
function VideoModal({ task, onClose, onClaim }) {
  const [timeLeft, setTimeLeft] = useState(task.timer || 30);
  const [canClaim, setCanClaim] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanClaim(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl w-full max-w-md overflow-hidden animate-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{task.image}</span>
            <h3 className="text-white font-semibold text-sm">{task.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition text-xl leading-none">&times;</button>
        </div>

        <div className="aspect-video bg-black">
          <iframe
            src={task.videoURL}
            title={task.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-5 space-y-4">
          <div className="text-center">
            {!canClaim ? (
              <div>
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-emerald-500/30 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-emerald-400">{timeLeft}</span>
                </div>
                <p className="text-slate-400 text-sm">Watch the video to unlock reward</p>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                <p className="text-emerald-400 font-semibold">Task completed! Claim your reward now!</p>
              </div>
            )}
          </div>

          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((task.timer - timeLeft) / task.timer) * 100}%` }}
            />
          </div>

          <button
            onClick={onClaim}
            disabled={!canClaim}
            className={`w-full font-semibold py-3 rounded-lg transition text-sm ${
              canClaim
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {canClaim ? `🎉 Claim KES ${task.reward}` : `⏳ Wait ${timeLeft}s`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- QUIZ MODAL ----
function QuizModal({ task, onClose, onClaim }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = task.questions || [];
  const question = questions[currentQ];

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === question.answer;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setAnswered(false);
        setIsCorrect(false);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{task.image}</span>
            <h3 className="text-white font-semibold text-sm">{task.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition text-xl leading-none">&times;</button>
        </div>

        <div className="p-5">
          {!showResult ? (
            <div className="space-y-4">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>Score: {score}/{questions.length}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
              </div>

              {/* Question */}
              <div className="bg-slate-900/50 rounded-xl p-4">
                <p className="text-white font-medium text-sm">{question.q}</p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((opt, idx) => {
                  let optClass = 'bg-slate-900/50 border-slate-600/50 text-slate-300 hover:border-purple-500/50';
                  if (answered) {
                    if (idx === question.answer) {
                      optClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
                    } else if (idx === selected && !isCorrect) {
                      optClass = 'bg-red-500/20 border-red-500/50 text-red-400';
                    }
                  } else if (idx === selected) {
                    optClass = 'bg-purple-500/20 border-purple-500/50 text-purple-300';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={answered}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition ${optClass}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className={`text-center py-2 rounded-lg text-sm font-medium ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? '✅ Correct!' : `❌ Wrong! Answer: ${question.options[question.answer]}`}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="text-5xl mb-2">{score >= questions.length / 2 ? '🎉' : '📚'}</div>
              <h3 className="text-white font-bold text-lg">Quiz Complete!</h3>
              <p className="text-slate-400">
                You scored <span className="text-white font-bold">{score}/{questions.length}</span>
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                <p className="text-emerald-400 font-semibold text-sm">You earned KES {task.reward}!</p>
              </div>
              <button
                onClick={onClaim}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-emerald-500/20"
              >
                🎉 Claim KES {task.reward}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- SURVEY MODAL ----
function SurveyModal({ task, onClose, onClaim }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = task.questions || [];
  const question = questions[currentQ];

  const handleSelect = (idx) => {
    setAnswers((prev) => [...prev, idx]);
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 500);
    } else {
      setTimeout(() => setShowResult(true), 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{task.image}</span>
            <h3 className="text-white font-semibold text-sm">{task.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition text-xl leading-none">&times;</button>
        </div>

        <div className="p-5">
          {!showResult ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Survey</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4">
                <p className="text-white font-medium text-sm">{question.q}</p>
              </div>

              <div className="space-y-2">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className="w-full text-left px-4 py-3 rounded-lg border bg-slate-900/50 border-slate-600/50 text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/10 text-sm font-medium transition"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="text-5xl mb-2">📋</div>
              <h3 className="text-white font-bold text-lg">Survey Complete!</h3>
              <p className="text-slate-400 text-sm">Thank you for your responses</p>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                <p className="text-emerald-400 font-semibold text-sm">You earned KES {task.reward}!</p>
              </div>
              <button
                onClick={onClaim}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-emerald-500/20"
              >
                🎉 Claim KES {task.reward}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
