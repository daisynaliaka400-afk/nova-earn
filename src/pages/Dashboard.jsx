import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  logout,
  submitActivation,
  getTasks,
  getClaimedTasks,
  claimTask,
  canClaimTask,
  getDailyClaimCount,
  getReferrals,
  requestWithdrawal,
} from '../utils/api';
import { CONFIG } from '../config';
import { TASK_CATEGORIES } from '../utils/tasks-data';
import BottomNav from '../components/BottomNav';
import TaskModal from '../components/TaskModal';
import LiveFeed from '../components/LiveFeed';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState(null);

  const refreshUser = useCallback(() => {
    const u = getCurrentUser();
    if (!u || u.role === 'ADMIN') {
      navigate('/login');
      return;
    }
    setUser(u);
  }, [navigate]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020617] pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-4 right-4 z-[100] max-w-lg mx-auto animate-bounce-in">
          <div className={`px-4 py-3 rounded-xl border shadow-lg backdrop-blur text-sm font-medium ${
            toast.type === 'success'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}>
            {toast.type === 'success' ? '🎉 ' : '⚠️ '}{toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-4 py-4 sticky top-0 z-40 backdrop-blur">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">{CONFIG.APP_NAME}</h1>
            <p className="text-xs text-slate-400">Welcome, {user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                user.isActive
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4">
        {activeTab === 'home' && <HomeTab user={user} showToast={showToast} onRefresh={refreshUser} />}
        {activeTab === 'tasks' && <TasksTab user={user} showToast={showToast} onRefresh={refreshUser} />}
        {activeTab === 'referrals' && <ReferralsTab user={user} />}
        {activeTab === 'withdraw' && <WithdrawTab user={user} showToast={showToast} onRefresh={refreshUser} />}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

// ---- HOME TAB ----
function HomeTab({ user, showToast, onRefresh }) {
  const dailyCount = getDailyClaimCount(user.id);

  return (
    <div className="space-y-4">
      {/* Balance Cards */}
      <div className="grid grid-cols-3 gap-3">
        <BalanceCard label="Balance" value={user.balance} color="emerald" />
        <BalanceCard label="Pending" value={user.pending} color="amber" />
        <BalanceCard label="Withdrawn" value={user.withdrawn} color="blue" />
      </div>

      {/* Daily Progress */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Daily Tasks</span>
          <span className="text-xs font-semibold text-emerald-400">{dailyCount}/{CONFIG.MAX_DAILY_TASKS}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all"
            style={{ width: `${(dailyCount / CONFIG.MAX_DAILY_TASKS) * 100}%` }}
          />
        </div>
      </div>

      {/* Live Feed */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
        <LiveFeed />
      </div>

      {/* Activation Section */}
      {!user.isActive && <ActivationSection userId={user.id} />}

      {/* Quick Tasks Preview */}
      <QuickTasksSection user={user} showToast={showToast} onRefresh={onRefresh} />
    </div>
  );
}

function BalanceCard({ label, value, color }) {
  const colors = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
  };

  return (
    <div className={`bg-gradient-to-b ${colors[color]} border rounded-xl p-3 text-center`}>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-bold">
        {CONFIG.CURRENCY} {value}
      </p>
    </div>
  );
}

// ---- QUICK TASKS ON HOME ----
function QuickTasksSection({ user, showToast, onRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [claimed, setClaimed] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setTasks(getTasks());
    setClaimed(getClaimedTasks(user.id));
  }, [user.id]);

  const filteredTasks = selectedCategory === 'all'
    ? tasks
    : tasks.filter((t) => t.category === selectedCategory);

  const handleClaim = (taskId, reward) => {
    const result = claimTask(user.id, taskId, reward);
    if (result.success) {
      setClaimed((prev) => [...prev, taskId]);
      showToast(result.message, 'success');
      onRefresh();
    } else {
      showToast(result.message, 'error');
    }
    setSelectedTask(null);
  };

  const handleStartTask = (task) => {
    const check = canClaimTask(user.id, user.isActive);
    if (!check.allowed) {
      showToast(check.reason, 'error');
      return;
    }
    if (claimed.includes(task.id)) {
      showToast('You already completed this task', 'error');
      return;
    }
    setSelectedTask(task);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-base">Earn Money</h2>
        <span className="text-xs text-slate-400">{filteredTasks.length} tasks</span>
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          <CategoryPill
            label="All"
            icon="🔥"
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          />
          {TASK_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              active={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredTasks.slice(0, 20).map((task) => {
          const isClaimed = claimed.includes(task.id);
          const category = TASK_CATEGORIES.find((c) => c.id === task.category);
          return (
            <div
              key={task.id}
              onClick={() => !isClaimed && handleStartTask(task)}
              className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 cursor-pointer transition hover:border-emerald-500/30 hover:bg-slate-800/80 ${isClaimed ? 'opacity-50' : ''}`}
            >
              <div className="text-3xl mb-2">{task.image}</div>
              <p className="text-white text-xs font-medium leading-tight line-clamp-2 mb-1">{task.title}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-emerald-400 text-xs font-bold">+{CONFIG.CURRENCY} {task.reward}</span>
                {isClaimed ? (
                  <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Done</span>
                ) : (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">{task.type === 'quiz' ? 'Quiz' : task.type === 'survey' ? 'Survey' : `${task.timer}s`}</span>
                )}
              </div>
              {category && (
                <span className="text-[9px] text-slate-500 mt-1 block">{category.icon} {category.label}</span>
              )}
            </div>
          );
        })}
      </div>

      {filteredTasks.length > 20 && (
        <p className="text-center text-xs text-slate-500">Showing 20 of {filteredTasks.length} tasks. View all in Tasks tab.</p>
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onClaim={() => handleClaim(selectedTask.id, selectedTask.reward)}
        />
      )}
    </div>
  );
}

