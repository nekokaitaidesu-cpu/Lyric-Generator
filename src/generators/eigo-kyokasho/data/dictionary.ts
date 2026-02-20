// 英語教科書ジェネレーター - 歌詞素材辞書
// 全フレーズ英語のみ！小中学校の教科書に出てくる英文

// ────────────────────────────────────────────────────────────────────────────
// TITLE WORDS（2単語タイトル生成用）
// ────────────────────────────────────────────────────────────────────────────
export const TITLE_STARTERS: string[] = [
  '放課後の', '蛍光ペンの', '消えかけた', '給食の', '教室の',
  '三単現の', '英単語の', 'チョークの', '転校生の', 'リスニングの',
  '赤ペンの', '補習の', '夏休みの', '単語帳の', '忘れかけた',
];

export const TITLE_ENDERS: string[] = [
  'ライティング', 'ヒアリング', 'スペリング', 'グラマー',
  'リーディング', 'ボキャブラリー', 'ダイアログ', 'ディクテーション',
  'アルファベット', 'リスニング', 'ワークシート', 'テキストブック',
  'ホームワーク', 'ノートブック', 'ペンシル',
];

// ────────────────────────────────────────────────────────────────────────────
// VERSE 用フレーズ（英語のみ）
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: 教室の指示・定番フレーズ
export const VERSE_LINES_A: string[] = [
  'This is a pen.',
  'That is a book.',
  'I am a student.',
  'Open your textbook.',
  'Repeat after me.',
  'Look at the blackboard.',
  'Excuse me. May I come in?',
  'Where is the library?',
  'Go straight and turn left.',
  "Don't run in the hall.",
  'Clean your classroom.',
  'May I use the bathroom?',
  'I have a pencil and an eraser.',
  'These are my shoes.',
  'That is a desk.',
  'This is a chair.',
  'Look! A bird!',
  'Is this your bag?',
  'Put your hand up.',
  'Sit down, please.',
];

// Pool 1: 好き嫌い・持ち物
export const VERSE_LINES_B: string[] = [
  'I like apples.',
  'Do you like music? Yes, I do.',
  "I don't like spiders.",
  'What do you like?',
  'I like soccer very much.',
  'She likes cats.',
  "He doesn't like vegetables.",
  'Do you have a dog?',
  'Yes, I do. No, I don\'t.',
  'I have two brothers.',
  'How many pencils do you have?',
  'I have a pen. I have an apple.',
  'I like sushi. Do you like sushi?',
  'Tom likes baseball very much.',
  'I play soccer after school.',
  'My favorite food is ramen.',
  'I love pizza.',
  'She likes reading books.',
  'He plays the guitar.',
  'Do you have a pen?',
];

// Pool 2: 日課・日常の動作
export const VERSE_LINES_C: string[] = [
  'I get up at seven every morning.',
  'I go to school by bus.',
  'She goes to school by bicycle.',
  'He gets home at five.',
  'I eat breakfast every day.',
  'My mother cooks dinner.',
  'I watch TV after dinner.',
  'I go to bed at ten.',
  'I brush my teeth every morning.',
  'I do my homework after school.',
  'I have lunch at school.',
  'She studies English every night.',
  'He reads books before bed.',
  'I practice piano on Sundays.',
  'We have P.E. on Thursdays.',
  'I walk to the station.',
  'She takes the train to school.',
  'He eats breakfast at seven.',
  'I come home at four.',
  'We eat dinner as a family.',
];

// Pool 3: 将来の夢・家族紹介
export const VERSE_LINES_D: string[] = [
  'My father is a doctor.',
  'My mother is a teacher.',
  'I want to be a soccer player.',
  'She wants to be a nurse.',
  'He wants to be an astronaut.',
  'What do you want to be?',
  'I want to be a police officer.',
  'My dream is to be a chef.',
  'I want to play the guitar.',
  'She can play the piano.',
  'I have one sister and two brothers.',
  'My grandfather is seventy years old.',
  'We are a family of four.',
  'My uncle lives in Osaka.',
  'Her mother is a dentist.',
  'His father works in Tokyo.',
  'I want to travel the world.',
  'She wants to be a doctor.',
  'He wants to study in America.',
  'My dream is to speak English.',
];

