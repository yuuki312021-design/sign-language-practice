/* Mirror of data/jsl.json, data/exam.json, data/fingerspelling-jsl.json for file:// fallback.
   When you edit those JSON files, regenerate this file with: node scripts/gen-local-data.js
   The "asl" block is kept only as inert fallback data: the UI no longer loads or displays
   ASL (data/asl.json and assets/asl/ are not fetched and are excluded from dist/). */
window.LOCAL_DATA = {
  "jsl": {
  "language": "JSL",
  "languageName": "日本手話 (JSL)",
  "notice": "手話には地域差・個人差があります。図はAI生成/未監修の学習補助イラストであり、実際の表現は信頼できる講師・辞典でも確認してください。",
  "categories": [
    "あいさつ",
    "数字",
    "自己紹介",
    "日常表現"
  ],
  "entries": [
    {
      "id": "hello",
      "word": "こんにちは",
      "reading": "こんにちは",
      "english": "Hello",
      "category": "あいさつ",
      "description": "指をそろえた手を額に近づけ、軽く前へ動かす図解です。表情や会釈も合わせ、相手に向けて自然に表現します。",
      "image": "assets/jsl/hello.webp",
      "emoji": "👋",
      "videoUrl": ""
    },
    {
      "id": "morning",
      "word": "おはよう",
      "reading": "おはよう",
      "english": "Good morning",
      "category": "あいさつ",
      "description": "両手を重ねてから下へ動かす図解です。朝のあいさつとして、明るい表情で使います。",
      "image": "assets/jsl/good-morning.webp",
      "emoji": "🌅",
      "videoUrl": ""
    },
    {
      "id": "evening",
      "word": "こんばんは",
      "reading": "こんばんは",
      "english": "Good evening",
      "category": "あいさつ",
      "description": "水平に重ねた手を下へ移す動きを図示しています。時間帯の表現は地域や話者で異なる場合があります。",
      "image": "assets/jsl/good-evening.webp",
      "emoji": "🌆",
      "videoUrl": ""
    },
    {
      "id": "thanks",
      "word": "ありがとう",
      "reading": "ありがとう",
      "english": "Thank you",
      "category": "あいさつ",
      "description": "手を口元から前へ出すイメージの図解です。感謝の表情を添え、相手の目を見て伝えます。",
      "image": "assets/jsl/thank-you.webp",
      "emoji": "🙏",
      "videoUrl": ""
    },
    {
      "id": "sorry",
      "word": "ごめんなさい",
      "reading": "ごめんなさい",
      "english": "Sorry",
      "category": "あいさつ",
      "description": "胸に手を置く図解です。謝罪の気持ちが伝わる表情と、必要に応じた会釈も大切です。",
      "image": "assets/jsl/sorry.webp",
      "emoji": "🙇",
      "videoUrl": ""
    },
    {
      "id": "meet",
      "word": "はじめまして",
      "reading": "はじめまして",
      "english": "Nice to meet you",
      "category": "あいさつ",
      "description": "両手の人差し指を向かい合わせる図解です。初対面のあいさつで、自己紹介と組み合わせて使います。",
      "image": "assets/jsl/nice-to-meet.webp",
      "emoji": "🤝",
      "videoUrl": ""
    },
    {
      "id": "bye",
      "word": "さようなら",
      "reading": "さようなら",
      "english": "Goodbye",
      "category": "あいさつ",
      "description": "手のひらを相手に向けて、手首を左右に振る図解です。別れ際に表情を添えて使います。",
      "image": "assets/jsl/goodbye.webp",
      "emoji": "👋",
      "videoUrl": ""
    },
    {
      "id": "night",
      "word": "おやすみなさい",
      "reading": "おやすみなさい",
      "english": "Good night",
      "category": "あいさつ",
      "description": "両手を枕のように頬の横に添えるイメージです。目を閉じる表情と合わせます。",
      "image": "assets/jsl/good-night.webp",
      "emoji": "🌙",
      "videoUrl": ""
    },
    {
      "id": "five",
      "word": "5",
      "reading": "ご",
      "english": "Five",
      "category": "数字",
      "description": "手のひらを相手に向け、5本の指を開きます。数字は手の向きや位置も確認しましょう。",
      "image": "assets/jsl/number-five.webp",
      "emoji": "🖐️",
      "videoUrl": ""
    },
    {
      "id": "ten",
      "word": "10",
      "reading": "じゅう",
      "english": "Ten",
      "category": "数字",
      "description": "10を表す手の形の図解です。指の組み合わせや動きは正確な手本で確認してください。",
      "image": "assets/jsl/number-ten.webp",
      "emoji": "🔟",
      "videoUrl": ""
    },
    {
      "id": "me",
      "word": "わたし",
      "reading": "わたし",
      "english": "Me / I",
      "category": "自己紹介",
      "description": "人差し指で自分の胸を示す図解です。自己紹介では名前や所属などの情報と順に組み合わせます。",
      "image": "assets/jsl/me.webp",
      "emoji": "🙋",
      "videoUrl": ""
    },
    {
      "id": "name",
      "word": "名前",
      "reading": "なまえ",
      "english": "Name",
      "category": "自己紹介",
      "description": "両手の指を向かい合わせるイメージの図解です。名前を示した後、指文字で固有名詞を伝える方法もあります。",
      "image": "assets/jsl/name.webp",
      "emoji": "🪪",
      "videoUrl": ""
    },
    {
      "id": "like",
      "word": "好き",
      "reading": "すき",
      "english": "Like",
      "category": "日常表現",
      "description": "胸の前で手を動かす図解です。対象を示す語と表情を組み合わせると意味が伝わりやすくなります。",
      "image": "assets/jsl/like.webp",
      "emoji": "💛",
      "videoUrl": ""
    },
    {
      "id": "yes",
      "word": "はい",
      "reading": "はい",
      "english": "Yes",
      "category": "日常表現",
      "description": "うなずく動きと表情を合わせる図解です。会話では相づちや視線も重要な情報になります。",
      "image": "assets/jsl/yes.webp",
      "emoji": "✅",
      "videoUrl": ""
    },
    {
      "id": "no",
      "word": "いいえ",
      "reading": "いいえ",
      "english": "No",
      "category": "日常表現",
      "description": "首を横に振る表情・動きの図解です。否定を表すときは、相手に伝わる表情も意識します。",
      "image": "assets/jsl/no.webp",
      "emoji": "❌",
      "videoUrl": ""
    },
    {
      "id": "help",
      "word": "助けて",
      "reading": "たすけて",
      "english": "Help",
      "category": "日常表現",
      "description": "助けが必要な状況を表情と動きで明確に伝えます。ここでは学習用のアイコンを表示しています。",
      "image": "assets/jsl/help.webp",
      "emoji": "🆘",
      "videoUrl": ""
    }
  ]
},
  "asl": {
  "language": "ASL",
  "languageName": "アメリカ手話 (ASL)",
  "notice": "ASL (American Sign Language) is a distinct language from JSL. Signs vary by region and signer; illustrations are learning aids, not authoritative instruction.",
  "categories": [
    "Greetings",
    "Numbers",
    "Introductions",
    "Everyday"
  ],
  "entries": [
    {
      "id": "hello",
      "word": "こんにちは",
      "english": "Hello",
      "category": "Greetings",
      "description": "Raise an open right hand near the forehead and move it outward in a small salute-like wave. Keep the motion relaxed and use a friendly expression.",
      "image": "assets/asl/hello.png",
      "emoji": "👋",
      "videoUrl": ""
    },
    {
      "id": "thanks",
      "word": "ありがとう",
      "english": "Thank you",
      "category": "Greetings",
      "description": "Touch the fingertips of a flat hand near the chin, then move the hand forward toward the person. Pair the movement with an appreciative expression.",
      "image": "assets/asl/thank-you.png",
      "emoji": "🙏",
      "videoUrl": ""
    },
    {
      "id": "please",
      "word": "お願いします",
      "english": "Please",
      "category": "Greetings",
      "description": "Place a flat hand on the chest and move it in a small circular motion. Hand orientation and movement should be checked against a fluent signer.",
      "image": "assets/asl/please.png",
      "emoji": "💛",
      "videoUrl": ""
    },
    {
      "id": "sorry",
      "word": "ごめんなさい",
      "english": "Sorry",
      "category": "Greetings",
      "description": "Make a fist and move it in a small circle on the chest. Facial expression helps convey the apology.",
      "image": "assets/asl/sorry.png",
      "emoji": "🙇",
      "videoUrl": ""
    },
    {
      "id": "morning",
      "word": "おはよう",
      "english": "Good morning",
      "category": "Greetings",
      "description": "A common ASL expression combines GOOD and MORNING. Learn the two signs in sequence from a fluent model; the icon is a reminder, not a handshape diagram.",
      "image": "",
      "emoji": "🌅",
      "videoUrl": ""
    },
    {
      "id": "night",
      "word": "おやすみなさい",
      "english": "Good night",
      "category": "Greetings",
      "description": "ASL commonly combines GOOD and NIGHT. Keep the signs distinct and follow the timing and orientation shown by a fluent signer.",
      "image": "",
      "emoji": "🌙",
      "videoUrl": ""
    },
    {
      "id": "bye",
      "word": "さようなら",
      "english": "Goodbye / Bye",
      "category": "Greetings",
      "description": "Wave an open hand toward the other person. The expression and direction of the wave help make the farewell clear.",
      "image": "",
      "emoji": "👋",
      "videoUrl": ""
    },
    {
      "id": "good",
      "word": "よい",
      "english": "Good",
      "category": "Everyday",
      "description": "A common ASL sign moves a flat hand from the chin outward. This forms part of expressions such as GOOD MORNING and GOOD NIGHT.",
      "image": "",
      "emoji": "👍",
      "videoUrl": ""
    },
    {
      "id": "five",
      "word": "5",
      "english": "Five",
      "category": "Numbers",
      "description": "Hold up an open hand with all five fingers extended. Pay attention to palm orientation and signing space.",
      "image": "",
      "emoji": "🖐️",
      "videoUrl": ""
    },
    {
      "id": "ten",
      "word": "10",
      "english": "Ten",
      "category": "Numbers",
      "description": "ASL number ten is commonly shown with a thumbs-up handshape and a small twist. Confirm the movement with a fluent ASL model.",
      "image": "",
      "emoji": "🔟",
      "videoUrl": ""
    },
    {
      "id": "me",
      "word": "わたし",
      "english": "Me / I",
      "category": "Introductions",
      "description": "Point to yourself to refer to ME or I. Pronoun placement is meaningful; use the signing space consistently.",
      "image": "",
      "emoji": "🙋",
      "videoUrl": ""
    },
    {
      "id": "name",
      "word": "名前",
      "english": "Name",
      "category": "Introductions",
      "description": "The common ASL sign NAME uses both index and middle fingers extended, touching together. Proper names can also be fingerspelled.",
      "image": "",
      "emoji": "🪪",
      "videoUrl": ""
    },
    {
      "id": "meet",
      "word": "はじめまして",
      "english": "Nice to meet you",
      "category": "Introductions",
      "description": "A natural ASL introduction may use NICE, MEET, and YOU in sequence. Maintain eye contact and appropriate facial grammar.",
      "image": "",
      "emoji": "🤝",
      "videoUrl": ""
    },
    {
      "id": "like",
      "word": "好き",
      "english": "Like",
      "category": "Everyday",
      "description": "The common ASL sign LIKE uses the thumb and middle finger near the chest, then moves the hand outward. Facial expression can affect meaning.",
      "image": "",
      "emoji": "💛",
      "videoUrl": ""
    },
    {
      "id": "yes",
      "word": "はい",
      "english": "Yes",
      "category": "Everyday",
      "description": "Make a fist and nod it up and down like a head nod. Natural facial expression and conversational timing matter.",
      "image": "",
      "emoji": "✅",
      "videoUrl": ""
    },
    {
      "id": "help",
      "word": "助けて",
      "english": "Help",
      "category": "Everyday",
      "description": "The ASL sign HELP commonly places one fist on the palm of the other hand and lifts both hands. Practice orientation and movement with a trusted source.",
      "image": "",
      "emoji": "🆘",
      "videoUrl": ""
    }
  ]
},
  "exam": {
  "title": "手話通訳士 資格試験対策",
  "notice": "すべてオリジナルの練習問題です。実際の手話通訳士試験の問題ではありません。最新の試験情報は公式発表で確認してください。",
  "areas": [
    {
      "id": "ethics",
      "label": "手話通訳の倫理・原則"
    },
    {
      "id": "culture",
      "label": "聴覚障害者文化・聴文化"
    },
    {
      "id": "practice",
      "label": "通訳場面の対応"
    },
    {
      "id": "linguistics",
      "label": "手話言語学的基礎"
    }
  ],
  "questions": [
    {
      "id": "q01",
      "area": "ethics",
      "question": "通訳中、通訳者が自分の意見を付け加える対応として適切なのは？",
      "options": [
        "内容の理解を助けるため積極的に補足する",
        "自分が正しいと思う内容に置き換える",
        "話者の発言を正確に伝え、必要な確認は当事者に返す",
        "話者の代わりに結論を決める"
      ],
      "answer": 2,
      "explanation": "通訳者は中立性と正確性を保ち、発言を勝手に補足・変更しないことが基本です。"
    },
    {
      "id": "q02",
      "area": "ethics",
      "question": "通訳を通じて知り得た依頼者の個人情報について正しいものは？",
      "options": [
        "本人の同意なく他者に漏らさない",
        "本人の同意がなくても参考として話してよい",
        "通訳者同士なら共有してよい",
        "記録として公開してよい"
      ],
      "answer": 0,
      "explanation": "守秘義務は通訳者の基本的な倫理です。知り得た情報を本人の同意なく漏らしません。"
    },
    {
      "id": "q03",
      "area": "ethics",
      "question": "通訳中に当事者から「あなたはどう思う？」と意見を求められたときの適切な対応は？",
      "options": [
        "その場で自分の意見を述べる",
        "通訳者としての役割を説明し、発言者同士の対話に戻る",
        "求められたので答えるのが当然である",
        "その場の空気に合わせて相槌だけ打つ"
      ],
      "answer": 1,
      "explanation": "役割の境界を説明して対話に戻ることで、通訳の中立性を保てます。"
    },
    {
      "id": "q04",
      "area": "ethics",
      "question": "自分の知識や技能では対応が難しい専門的な通訳依頼を受けたときの適切な対応は？",
      "options": [
        "断らず引き受けて、場当たり的に対応する",
        "依頼者に気づかれないようにする",
        "事前に困難な旨を説明し、準備や別の通訳者への相談を提案する",
        "自己判断で内容を省略して通訳する"
      ],
      "answer": 2,
      "explanation": "能力の範囲を超える依頼では、事前の説明と適切なつなぎが利用者を守ります。"
    },
    {
      "id": "q05",
      "area": "culture",
      "question": "手話コミュニティと関わるときの姿勢として適切なのは？",
      "options": [
        "聴者の基準を一方的に押し付ける",
        "本人やコミュニティの希望・文化を尊重し、学び続ける",
        "手話を身振りと同じものとして扱う",
        "本人の許可なく個人情報を共有する"
      ],
      "answer": 1,
      "explanation": "言語だけでなく、当事者の経験や文化、希望を尊重する姿勢が重要です。"
    },
    {
      "id": "q06",
      "area": "culture",
      "question": "「ろう者」を言語的少数者として捉える視点の説明として最も適切なのは？",
      "options": [
        "聞こえないことを医学的に治すべき対象とみなす",
        "手話を第一言語とする言語的・文化的な集団として捉える",
        "手話はろう者以外が使うべきでないとする",
        "補聴器の使用を前提とした集団と捉える"
      ],
      "answer": 1,
      "explanation": "医学的な「治す」視点ではなく、言語と文化を持つマイノリティとして捉える考え方が基本です。"
    },
    {
      "id": "q07",
      "area": "culture",
      "question": "聴文化とろう文化の対比として適切なものは？",
      "options": [
        "ろう文化は聴文化の一部である",
        "聴文化は音声言語を、ろう文化は視覚言語を中心とする生活・文化を指す",
        "両者に違いはない",
        "ろう文化は文字文化のみを指す"
      ],
      "answer": 1,
      "explanation": "情報の受け取り方やコミュニケーションの中心が音声か視覚かという違いがあります。"
    },
    {
      "id": "q08",
      "area": "culture",
      "question": "手話ネーム(サインネーム)の説明として適切なのは？",
      "options": [
        "本人の名前を指文字で綴ったものだけを指す",
        "人の特徴や印象などに基づいて付けられる、その人固有の手話名である",
        "住所や本名から機械的に決まる",
        "聴者が誰にも相談せず自由に付けてよいものである"
      ],
      "answer": 1,
      "explanation": "ろうコミュニティでは、本人の特徴に基づいた固有の手話名が使われることがあります。"
    },
    {
      "id": "q09",
      "area": "practice",
      "question": "聞こえない人と話すとき、望ましい対応は？",
      "options": [
        "本人に確認せず、付き添いの人だけに話す",
        "本人に希望するコミュニケーション方法を確認する",
        "大声で話せば必ず伝わると考える",
        "会話を避けてしまう"
      ],
      "answer": 1,
      "explanation": "相手の希望を尊重し、手話・筆談・字幕など必要な方法を本人に確認します。"
    },
    {
      "id": "q10",
      "area": "practice",
      "question": "手話通訳が見やすい環境づくりとして適切なのは？",
      "options": [
        "話者と通訳者を離れた別室に配置する",
        "照明・視線・背景に配慮し、利用者が選べる配置を整える",
        "通訳者の手元を机で隠す",
        "映像画面をできるだけ小さくする"
      ],
      "answer": 1,
      "explanation": "手や表情が見える照明・背景・配置を整え、利用者の見やすさを確認します。"
    },
    {
      "id": "q11",
      "area": "practice",
      "question": "医療の場面での通訳で、重要な説明の理解を支援する対応として適切なのは？",
      "options": [
        "説明をすべて通訳者の言葉に置き換える",
        "専門用語を平易な言い方に変えられるよう依頼し、理解の確認を挟む",
        "説明を省略して結論だけ伝える",
        "患者からの質問を通訳者が代わりに答える"
      ],
      "answer": 1,
      "explanation": "正確さと理解しやすさの両立のため、言い換えの依頼と確認を組み合わせます。"
    },
    {
      "id": "q12",
      "area": "practice",
      "question": "会議で複数の話者の発言が重なってしまったとき、通訳者として適切なのは？",
      "options": [
        "聞こえた分をすべて同時に伝えようとする",
        "進行役に、発言を一人ずつ確認できるよう調整を依頼する",
        "適当に選んで一部だけ伝える",
        "通訳を途中でやめる"
      ],
      "answer": 1,
      "explanation": "視覚言語では同時の複数発話を処理できないため、順番での発言を確保します。"
    },
    {
      "id": "q13",
      "area": "practice",
      "question": "災害時の緊急情報伝達で重要なことは？",
      "options": [
        "音声放送だけで十分である",
        "手話・文字・映像など、視覚的にアクセスできる手段を確保する",
        "ろう者の所在を確認する必要はない",
        "情報は後日まとめて伝えればよい"
      ],
      "answer": 1,
      "explanation": "緊急時こそ、視覚的な情報アクセスの確保が重要になります。"
    },
    {
      "id": "q14",
      "area": "practice",
      "question": "通訳の質を高めるための事前準備として適切なのは？",
      "options": [
        "準備は不要で、当日の対応だけで十分である",
        "事前資料で専門用語や固有名詞、話者の背景を確認しておく",
        "出演者名だけ覚えておけばよい",
        "内容を知らないほうが中立性が保たれる"
      ],
      "answer": 1,
      "explanation": "事前の語彙や背景の確認は、正確で滑らかな通訳につながります。"
    },
    {
      "id": "q15",
      "area": "linguistics",
      "question": "手話で意味を伝える要素として適切な組み合わせは？",
      "options": [
        "手の形だけ",
        "手の形・位置・動き・手の向き・非手指要素",
        "声の高さだけ",
        "指文字だけ"
      ],
      "answer": 1,
      "explanation": "手の形・動き・位置・向きに加え、表情などの非手指要素も意味に関わります。"
    },
    {
      "id": "q16",
      "area": "linguistics",
      "question": "JSL(日本手話)とASL(アメリカ手話)の関係について正しいものは？",
      "options": [
        "同じ手話を国ごとに発音だけ変えたものである",
        "互いに異なる自然言語で、それぞれ独自の語彙や文法を持つ",
        "ASLはJSLを英語に置き換えただけである",
        "手話は世界共通である"
      ],
      "answer": 1,
      "explanation": "各国・地域の手話は独自に発展しており、JSLとASLも別の言語です。"
    },
    {
      "id": "q17",
      "area": "linguistics",
      "question": "手話の空間利用で大切なことは？",
      "options": [
        "登場人物や場所の位置を一貫して示す",
        "手を常に体の後ろに置く",
        "毎回違う場所を指す",
        "空間は意味に関係しない"
      ],
      "answer": 0,
      "explanation": "空間上の位置を一貫して使うことで、人物・場所間の関係を表現できます。"
    },
    {
      "id": "q18",
      "area": "linguistics",
      "question": "指文字の主な使い方として適切なのは？",
      "options": [
        "すべての単語を常に指文字で表す",
        "固有名詞や必要な語を綴るなど、場面に応じて使う",
        "表情の代わりに使う",
        "手話の文法を無効にする"
      ],
      "answer": 1,
      "explanation": "指文字は固有名詞などに役立ちますが、会話すべてを置き換えるものではありません。"
    },
    {
      "id": "q19",
      "area": "linguistics",
      "question": "眉や頭の動きなどの非手指動作が持つ機能として適切なのは？",
      "options": [
        "単なる癖であり、意味はない",
        "疑問・否定・強調などの文法的・意味的な機能を持つ",
        "感情だけを表し、文法とは無関係である",
        "指文字の速度を調整する役割だけがある"
      ],
      "answer": 1,
      "explanation": "非手指動作は文法の一部であり、なくなると意味が変わることがあります。"
    },
    {
      "id": "q20",
      "area": "linguistics",
      "question": "手話の地域差(方言)について正しいのは？",
      "options": [
        "手話に地域差はない",
        "同じ国の中でも、語彙や表現に地域差がある",
        "方言は若者の流行言葉である",
        "地域差があるのはASLだけである"
      ],
      "answer": 1,
      "explanation": "手話も音声言語と同様に地域差があり、同じ語でも表現が異なることがあります。"
    },
    {
      "id": "q21",
      "area": "linguistics",
      "question": "日本手話の語順の傾向として一般的に言われるのは？",
      "options": [
        "英語と同じ語順である",
        "数量などの要素が名詞の後に置かれやすい(例:「りんご 2つ」)",
        "常に日本語と同じ語順である",
        "語順は意味に影響しない"
      ],
      "answer": 1,
      "explanation": "日本手話には、数量詞が名詞の後に来る傾向など、日本語とは異なる語順の特徴があります。"
    },
    {
      "id": "q22",
      "area": "linguistics",
      "question": "手話に対応する語がない場合の表現方法として適切なのは？",
      "options": [
        "その語は絶対に伝えられない",
        "指文字で綴る、または頭文字を手話に組み込むなどの方法がある",
        "書いて見せる以外に方法はない",
        "別の話題に変えるしかない"
      ],
      "answer": 1,
      "explanation": "指文字や初期頭文字の借用など、手話には柔軟な語の取り込み方があります。"
    }
  ],
  "practicals": [
    {
      "id": "p01",
      "prompt": "はじめまして。田中花子と申します。よろしくお願いします。",
      "hint": "出会いのあいさつ → 自分 → 名前の順で組み立ててみましょう。",
      "model": "「はじめまして」→「私」→「名前」の順で表し、名前は指文字で「たなか・はなこ」と綴ります。最後に頭を下げる表情で「よろしく」の気持ちを添えます。相手の目を見て、丁寧な表情で伝えることが大切です。",
      "refs": [
        "はじめまして",
        "わたし",
        "名前"
      ]
    },
    {
      "id": "p02",
      "prompt": "おはようございます。今日もよろしくお願いします。",
      "hint": "朝のあいさつから始めて、依頼の気持ちを添えてみましょう。",
      "model": "「おはよう」→「今日」→「よろしく(頭を下げる表現)」の流れで表します。朝のあいさつらしい明るい表情を添えると、丁寧さが伝わります。",
      "refs": [
        "おはよう"
      ]
    },
    {
      "id": "p03",
      "prompt": "すみません、もう一度お願いできますか。",
      "hint": "聞き返しの表現は、丁寧な表情とセットで練習しましょう。",
      "model": "「ごめんなさい(すみません)」→「もう一度」→「お願い」の順で表します。少し頭を下げ、丁寧な表情を添えると意図が伝わりやすくなります。",
      "refs": [
        "ごめんなさい"
      ]
    },
    {
      "id": "p04",
      "prompt": "ありがとうございます。おかげさまで助かりました。",
      "hint": "感謝と「助けて」を組み合わせてみましょう。",
      "model": "「ありがとう」→「私」→「助けて(救われた)」の順で表します。感謝の気持ちを込めた表情と会釈を添えると、より自然になります。",
      "refs": [
        "ありがとう",
        "わたし",
        "助けて"
      ]
    },
    {
      "id": "p05",
      "prompt": "私は手話の勉強を始めました。手話が好きになりました。",
      "hint": "「私」と「好き」を使って伝えてみましょう。",
      "model": "「私」→「手話」→「勉強」→「好き」の順で表します。学ぶ楽しさが伝わる明るい表情を添えましょう。",
      "refs": [
        "わたし",
        "好き"
      ]
    },
    {
      "id": "p06",
      "prompt": "いいえ、結構です。ありがとうございます。",
      "hint": "断りの表現は、表情と相手への配慮がポイントです。",
      "model": "「いいえ」→「大丈夫(結構です)」→「ありがとう」の順で表します。断るときは、相手への配慮を示す柔らかい表情が大切です。",
      "refs": [
        "いいえ",
        "ありがとう"
      ]
    },
    {
      "id": "p07",
      "prompt": "こんばんは。今日は楽しかったですね。",
      "hint": "夕方のあいさつから始めましょう。",
      "model": "「こんばんは」→「今日」→「楽しい(楽しかった)」の順で表します。楽しかった気持ちを表情で表すと、伝わりやすくなります。",
      "refs": [
        "こんばんは"
      ]
    },
    {
      "id": "p08",
      "prompt": "おやすみなさい。また明日会いましょう。",
      "hint": "夜のあいさつと、再会の約束を組み合わせましょう。",
      "model": "「おやすみなさい」→「また」→「明日」→「会う」の順で表します。安心感を表す穏やかな表情で締めくくります。",
      "refs": [
        "おやすみなさい"
      ]
    },
    {
      "id": "p09",
      "prompt": "さようなら。お元気で。",
      "hint": "別れのあいさつは明るく手を振って。",
      "model": "「さようなら」→「元気」の順で表し、手を振りながら明るい表情で別れを伝えます。",
      "refs": [
        "さようなら"
      ]
    },
    {
      "id": "p10",
      "prompt": "私は25歳です。数字を手話で伝えてみましょう。",
      "hint": "数字は指の本数と組み合わせがポイントです。",
      "model": "「私」→「25」の順で表します。数字は「2」と「5」を続けて表す方法や、「二十」をひとつの形で表す方法があります。地域や話者による違いもあるので、辞書や信頼できる手本でも確認しましょう。",
      "refs": [
        "わたし",
        "5"
      ]
    }
  ]
},
  "fingerspelling": {
  "language": "JSL",
  "notice": "指文字の図はAI生成/未監修の簡略化した学習補助イラストです。各手形は公開されている指文字資料(出典は本ファイル下部の一覧を参照)を基に再現していますが、簡略化のため細部(手首の角度や指の反り具合など)を省略している場合があります。正確な手形・動きは手話講師や辞典など信頼できる情報源で必ず確認してください。濁音は手を右へ動かす・半濁音は手を上へ跳ね上げる・拗音/促音は手前に引く・長音は人差し指で縦線を書く、という表記は一般的な日本手話の指文字ルールです。",
  "sources": [
    "https://makki-english.moo.jp/SignLanguageAIUEO.html",
    "https://www.katch.ne.jp/~happy-i/5_syuwa/syu2.html",
    "https://www.tgs.co.jp/signlist/finger.htm",
    "https://www.suretalk.mb.softbank.jp/column/contents/000106.php",
    "https://www.city.uji.kyoto.jp/uploaded/attachment/45409.pdf"
  ],
  "entries": [
    {
      "id": "a",
      "char": "あ",
      "romaji": "a",
      "type": "seion",
      "description": "親指だけをまっすぐ伸ばし、残り4本は握ります。手のひらを相手に向けます(アルファベット「a」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/a.webp"
    },
    {
      "id": "i",
      "char": "い",
      "romaji": "i",
      "type": "seion",
      "description": "小指だけをまっすぐ伸ばし、残り4本は握ります。手のひらを相手に向けます(アルファベット「i」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/i.webp"
    },
    {
      "id": "u",
      "char": "う",
      "romaji": "u",
      "type": "seion",
      "description": "人差し指・中指をそろえてまっすぐ伸ばし、残り3本は握ります。手のひらを相手に向けます(アルファベット「u」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/u.webp"
    },
    {
      "id": "e",
      "char": "え",
      "romaji": "e",
      "type": "seion",
      "description": "5本すべての指を第2関節で軽く曲げます(かぎ爪のような形)。手のひらを相手に向けます(アルファベット「e」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/e.webp"
    },
    {
      "id": "o",
      "char": "お",
      "romaji": "o",
      "type": "seion",
      "description": "親指の先に残り4本の指先をつけて輪(丸)を作ります。穴が手前から見えるように構えます(アルファベット「o」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/o.webp"
    },
    {
      "id": "ka",
      "char": "か",
      "romaji": "ka",
      "type": "seion",
      "description": "人差し指と中指でチョキ(V)の形を作り、親指の腹を中指の第2関節に当てます。手のひらを相手に向けます(アルファベット「k」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/ka.webp"
    },
    {
      "id": "ki",
      "char": "き",
      "romaji": "ki",
      "type": "seion",
      "description": "親指・中指・薬指の指先をつけ、人差し指と小指をまっすぐ伸ばします。キツネの影絵のような形です。手のひらを相手に向けます。",
      "image": "assets/jsl/fingerspelling/ki.webp"
    },
    {
      "id": "ku",
      "char": "く",
      "romaji": "ku",
      "type": "seion",
      "description": "手の甲を相手に向け、親指は上向きに立て、人差し指・中指・薬指・小指はそろえて横向きに伸ばします(数字の「9」と同じ形)。",
      "image": "assets/jsl/fingerspelling/ku.webp"
    },
    {
      "id": "ke",
      "char": "け",
      "romaji": "ke",
      "type": "seion",
      "description": "親指を手のひらに折り込み、残り4本の指をそろえてまっすぐ伸ばします(敬礼する手の形、アルファベット「b」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/ke.webp"
    },
    {
      "id": "ko",
      "char": "こ",
      "romaji": "ko",
      "type": "seion",
      "description": "親指以外の4本をそろえて根元から直角に曲げ、小指側の側面を相手に向けます(カタカナ「コ」の一画を表します)。",
      "image": "assets/jsl/fingerspelling/ko.webp"
    },
    {
      "id": "sa",
      "char": "さ",
      "romaji": "sa",
      "type": "seion",
      "description": "5本の指をすべて握り込んだ「グー」の形にします(親指は外側)。手のひらを相手に向けます(アルファベット「s」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/sa.webp"
    },
    {
      "id": "shi",
      "char": "し",
      "romaji": "shi",
      "type": "seion",
      "description": "手の甲を相手に向け、親指を上向きに立て、人差し指・中指をそろえて横向きに伸ばします(数字の「7」と同じ形)。",
      "image": "assets/jsl/fingerspelling/shi.webp"
    },
    {
      "id": "su",
      "char": "す",
      "romaji": "su",
      "type": "seion",
      "description": "「し」の形を作ったあと、手首を支点に指先が下を向くまで倒します(カタカナ「ス」の形)。",
      "image": "assets/jsl/fingerspelling/su.webp"
    },
    {
      "id": "se",
      "char": "せ",
      "romaji": "se",
      "type": "seion",
      "description": "握った「グー」の形から中指だけをまっすぐ伸ばし、指の腹を相手に向けます(「背」がピンと伸びている様子)。",
      "image": "assets/jsl/fingerspelling/se.webp"
    },
    {
      "id": "so",
      "char": "そ",
      "romaji": "so",
      "type": "seion",
      "description": "人差し指だけを伸ばし、指先をやや斜め下に向けて「それ」を指し示します。残り4本は握ります。",
      "image": "assets/jsl/fingerspelling/so.webp"
    },
    {
      "id": "ta",
      "char": "た",
      "romaji": "ta",
      "type": "seion",
      "description": "親指だけを立て、指の腹を相手に向けます(「いいね」のサイン、アルファベット「t」の指文字と同じ)。残り4本は握ります。",
      "image": "assets/jsl/fingerspelling/ta.webp"
    },
    {
      "id": "chi",
      "char": "ち",
      "romaji": "chi",
      "type": "seion",
      "description": "親指・人差し指・中指・薬指の指先をそろえてつけ、小指だけをまっすぐ立てます(漢数字「千」と同じ形)。",
      "image": "assets/jsl/fingerspelling/chi.webp"
    },
    {
      "id": "tsu",
      "char": "つ",
      "romaji": "tsu",
      "type": "seion",
      "description": "親指・人差し指・中指の指先を合わせ、薬指と小指をまっすぐ立てます(カタカナ「ツ」の形)。",
      "image": "assets/jsl/fingerspelling/tsu.webp"
    },
    {
      "id": "te",
      "char": "て",
      "romaji": "te",
      "type": "seion",
      "description": "5本の指をそろえてまっすぐ伸ばし、手のひらをそのまま相手に見せます。",
      "image": "assets/jsl/fingerspelling/te.webp"
    },
    {
      "id": "to",
      "char": "と",
      "romaji": "to",
      "type": "seion",
      "description": "人差し指・中指をそろえて伸ばし、手の甲を相手に向けます(「う」と向きが逆、戸をたたく感じ)。",
      "image": "assets/jsl/fingerspelling/to.webp"
    },
    {
      "id": "na",
      "char": "な",
      "romaji": "na",
      "type": "seion",
      "description": "人差し指・中指を離して伸ばしたあと、手首を軸に前へ曲げ、指先が下を向くようにします(アルファベット「n」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/na.webp"
    },
    {
      "id": "ni",
      "char": "に",
      "romaji": "ni",
      "type": "seion",
      "description": "手のひらを自分側に向け、人差し指・中指をそろえて水平に伸ばします(漢数字「二」・カタカナ「ニ」と同じ形)。",
      "image": "assets/jsl/fingerspelling/ni.webp"
    },
    {
      "id": "nu",
      "char": "ぬ",
      "romaji": "nu",
      "type": "seion",
      "description": "親指を手前に構え、人差し指を第2関節でカギのように曲げます。残りの指は握ります(「盗っ人」のジェスチャーと同じ)。",
      "image": "assets/jsl/fingerspelling/nu.webp"
    },
    {
      "id": "ne",
      "char": "ね",
      "romaji": "ne",
      "type": "seion",
      "description": "指を大きく開いて伸ばしたあと、手首を軸に前へ曲げ、指先が下を向くようにします(根っこが地面に伸びる様子)。",
      "image": "assets/jsl/fingerspelling/ne.webp"
    },
    {
      "id": "no",
      "char": "の",
      "romaji": "no",
      "type": "seion",
      "description": "人差し指だけを立て、空中にカタカナの「ノ」を書くように動かします。残り4本は握ります。",
      "image": "assets/jsl/fingerspelling/no.webp"
    },
    {
      "id": "ha",
      "char": "は",
      "romaji": "ha",
      "type": "seion",
      "description": "人差し指・中指を伸ばして、やや斜め下に向けます(箸の形、アルファベット「h」の指文字と同じ)。残り3本は握ります。",
      "image": "assets/jsl/fingerspelling/ha.webp"
    },
    {
      "id": "hi",
      "char": "ひ",
      "romaji": "hi",
      "type": "seion",
      "description": "人差し指だけをまっすぐ伸ばし、残り4本は握ります。手のひらを相手に向けます(数字の「1」と同じ形)。",
      "image": "assets/jsl/fingerspelling/hi.webp"
    },
    {
      "id": "fu",
      "char": "ふ",
      "romaji": "fu",
      "type": "seion",
      "description": "親指・人差し指を伸ばしたあと、手首を曲げて人差し指の先が下を向くようにします(カタカナ「フ」の形)。残り3本は握ります。",
      "image": "assets/jsl/fingerspelling/fu.webp"
    },
    {
      "id": "he",
      "char": "へ",
      "romaji": "he",
      "type": "seion",
      "description": "こぶしを握り、親指と小指だけを下向きに伸ばします(カタカナ「ヘ」の形)。",
      "image": "assets/jsl/fingerspelling/he.webp"
    },
    {
      "id": "ho",
      "char": "ほ",
      "romaji": "ho",
      "type": "seion",
      "description": "5本の指をそろえて軽く丸めるように伸ばし、手の甲を相手に向けます(帆が風を受けて膨らんでいる様子)。",
      "image": "assets/jsl/fingerspelling/ho.webp"
    },
    {
      "id": "ma",
      "char": "ま",
      "romaji": "ma",
      "type": "seion",
      "description": "人差し指・中指・薬指を離して伸ばしたあと、手首を軸に前へ曲げ、3本の指先が下を向くようにします(アルファベット「m」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/ma.webp"
    },
    {
      "id": "mi",
      "char": "み",
      "romaji": "mi",
      "type": "seion",
      "description": "手の甲を相手に向け、人差し指・中指・薬指をそろえて横向きに伸ばします(漢数字「三」・カタカナ「ミ」と同じ形)。",
      "image": "assets/jsl/fingerspelling/mi.webp"
    },
    {
      "id": "mu",
      "char": "む",
      "romaji": "mu",
      "type": "seion",
      "description": "手の甲を相手に向け、親指と人差し指で「L」の形を作り、横向きにします(数字の「6」と同じ形)。残り3本は握ります。",
      "image": "assets/jsl/fingerspelling/mu.webp"
    },
    {
      "id": "me",
      "char": "め",
      "romaji": "me",
      "type": "seion",
      "description": "親指と人差し指の指先を軽くつけて小さな輪を作ります(「目」の形)。残り3本は握ります。手のひらを相手に向けます。",
      "image": "assets/jsl/fingerspelling/me.webp"
    },
    {
      "id": "mo",
      "char": "も",
      "romaji": "mo",
      "type": "seion",
      "description": "親指と人差し指以外を握り、親指と人差し指の指先をくっつけます(「同じ」を表す動き)。",
      "image": "assets/jsl/fingerspelling/mo.webp"
    },
    {
      "id": "ya",
      "char": "や",
      "romaji": "ya",
      "type": "seion",
      "description": "親指と小指を伸ばし、人差し指・中指・薬指の3本は握ります(Y字の形、アルファベット「y」の指文字と同じ)。",
      "image": "assets/jsl/fingerspelling/ya.webp"
    },
    {
      "id": "yu",
      "char": "ゆ",
      "romaji": "yu",
      "type": "seion",
      "description": "手のひらを自分側に向け、人差し指・中指・薬指を離して伸ばします。親指と小指は握ります(温泉マーク・湯気の形)。",
      "image": "assets/jsl/fingerspelling/yu.webp"
    },
    {
      "id": "yo",
      "char": "よ",
      "romaji": "yo",
      "type": "seion",
      "description": "手のひらを自分側に向け、親指を曲げ、残り4本の指をそろえて横向きに伸ばします(漢数字「四」と同じ形)。",
      "image": "assets/jsl/fingerspelling/yo.webp"
    },
    {
      "id": "ra",
      "char": "ら",
      "romaji": "ra",
      "type": "seion",
      "description": "人差し指と中指を伸ばしたあと、人差し指の背を中指の腹に当てるように絡めます(アルファベット「r」の指文字と同じ)。残り3本は握ります。",
      "image": "assets/jsl/fingerspelling/ra.webp"
    },
    {
      "id": "ri",
      "char": "り",
      "romaji": "ri",
      "type": "seion",
      "description": "人差し指・中指を伸ばし、空中にカタカナの「リ」を書くように手首をはねらせます。残り3本は握ります。",
      "image": "assets/jsl/fingerspelling/ri.webp"
    },
    {
      "id": "ru",
      "char": "る",
      "romaji": "ru",
      "type": "seion",
      "description": "親指・人差し指・中指を離して伸ばし、薬指・小指は握ります(カタカナ「ル」の形)。手のひらを相手に向けます。",
      "image": "assets/jsl/fingerspelling/ru.webp"
    },
    {
      "id": "re",
      "char": "れ",
      "romaji": "re",
      "type": "seion",
      "description": "親指と人差し指を伸ばしてカタカナ「レ」の形を作り、中指・薬指・小指は握ります。手のひらを相手に向けます。",
      "image": "assets/jsl/fingerspelling/re.webp"
    },
    {
      "id": "ro",
      "char": "ろ",
      "romaji": "ro",
      "type": "seion",
      "description": "親指を手前に構え、人差し指・中指以外を握り、伸ばした2本の指を第2関節で曲げます(カタカナ「ロ」の形)。",
      "image": "assets/jsl/fingerspelling/ro.webp"
    },
    {
      "id": "wa",
      "char": "わ",
      "romaji": "wa",
      "type": "seion",
      "description": "人差し指・中指・薬指を離して伸ばし、親指・小指は握ります(アルファベット「w」の指文字と同じ)。手のひらを相手に向けます。",
      "image": "assets/jsl/fingerspelling/wa.webp"
    },
    {
      "id": "wo",
      "char": "を",
      "romaji": "wo",
      "type": "seion",
      "description": "「お」と同じ丸い形を作ってから、その形のまま手を自分側に引きます。",
      "image": "assets/jsl/fingerspelling/wo.webp"
    },
    {
      "id": "n",
      "char": "ん",
      "romaji": "n",
      "type": "seion",
      "description": "人差し指だけを立て、空中にカタカナの「ン」を書くように小さく動かします。残り4本は握ります。",
      "image": "assets/jsl/fingerspelling/n.webp"
    },
    {
      "id": "ga",
      "char": "が",
      "romaji": "ga",
      "type": "dakuon",
      "baseId": "ka",
      "description": "人差し指と中指でチョキ(V)の形を作り、親指の腹を中指の第2関節に当てます。手のひらを相手に向けます(アルファベット「k」の指文字と同じ)。 清音「か」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/ga.webp"
    },
    {
      "id": "gi",
      "char": "ぎ",
      "romaji": "gi",
      "type": "dakuon",
      "baseId": "ki",
      "description": "親指・中指・薬指の指先をつけ、人差し指と小指をまっすぐ伸ばします。キツネの影絵のような形です。手のひらを相手に向けます。 清音「き」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/gi.webp"
    },
    {
      "id": "gu",
      "char": "ぐ",
      "romaji": "gu",
      "type": "dakuon",
      "baseId": "ku",
      "description": "手の甲を相手に向け、親指は上向きに立て、人差し指・中指・薬指・小指はそろえて横向きに伸ばします(数字の「9」と同じ形)。 清音「く」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/gu.webp"
    },
    {
      "id": "ge",
      "char": "げ",
      "romaji": "ge",
      "type": "dakuon",
      "baseId": "ke",
      "description": "親指を手のひらに折り込み、残り4本の指をそろえてまっすぐ伸ばします(敬礼する手の形、アルファベット「b」の指文字と同じ)。 清音「け」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/ge.webp"
    },
    {
      "id": "go",
      "char": "ご",
      "romaji": "go",
      "type": "dakuon",
      "baseId": "ko",
      "description": "親指以外の4本をそろえて根元から直角に曲げ、小指側の側面を相手に向けます(カタカナ「コ」の一画を表します)。 清音「こ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/go.webp"
    },
    {
      "id": "za",
      "char": "ざ",
      "romaji": "za",
      "type": "dakuon",
      "baseId": "sa",
      "description": "5本の指をすべて握り込んだ「グー」の形にします(親指は外側)。手のひらを相手に向けます(アルファベット「s」の指文字と同じ)。 清音「さ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/za.webp"
    },
    {
      "id": "ji",
      "char": "じ",
      "romaji": "ji",
      "type": "dakuon",
      "baseId": "shi",
      "description": "手の甲を相手に向け、親指を上向きに立て、人差し指・中指をそろえて横向きに伸ばします(数字の「7」と同じ形)。 清音「し」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/ji.webp"
    },
    {
      "id": "zu",
      "char": "ず",
      "romaji": "zu",
      "type": "dakuon",
      "baseId": "su",
      "description": "「し」の形を作ったあと、手首を支点に指先が下を向くまで倒します(カタカナ「ス」の形)。 清音「す」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/zu.webp"
    },
    {
      "id": "ze",
      "char": "ぜ",
      "romaji": "ze",
      "type": "dakuon",
      "baseId": "se",
      "description": "握った「グー」の形から中指だけをまっすぐ伸ばし、指の腹を相手に向けます(「背」がピンと伸びている様子)。 清音「せ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/ze.webp"
    },
    {
      "id": "zo",
      "char": "ぞ",
      "romaji": "zo",
      "type": "dakuon",
      "baseId": "so",
      "description": "人差し指だけを伸ばし、指先をやや斜め下に向けて「それ」を指し示します。残り4本は握ります。 清音「そ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/zo.webp"
    },
    {
      "id": "da",
      "char": "だ",
      "romaji": "da",
      "type": "dakuon",
      "baseId": "ta",
      "description": "親指だけを立て、指の腹を相手に向けます(「いいね」のサイン、アルファベット「t」の指文字と同じ)。残り4本は握ります。 清音「た」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/da.webp"
    },
    {
      "id": "dji",
      "char": "ぢ",
      "romaji": "dji",
      "type": "dakuon",
      "baseId": "chi",
      "description": "親指・人差し指・中指・薬指の指先をそろえてつけ、小指だけをまっすぐ立てます(漢数字「千」と同じ形)。 清音「ち」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/dji.webp"
    },
    {
      "id": "dzu",
      "char": "づ",
      "romaji": "dzu",
      "type": "dakuon",
      "baseId": "tsu",
      "description": "親指・人差し指・中指の指先を合わせ、薬指と小指をまっすぐ立てます(カタカナ「ツ」の形)。 清音「つ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/dzu.webp"
    },
    {
      "id": "de",
      "char": "で",
      "romaji": "de",
      "type": "dakuon",
      "baseId": "te",
      "description": "5本の指をそろえてまっすぐ伸ばし、手のひらをそのまま相手に見せます。 清音「て」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/de.webp"
    },
    {
      "id": "do",
      "char": "ど",
      "romaji": "do",
      "type": "dakuon",
      "baseId": "to",
      "description": "人差し指・中指をそろえて伸ばし、手の甲を相手に向けます(「う」と向きが逆、戸をたたく感じ)。 清音「と」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/do.webp"
    },
    {
      "id": "ba",
      "char": "ば",
      "romaji": "ba",
      "type": "dakuon",
      "baseId": "ha",
      "description": "人差し指・中指を伸ばして、やや斜め下に向けます(箸の形、アルファベット「h」の指文字と同じ)。残り3本は握ります。 清音「は」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/ba.webp"
    },
    {
      "id": "bi",
      "char": "び",
      "romaji": "bi",
      "type": "dakuon",
      "baseId": "hi",
      "description": "人差し指だけをまっすぐ伸ばし、残り4本は握ります。手のひらを相手に向けます(数字の「1」と同じ形)。 清音「ひ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/bi.webp"
    },
    {
      "id": "bu",
      "char": "ぶ",
      "romaji": "bu",
      "type": "dakuon",
      "baseId": "fu",
      "description": "親指・人差し指を伸ばしたあと、手首を曲げて人差し指の先が下を向くようにします(カタカナ「フ」の形)。残り3本は握ります。 清音「ふ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/bu.webp"
    },
    {
      "id": "be",
      "char": "べ",
      "romaji": "be",
      "type": "dakuon",
      "baseId": "he",
      "description": "こぶしを握り、親指と小指だけを下向きに伸ばします(カタカナ「ヘ」の形)。 清音「へ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/be.webp"
    },
    {
      "id": "bo",
      "char": "ぼ",
      "romaji": "bo",
      "type": "dakuon",
      "baseId": "ho",
      "description": "5本の指をそろえて軽く丸めるように伸ばし、手の甲を相手に向けます(帆が風を受けて膨らんでいる様子)。 清音「ほ」の指文字の形のまま、手を右へ水平に動かして濁音「゛」を表します。",
      "image": "assets/jsl/fingerspelling/bo.webp"
    },
    {
      "id": "pa",
      "char": "ぱ",
      "romaji": "pa",
      "type": "handakuon",
      "baseId": "ha",
      "description": "人差し指・中指を伸ばして、やや斜め下に向けます(箸の形、アルファベット「h」の指文字と同じ)。残り3本は握ります。 清音「は」の指文字の形のまま、手を上へ跳ね上げて半濁音「゜」を表します。",
      "image": "assets/jsl/fingerspelling/pa.webp"
    },
    {
      "id": "pi",
      "char": "ぴ",
      "romaji": "pi",
      "type": "handakuon",
      "baseId": "hi",
      "description": "人差し指だけをまっすぐ伸ばし、残り4本は握ります。手のひらを相手に向けます(数字の「1」と同じ形)。 清音「ひ」の指文字の形のまま、手を上へ跳ね上げて半濁音「゜」を表します。",
      "image": "assets/jsl/fingerspelling/pi.webp"
    },
    {
      "id": "pu",
      "char": "ぷ",
      "romaji": "pu",
      "type": "handakuon",
      "baseId": "fu",
      "description": "親指・人差し指を伸ばしたあと、手首を曲げて人差し指の先が下を向くようにします(カタカナ「フ」の形)。残り3本は握ります。 清音「ふ」の指文字の形のまま、手を上へ跳ね上げて半濁音「゜」を表します。",
      "image": "assets/jsl/fingerspelling/pu.webp"
    },
    {
      "id": "pe",
      "char": "ぺ",
      "romaji": "pe",
      "type": "handakuon",
      "baseId": "he",
      "description": "こぶしを握り、親指と小指だけを下向きに伸ばします(カタカナ「ヘ」の形)。 清音「へ」の指文字の形のまま、手を上へ跳ね上げて半濁音「゜」を表します。",
      "image": "assets/jsl/fingerspelling/pe.webp"
    },
    {
      "id": "po",
      "char": "ぽ",
      "romaji": "po",
      "type": "handakuon",
      "baseId": "ho",
      "description": "5本の指をそろえて軽く丸めるように伸ばし、手の甲を相手に向けます(帆が風を受けて膨らんでいる様子)。 清音「ほ」の指文字の形のまま、手を上へ跳ね上げて半濁音「゜」を表します。",
      "image": "assets/jsl/fingerspelling/po.webp"
    },
    {
      "id": "xya",
      "char": "ゃ",
      "romaji": "xya",
      "type": "youon",
      "baseId": "ya",
      "description": "親指と小指を伸ばし、人差し指・中指・薬指の3本は握ります(Y字の形、アルファベット「y」の指文字と同じ)。 基本の指文字「や」の形のまま、手首を支点に手前(自分側)へ引いて小さい「ゃ」を表します。",
      "image": "assets/jsl/fingerspelling/xya.webp"
    },
    {
      "id": "xyu",
      "char": "ゅ",
      "romaji": "xyu",
      "type": "youon",
      "baseId": "yu",
      "description": "手のひらを自分側に向け、人差し指・中指・薬指を離して伸ばします。親指と小指は握ります(温泉マーク・湯気の形)。 基本の指文字「ゆ」の形のまま、手首を支点に手前(自分側)へ引いて小さい「ゅ」を表します。",
      "image": "assets/jsl/fingerspelling/xyu.webp"
    },
    {
      "id": "xyo",
      "char": "ょ",
      "romaji": "xyo",
      "type": "youon",
      "baseId": "yo",
      "description": "手のひらを自分側に向け、親指を曲げ、残り4本の指をそろえて横向きに伸ばします(漢数字「四」と同じ形)。 基本の指文字「よ」の形のまま、手首を支点に手前(自分側)へ引いて小さい「ょ」を表します。",
      "image": "assets/jsl/fingerspelling/xyo.webp"
    },
    {
      "id": "xtsu",
      "char": "っ",
      "romaji": "xtsu",
      "type": "sokuon",
      "baseId": "tsu",
      "description": "親指・人差し指・中指の指先を合わせ、薬指と小指をまっすぐ立てます(カタカナ「ツ」の形)。 基本の指文字「つ」の形のまま、手首を支点に手前(自分側)へ引いて小さい「っ」を表します。",
      "image": "assets/jsl/fingerspelling/xtsu.webp"
    },
    {
      "id": "chouon",
      "char": "ー",
      "romaji": "-",
      "type": "chouon",
      "description": "長音「ー」には単独の指文字の形はありません。人差し指を立てて縦に「ー」の線を上から下へ書くように動かして、音を伸ばすことを表します。",
      "image": "assets/jsl/fingerspelling/chouon.webp"
    }
  ]
}
};