function CategoryPill({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
        active
          ? 'bg-emerald-600 text-white'
          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-emerald-500/30'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

// ---- ACTIVATION SECTION ----
function ActivationSection({ userId }) {
  const [txCode, setTxCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const copyTill = () => {
    navigator.clipboard.writeText(CONFIG.TILL_NUMBER).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const code = txCode.trim();
    if (code.length !== 10 || !/^[a-zA-Z0-9]+$/.test(code)) {
      setMessage({ type: 'error', text: 'Transaction code must be exactly 10 alphanumeric characters' });
      return;
    }
    const result = submitActivation(userId, code.toUpperCase());
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTxCode('');
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🔓</span>
        <h3 className="text-white font-semibold text-base">Activate Your Account</h3>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Pay{' '}
        <span className="text-amber-400 font-bold">
          {CONFIG.CURRENCY} {CONFIG.ACTIVATION_FEE}
        </span>{' '}
        to the Till Number below to unlock unlimited tasks and withdrawals.
      </p>

      <div className="bg-slate-900/80 border border-slate-600/50 rounded-xl p-4 mb-4">
        <p className="text-xs text-slate-400 mb-1">Till Number</p>
        <div className="flex items-center justify-between">
          <button
            onClick={copyTill}
            className="text-2xl font-bold text-white tracking-wider hover:text-emerald-400 transition cursor-pointer"
          >
            {CONFIG.TILL_NUMBER}
          </button>
          <button
            onClick={copyTill}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>
        {copied && (
          <p className="text-emerald-400 text-xs mt-2 animate-pulse">Copied successfully</p>
        )}
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-lg mb-4 text-sm ${
            message.type === 'error'
              ? 'bg-red-500/10 border border-red-500/30 text-red-400'
              : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={txCode}
          onChange={(e) => setTxCode(e.target.value.toUpperCase())}
          maxLength={10}
          placeholder="Enter M-Pesa code (e.g. ABC1234567)"
          className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition uppercase tracking-wider"
        />
        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Submit Activation Request
        </button>
      </form>

      <p className="text-slate-500 text-xs mt-3 text-center">
        You can complete {CONFIG.INACTIVE_TASK_LIMIT} tasks before activating
      </p>
    </div>
  );
}

// ---- TASKS TAB ----
function TasksTab({ user, showToast, onRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [claimed, setClaimed] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTasks(getTasks());
    setClaimed(getClaimedTasks(user.id));
  }, [user.id]);

  const filteredTasks = tasks.filter((t) => {
    const matchCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleClaim = (taskId, reward) => {
    const result = claimTask(user.id, taskId, reward);
    if (result.success) {
      setClaimed((prev) => [...prev, taskId]);
      showToast(result.message, 'success');
      onRefresh();
    } else {
      showToast(result.message, 'error');
    }
    setSelectedTask(null);
  };

  const handleStartTask = (task) => {
    const check = canClaimTask(user.id, user.isActive);
    if (!check.allowed) {
      showToast(check.reason, 'error');
      return;
    }
    if (claimed.includes(task.id)) {
      showToast('You already completed this task', 'error');
      return;
    }
    setSelectedTask(task);
  };

  const dailyCount = getDailyClaimCount(user.id);

  return (
    <div className="space-y-3">
      {/* Header with daily info */}
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">All Tasks</h2>
        <div className="text-xs text-slate-400">
          <span className="text-emerald-400 font-bold">{dailyCount}</span>/{CONFIG.MAX_DAILY_TASKS} today
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="🔍 Search tasks..."
        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition text-sm"
      />

      {/* Category Filter */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          <CategoryPill label="All" icon="🔥" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} />
          {TASK_CATEGORIES.map((cat) => (
            <CategoryPill key={cat.id} label={cat.label} icon={cat.icon} active={selectedCategory === cat.id} onClick={() => setSelectedCategory(cat.id)} />
          ))}
        </div>
      </div>

      {/* Task Count */}
      <p className="text-xs text-slate-500">{filteredTasks.length} tasks available</p>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
          <p className="text-slate-400">No tasks found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => {
            const isClaimed = claimed.includes(task.id);
            const category = TASK_CATEGORIES.find((c) => c.id === task.category);
            return (
              <div
                key={task.id}
                className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3 transition ${
                  isClaimed ? 'opacity-50' : 'hover:border-emerald-500/30 cursor-pointer'
                }`}
                onClick={() => !isClaimed && handleStartTask(task)}
              >
                <div className="text-3xl shrink-0">{task.image}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{task.title}</p>
                  <p className="text-slate-500 text-xs truncate">{task.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-emerald-400 text-xs font-bold">+{CONFIG.CURRENCY} {task.reward}</span>
                    {category && <span className="text-[10px] text-slate-500">{category.icon} {category.label}</span>}
                  </div>
                </div>
                <div className="shrink-0">
                  {isClaimed ? (
                    <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-1 rounded-full">✅ Done</span>
                  ) : (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-medium">
                      {task.type === 'quiz' ? '🧠 Quiz' : task.type === 'survey' ? '📋 Survey' : `▶️ ${task.timer}s`}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onClaim={() => handleClaim(selectedTask.id, selectedTask.reward)}
        />
      )}
    </div>
  );
}

// ---- REFERRALS TAB ----
function ReferralsTab({ user }) {
  const [referrals, setReferrals] = useState({ level1: [], level2: [] });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReferrals(getReferrals(user.id));
  }, [user.id]);

  const referralLink = `${window.location.origin}/register?ref=${user.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Referral Link */}
      <div className="bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🤝</span>
          <h3 className="text-white font-semibold text-sm">Invite & Earn</h3>
        </div>
        <p className="text-slate-400 text-xs mb-3">
          Earn <span className="text-emerald-400 font-bold">{CONFIG.CURRENCY} {CONFIG.LEVEL1_REWARD}</span> per Level 1 and{' '}
          <span className="text-emerald-400 font-bold">{CONFIG.CURRENCY} {CONFIG.LEVEL2_REWARD}</span> per Level 2 referral
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-xs text-slate-300 truncate"
          />
          <button
            onClick={copyLink}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shrink-0"
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-white">{referrals.level1.length}</p>
          <p className="text-xs text-slate-400">Level 1 Referrals</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-white">{referrals.level2.length}</p>
          <p className="text-xs text-slate-400">Level 2 Referrals</p>
        </div>
      </div>

      {/* Level 1 */}
      <ReferralList title="Level 1 Referrals" users={referrals.level1} />
      {/* Level 2 */}
      <ReferralList title="Level 2 Referrals" users={referrals.level2} />
    </div>
  );
}

function ReferralList({ title, users }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
      <h3 className="text-white font-semibold text-sm mb-3">
        {title}{' '}
        <span className="text-slate-400 font-normal">({users.length})</span>
      </h3>
      {users.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-2">No referrals yet</p>
      ) : (
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between bg-slate-900/40 rounded-lg px-3 py-2">
              <div>
                <p className="text-white text-sm font-medium">{u.name}</p>
                <p className="text-slate-500 text-xs">{u.phone}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  u.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {u.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- WITHDRAW TAB ----
function WithdrawTab({ user, showToast, onRefresh }) {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amtNum = parseFloat(amount);
    if (!amtNum || amtNum <= 0) {
      showToast('Enter a valid amount', 'error');
      return;
    }
    if (!phone.trim()) {
      showToast('Phone number is required', 'error');
      return;
    }
    const result = requestWithdrawal(user.id, amtNum, phone.trim());
    if (result.success) {
      showToast(result.message, 'success');
      setAmount('');
      onRefresh();
    } else {
      showToast(result.message, 'error');
    }
  };

  if (!user.isActive) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
        <span className="text-4xl mb-3 block">🔒</span>
        <p className="text-amber-400 font-medium">Activate your account to withdraw</p>
        <p className="text-slate-500 text-sm mt-2">Go to the Home tab to activate your account</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Balance Info */}
      <div className="bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-5 text-center">
        <p className="text-xs text-slate-400 mb-1">Available Balance</p>
        <p className="text-3xl font-bold text-emerald-400">{CONFIG.CURRENCY} {user.balance}</p>
        <p className="text-xs text-slate-500 mt-2">Min. withdrawal: {CONFIG.CURRENCY} {CONFIG.MIN_WITHDRAWAL}</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-base mb-4">Withdraw Funds</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Amount ({CONFIG.CURRENCY})</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={CONFIG.MIN_WITHDRAWAL}
              placeholder={`Minimum ${CONFIG.MIN_WITHDRAWAL}`}
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">M-Pesa Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712345678"
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition"
          >
            💸 Request Withdrawal
          </button>
        </form>
      </div>

      {/* Live Feed */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
        <LiveFeed />
      </div>
    </div>
  );
}
