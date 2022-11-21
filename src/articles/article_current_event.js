const articlesCurrentEvent = [
    {
        className: "project-top-banner", 
        suptitle: {
            en: "WWS Haato Project 3", 
            jp: "WWS Haato サードプロジェクト、始動"
        }, 
        title: {
            en: "Haato's Diary", 
            jp: "はあと様の日記"
            /*Spoilers replaced*/
        }, 
        passage: [
            {
                title: {
                    en: "Haachama Birthday Project 2022", 
                    jp: "はあちゃま誕生日プロジェクト 2022"
                },
                lines: [
                    {
                        en: "Visual Novel", 
                        jp: "ビジュアルノベルゲーム"
                    },
                    {
                        en: "Recruiting participants", 
                        jp: "参加者募集中"
                    },
                    {
                        en: "Join us for her best brithday gift!", 
                        jp: "一緒に最高の誕生日プレゼントを作りましょう！"
                    }
                ]
            }
        ]
        
    }, 
    {
        className: "project-details", 
        suptitle: {
            en: "Description", 
            jp: "はじめに"
        }, 
        contents: [
            [
                {
                    title: {
                        en: "Overview", 
                        jp: "はじめに"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "vn",
                    passage: {
                        lines: [
                            {
                                en: "As Haachama is strong enough to face the difficulties in \
                                    the future, we would like to present a visual novel for our strongest \
                                    idol Haachama as a birthday gift in 2022!", 
                                jp: "活動しています。今年のはあちゃまはより強くなっていて、\
                                    これからどんな困難でも乗り越えられると思っています。\
                                    そんな風に最強アイドルに相応しい、\
                                    ビジュアルノベル＝ノベルゲーム）を2022年の誕生日プレゼントとして贈りたいと思います。"
                                    
                            },
                           
                            {
                                en: "We're looking for participants to complete \
                                    the project together! Your contribution is always welcome!", 
                                jp: "現在、多くの分野から参加者を募集しています。\
                                    物語を充実させるライター、ゲーム根幹のプログラミング、\
                                    絵師、音楽制作の人とβテスターなどを探しています！ 先輩達の協力を、心よりお待ちしております。"
                            }
                        ]
                    }
                }, 
                {
                    title: {
                        en: "About the game", 
                        jp: "ゲーム概要"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    // graphicID>0: requesting graphic
                    graphicID: "secret-note", 
                    graphicPassage: [
                        {
                            en: " Want to know the secret of an idol’s daily life? ", 
                            jp: " アイドル極秘の日常生活を知りたいですか？"
                        }, 
                        {
                            en: " You’re invited to Haachama world!", 
                            jp: " はあちゃまワールドからの招待状が、君の夢を叶えてみせる"
                        }, 
                        {
                            en: ">>> Become HAACHAMA NOW <<<  ", 
                            jp: ">>> 今すぐはあちゃまになります　<<<", 
                            style: {fontWeight: "bold"}
                        }
                    ], 
                    passage: {
                        lines: [
                            {
                                en: "Your curiosity forced you to touch the mysteries of Haachama's world, \
                                    and the story begins...  ", 
                                jp: "好奇心に駆られて、キミははあちゃまワールドのミステリーに触れて、\
                                    物語はここから始まりましたー　"
                            }, 
                            {
                                en: " What will you do when you're Haachama? ", 
                                jp: "キミがはあちゃまだったら、どうします？", 
                                style: {fontWeight: "bold"}
                            }, 
                            {
                                en: "Can you overcome the challenges and troubles, making your \
                                    2022 birthday live successful and enjoying your life as well? ",  
                                jp: "キミに襲ってくる難関を乗り越えて、波乱万丈の生活を楽しみながら、 \
                                    2022の誕生日ライブは果たして無事に成功できるのか？"
                            }, 
                            {
                                en: "Now it's time to CHANGE the world! ", 
                                jp: "世界を変える鍵は、キミの手にあります。"
                            }
                        ]
                    }
                }
            ], 
            [
                {
                    title: {
                        en: "Participation", 
                        jp: "企画の参加"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "discord",
                    passage: {
                        lines: [
                            {
                                en: "We are looking for writers, programmers, \
                                    and artists! \
                                    If you have interests, please checkout following sections! ", 
                                jp: "ライター、プログラマーとアーティスト募集しています！ \
                                    興味のある方、次の説明分でも是非ご覧ください！"
                            },
                            {
                                en: "Please note that it is required for all participants to join our Discord server", 
                                jp: "参加者はDiscordサーバーに加入してください。", 
                                style: {fontWeight: "bold"}
                            }
                        ]
                    }
                }, 
            ]
        ]
    },
    {
        className: "project-details", 
        suptitle: {
            en: "Programming", 
            jp: "プログラミング・ゲーム開発"
        }, 
        contents: [
            [
                {
                    title: {
                        en: "Programmers", 
                        jp: "プログラマー"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "programmer",
                    passage: {
                        lines: [
                            {
                                en: "We’re planning to produce this game with Python, probably building with Ren'Py", 
                                jp: "この企画において、Pythonで開発（特にRen'Pyを用いて）する予定になっております。"
                            },
                            {
                                en: "Also, we’ll set the project on Github, using Git for version control. \
                                    Programmers need to check the documents frequently to keep up-to-date.",
                                jp: "また、企画のソースコードをGithubに設置して（リポジトリとして）、 \
                                    Gitというバージョン管理システムを利用する予定です。 \
                                    最新情報を常時に受け取るには、開発関連のドキュメントを頻繁に確認することをおすすめします。"

                            }, 
                            {
                                en: "Providing suggestions on code, frameworks, and game systems is also highly appreciated.", 
                                jp: "ソースコード、フレームワーク、ゲームシステムに対するアドバイス、意見などの提供もお待ちしております。"
                            }
                        ]
                    }
                }
            ]
        ]
    },
    {
        className: "project-details", 
        suptitle: {
            en: "Writers", 
            jp: "ライター・作者"
        }, 
        contents: [
            [
                {
                    title: {
                        en: "Screen Writers", 
                        jp: "脚本家(シナリオライター)"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "screen-writer",
                    passage: {
                        lines: [
                            {
                                en: "Screenwriters need to provide ideas and create new scenarios, \
                                writing outlines for writers. ", 
                                jp: "新しいシナリオを考えて、アイディア、シナリオ概要をライターに提供する役割です。"
                            },
                            {
                                en: "This part of work will need to take more effort than \
                                others in the early phase of our project.",
                                jp: "この企画に、あなたは初期段階の間に、他の参加者より早く仕事に努める必要があります。", 
                                style: {fontWeight: "bold"}

                            }
                        ]
                    }
                }, 
                {
                    title: {
                        en: "Writers", 
                        jp: "作者(ライター)"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "writer",
                    passage: {
                        lines: [
                            {
                                en: "Writers need to complete the text for the scenarios, \
                                making them interesting and reasonable", 
                                jp: "コンテンツを充実させて、合理性と面白さを兼ねて台本、シナリオを完成させる人。"
                            }
                        ]
                    }
                }
            ], 
            [
                {
                    title: {
                        en: "Editors", 
                        jp: "編集者(エディター)"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "editor",
                    passage: {
                        lines: [
                            {
                                en: "Editors will need to find out any typos, \
                                conflicting content and correct the grammar before handing texts to translators.", 
                                jp: "早期もしくは通訳者に交代するまでに、誤字の発見や、シナリオが合理的に構成されるかどうか、 \
                                キャラ設定が間違っていないかを確認する役割です。"
                            }
                        ]
                    }
                }, 
                {
                    title: {
                        en: "Translators", 
                        jp: "通訳者"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    // graphicID>0: requesting graphic
                    graphicID: "translator", 
                    passage: {
                        lines: [
                            {
                                en: "Translators are expected to translate information between JP <-> EN members \
                                at any time if the other groups need translation, and finished scripts (texts) to other languages. ", 
                                jp: "ゲーム内の台本（テキスト）通訳と、チーム内で違う言語を使う人にコミュニケーションの橋を架ける人。 \
                                    英語 ←→ 日本語の通訳がメインです。他の言語に通訳できる人も歓迎します。"
                            }, 
                            {
                                en: " You’ll have a lot of loads even later than editors.", 
                                jp: " エディターに続いて、作業量が多いと予想されています", 
                                style: {fontWeight: "bold"}
                            }
                        ]
                    }
                }
            ]
        ]
    },
    {
        className: "project-details", 
        suptitle: {
            en: "Artists", 
            jp: "アーティスト"
        }, 
        contents: [
            [
                {
                    title: {
                        en: "Illustrators", 
                        jp: "イラストレーター(絵師)"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "illustrator",
                    passage: {
                        lines: [
                            {
                                en: "We’ll mainly collect character CG under certain rules to ensure the \
                                art styles are kept in the same way. ",
                                jp: "今回はキャラクターCG（立ち絵）を募集のメインにする上に、 \
                                絵柄が出来るだけスタイルが一致することを目指します。"
                            }, 
                            {
                                en: "Some full illustrations with a certain theme are welcome as well, \
                                please check the storyboard updates.",
                                jp: "特定のテーマとしたイラストの投稿も大歓迎です。アイディアの参考として \
                                ライター班担当の字コンテ（物語一覧表）でもチェックしてみてください。"
                            }
                        ]
                    }
                }, 
                {
                    title: {
                        en: "Musicians", 
                        jp: "ミュージシャン(音楽制作)"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "musician",
                    passage: {
                        lines: [
                            {
                                en: "We are planning to use free BGM mainly but any submission of BGM is appreciated. ",
                                jp: "無料で商用利用可能のBGMを使う予定ですが、音楽制作の方のBGM投稿も、喜んでお待ちしております"
                            }, 
                            {
                                en: "In addition to BGMs, \
                                    we also would like to make an opening theme song for this game. ", 
                                jp: "BGMだけでなく、このゲームのオープニングに対してオープニング曲が必要です。 \
                                この企画に、オリジナルのオープニング曲を作りたいと思っています。"
                            }, 
                            {
                                en: "It would be great if we can make an ending song.", 
                                jp: "エンディングテーマを作る余裕があれば、こちらも制作を試してみます。"
                            }
                        ]
                    }
                }
            ], 
            [
                {
                    title: {
                        en: "Animators", 
                        jp: "アニメーター(動画班)"
                    },
                    // graphicID=0 or simply omit: no graphic request for this cell
                    graphicID: "animator",
                    passage: {
                        lines: [
                            {
                                en: "For those visual novels, \
                                we can use CGs in the game to make simple animations \
                                if we have less power on this part. ", 
                                jp: "ビジュアルノベルのオープニング動画を作るには、 \
                                制作に人手不足の場合は、ゲーム内に使われているCGを利用して、 \
                                シンプルにエフェクトをつける形式で、作業量の軽減に繋がることができます。"
                            }, 
                            {
                                en: "Submission of a short 3D scene matching the song is welcome \
                                if that doesn’t gonna kill you.", 
                                jp: "もし余裕があれば、テーマに合ってる3Dアニメーションを寄稿することも歓迎します。 \
                                無理はしないでください。"
                            }
                        ]
                    }
                }
            ]
        ]
    }
];


export default articlesCurrentEvent;