// 英語教科書ジェネレーター - 歌詞素材辞書
// 小中学生で習う英単語＆英文で歌う、あの虚無な感じ

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
// VERSE 用フレーズ（行ごとのプール）
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: 場所 + 教科書英文（冒頭行）
export const VERSE_LINES_A: string[] = [
  '教室の窓際で　"This is a pen." って言ってる',
  '給食の配膳中に　"I like apples." を呟いた',
  '体育館の隅っこで　"Do you like music? Yes, I do." ',
  '放課後の廊下に　"I am a student." って書いてあった',
  '音楽室の前で　"I can play the piano." って立ってる',
  '理科室の窓から　"Look at the bird!" って叫んでる',
  '図書館の本棚に　"Where is the library?" って貼ってある',
  '保健室のベッドで　"I have a stomachache." を証明してる',
  '技術室の奥で　"This is a chair." って確認してる',
  '非常口の前で　"Go straight and turn left." って書いてある',
  '校長室の扉に　"May I come in?" って貼ってある',
  'プールのフェンスに　"I can swim." って書いてあった',
  '購買部の前で　"How much is this?" って聞いてる',
  '昇降口の下駄箱に　"These are my shoes." って書いてあった',
  '職員室の前で　"Excuse me." って三回言った',
  'グラウンドの真ん中に　"Run!" って書いてある看板',
  '廊下の壁に　"Don\'t run in the hall." って貼ってある',
  '掃除の時間に　"Clean your classroom." って放送が入る',
  '昼休みの屋上で　"The sky is blue." って確かめてる',
  '教室の黒板に　"Good morning!" が消えないまま残ってる',
];

// Pool 1: 文法・単語への困惑（2行目）
export const VERSE_LINES_B: string[] = [
  'be動詞が　頭の中でぐるぐるしてる',
  '三単現のSが　喉に引っかかってる',
  '過去形の不規則動詞　全部同じに見えてきた',
  'アルファベットの筆記体が　暗号みたいに見えてる',
  'theとaの違いが　今日もわからないまま',
  'haveとhasを　使い間違えた七回目',
  'thereとtheirとthey\'reが　全部同じ音する',
  '単語テストの "apple" を　三十秒見つめてる',
  '消しゴムで消した答えが　うっすら透けてる',
  '赤ペンの丸が　ページに一個もない',
  'リスニングのCDが　速すぎてついていけない',
  '英語のノートの罫線　はみ出してばかりだ',
  '単語を五回書いた　でも明日には忘れる',
  '前置詞のatとinとon　全部ごっちゃになった',
  '現在完了形の壁を　まだ越えてない',
];

// Pool 2: テスト・宿題あるある（3行目）
export const VERSE_LINES_C: string[] = [
  '英単語テストの裏面に　給食の献立が書いてあった',
  'ライティングの答案用紙に　消しゴムのカスが積もってる',
  '宿題のダイアログ暗記　半分しか覚えてない',
  'リスニングのテストで　一番だけ聞けなかった',
  '英語の教科書の付箋が　全部同じページに付いてる',
  '写し終わったと思ったら　一行抜けてた英作文',
  '辞書を引いたら　知らない単語が増えた',
  '英語の授業の前夜　教科書を枕の下に置いた',
  '単語帳の最後のページ　まだ白紙のまま',
  '返ってきたテストの点数　そっと手帳に挟んだ',
];

// Pool 3: 教科書のイラスト観察（4行目）
export const VERSE_LINES_D: string[] = [
  '教科書のブラウン先生が　やけにいい笑顔してる',
  '本文のKenとMaryが　ずっと公園にいる',
  'イラストの外国人家族が　みんな金髪すぎる',
  '教科書のダイアログで　Tomが毎回道に迷ってる',
  'Let\'s Readのページの外国　行ったことないのに懐かしい',
  '本文のボブが　スミスさんに同じ質問ばかりしてる',
  '付録のABCソングのキャラが　なぜかフルーツだ',
  'ページの端に描いた落書きの方が　本文より覚えてる',
  'CDのネイティブの声が　やたら元気すぎる',
  '本文のリサが笑いながら　"I\'m happy!" って言ってる',
];

// ────────────────────────────────────────────────────────────────────────────
// PRE-CHORUS 用フレーズ
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: 感嘆詞（英語っぽい）
export const PRECHORUS_LINES_A: string[] = [
  'Wait, wait!',
  'Oh my gosh!',
  'I don\'t understand!',
  'Say it again, please.',
  'Pardon?',
  'What does that mean?',
  'I forgot! I totally forgot!',
  'No way! No way!',
  'Come on!',
  'Again? Again?',
  'Hmm... Let me think.',
  'Ugh, really?',
];

