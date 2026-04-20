import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  logout,
  getActivations,
  approveActivation,
  rejectActivation,
  getWithdrawals,
  markWithdrawalPaid,
  getTasks,
  addTask,
  editTask,
  deleteTask,
  getAllUsers,
  adminUpdateUser,
  getUserById,
} from '../../utils/api';
import { CONFIG } from '../../config';

const TABS = [
  { id: 'activations', label: 'Activations', icon: ShieldIcon },
  { id: 'withdrawals', label: 'Withdrawals', icon: CashIcon },
  { id: 'tasks', label: 'Tasks', icon: PlayIcon },
  { id: 'users', label: 'Users', icon: PeopleIcon },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('activations');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u || u.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    setUser(u);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900/95 border-r border-slate-700/50 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-slate-700/50">
          <h1 className="text-lg font-bold text-white">{CONFIG.APP_NAME}</h1>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-slate-400 hover:text-red-400 transition px-4 py-2"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-slate-900/80 border-b border-slate-700/50 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-white font-semibold text-sm">{CONFIG.APP_NAME} Admin</span>
          <div className="w-6" />
        </div>

        <div className="p-4 lg:p-6 max-w-5xl">
          {activeTab === 'activations' && <ActivationsTab />}
          {activeTab === 'withdrawals' && <WithdrawalsTab />}
          {activeTab === 'tasks' && <TasksTab />}
          {activeTab === 'users' && <UsersTab />}
        </div>
      </main>
    </div>
  );
}

