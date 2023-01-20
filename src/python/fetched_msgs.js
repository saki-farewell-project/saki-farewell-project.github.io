const FETCHED_MSGS = [
    {
        stamp: "21/11/2022 12:18:27",
        is_jp: 0,
        name: "Seira Astramor",
        quote: "blazing flame",
        jp: "",
        en: "Whenever I listen to your music, I always feel motivated to finish my work no matter how difficult it is. Thank you for your powerful voice, Saki. I look forward to your future endeavors!"
    },
    {
        stamp: "21/11/2022 13:32:40",
        is_jp: 0,
        name: "Shun",
        quote: "Riot gateway",
        jp: "",
        en: "Thanks for blessing me with ear candy and entertainment "
    },
    {
        stamp: "21/11/2022 22:17:25",
        is_jp: 0,
        name: "XenSun",
        quote: "Shooting star ",
        imgs: [
            "fig/fanarts/9C1AABDE-EDF4-4966-A1D8-4C77788046DC - Sun Star.jpeg",
            "fig/fanarts/FED43469-47AD-42CA-9478-9C811BCFD6D6 - Sun Star.jpeg"
        ],
        cred: "https://www.pixiv.net/en/users/58654250",
        jp: "",
        en: ""
    },
    {
        stamp: "22/11/2022 00:34:46",
        is_jp: 0,
        name: "Anagram",
        quote: "favourite singer",
        jp: "",
        en: "Thank you for reigniting my love for Japanese songs and introducing many new ones. Your unique and deep vocals covering many of the anime songs such as Gundam from my childhood was very nostalgic. "
    },
    {
        stamp: "22/11/2022 00:45:50",
        is_jp: 0,
        name: "Justaviet",
        quote: "Hero",
        jp: "",
        en: "Thank you Saki for you powerfull voice that helped me through tough times !! <3"
    },
    {
        stamp: "22/11/2022 00:51:20",
        is_jp: 1,
        name: "チータちゃん",
        quote: "原動力",
        jp: "私の原動力になってくれてありがとうございました！",
        en: ""
    },
    {
        stamp: "23/11/2022 04:23:13",
        is_jp: 0,
        name: "HenacanPodwell",
        quote: "「　」",
        jp: "",
        en: "Saki, you have undoubtedly became an important, irreplaceable piece of puzzle in my life. I could not think of a word to describe what you are to me, to me you are just Saki, the Saki that I love and admire. You are my motivation, my support and will always be someone I look up to, and think about. I decided on what to do in my life after watching, and listening to you, I got my courage from this little girl who strive to become someone so special, someone so strong and someone so dazzling. Thank you for everything, everything that you have done, thank you for you being Saki, thank you for becoming my「　」. I will keep moving on, I will keep going and I would not stop here, I will see you again."
    },
    {
        stamp: "23/11/2022 17:56:00",
        is_jp: 0,
        name: "L C",
        quote: "Fire",
        jp: "",
        en: "Thank you for your hard work for the past 2 years! I have been following you since your Birthday Live in 2020, and it is you who introduced me to other v-singers and the whole RIOT. Farewell, my first Oshi. I will always listen to your Bloom Lonely and Senkou Hibana. I really hope that one day I will be able to see you again."
    },
    {
        stamp: "24/11/2022 00:02:44",
        is_jp: 0,
        name: "Leo",
        quote: "∞",
        jp: "",
        en: "Saki, you are young, talented, and ambitious. There's nothing you can't overcome. No matter what happens in the future, we will continue to support your singing activities. Thank you for your regular singing streams in recent months. Although I wasn't quite interactive on YouTube or Twitter, I really enjoyed the time. Until now, I'm still not accustomed to your absence at 20:00. Guess I can never get used to it. However, I will never feel lonely having your ever-lasting spirit with me. You had always been straightforward and passionate, the same Saki since day one. And I'm sure you will always be. Take care and good luck!"
    },
    {
        stamp: "26/11/2022 15:22:23",
        is_jp: 0,
        name: "Del",
        quote: "My Future",
        jp: "",
        en: "I've said that a long time ago. I will always stand by you."
    },
    {
        stamp: "26/11/2022 15:23:45",
        is_jp: 1,
        name: "Del",
        quote: "私の将来",
        jp: "私はずっと前にそれを言った。 私はいつもあなたのそばにいます。",
        en: ""
    },
    {
        stamp: "27/11/2022 16:14:39",
        is_jp: 0,
        name: "Yinyun",
        quote: "fiery role model",
        imgs: [
            "fig/fanarts/saki thank you - Yin Yun.png"
        ],
        cred: "",
        jp: "",
        en: ""
    },
    {
        stamp: "01/12/2022 22:24:08",
        is_jp: 0,
        name: "Ryukato",
        quote: "Only existences in Life",
        jp: "",
        en: "Forever Love and Support Ashizawa Saki, always love her cool and beautiful singing voice, she the reason that i still alive and live, her singing voice always gives me a reason to live"
    },
    {
        stamp: "02/12/2022 01:50:20",
        is_jp: 0,
        name: "Zhangw",
        quote: "Idol and hope",
        jp: "",
        en: "I will miss you and so if one day i jope we will me again.The moon is so beautiful right!? Saki!"
    },
    {
        stamp: "03/12/2022 09:41:10",
        is_jp: 0,
        name: "ET",
        quote: "Eternal Blaze",
        imgs: [
            "fig/fanarts/Saki's Fan Art GoodBye S - ET.jpg"
        ],
        cred: "ET",
        jp: "",
        en: ""
    },
    {
        stamp: "03/12/2022 09:47:50",
        is_jp: 0,
        name: "ET",
        quote: "Eternal Blaze",
        jp: "",
        en: "Saki is like a Flame that will forever be remembered in my heart. A present that has been there for as long as I could remember, always warming me up with her amazing voice and cute personality. Though she might be gone, her flames will never go out, even if there's only embers left. She is my main source of motivation, and her covers and songs drive me forward through hard times and push me to be a better version of myself. Thank you very much for all your hard work and we shall meet again in the future."
    },
    {
        stamp: "29/12/2022 14:35:35",
        is_jp: 0,
        name: "Aryadi Subagio",
        quote: "Idol",
        jp: "RIOT MUSICがあなたとココアだけだった頃からあなたのことをずっと見ていて、あなたの歌が本当に好きです. あなたは強い感情と力強い声を持っている, 稀有な歌手です. いつも楽しい思い出をありがとう",
        en: "It's sad to see you go. I've been watching you since RIOT music was just you and Cocoa, and I really love your singing. You have a strong emotion and powerful voice, you are a rare singer. Thanks for all the fun memories. I wish you luck in your future singing career"
    },
    {
        stamp: "31/12/2022 02:26:43",
        is_jp: 0,
        name: "BlackAce",
        quote: "Favorite Singer of all time",
        jp: "",
        en: "Thank you Saki for blessing us with your music. I remember the first time I listened to you was when you released your cover of Joint and really loved your voice ever since. My favorite cover of yours is Hikarie it's definitely a song I listened to at least 1000 times since released. I really hope you continue doing music, it will be a bit sad that we won't know you as Saki anymore but I'll continue to listen to you forever by whoever you go by in the future. Thank you again Saki and I hope we get to hear your voice again soon."
    },
    {
        stamp: "31/12/2022 02:38:30",
        is_jp: 0,
        name: "Almo",
        quote: "Inspiration in life ",
        jp: "",
        en: "Saki! Thank you for the amazing covers and the awesome music and sound. I new the meaning of vsingers through you and I instantly became fully inspired by your talent and voice. I truly loved your music and everything you do. I really wish I knew how to speak Japanese to capture everything as it is. Please don't prevent us from hearing more of your talent. Much much love! "
    },
    {
        stamp: "01/01/2023 07:29:43",
        is_jp: 0,
        name: "Jackie",
        quote: "friend, my companion in tough times",
        jp: "",
        en: "She was the best singer in the group. I loved the way her covers stoked a fire in me, made me feel like I could take on the whole world. I'm sure she's somewhere out in the world, waiting to say hi. GO SAKI GO. \n\nねぇ あんたわかっちゃいない!!\n"
    },
    {
        stamp: "05/01/2023 16:09:18",
        is_jp: 0,
        name: "Kuhakukage",
        quote: "my first memory of vsinger and vtuber, one that I will always cherish",
        jp: "",
        en: "Saki, you are my first contact to this Virtual world in 2020, in the video of (命に嫌われている。 (Hated by Life Itself.) - カンザキイオリ // covered by 芦澤 サキ). I discover you in when I was more lost than I ever was, unable to understand my position, future in this world. Your music gave me motivation to go on and I am eternally grateful. I only wish for the best of your future endeavor! Good luck! I swear to forever remember you!!!"
    },
    {
        stamp: "10/01/2023 04:10:25",
        is_jp: 1,
        name: "門倉空",
        quote: "こころの支え",
        imgs: [
            "fig/fanarts/ありがとう - 門倉空.jpg"
        ],
        cred: "Illust: @Az_Undefined",
        jp: "",
        en: ""
    },
    {
        stamp: "19/01/2023 23:39:29",
        is_jp: 0,
        name: "Fangzgzz",
        quote: "Fiery Star",
        jp: "今までありがとうサキちゃん!　好きです。これからも続けて応援します。じゃ、またなぁぁぁ!!!",
        en: "Thank you Saki for all this time! I love you and I'll keep supporting you. Until next time!"
    },
    {
        stamp: "20/01/2023 02:03:35",
        is_jp: 0,
        name: "Piton koder",
        quote: "First Riot girl",
        jp: "",
        en: "First your cover i saw was \"hated by life itself\" and it is the best thing i've heard in my life. Your singing and streaming helped me in difficult time and i will keep memory of it for the rest of my life. I am happy that i had found you and want to say thank you. I wish you luck in your life and i will continue to support you if i'll get the chance. "
    }
]
export default FETCHED_MSGS;