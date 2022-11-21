const articlesNews = [
    {
        /**
         * please type ONLY numbers here, instead of abbreviations(Mar. 4th, etc)
         * numbers are required for the code to sort out all news in descending date order
         * that being said, you can actually list the news in random order for your convenience
         * it will later be converted into month abbriviations in the code
         */
        date: {year: 2021, month: 4, day: 11}, 
        title: {
            en: "Final Video of World Wide Tour Guide has been Released.", 
            /**
             * add ' \' (space+\) at the end of a string , 
             * if it's is too long that a new line is needed (see the jp: bellow as ref) 
             * please note that the ' \' is only for code review, 
             * the strings will still be in a single line on the actual site
             * be sure to enclose the entire string by "". 
             */
            jp: "ワールドワイドツアーガイドの \
                動画が公開されました。"
        }, 
        graphic: {
            /**
             * only 2 tyes are available, either "youtube" or "picture"
             */
            type: "youtube", 
            /**if declaring "youtube", paste the link to path: 
             * if declaring "picture", 
             * place the picture under the folder "public/fig/news" 
             * and paste the filename of the picture here 
             */
            path: "https://youtu.be/LLuqBMnfKJY"
        }, 
        external: {
            link: "/#/previous-works/proj1", 
            text: {
                en: "View Project 1", 
                jp: "最初のプロジェクトを見る"
            }
        }, 
        passage: [
            /**
             * in passage scope, arbitrary number (at least 1) of lines can be inserted
             * beware that each of the lines have to be enclosed by {}
             * and has to include both en: and jp:, or at least placeholding texts
             */
            {
                /**
                 * this is the scope of a single line
                 * same format as described in title scope(line 13 of the entire sheet)
                 */
                en: "The project is finally finished, \
                    please check the final product", 
                jp: "企画は成し遂げました。成果をどうぞご覧ください。"
            }, // <------ each of the lines has to be seperated by a comma
            {
                en: "We deeply appreciate all participants! See you next project!!", 
                jp: "参加者の皆様に感謝申し上げます。また次の企画に会いましょう！"
            }  // <------ except for the last line, a comma is not needed
        ]
    }, // <------ seperate news with commas liek this. similarly, no comma for the last news

    {
        date: {year: 2021, month: 6, day: 12}, 
        title: {
            en: "Grand Birthday Chorus has been Initiated!", 
            jp: "グランドバースデーコーラス、始動！"
        }, 
        graphic: {
            type: "youtube", 
            path: "https://youtu.be/Y0Pz0AQ6mOQ"
        }, 
        external: {
            link: "/#/previous-works/proj2", 
            text: {
                en: "View Project 2", 
                jp: "セカンドプロジェクトを見る"
            }
        }, 
        passage: [
            {
                en: "Note: the project has been completed, \
                    please visit Previous Works page to see the final production!", 
                jp: "備考：企画は仕上がりました。 \
                    Previous Worksに完成した作品が見られます！", 
                style:{fontWeight:"bold"}
            }, 
            {
                en: "We are team WWS Haato, \
                    focusing on Haato projects gathering fans all over the world!", 
                jp: "私達はWWSはあとチームです！世界中のファンを集めて、\
                    赤井はあと関連のファンプロジェクトを中心にして活動しております。"
            }, 
            {
                en: "We are going to make a Music Video (MV) with an original birthday song, \
                    so participants can join us in two different ways, \
                    providing singing voice files and MV materials.", 
                jp: "私達は今、誕生日のオリジナル曲とMV作ることになりました。\
                    企画を参加したい人は二通りあります：歌声の投稿、もしくはMV製作の素材で応募できます。"
            },
            {
                en: "You can participate in both parts of the project! Please check the following link to see details", 
                jp: "もちろん、両方とも企画に参加するのも大歓迎です！"
            }
        ]
    }, 
    {
        date: {year: 2021, month: 6, day: 23}, 
        title: {
            en: "Song Preview for Grand Birthday Chorus has been Released!", 
            jp: "グランドバースデーコーラスのプレビューを公開しました！"
        }, 
        graphic: {
            type: "youtube", 
            path: "https://youtu.be/EzELsQyLP2s"
        }, 
        external: {
            link: "/#/previous-works/proj2", 
            text: {
                en: "View Project 2", 
                jp: "セカンドプロジェクトを見る"
            }
        }, 
        passage: [
            {
                en: "The project is finally finished, \
                    please check the final video, hope you enjoy!", 
                jp: "備考：企画はやっと成功しました。 \
                    完成した動画を、どうぞ楽しんでください。", 
            }
        ]
    }, 
    {
        date: {year: 2021, month: 8, day: 10}, 
        title: {
            en: "Final video release of Haato's Birthday Parade ❤! ", 
            jp: "はあとのバースデーパレード ❤　動画リリース！"
        }, 
        graphic: {
            type: "youtube", 
            path: "https://youtu.be/aHt-fGy5BYQ"
        }, 
        external: {
            link: "/#/previous-works/proj2", 
            text: {
                en: "View Project 2", 
                jp: "セカンドプロジェクトを見る"
            }
        }, 
        passage: [
            {
                en: "The project is finally finished, \
                    please check the final video, hope you enjoy!", 
                jp: "企画は無事に完遂させました。 \
                    リリースした動画を、どうぞ楽しんでください！", 
            }
        ]
    }, 
    {
        date: {year: 2022, month: 4, day: 10}, 
        title: {
            en: "\"Haato's Diary\" New project initiated!", 
            jp: "「はあと様の日記」新企画が始まりました！"
        }, 
        graphic: {
            type: "picture", 
            path: "fig/current_event/haachama_vn_thumb.jpg"
        }, 
        external: {
            link: "/#/current-event", 
            text: {
                en: "Join us!", 
                jp: "参加する！"
            }
        }, 
        passage: [
            {
                en: "We're happy to announce the new project begins, \
                    please check Current Event for more information!", 
                jp: "遂に新企画が立ち上げることを皆様にお知らせします！ \
                    Current Event（進行中イベント）でもご確認ください！", 
            }
        ]
    }
    
]


export default articlesNews;