// ────────────────────────────────────────────────────────────────────────────
// PRE-CHORUS 用フレーズ（英語のみ）
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: 感嘆詞・リアクション
export const PRECHORUS_LINES_A: string[] = [
  'Wait! Wait!',
  'Oh no!',
  "I don't understand!",
  'Say it again, please.',
  'Pardon?',
  'What does that mean?',
  'No way! No way!',
  'Come on!',
  'Again? Again?',
  'I forgot! I forgot!',
  'Really? Really?',
  'Help me!',
];

// Pool 1: 謝罪・礼儀フレーズのリピート
export const PRECHORUS_LINES_B: string[] = [
  "I'm sorry. I'm so sorry.",
  'Excuse me. Excuse me.',
  "I don't know. I don't know.",
  'Please help me.',
  'Thank you very much.',
  "You're welcome.",
  "I'm fine, thank you.",
  'How are you? How are you?',
  'Nice to meet you.',
  'See you tomorrow.',
  'Goodbye. Goodbye.',
  'Good luck!',
];

// Pool 2: 質問フレーズ
export const PRECHORUS_LINES_C: string[] = [
  'Can you help me?',
  'Do you understand?',
  'Is that right?',
  'Are you sure?',
  'What time is it now?',
  'Where are you going?',
  'What are you doing?',
  'How much is this?',
  'Can I have this, please?',
  'This way, please.',
  'Who is that?',
  'When does it start?',
];

// Pool 3: 応援・励まし
export const PRECHORUS_LINES_D: string[] = [
  'I can do it!',
  "Let's try again.",
  "Don't give up.",
  'Do your best!',
  "Ready? Let's go!",
  'One more time!',
  'Almost there.',
  'Keep going!',
  'You can do it!',
  'Never give up.',
  "We're almost there.",
  'Stay strong!',
];

// ────────────────────────────────────────────────────────────────────────────
// CHORUS 用フレーズ（英語のみ・7行）
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: 定番教科書英文
export const CHORUS_LINES_A: string[] = [
  'I have a pen. I have an apple.',
  'This is a book. That is a desk.',
  'I am a student. You are my friend.',
  'I like sushi. Do you like sushi?',
  'He is tall. She is kind.',
  'I get up at seven every morning.',
  'My father is a doctor.',
  'She goes to school by bus.',
  'I play soccer after school.',
  'We live in Japan.',
];

// Pool 1: 少しシュールな教科書英文
export const CHORUS_LINES_B: string[] = [
  'There is a dog under the table.',
  'My mother is cooking dinner now.',
  'I watched TV last night.',
  'Did you eat breakfast this morning?',
  'I want to be a soccer player.',
  'How many pencils do you have?',
  'This is my bag. That is your bag.',
  'The dog is running in the park.',
  'I have two brothers and one sister.',
  'Tom likes baseball very much.',
];

// Pool 2: 自己紹介・会話定番
export const CHORUS_LINES_C: string[] = [
  "What time is it? It's three thirty.",
  "How are you? I'm fine, thank you.",
  'Nice to meet you. Nice to meet you, too.',
  'Where do you live? I live in Tokyo.',
  "What do you do? I'm a student.",
  'Can you swim? Yes, I can.',
  'Do you like music? Yes, I do.',
  'Is this your pen? Yes, it is.',
  "How old are you? I'm twelve.",
  "What's your name? My name is Ken.",
];

// Pool 3: 気持ち・メッセージ
export const CHORUS_LINES_D: string[] = [
  'I like you. I like you very much.',
  'I miss you. I miss you so much.',
  'Thank you for everything.',
  "I'll never forget you.",
  'See you tomorrow. See you tomorrow.',
  'Take care of yourself.',
  "I hope you're doing well.",
  'You are my sunshine.',
  "Don't worry. Everything is okay.",
  'I believe in you.',
];

