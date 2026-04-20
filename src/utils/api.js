import { sendSMS } from './sms';
import { CONFIG } from '../config';
import { DEFAULT_TASKS } from './tasks-data';

const STORAGE_KEYS = {
  USERS: 'nova_users',
  TASKS: 'nova_tasks',
  ACTIVATIONS: 'nova_activations',
  WITHDRAWALS: 'nova_withdrawals',
  CURRENT_USER: 'nova_current_user',
  CLAIMED_TASKS: 'nova_claimed_tasks',
  DAILY_CLAIMS: 'nova_daily_claims',
};

function getStore(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function setStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

// ---- Seed default admin & tasks ----
function seedData() {
  const users = getStore(STORAGE_KEYS.USERS);
  if (!users.find((u) => u.role === 'ADMIN')) {
    users.push({
      id: 'admin001',
      name: 'Admin',
      phone: '0700000000',
      password: 'admin123',
      role: 'ADMIN',
      balance: 0,
      pending: 0,
      withdrawn: 0,
      isActive: true,
      referrer: null,
    });
    setStore(STORAGE_KEYS.USERS, users);
  }
  // Always ensure tasks are seeded from DEFAULT_TASKS
  const tasks = getStore(STORAGE_KEYS.TASKS);
  if (tasks.length < 100) {
    setStore(STORAGE_KEYS.TASKS, DEFAULT_TASKS);
  }
}
seedData();

// ---- AUTH ----
export function register({ name, phone, password, referrer }) {
  const users = getStore(STORAGE_KEYS.USERS);
  if (users.find((u) => u.phone === phone)) {
    return { success: false, message: 'Phone number already registered' };
  }
  const newUser = {
    id: generateId(),
    name,
    phone,
    password,
    role: 'USER',
    balance: 0,
    pending: 0,
    withdrawn: 0,
    isActive: false,
    referrer: referrer || null,
  };
  users.push(newUser);
  setStore(STORAGE_KEYS.USERS, users);
  sendSMS(phone, `Welcome to ${CONFIG.APP_NAME}! Your account has been created. Pay ${CONFIG.CURRENCY} ${CONFIG.ACTIVATION_FEE} to Till ${CONFIG.TILL_NUMBER} to activate.`);
  return { success: true, user: newUser };
}

export function login(phone, password) {
  const users = getStore(STORAGE_KEYS.USERS);
  const user = users.find((u) => u.phone === phone && u.password === password);
  if (!user) return { success: false, message: 'Invalid phone or password' };
  setStore(STORAGE_KEYS.CURRENT_USER, user);
  return { success: true, user };
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    if (!user) return null;
    const users = getStore(STORAGE_KEYS.USERS);
    const fresh = users.find((u) => u.id === user.id);
    if (fresh) setStore(STORAGE_KEYS.CURRENT_USER, fresh);
    return fresh || null;
  } catch {
    return null;
  }
}

function updateUser(userId, updates) {
  const users = getStore(STORAGE_KEYS.USERS);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  setStore(STORAGE_KEYS.USERS, users);
  const current = getCurrentUser();
  if (current && current.id === userId) {
    setStore(STORAGE_KEYS.CURRENT_USER, users[idx]);
  }
  return users[idx];
}

