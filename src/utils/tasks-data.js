// 100+ tasks organized by category with emoji icons and descriptions
export const TASK_CATEGORIES = [
  { id: 'tiktok', label: 'TikTok', icon: '🎵', color: 'from-pink-500/20 to-pink-500/5 border-pink-500/30' },
  { id: 'youtube', label: 'YouTube', icon: '▶️', color: 'from-red-500/20 to-red-500/5 border-red-500/30' },
  { id: 'survey', label: 'Surveys', icon: '📋', color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30' },
  { id: 'quiz', label: 'Quizzes', icon: '🧠', color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30' },
  { id: 'affiliate', label: 'Affiliate', icon: '🔗', color: 'from-orange-500/20 to-orange-500/5 border-orange-500/30' },
  { id: 'trading', label: 'Trading', icon: '📈', color: 'from-green-500/20 to-green-500/5 border-green-500/30' },
  { id: 'mining', label: 'Gold Mining', icon: '⛏️', color: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30' },
  { id: 'social', label: 'Social Media', icon: '👥', color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30' },
  { id: 'gaming', label: 'Gaming', icon: '🎮', color: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30' },
  { id: 'learning', label: 'Learning', icon: '📚', color: 'from-teal-500/20 to-teal-500/5 border-teal-500/30' },
  { id: 'review', label: 'Reviews', icon: '⭐', color: 'from-amber-500/20 to-amber-500/5 border-amber-500/30' },
  { id: 'signup', label: 'Sign Ups', icon: '✍️', color: 'from-rose-500/20 to-rose-500/5 border-rose-500/30' },
];

export const DEFAULT_TASKS = [
  // ===== TIKTOK TASKS (15) =====
  { id: 't001', title: 'Watch TikTok Dance Challenge', description: 'Watch a trending dance challenge video and like it', category: 'tiktok', image: '🎵', reward: 15, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't002', title: 'Follow TikTok Creator @StarVibes', description: 'Follow the creator and watch their latest post', category: 'tiktok', image: '🌟', reward: 20, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't003', title: 'Like 3 TikTok Comedy Videos', description: 'Watch and like three comedy videos from our partner', category: 'tiktok', image: '😂', reward: 25, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't004', title: 'Share TikTok Cooking Tutorial', description: 'Watch and share the cooking tutorial to your story', category: 'tiktok', image: '🍳', reward: 30, timer: 35, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't005', title: 'Watch TikTok Fitness Video', description: 'Complete watching a 30s fitness motivation clip', category: 'tiktok', image: '💪', reward: 15, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't006', title: 'Comment on TikTok Art Video', description: 'Watch art creation video and leave a positive comment', category: 'tiktok', image: '🎨', reward: 20, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't007', title: 'Watch TikTok Tech Review', description: 'Watch a gadget review on TikTok', category: 'tiktok', image: '📱', reward: 15, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't008', title: 'Follow TikTok Fashion Page', description: 'Follow and watch latest fashion trends video', category: 'tiktok', image: '👗', reward: 20, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't009', title: 'Watch TikTok Travel Vlog', description: 'Watch an exciting travel destination video', category: 'tiktok', image: '✈️', reward: 18, timer: 35, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't010', title: 'Like TikTok Pet Video', description: 'Watch and like a cute pet compilation', category: 'tiktok', image: '🐶', reward: 12, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't011', title: 'Watch TikTok Magic Trick', description: 'Watch an amazing magic trick reveal', category: 'tiktok', image: '🪄', reward: 15, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't012', title: 'Share TikTok Motivation Video', description: 'Watch and share motivational content', category: 'tiktok', image: '🔥', reward: 22, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't013', title: 'Follow TikTok Music Artist', description: 'Follow an upcoming music artist on TikTok', category: 'tiktok', image: '🎤', reward: 18, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't014', title: 'Watch TikTok Life Hack', description: 'Watch a useful life hack video', category: 'tiktok', image: '💡', reward: 15, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't015', title: 'Like TikTok Sports Highlight', description: 'Watch and like a sports highlight reel', category: 'tiktok', image: '⚽', reward: 15, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== YOUTUBE TASKS (15) =====
  { id: 't016', title: 'Watch YouTube Tech Review', description: 'Watch a full smartphone review on YouTube', category: 'youtube', image: '📺', reward: 25, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't017', title: 'Subscribe to Coding Channel', description: 'Subscribe and watch a coding tutorial', category: 'youtube', image: '👨‍💻', reward: 30, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't018', title: 'Watch YouTube Music Video', description: 'Watch a trending music video to completion', category: 'youtube', image: '🎶', reward: 20, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't019', title: 'Like YouTube Cooking Show', description: 'Watch and like a cooking show episode', category: 'youtube', image: '👨‍🍳', reward: 22, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't020', title: 'Watch YouTube Documentary', description: 'Watch a short documentary clip', category: 'youtube', image: '🎬', reward: 35, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't021', title: 'Subscribe to Finance Channel', description: 'Subscribe to a finance education channel', category: 'youtube', image: '💰', reward: 28, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't022', title: 'Watch YouTube Fitness Tutorial', description: 'Watch a workout tutorial video', category: 'youtube', image: '🏋️', reward: 20, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't023', title: 'Comment on YouTube Podcast', description: 'Watch podcast clip and leave a comment', category: 'youtube', image: '🎙️', reward: 25, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't024', title: 'Watch YouTube Product Launch', description: 'Watch a product launch event highlight', category: 'youtube', image: '🚀', reward: 30, timer: 55, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't025', title: 'Like YouTube Gaming Stream', description: 'Watch a gaming stream highlight', category: 'youtube', image: '🕹️', reward: 22, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't026', title: 'Watch YouTube DIY Tutorial', description: 'Watch a creative DIY project tutorial', category: 'youtube', image: '🔨', reward: 25, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't027', title: 'Subscribe to Travel Vlogger', description: 'Subscribe and watch travel content', category: 'youtube', image: '🌍', reward: 28, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't028', title: 'Watch YouTube Science Video', description: 'Watch an interesting science experiment', category: 'youtube', image: '🔬', reward: 25, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't029', title: 'Like YouTube Motivation Speech', description: 'Watch and like a motivational speech', category: 'youtube', image: '🎯', reward: 20, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't030', title: 'Watch YouTube Car Review', description: 'Watch a new car review video', category: 'youtube', image: '🚗', reward: 22, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== SURVEY TASKS (12) =====
  { id: 't031', title: 'Complete Shopping Preferences Survey', description: 'Answer questions about your shopping habits', category: 'survey', image: '🛒', reward: 40, timer: 20, type: 'survey', questions: [
    { q: 'How often do you shop online?', options: ['Daily', 'Weekly', 'Monthly', 'Rarely'] },
    { q: 'Preferred payment method?', options: ['M-Pesa', 'Card', 'Cash on delivery', 'Bank transfer'] },
    { q: 'What do you shop for most?', options: ['Electronics', 'Fashion', 'Food', 'Home items'] },
  ]},
  { id: 't032', title: 'Social Media Usage Survey', description: 'Tell us about your social media habits', category: 'survey', image: '📊', reward: 35, timer: 20, type: 'survey', questions: [
    { q: 'Which platform do you use most?', options: ['TikTok', 'Instagram', 'Facebook', 'Twitter/X'] },
    { q: 'Hours spent on social media daily?', options: ['Less than 1', '1-3 hours', '3-5 hours', 'More than 5'] },
    { q: 'Do you follow brands on social media?', options: ['Yes, many', 'A few', 'Rarely', 'Never'] },
  ]},
  { id: 't033', title: 'Food & Dining Survey', description: 'Share your food preferences', category: 'survey', image: '🍕', reward: 30, timer: 15, type: 'survey', questions: [
    { q: 'How often do you eat out?', options: ['Daily', '2-3 times/week', 'Weekly', 'Rarely'] },
    { q: 'Favorite cuisine?', options: ['African', 'Asian', 'Western', 'Mixed'] },
    { q: 'Do you use food delivery apps?', options: ['Always', 'Sometimes', 'Rarely', 'Never'] },
  ]},
  { id: 't034', title: 'Mobile App Feedback Survey', description: 'Rate your app usage experience', category: 'survey', image: '📱', reward: 45, timer: 20, type: 'survey', questions: [
    { q: 'How many apps do you use daily?', options: ['1-5', '5-10', '10-20', 'More than 20'] },
    { q: 'What makes you uninstall an app?', options: ['Too many ads', 'Battery drain', 'Privacy concerns', 'Poor design'] },
    { q: 'Would you pay for an ad-free app?', options: ['Yes', 'Maybe', 'Only cheap ones', 'Never'] },
  ]},
  { id: 't035', title: 'Entertainment Preferences Survey', description: 'What kind of entertainment do you enjoy?', category: 'survey', image: '🎭', reward: 35, timer: 18, type: 'survey', questions: [
    { q: 'Preferred entertainment?', options: ['Movies', 'Music', 'Gaming', 'Reading'] },
    { q: 'How do you watch movies?', options: ['Cinema', 'Streaming', 'TV', 'Phone'] },
    { q: 'Music streaming service?', options: ['Spotify', 'YouTube Music', 'Apple Music', 'None'] },
  ]},
  { id: 't036', title: 'Financial Habits Survey', description: 'Help us understand saving habits', category: 'survey', image: '🏦', reward: 50, timer: 20, type: 'survey', questions: [
    { q: 'Do you have a savings plan?', options: ['Yes, strict', 'Somewhat', 'Trying to start', 'No'] },
    { q: 'Preferred saving method?', options: ['Bank', 'M-Pesa', 'SACCO', 'Cash at home'] },
    { q: 'Investment interest?', options: ['Stocks', 'Crypto', 'Real estate', 'Not interested'] },
  ]},
  { id: 't037', title: 'Health & Wellness Survey', description: 'Share your health and wellness routine', category: 'survey', image: '🏥', reward: 40, timer: 18, type: 'survey', questions: [
    { q: 'How often do you exercise?', options: ['Daily', '3-4 times/week', 'Once a week', 'Rarely'] },
    { q: 'Do you track your fitness?', options: ['Yes, with app', 'Yes, manually', 'Sometimes', 'No'] },
    { q: 'Sleep hours per night?', options: ['Less than 5', '5-7', '7-9', 'More than 9'] },
  ]},
  { id: 't038', title: 'Education & Career Survey', description: 'Tell us about your career goals', category: 'survey', image: '🎓', reward: 45, timer: 20, type: 'survey', questions: [
    { q: 'Current education level?', options: ['High school', 'College', 'University', 'Post-grad'] },
    { q: 'Preferred learning mode?', options: ['Online courses', 'Physical classes', 'Self-study', 'Mentorship'] },
    { q: 'Career priority?', options: ['High salary', 'Work-life balance', 'Growth', 'Passion'] },
  ]},
  { id: 't039', title: 'Transport & Travel Survey', description: 'How do you get around?', category: 'survey', image: '🚌', reward: 35, timer: 15, type: 'survey', questions: [
    { q: 'Daily transport mode?', options: ['Matatu/Bus', 'Personal car', 'Boda boda', 'Walking'] },
    { q: 'Monthly transport budget?', options: ['Under 2000', '2000-5000', '5000-10000', 'Over 10000'] },
    { q: 'Do you use ride-hailing apps?', options: ['Always', 'Sometimes', 'Rarely', 'Never'] },
  ]},
  { id: 't040', title: 'Tech & Gadgets Survey', description: 'What tech do you use?', category: 'survey', image: '💻', reward: 40, timer: 18, type: 'survey', questions: [
    { q: 'Phone brand preference?', options: ['Samsung', 'iPhone', 'Tecno/Infinix', 'Other'] },
    { q: 'How often do you upgrade your phone?', options: ['Every year', 'Every 2 years', 'When it breaks', 'Rarely'] },
    { q: 'Do you own a laptop?', options: ['Yes, use daily', 'Yes, sometimes', 'No, want one', 'No, phone only'] },
  ]},
  { id: 't041', title: 'Fashion & Style Survey', description: 'Your fashion preferences matter', category: 'survey', image: '👟', reward: 30, timer: 15, type: 'survey', questions: [
    { q: 'Monthly clothing budget?', options: ['Under 1000', '1000-3000', '3000-5000', 'Over 5000'] },
    { q: 'Where do you shop for clothes?', options: ['Online', 'Mall', 'Mitumba', 'Tailored'] },
    { q: 'Fashion style?', options: ['Casual', 'Trendy', 'Classic', 'Sporty'] },
  ]},
  { id: 't042', title: 'News & Media Survey', description: 'How do you consume news?', category: 'survey', image: '📰', reward: 30, timer: 15, type: 'survey', questions: [
    { q: 'Primary news source?', options: ['Social media', 'TV', 'News apps', 'Radio'] },
    { q: 'How often do you read news?', options: ['Multiple times daily', 'Daily', 'Few times a week', 'Rarely'] },
    { q: 'Most interesting topic?', options: ['Politics', 'Business', 'Sports', 'Entertainment'] },
  ]},

  // ===== QUIZ TASKS (15) =====
  { id: 't043', title: 'General Knowledge Quiz', description: 'Test your general knowledge - 3 questions', category: 'quiz', image: '🧠', reward: 30, timer: 15, type: 'quiz', questions: [
    { q: 'What is the capital of Kenya?', options: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'], answer: 0 },
    { q: 'How many continents are there?', options: ['5', '6', '7', '8'], answer: 2 },
    { q: 'What is H2O commonly known as?', options: ['Salt', 'Water', 'Acid', 'Gas'], answer: 1 },
  ]},
  { id: 't044', title: 'Math Challenge Quiz', description: 'Solve quick math problems', category: 'quiz', image: '🔢', reward: 35, timer: 20, type: 'quiz', questions: [
    { q: 'What is 15 x 8?', options: ['100', '110', '120', '130'], answer: 2 },
    { q: 'Square root of 144?', options: ['10', '11', '12', '13'], answer: 2 },
    { q: 'What is 25% of 200?', options: ['25', '50', '75', '100'], answer: 1 },
  ]},
  { id: 't045', title: 'Science Quiz', description: 'Test your science knowledge', category: 'quiz', image: '🔬', reward: 40, timer: 20, type: 'quiz', questions: [
    { q: 'What planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Mars', 'Earth'], answer: 1 },
    { q: 'What gas do plants absorb?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], answer: 2 },
    { q: 'How many bones in adult human body?', options: ['186', '196', '206', '216'], answer: 2 },
  ]},
  { id: 't046', title: 'Geography Quiz', description: 'How well do you know the world?', category: 'quiz', image: '🌍', reward: 35, timer: 18, type: 'quiz', questions: [
    { q: 'Largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 2 },
    { q: 'Which country has the most people?', options: ['India', 'USA', 'China', 'Russia'], answer: 0 },
    { q: 'Longest river in Africa?', options: ['Congo', 'Nile', 'Niger', 'Zambezi'], answer: 1 },
  ]},
  { id: 't047', title: 'History Quiz', description: 'Test your history knowledge', category: 'quiz', image: '📜', reward: 40, timer: 20, type: 'quiz', questions: [
    { q: 'When did Kenya gain independence?', options: ['1960', '1961', '1963', '1964'], answer: 2 },
    { q: 'Who invented the light bulb?', options: ['Tesla', 'Edison', 'Newton', 'Einstein'], answer: 1 },
    { q: 'First man on the moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'], answer: 1 },
  ]},
  { id: 't048', title: 'Sports Trivia Quiz', description: 'Are you a sports fan?', category: 'quiz', image: '🏆', reward: 30, timer: 15, type: 'quiz', questions: [
    { q: 'How many players in a football team?', options: ['9', '10', '11', '12'], answer: 2 },
    { q: 'Which country hosted 2010 World Cup?', options: ['Brazil', 'Germany', 'South Africa', 'Russia'], answer: 2 },
    { q: 'What sport uses a shuttlecock?', options: ['Tennis', 'Badminton', 'Cricket', 'Golf'], answer: 1 },
  ]},
  { id: 't049', title: 'Technology Quiz', description: 'How tech-savvy are you?', category: 'quiz', image: '💻', reward: 35, timer: 18, type: 'quiz', questions: [
    { q: 'Who founded Facebook?', options: ['Bill Gates', 'Steve Jobs', 'Mark Zuckerberg', 'Elon Musk'], answer: 2 },
    { q: 'What does CPU stand for?', options: ['Central Power Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Core Processing Unit'], answer: 1 },
    { q: 'What year was the iPhone launched?', options: ['2005', '2006', '2007', '2008'], answer: 2 },
  ]},
  { id: 't050', title: 'Music & Entertainment Quiz', description: 'Pop culture questions', category: 'quiz', image: '🎵', reward: 30, timer: 15, type: 'quiz', questions: [
    { q: 'Who sang "Thriller"?', options: ['Prince', 'Michael Jackson', 'Elvis', 'Whitney'], answer: 1 },
    { q: 'How many strings on a standard guitar?', options: ['4', '5', '6', '7'], answer: 2 },
    { q: 'What is the longest running TV show?', options: ['Friends', 'The Simpsons', 'Seinfeld', 'The Office'], answer: 1 },
  ]},
  { id: 't051', title: 'Business & Finance Quiz', description: 'Test your business knowledge', category: 'quiz', image: '💼', reward: 45, timer: 20, type: 'quiz', questions: [
    { q: 'What does CEO stand for?', options: ['Chief Executive Officer', 'Chief Economic Officer', 'Corporate Executive Officer', 'Chief External Officer'], answer: 0 },
    { q: 'Stock market index in Kenya?', options: ['FTSE', 'NSE', 'NYSE', 'NASDAQ'], answer: 1 },
    { q: 'What is inflation?', options: ['Price decrease', 'Price increase', 'Price freeze', 'Tax increase'], answer: 1 },
  ]},
  { id: 't052', title: 'Animal Kingdom Quiz', description: 'How well do you know animals?', category: 'quiz', image: '🦁', reward: 25, timer: 15, type: 'quiz', questions: [
    { q: 'Fastest land animal?', options: ['Lion', 'Cheetah', 'Horse', 'Leopard'], answer: 1 },
    { q: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], answer: 1 },
    { q: 'What is a baby kangaroo called?', options: ['Cub', 'Kit', 'Joey', 'Pup'], answer: 2 },
  ]},
  { id: 't053', title: 'African Culture Quiz', description: 'Test your knowledge of Africa', category: 'quiz', image: '🌍', reward: 35, timer: 18, type: 'quiz', questions: [
    { q: 'How many countries in Africa?', options: ['44', '48', '54', '57'], answer: 2 },
    { q: 'Largest country in Africa by area?', options: ['Nigeria', 'Algeria', 'Congo', 'Sudan'], answer: 1 },
    { q: 'Which city is called "The Big Five"?', options: ['Lagos', 'Cairo', 'Nairobi', 'Cape Town'], answer: 2 },
  ]},
  { id: 't054', title: 'Food & Nutrition Quiz', description: 'Healthy eating trivia', category: 'quiz', image: '🥗', reward: 28, timer: 15, type: 'quiz', questions: [
    { q: 'Which vitamin comes from sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 3 },
    { q: 'What fruit is known as the king of fruits?', options: ['Mango', 'Durian', 'Pineapple', 'Watermelon'], answer: 1 },
    { q: 'Which food has the most protein?', options: ['Rice', 'Eggs', 'Bread', 'Apple'], answer: 1 },
  ]},
  { id: 't055', title: 'Crypto & Blockchain Quiz', description: 'Test your crypto knowledge', category: 'quiz', image: '₿', reward: 50, timer: 20, type: 'quiz', questions: [
    { q: 'Who created Bitcoin?', options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Charlie Lee', 'Elon Musk'], answer: 1 },
    { q: 'What is a blockchain?', options: ['A chain store', 'Distributed ledger', 'A bank', 'A cryptocurrency'], answer: 1 },
    { q: 'When was Bitcoin created?', options: ['2007', '2008', '2009', '2010'], answer: 2 },
  ]},
  { id: 't056', title: 'Language & Words Quiz', description: 'Test your vocabulary', category: 'quiz', image: '📖', reward: 30, timer: 15, type: 'quiz', questions: [
    { q: 'Most spoken language in the world?', options: ['English', 'Spanish', 'Mandarin', 'Hindi'], answer: 2 },
    { q: 'What does "ASAP" stand for?', options: ['As Simple As Possible', 'As Soon As Possible', 'Always Stay Active Please', 'As Smooth As Possible'], answer: 1 },
    { q: 'How many letters in the English alphabet?', options: ['24', '25', '26', '27'], answer: 2 },
  ]},
  { id: 't057', title: 'Space & Universe Quiz', description: 'Explore the cosmos', category: 'quiz', image: '🚀', reward: 40, timer: 18, type: 'quiz', questions: [
    { q: 'How many planets in our solar system?', options: ['7', '8', '9', '10'], answer: 1 },
    { q: 'What is the closest star to Earth?', options: ['Sirius', 'Alpha Centauri', 'The Sun', 'Polaris'], answer: 2 },
    { q: 'What is the largest planet?', options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'], answer: 1 },
  ]},

  // ===== AFFILIATE MARKETING (10) =====
  { id: 't058', title: 'Share Product Link on WhatsApp', description: 'Share our partner product link to 3 WhatsApp groups', category: 'affiliate', image: '📲', reward: 50, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't059', title: 'Post Product Review on Facebook', description: 'Write a short review and post on your Facebook', category: 'affiliate', image: '📝', reward: 60, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't060', title: 'Share Affiliate Banner on Stories', description: 'Post the affiliate banner on your social media story', category: 'affiliate', image: '🖼️', reward: 45, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't061', title: 'Register on Partner Platform', description: 'Create an account on our partner website', category: 'affiliate', image: '✅', reward: 70, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't062', title: 'Watch Affiliate Training Video', description: 'Learn affiliate marketing strategies', category: 'affiliate', image: '🎓', reward: 35, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't063', title: 'Promote App Download Link', description: 'Share app download link with friends', category: 'affiliate', image: '📥', reward: 55, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't064', title: 'Create Product Testimonial', description: 'Record or write a product testimonial', category: 'affiliate', image: '🗣️', reward: 65, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't065', title: 'Share Discount Code', description: 'Share special discount code on 2 platforms', category: 'affiliate', image: '🏷️', reward: 40, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't066', title: 'Join Affiliate Webinar', description: 'Attend a live affiliate marketing session', category: 'affiliate', image: '🖥️', reward: 80, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't067', title: 'Submit Affiliate Report', description: 'Fill in your weekly affiliate performance report', category: 'affiliate', image: '📊', reward: 45, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== TRADING TASKS (10) =====
  { id: 't068', title: 'Watch Forex Trading Basics', description: 'Learn the basics of forex trading', category: 'trading', image: '📉', reward: 40, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't069', title: 'Complete Trading Demo Session', description: 'Practice trading on demo account', category: 'trading', image: '📈', reward: 55, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't070', title: 'Watch Crypto Trading Tutorial', description: 'Learn cryptocurrency trading strategies', category: 'trading', image: '₿', reward: 45, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't071', title: 'Read Market Analysis Report', description: 'Review today\'s market analysis', category: 'trading', image: '📋', reward: 35, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't072', title: 'Watch Stock Trading for Beginners', description: 'Introduction to stock market investing', category: 'trading', image: '🏛️', reward: 50, timer: 55, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't073', title: 'Complete Trading Quiz', description: 'Test your trading knowledge', category: 'trading', image: '✅', reward: 60, timer: 30, type: 'quiz', questions: [
    { q: 'What does "Bull market" mean?', options: ['Prices falling', 'Prices rising', 'Prices stable', 'Market closed'], answer: 1 },
    { q: 'Best time to buy stocks?', options: ['When prices are high', 'When prices are low', 'Anytime', 'Never'], answer: 1 },
    { q: 'What is "diversification"?', options: ['Buying one stock', 'Spreading investments', 'Selling all', 'Borrowing money'], answer: 1 },
  ]},
  { id: 't074', title: 'Watch Binary Options Explained', description: 'Understanding binary options trading', category: 'trading', image: '⚡', reward: 40, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't075', title: 'Register on Trading Platform', description: 'Create a demo trading account', category: 'trading', image: '🔑', reward: 75, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't076', title: 'Watch Candlestick Patterns', description: 'Learn to read candlestick charts', category: 'trading', image: '🕯️', reward: 45, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't077', title: 'Watch Risk Management Tutorial', description: 'Learn to manage trading risks properly', category: 'trading', image: '🛡️', reward: 50, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== GOLD MINING TASKS (8) =====
  { id: 't078', title: 'Start Gold Mining Session', description: 'Mine virtual gold for 30 seconds', category: 'mining', image: '⛏️', reward: 20, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't079', title: 'Gold Rush Challenge', description: 'Complete a gold mining challenge', category: 'mining', image: '🥇', reward: 35, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't080', title: 'Diamond Mining Adventure', description: 'Mine diamonds in a timed session', category: 'mining', image: '💎', reward: 50, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't081', title: 'Watch Mining Documentary', description: 'Learn about gold mining process', category: 'mining', image: '🎬', reward: 25, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't082', title: 'Crypto Mining Simulator', description: 'Simulate cryptocurrency mining', category: 'mining', image: '💰', reward: 40, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't083', title: 'Silver Mining Task', description: 'Mine silver coins in this session', category: 'mining', image: '🪙', reward: 25, timer: 35, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't084', title: 'Treasure Hunt Mining', description: 'Find hidden treasure in the mine', category: 'mining', image: '🗺️', reward: 55, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't085', title: 'Speed Mining Sprint', description: 'Quick mining sprint for bonus rewards', category: 'mining', image: '⚡', reward: 30, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== SOCIAL MEDIA / FOLLOWING (15) =====
  { id: 't086', title: 'Follow Our Google Business Page', description: 'Follow and leave a 5-star review', category: 'social', image: '🔍', reward: 30, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't087', title: 'Follow Our TikTok Account', description: 'Follow @NovaEarnOfficial on TikTok', category: 'social', image: '🎵', reward: 25, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't088', title: 'Like Our Facebook Page', description: 'Like and follow Nova Earn on Facebook', category: 'social', image: '👍', reward: 20, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't089', title: 'Follow on Instagram', description: 'Follow @novaearn on Instagram', category: 'social', image: '📸', reward: 25, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't090', title: 'Join Telegram Group', description: 'Join our official Telegram community', category: 'social', image: '✈️', reward: 30, timer: 15, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't091', title: 'Subscribe to Newsletter', description: 'Subscribe to our email newsletter', category: 'social', image: '📧', reward: 20, timer: 15, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't092', title: 'Follow on Twitter/X', description: 'Follow and retweet our pinned post', category: 'social', image: '🐦', reward: 25, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't093', title: 'Join WhatsApp Channel', description: 'Join our WhatsApp broadcast channel', category: 'social', image: '💬', reward: 20, timer: 15, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't094', title: 'Review App on Play Store', description: 'Leave a 5-star review on Google Play', category: 'social', image: '⭐', reward: 40, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't095', title: 'Share Post on Facebook', description: 'Share our latest post to your timeline', category: 'social', image: '📤', reward: 30, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't096', title: 'Comment on Our YouTube Video', description: 'Watch and leave a meaningful comment', category: 'social', image: '💭', reward: 25, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't097', title: 'Follow LinkedIn Page', description: 'Follow Nova Earn on LinkedIn', category: 'social', image: '💼', reward: 30, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't098', title: 'Pin Our Post on Pinterest', description: 'Pin our promotional post', category: 'social', image: '📌', reward: 25, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't099', title: 'Vote in Our Poll', description: 'Participate in our community poll', category: 'social', image: '🗳️', reward: 15, timer: 10, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't100', title: 'Tag Friends in Post', description: 'Tag 3 friends in our latest post', category: 'social', image: '🏷️', reward: 35, timer: 20, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== GAMING TASKS (8) =====
  { id: 't101', title: 'Play Spin the Wheel', description: 'Spin the wheel for a chance to earn more', category: 'gaming', image: '🎰', reward: 25, timer: 15, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't102', title: 'Complete Puzzle Challenge', description: 'Solve a puzzle to earn rewards', category: 'gaming', image: '🧩', reward: 35, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't103', title: 'Play Memory Game', description: 'Match pairs in the memory game', category: 'gaming', image: '🃏', reward: 30, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't104', title: 'Lucky Number Draw', description: 'Pick a lucky number and win', category: 'gaming', image: '🎲', reward: 20, timer: 15, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't105', title: 'Word Scramble Game', description: 'Unscramble words to earn', category: 'gaming', image: '🔤', reward: 30, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't106', title: 'Trivia Speed Round', description: 'Answer trivia questions against the clock', category: 'gaming', image: '⏱️', reward: 45, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't107', title: 'Coin Flip Challenge', description: 'Predict the coin flip outcome', category: 'gaming', image: '🪙', reward: 15, timer: 10, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't108', title: 'Scratch Card Reveal', description: 'Reveal your scratch card prize', category: 'gaming', image: '🎫', reward: 40, timer: 15, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== LEARNING TASKS (8) =====
  { id: 't109', title: 'Watch Financial Literacy Course', description: 'Learn about budgeting and saving', category: 'learning', image: '💡', reward: 45, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't110', title: 'Complete Digital Marketing Lesson', description: 'Learn digital marketing basics', category: 'learning', image: '📚', reward: 50, timer: 55, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't111', title: 'Watch Entrepreneurship Video', description: 'Learn how to start a business', category: 'learning', image: '🚀', reward: 40, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't112', title: 'Complete Excel Basics Tutorial', description: 'Learn spreadsheet fundamentals', category: 'learning', image: '📊', reward: 45, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't113', title: 'Watch Public Speaking Tips', description: 'Improve your communication skills', category: 'learning', image: '🎤', reward: 35, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't114', title: 'Learn Mobile Photography', description: 'Tips for better phone photography', category: 'learning', image: '📷', reward: 30, timer: 35, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't115', title: 'Complete Time Management Course', description: 'Boost your productivity', category: 'learning', image: '⏰', reward: 40, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't116', title: 'Watch Graphic Design Basics', description: 'Introduction to graphic design', category: 'learning', image: '🎨', reward: 45, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== REVIEWS (6) =====
  { id: 't117', title: 'Review a Mobile App', description: 'Download and review an app on Play Store', category: 'review', image: '📱', reward: 50, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't118', title: 'Write Product Review', description: 'Write a detailed product review', category: 'review', image: '✍️', reward: 55, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't119', title: 'Review a Restaurant', description: 'Leave a Google review for a restaurant', category: 'review', image: '🍽️', reward: 40, timer: 35, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't120', title: 'Review Online Course', description: 'Rate and review an online course', category: 'review', image: '🌟', reward: 45, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't121', title: 'Review a YouTube Channel', description: 'Subscribe and write a channel review', category: 'review', image: '📺', reward: 35, timer: 30, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't122', title: 'Review Service Provider', description: 'Rate your service provider experience', category: 'review', image: '🏢', reward: 40, timer: 25, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },

  // ===== SIGN UPS (6) =====
  { id: 't123', title: 'Sign Up on Betting Platform', description: 'Create an account on our partner platform', category: 'signup', image: '🎰', reward: 80, timer: 60, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't124', title: 'Register on E-commerce Site', description: 'Create an account on our partner store', category: 'signup', image: '🛍️', reward: 65, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't125', title: 'Sign Up for Free Trial', description: 'Register for a free trial of premium service', category: 'signup', image: '🆓', reward: 70, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't126', title: 'Create Survey Account', description: 'Register on survey platform for more tasks', category: 'signup', image: '📝', reward: 55, timer: 40, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't127', title: 'Register on Learning Platform', description: 'Sign up for free online courses', category: 'signup', image: '🎓', reward: 60, timer: 45, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't128', title: 'Create Freelancer Account', description: 'Register on freelancing platform', category: 'signup', image: '💼', reward: 75, timer: 50, type: 'video', videoURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

// Simulated live activity feed names
export const FAKE_NAMES = [
  'Peter M.', 'Jane W.', 'David K.', 'Sarah N.', 'John O.', 'Mary A.',
  'James K.', 'Grace M.', 'Brian O.', 'Faith W.', 'Kevin N.', 'Ann K.',
  'Dennis M.', 'Lucy W.', 'Paul O.', 'Mercy N.', 'Victor K.', 'Esther A.',
  'George M.', 'Diana W.', 'Samuel K.', 'Rose N.', 'Michael O.', 'Joy A.',
  'Thomas M.', 'Lilian W.', 'Daniel K.', 'Naomi N.', 'Alex O.', 'Peace A.',
  'Patrick M.', 'Sharon W.', 'Collins K.', 'Rita N.', 'Emmanuel O.', 'Gloria A.',
  'Joseph M.', 'Christine W.', 'Isaac K.', 'Angela N.', 'Moses O.', 'Stella A.',
];

export const LIVE_ACTIVITIES = [
  { type: 'withdrawal', template: '{name} just withdrew KES {amount}' },
  { type: 'reward', template: '{name} earned KES {amount} from {task}' },
  { type: 'referral', template: '{name} earned KES {amount} from referral bonus' },
  { type: 'activation', template: '{name} just activated their account' },
  { type: 'task', template: '{name} completed "{task}" and earned KES {amount}' },
];

export function generateLiveActivity() {
  const activity = LIVE_ACTIVITIES[Math.floor(Math.random() * LIVE_ACTIVITIES.length)];
  const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
  const amounts = [50, 100, 150, 200, 250, 300, 500, 750, 1000, 1500, 2000];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];
  const taskNames = ['TikTok Video', 'YouTube Watch', 'Survey', 'Quiz', 'Gold Mining', 'Affiliate Task', 'Social Follow'];
  const task = taskNames[Math.floor(Math.random() * taskNames.length)];

  let message = activity.template.replace('{name}', name).replace('{amount}', amount).replace('{task}', task);
  return { type: activity.type, message, timestamp: Date.now() };
}