// Pool 4: 挨拶・日常フレーズ
export const CHORUS_LINES_E: string[] = [
  'Hello! How are you?',
  'Good morning! Good morning!',
  'Good night. Sleep well.',
  'Have a nice day!',
  'Goodbye. See you later.',
  'Have fun! Have fun!',
  'Be careful!',
  'Welcome! Welcome!',
  'Come in, please.',
  'After you. Thank you.',
];

// Pool 5: できること・できないこと
export const CHORUS_LINES_F: string[] = [
  'I can run fast.',
  'She can sing very well.',
  'He can play the guitar.',
  'We can do it together.',
  'Can you speak English?',
  'Yes, I can. A little.',
  "I can't do it alone.",
  'Can you help me, please?',
  "Let's do it together.",
  'We can make it.',
];

// Pool 6: 天気・季節
export const CHORUS_LINES_G: string[] = [
  "It's sunny today.",
  "It's raining outside.",
  'The sky is blue.',
  'The flowers are beautiful.',
  "It's a beautiful day.",
  'Spring is my favorite season.',
  'I love summer vacation.',
  "It's cold today. Put on a coat.",
  "What's the weather like?",
  "It's warm and sunny.",
];

// ────────────────────────────────────────────────────────────────────────────
// OUTRO 用フレーズ（英語のみ）
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: 定番フレーズのリピート
export const OUTRO_LINES_A: string[] = [
  'I have a pen, I have a pen.',
  'This is a pen, this is a pen.',
  'I like it, I like it.',
  'Yes, I do. Yes, I do.',
  'Me, too. Me, too.',
  'I see. I see.',
  "I don't know. I don't know.",
  'Again and again.',
];

// Pool 1: 別れのフレーズ
export const OUTRO_LINES_B: string[] = [
  'Goodbye. Goodbye.',
  'See you. See you.',
  'Take care. Take care.',
  'Good night. Good night.',
  'Sweet dreams. Sweet dreams.',
  'Until next time.',
  'So long. Farewell.',
  'Stay well. Stay well.',
];

// Pool 2: 皮肉・虚無フレーズ（英語で）
export const OUTRO_LINES_C: string[] = [
  'I am a student. I am a student.',
  'This is a pen. This is a pen.',
  "I don't know. I still don't know.",
  "I can't speak English. Not yet.",
  'Maybe someday. Maybe someday.',
  "I'll try again. I'll try again.",
  'Next time. Next time.',
  'Keep going. Keep going.',
];

// Pool 3: 余韻・残響フレーズ
export const OUTRO_LINES_D: string[] = [
  'Hello. Hello. Hello.',
  'Goodbye. Goodbye. Goodbye.',
  'Thank you. Thank you.',
  "I'm sorry. I'm sorry.",
  'Please. Please. Please.',
  'Help me. Help me.',
  'I love you. I love you.',
  "Don't worry. Don't worry.",
];

// ────────────────────────────────────────────────────────────────────────────
// INTRO / BRIDGE 用フレーズ（英語のみ）
// ────────────────────────────────────────────────────────────────────────────

export const INTRO_LINES_A: string[] = [
  'Good morning, everyone.',
  'Open your textbook, please.',
  "Let's begin the lesson.",
  'Are you ready?',
  'Hello, class. How are you today?',
];

export const INTRO_LINES_B: string[] = [
  'Repeat after me.',
  'Listen carefully.',
  "Let's study English.",
  "Today's lesson starts now.",
  'Ready? Here we go.',
];

export const BRIDGE_LINES: string[] = [
  'I know. I know.',
  "I don't know. I don't know.",
  'I can. I can.',
  "I can't. Not yet.",
  'Someday. Someday.',
  "I'll try. I'll try.",
  'Please. Please.',
  'Wait. Just wait.',
  'Almost. Almost.',
  'One more time. One more time.',
];