// ---- ACTIVATION ----
export function submitActivation(userId, transactionCode) {
  const activations = getStore(STORAGE_KEYS.ACTIVATIONS);
  if (activations.find((a) => a.userId === userId && a.status === 'pending')) {
    return { success: false, message: 'You already have a pending activation request' };
  }
  activations.push({
    id: generateId(),
    userId,
    transactionCode,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  setStore(STORAGE_KEYS.ACTIVATIONS, activations);
  return { success: true, message: 'Activation request submitted' };
}

export function getActivations() {
  return getStore(STORAGE_KEYS.ACTIVATIONS);
}

export function approveActivation(activationId) {
  const activations = getStore(STORAGE_KEYS.ACTIVATIONS);
  const idx = activations.findIndex((a) => a.id === activationId);
  if (idx === -1) return false;

  const activation = activations[idx];
  activations[idx] = { ...activation, status: 'approved' };
  setStore(STORAGE_KEYS.ACTIVATIONS, activations);

  const user = updateUser(activation.userId, { isActive: true });
  if (!user) return false;

  sendSMS(user.phone, `Your ${CONFIG.APP_NAME} account has been activated! Start earning now.`);
  rewardReferrers(user);
  return true;
}

export function rejectActivation(activationId) {
  const activations = getStore(STORAGE_KEYS.ACTIVATIONS);
  const idx = activations.findIndex((a) => a.id === activationId);
  if (idx === -1) return false;
  activations.splice(idx, 1);
  setStore(STORAGE_KEYS.ACTIVATIONS, activations);
  return true;
}

function rewardReferrers(user) {
  if (!user.referrer) return;
  const users = getStore(STORAGE_KEYS.USERS);

  const level1 = users.find((u) => u.id === user.referrer);
  if (level1) {
    updateUser(level1.id, { balance: level1.balance + CONFIG.LEVEL1_REWARD });
    sendSMS(level1.phone, `You earned ${CONFIG.CURRENCY} ${CONFIG.LEVEL1_REWARD} from a Level 1 referral (${user.name})!`);

    if (level1.referrer) {
      const freshUsers = getStore(STORAGE_KEYS.USERS);
      const level2 = freshUsers.find((u) => u.id === level1.referrer);
      if (level2) {
        updateUser(level2.id, { balance: level2.balance + CONFIG.LEVEL2_REWARD });
        sendSMS(level2.phone, `You earned ${CONFIG.CURRENCY} ${CONFIG.LEVEL2_REWARD} from a Level 2 referral (${user.name})!`);
      }
    }
  }
}

// ---- TASKS ----
export function getTasks() {
  return getStore(STORAGE_KEYS.TASKS);
}

export function addTask(task) {
  const tasks = getStore(STORAGE_KEYS.TASKS);
  const newTask = { ...task, id: generateId() };
  tasks.push(newTask);
  setStore(STORAGE_KEYS.TASKS, tasks);
  return newTask;
}

export function editTask(taskId, updates) {
  const tasks = getStore(STORAGE_KEYS.TASKS);
  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  setStore(STORAGE_KEYS.TASKS, tasks);
  return tasks[idx];
}

export function deleteTask(taskId) {
  const tasks = getStore(STORAGE_KEYS.TASKS);
  setStore(STORAGE_KEYS.TASKS, tasks.filter((t) => t.id !== taskId));
}

export function getClaimedTasks(userId) {
  const claimed = getStore(STORAGE_KEYS.CLAIMED_TASKS);
  return claimed.filter((c) => c.userId === userId).map((c) => c.taskId);
}

export function getDailyClaimCount(userId) {
  const dailyClaims = getStore(STORAGE_KEYS.DAILY_CLAIMS);
  const today = getTodayKey();
  const todayClaims = dailyClaims.filter((c) => c.userId === userId && c.date === today);
  return todayClaims.length;
}

export function canClaimTask(userId, isActive) {
  const dailyCount = getDailyClaimCount(userId);
  if (!isActive) {
    const totalClaimed = getClaimedTasks(userId).length;
    if (totalClaimed >= CONFIG.INACTIVE_TASK_LIMIT) {
      return { allowed: false, reason: `Activate your account to do more tasks. You've used your ${CONFIG.INACTIVE_TASK_LIMIT} free tasks.` };
    }
  }
  if (dailyCount >= CONFIG.MAX_DAILY_TASKS) {
    return { allowed: false, reason: `Daily limit reached (${CONFIG.MAX_DAILY_TASKS} tasks/day). Come back tomorrow!` };
  }
  return { allowed: true };
}

export function claimTask(userId, taskId, reward) {
  const claimed = getStore(STORAGE_KEYS.CLAIMED_TASKS);
  if (claimed.find((c) => c.userId === userId && c.taskId === taskId)) {
    return { success: false, message: 'Already claimed' };
  }

  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Not logged in' };

  const check = canClaimTask(userId, user.isActive);
  if (!check.allowed) {
    return { success: false, message: check.reason };
  }

  claimed.push({ userId, taskId, claimedAt: new Date().toISOString() });
  setStore(STORAGE_KEYS.CLAIMED_TASKS, claimed);

  // Track daily claims
  const dailyClaims = getStore(STORAGE_KEYS.DAILY_CLAIMS);
  dailyClaims.push({ userId, taskId, date: getTodayKey() });
  setStore(STORAGE_KEYS.DAILY_CLAIMS, dailyClaims);

  // Add reward immediately to balance (not pending)
  updateUser(userId, { balance: user.balance + reward });

  return { success: true, message: `Congratulations! ${CONFIG.CURRENCY} ${reward} has been added to your balance!` };
}

// ---- WITHDRAWALS ----
export function requestWithdrawal(userId, amount, phone) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Not logged in' };
  if (amount <= 0) return { success: false, message: 'Invalid amount' };
  if (amount < CONFIG.MIN_WITHDRAWAL) return { success: false, message: `Minimum withdrawal is ${CONFIG.CURRENCY} ${CONFIG.MIN_WITHDRAWAL}` };
  if (amount > user.balance) return { success: false, message: 'Insufficient balance' };

  const withdrawals = getStore(STORAGE_KEYS.WITHDRAWALS);
  withdrawals.push({
    id: generateId(),
    userId,
    amount,
    phone,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  setStore(STORAGE_KEYS.WITHDRAWALS, withdrawals);

  updateUser(userId, { balance: user.balance - amount });

  sendSMS(phone, `Your withdrawal request of ${CONFIG.CURRENCY} ${amount} has been submitted.`);
  return { success: true, message: 'Withdrawal request submitted successfully!' };
}

export function getWithdrawals() {
  return getStore(STORAGE_KEYS.WITHDRAWALS);
}

export function markWithdrawalPaid(withdrawalId) {
  const withdrawals = getStore(STORAGE_KEYS.WITHDRAWALS);
  const idx = withdrawals.findIndex((w) => w.id === withdrawalId);
  if (idx === -1) return false;

  const withdrawal = withdrawals[idx];
  withdrawals[idx] = { ...withdrawal, status: 'paid' };
  setStore(STORAGE_KEYS.WITHDRAWALS, withdrawals);

  const users = getStore(STORAGE_KEYS.USERS);
  const user = users.find((u) => u.id === withdrawal.userId);
  if (user) {
    updateUser(user.id, { withdrawn: user.withdrawn + withdrawal.amount });
    sendSMS(withdrawal.phone, `Your withdrawal of ${CONFIG.CURRENCY} ${withdrawal.amount} has been paid.`);
  }
  return true;
}

// ---- USERS ----
export function getAllUsers() {
  return getStore(STORAGE_KEYS.USERS);
}

export function adminUpdateUser(userId, updates) {
  return updateUser(userId, updates);
}

// ---- REFERRALS ----
export function getReferrals(userId) {
  const users = getStore(STORAGE_KEYS.USERS);
  const level1 = users.filter((u) => u.referrer === userId);
  const level1Ids = level1.map((u) => u.id);
  const level2 = users.filter((u) => level1Ids.includes(u.referrer));
  return { level1, level2 };
}

export function getUserById(id) {
  const users = getStore(STORAGE_KEYS.USERS);
  return users.find((u) => u.id === id) || null;
}