// ---- ACTIVATIONS TAB ----
function ActivationsTab() {
  const [activations, setActivations] = useState([]);
  const [users, setUsers] = useState([]);

  const refresh = useCallback(() => {
    setActivations(getActivations().filter((a) => a.status === 'pending'));
    setUsers(getAllUsers());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const getUserName = (userId) => {
    const u = users.find((u) => u.id === userId);
    return u ? `${u.name} (${u.phone})` : userId;
  };

  const handleApprove = (id) => {
    approveActivation(id);
    refresh();
  };

  const handleReject = (id) => {
    rejectActivation(id);
    refresh();
  };

  return (
    <div>
      <h2 className="text-white font-semibold text-xl mb-4">Pending Activations</h2>
      {activations.length === 0 ? (
        <Empty text="No pending activations" />
      ) : (
        <div className="space-y-3">
          {activations.map((a) => (
            <div key={a.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white font-medium">{getUserName(a.userId)}</p>
                  <p className="text-slate-400 text-sm">
                    Code: <span className="text-white font-mono">{a.transactionCode}</span>
                  </p>
                  <p className="text-slate-500 text-xs">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(a.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(a.id)}
                    className="bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold px-4 py-2 rounded-lg transition border border-red-600/30"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- WITHDRAWALS TAB ----
function WithdrawalsTab() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);

  const refresh = useCallback(() => {
    setWithdrawals(getWithdrawals());
    setUsers(getAllUsers());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const getUserName = (userId) => {
    const u = users.find((u) => u.id === userId);
    return u ? u.name : userId;
  };

  const handlePaid = (id) => {
    markWithdrawalPaid(id);
    refresh();
  };

  return (
    <div>
      <h2 className="text-white font-semibold text-xl mb-4">Withdrawal Requests</h2>
      {withdrawals.length === 0 ? (
        <Empty text="No withdrawal requests" />
      ) : (
        <div className="space-y-3">
          {withdrawals.map((w) => (
            <div key={w.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white font-medium">{getUserName(w.userId)}</p>
                  <p className="text-emerald-400 font-semibold">
                    {CONFIG.CURRENCY} {w.amount}
                  </p>
                  <p className="text-slate-400 text-sm">Phone: {w.phone}</p>
                  <p className="text-slate-500 text-xs">
                    {new Date(w.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  {w.status === 'pending' ? (
                    <button
                      onClick={() => handlePaid(w.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                    >
                      Mark Paid
                    </button>
                  ) : (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg font-medium">
                      Paid
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- TASKS TAB ----
function TasksTab() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({ title: '', videoURL: '', reward: '', timer: '30' });

  const refresh = useCallback(() => {
    setTasks(getTasks());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const resetForm = () => {
    setForm({ title: '', videoURL: '', reward: '', timer: '30' });
    setEditingTask(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.videoURL.trim() || !form.reward) return;

    const taskData = {
      title: form.title.trim(),
      videoURL: form.videoURL.trim(),
      reward: parseFloat(form.reward),
      timer: parseInt(form.timer) || CONFIG.DEFAULT_TASK_TIMER,
    };

    if (editingTask) {
      editTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    resetForm();
    refresh();
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      videoURL: task.videoURL,
      reward: String(task.reward),
      timer: String(task.timer),
    });
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-xl">Task Manager</h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Task title"
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition text-sm"
            />
            <input
              type="text"
              value={form.videoURL}
              onChange={(e) => setForm((f) => ({ ...f, videoURL: e.target.value }))}
              placeholder="Video embed URL"
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={form.reward}
                onChange={(e) => setForm((f) => ({ ...f, reward: e.target.value }))}
                placeholder="Reward (KES)"
                min="1"
                className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition text-sm"
              />
              <input
                type="number"
                value={form.timer}
                onChange={(e) => setForm((f) => ({ ...f, timer: e.target.value }))}
                placeholder="Timer (seconds)"
                min="5"
                className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition text-sm"
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </form>
        </div>
      )}

      {tasks.length === 0 ? (
        <Empty text="No tasks created" />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white font-medium">{task.title}</p>
                  <p className="text-slate-400 text-sm">
                    Reward: <span className="text-emerald-400">{CONFIG.CURRENCY} {task.reward}</span>
                    {' '}&middot;{' '}Timer: {task.timer}s
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition border border-red-600/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- USERS TAB ----
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ balance: '', pending: '', role: '', isActive: true });

  const refresh = useCallback(() => {
    setUsers(getAllUsers());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleEdit = (user) => {
    setEditForm({
      balance: String(user.balance),
      pending: String(user.pending),
      role: user.role,
      isActive: user.isActive,
    });
    setEditingUser(user);
  };

  const handleSave = () => {
    if (!editingUser) return;
    adminUpdateUser(editingUser.id, {
      balance: parseFloat(editForm.balance) || 0,
      pending: parseFloat(editForm.pending) || 0,
      role: editForm.role,
      isActive: editForm.isActive,
    });
    setEditingUser(null);
    refresh();
  };

  return (
    <div>
      <h2 className="text-white font-semibold text-xl mb-4">
        User Management <span className="text-slate-400 font-normal text-base">({users.length})</span>
      </h2>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl w-full max-w-md p-5">
            <h3 className="text-white font-semibold mb-4">
              Edit: {editingUser.name}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Confirmed Balance</label>
                <input
                  type="number"
                  value={editForm.balance}
                  onChange={(e) => setEditForm((f) => ({ ...f, balance: e.target.value }))}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Pending Balance</label>
                <input
                  type="number"
                  value={editForm.pending}
                  onChange={(e) => setEditForm((f) => ({ ...f, pending: e.target.value }))}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs text-slate-400">Status:</label>
                <button
                  type="button"
                  onClick={() => setEditForm((f) => ({ ...f, isActive: !f.isActive }))}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                    editForm.isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {editForm.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={handleSave}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-lg transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium">{u.name}</p>
                  {u.role === 'ADMIN' && (
                    <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-medium">
                      ADMIN
                    </span>
                  )}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      u.isActive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{u.phone}</p>
                <p className="text-slate-500 text-xs mt-1">
                  Balance: {CONFIG.CURRENCY} {u.balance} &middot; Pending: {CONFIG.CURRENCY} {u.pending} &middot; Withdrawn: {CONFIG.CURRENCY} {u.withdrawn}
                </p>
              </div>
              <button
                onClick={() => handleEdit(u)}
                className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- SHARED ----
function Empty({ text }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 text-center">
      <p className="text-slate-500">{text}</p>
    </div>
  );
}

// ---- ICONS ----
function ShieldIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