// Pool 1: 文法が身体に絡む
export const PRECHORUS_LINES_B: string[] = [
  '三単現のSが　首に巻きついてる',
  'be動詞のamが　右脳を占拠してる',
  '不規則動詞の表が　目の裏に焼きついてる',
  '代名詞のIとmeが　頭の中で入れ替わってる',
  '前置詞のinが　耳の奥に引っかかってる',
  'go went goneが　喉まで出かかってる',
  '疑問符の形が　視神経に刺さってる',
  '単語帳のビニールが　指に貼りついてる',
  '関係代名詞が　脳みそに絡みついてる',
  '時制のズレが　三半規管を狂わせてる',
];

// Pool 2: 先生のセリフ
export const PRECHORUS_LINES_C: string[] = [
  '"Repeat after me." って言われたのに声が出ない',
  '"Open your textbook." でどのページかわからない',
  '"Who can answer?" の沈黙が　三分続いてる',
  '"Let\'s try in English." って言われた瞬間固まった',
  '"Good job!" って言われたのに　何が正解かわからない',
  '"Listen carefully." のCDが　もう終わってた',
  '"Any questions?" に　誰も手を挙げない',
  '"One more time." を　もう五回聞いた',
  '"Speak louder!" に　声がさらに小さくなった',
  '"Very good!" が　なんか恥ずかしかった',
];

// Pool 3: 蛍光ペン・ノートあるある
export const PRECHORUS_LINES_D: string[] = [
  '蛍光ペンで引いた重要単語が　全部消えてた',
  '赤シートで隠したはずの答えが　透けて見えてる',
  '単語帳を赤いペンで書いたら　シートに透けた',
  'ノートの欄外に書いたメモが　本文より多い',
  '教科書の余白の落書きを　消したくない',
  '模範解答を丸写しした次のページが　真っ白だ',
  '英語のノートを新しくした　また三ページで終わる',
  '赤ペンで直された箇所が　元の答えより綺麗だ',
];

// ────────────────────────────────────────────────────────────────────────────
// CHORUS 用フレーズ（7行）
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: 定番教科書英文（1行目）
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

// Pool 1: 少しシュールな教科書英文（2行目）
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

// Pool 2: 授業中の光景（3行目）
export const CHORUS_LINES_C: string[] = [
  'チャイムが鳴った　でも授業は終わらない',
  '英語の時間の　窓の外の体育が羨ましい',
  '先生の発音を　心の中でそっと真似する',
  '黒板の英文を　ノートに写すだけの四十五分',
  '前の席のひとの消しゴムが　床に落ちた',
  'プリントの裏に　落書きを書き始めた',
  '単語テストの紙を　うらがえしてから待つ',
  '授業が終わる三分前から　かばんを片付けてる',
];

// Pool 3: 英語学習の虚無（4行目）
export const CHORUS_LINES_D: string[] = [
  '覚えた単語　また忘れた',
  '"apple"は知ってる　でも伝わらない',
  '英語ができたら　なんでも変わると思ってた',
  '教科書の英文　日本語に直してから読んでる',
  'リスニングの解答　全部Bにしたら二問当たった',
  '英単語帳を最初から始める　これで六回目',
  'ネイティブの発音で聞かれたら　何もわからない',
  '英検の過去問を　解いた気になってる',
];

// Pool 4: 英文の記憶（5行目）
export const CHORUS_LINES_E: string[] = [
  '中学一年の最初の文　I am Ken.だった',
  '小学校の英語で歌った　ABCソング思い出した',
  'I\'m fine, thank you. の次が出てこない',
  'How are you? の返しを　五種類覚えた',
  'Nice to meet you. の後に何を言えばいいのか',
  'What time is it? It\'s three thirty.',
  '三年間で習った英語を　全部足してみた',
  '教科書の裏表紙の　英和辞典の使い方を今読んでる',
];

// Pool 5: 誰かへの英文メッセージ（6行目）
export const CHORUS_LINES_F: string[] = [
  'I like you. って言えたら　どんなに楽か',
  'See you tomorrow. って言って　手を振った',
  'Thank you for everything. の意味が今わかった',
  'I miss you. の三文字が　また頭に浮かんだ',
  'I\'ll never forget you. って言えたら',
  'Take care of yourself. って誰かに言いたい',
  'I hope you\'re doing well. って書いて消した',
  'You are my sunshine. って教科書に書いてあった',
];

