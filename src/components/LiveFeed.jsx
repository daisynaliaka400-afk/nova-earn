import { useState, useEffect, useRef } from 'react';
import { generateLiveActivity } from '../utils/tasks-data';

export default function LiveFeed() {
  const [activities, setActivities] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate initial activities
    const initial = Array.from({ length: 3 }, () => generateLiveActivity());
    setActivities(initial);

    // Add new activity every 4-8 seconds
    const interval = setInterval(() => {
      const newActivity = generateLiveActivity();
      setActivities((prev) => [newActivity, ...prev].slice(0, 5));
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'withdrawal': return '💸';
      case 'reward': return '🎉';
      case 'referral': return '🤝';
      case 'activation': return '✅';
      case 'task': return '🏆';
      default: return '📢';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'withdrawal': return 'bg-green-500/10 border-green-500/20';
      case 'reward': return 'bg-amber-500/10 border-amber-500/20';
      case 'referral': return 'bg-blue-500/10 border-blue-500/20';
      case 'activation': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'task': return 'bg-purple-500/10 border-purple-500/20';
      default: return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-slate-300">Live Activity</span>
      </div>
      {activities.map((activity, idx) => (
        <div
          key={activity.timestamp + idx}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all duration-500 ${getBgColor(activity.type)} ${idx === 0 ? 'opacity-100' : 'opacity-70'}`}
        >
          <span className="text-base shrink-0">{getIcon(activity.type)}</span>
          <span className="text-slate-300 truncate">{activity.message}</span>
        </div>
      ))}
    </div>
  );
}