// Pool 6: 英文の響き・余韻（7行目）
export const CHORUS_LINES_G: string[] = [
  '"Hello!" の音が　廊下に残ってる',
  '"Goodbye." の後の沈黙',
  '"Let\'s go." の二文字が好きだ',
  '"Don\'t worry." が届かなかった夜',
  '"It\'s okay." って言い続けた',
  '"Good morning." だけで十分だった頃',
  '"Excuse me." って言えた　それだけでよかった',
  '"Here you are." って言われたくて',
];

// ────────────────────────────────────────────────────────────────────────────
// OUTRO 用フレーズ
// ────────────────────────────────────────────────────────────────────────────

// Pool 0: リフレイン的英文リピート
export const OUTRO_LINES_A: string[] = [
  'I have a pen, I have a pen',
  'This is a pen, this is a pen',
  'I like it, I like it',
  'Yes, I do. Yes, I do.',
  'Me, too. Me, too.',
  'I see. I see.',
  'I don\'t know. I don\'t know.',
  'Again and again.',
];

// Pool 1: 残骸
export const OUTRO_LINES_B: string[] = [
  '赤ペンで書き直された答案が　机の引き出しに眠ってる',
  '使い切れなかった単語帳が　本棚の奥に積んである',
  'テストの点数が書かれた紙が　手帳から出てきた',
  '教科書の付箋が　全部剥がれて床に散らばってる',
  '半分消えた黒板の英文が　明日まで残ってる',
  '英語のノートの最後のページ　何も書いてない',
  '返ってこなかったプリントが　まだどこかにある',
  '辞書に挟んだしおりが　同じページのまま',
];

// Pool 2: 皮肉な結末
export const OUTRO_LINES_C: string[] = [
  '結局三年間　ずっとI am a student.だった',
  '結局英語が話せないまま　授業が終わった',
  '結局This is a pen.以外　使わなかった',
  '結局ネイティブとは　話せなかった',
  '結局英単語帳は　Aから始まって止まる',
  '結局発音記号は　読めなかった',
  '結局英語より　国語の方が難しかった',
  '結局一番役に立ったのは　アルファベットの歌だった',
];

// Pool 3: 余韻・残響
export const OUTRO_LINES_D: string[] = [
  'リコーダーだけが　音楽室に残ってる',
  '教科書のCDの音が　どこかで流れてる',
  'ABCソングの最後の音が　遠くなってく',
  '英語の授業のチャイムだけが　今も耳に残ってる',
  '辞書をめくる音だけが　図書室に響いてる',
  'プロジェクターの光が　消えて暗くなった',
  '窓の外のグラウンドから　"Come on!" が聞こえた',
  '消した蛍光ペンの跡が　まだページに残ってる',
];

// ────────────────────────────────────────────────────────────────────────────
// INTRO / BRIDGE 用フレーズ
// ────────────────────────────────────────────────────────────────────────────

export const INTRO_LINES_A: string[] = [
  '朝のホームルームで　教科書を忘れたことに気づいた',
  '英語の授業の前の休み時間　単語を詰め込んでる',
  '今日の一時間目は英語だ　窓の外は晴れてる',
  '教科書のページを開くと　昨日の付箋が落ちた',
  '朝の教室に　チョークの匂いが残ってる',
];

export const INTRO_LINES_B: string[] = [
  '"Good morning." って言う練習を　家でした',
  '英単語を三つだけ　登校中に覚えた',
  '教科書の重さを　確かめながら歩いてる',
  '鉛筆を三本削った　これで準備はできてる',
  '今日こそ手を挙げようと　思いながら席についた',
];

export const BRIDGE_LINES: string[] = [
  '黒板の英文を　ゆっくりなぞってる',
  '全部わかってる　でも言葉が出てこない',
  'I know, I know.　でも口が動かない',
  '窓の外の雲が　ゆっくり動いてく',
  '教科書を閉じた　また開けた',
  '消しゴムで消した言葉が　また浮かんできた',
  '三単現のSだけが　まだ頭に残ってる',
  'チャイムが鳴るまで　あと少しだけ',
  '蛍光ペンの黄色が　ページを染めてる',
  'ABCの歌が　遠くから聞こえてきた',
];
