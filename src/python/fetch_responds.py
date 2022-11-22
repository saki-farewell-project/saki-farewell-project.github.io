#!/usr/bin/env python3
import pandas as pd
import json
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import os
import shutil
from os import listdir
from os.path import isfile


JP_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTd0fr7ChGEmaSu7PJPdDhJgdXsqtk3fWxYUgBcOetkiEMAIYPJsnlv2e_fdo1O1Wqkb8fQEV6z08T/pub?output=csv" 
EN_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXPmMUWDql_Y1_fk5WbV4LUAN2i-vTJ4zqBYhBV6u4wBlasZrojCNO6iFOxC1xc8uR3SgLRhiZAgFc/pub?output=csv"

EN_COLS = [
    "Type your message to Saki here (English)", 
    "Type your message to Saki here (Japanese)", 
    "Upload your image(s) here", "Fanart credit to? ",
    "Your nickname", "Saki has become my \" \""
]

JP_COLS = [
    "サキへのメッセージを入力してください", 
    "サキへのメッセージを入力してください", 
    "ここに画像をアップロードしてください", "ファンアートの作者は？", 
    "ニックネーム", "サキは私の「 」になりました"
]


class MsgCard:
    def __init__(self, is_jp, name, msg_en, msg_jp):
        self.name = name
        self.msg_en = msg_en
        self.msg_en = msg_jp


if __name__ == "__main__": 
    print("fetching msgs...")
    resps = zip([EN_CSV, JP_CSV], [EN_COLS, JP_COLS])
    resps = [pd.read_csv(csv).filter(items=cols) for csv, cols in resps]

    print("exporting...")
    msgs = []
    folder = "public/fig/fanarts"
    old_files = [f for f in listdir() if isfile(f)]
    for is_jp, datas in enumerate(resps): 
        datas = [datas[cols] for cols in datas]
        for df_en_msg, df_jp_msg, df_urls, df_cred, df_name, df_quote in zip(*datas):
            df_urls = [url for url in str(df_urls).split(", ") if url.startswith("http")]
            is_txt = not df_urls
            if not is_txt:
                imgs = []
                for url in df_urls: 
                    os.system("gdown %s" % url.replace("open", "uc"))
                    new_files = [f for f in listdir() if isfile(f)]
                    imgs += [f for f in new_files if f not in old_files]
                    old_files = new_files

                for i, img in enumerate(imgs): 
                    imgs[i] = os.path.join(folder, os.path.basename(img))
                    shutil.move(img, imgs[i])

        
    '''
    for en, jp, name, genre, ans in zip(*datas):
        if genre == "Text":
            if name not in name_ids:
                name_ids[name] = -1

            name_ids[name] += 1
            rev_name = name.replace(" ", "-", 1000)
            fn = os.path.join(folder, "%s_%i.jpg" % (rev_name, name_ids[name]))
            msgs.append(
                {
                    "name": name, "ans": ans, 
                    "en": en , "jp": jp, 
                    "img_path": fn.replace("public/", "")
                }
            )
            fire = Image.open('src/python/fire.jpg')
            # Call draw Method to add 2D graphics in an image
            I1 = ImageDraw.Draw(fire)
            
            # Custom font style and font size
            myFont = ImageFont.truetype('Ubuntu-B.ttf', 45)
            I1.text((25, 25), "You Have Become my", font=myFont, fill =(255, 255, 255))

            myFont = ImageFont.truetype('Ubuntu-B.ttf', 25)
            I1.text((250+len(name), 280), " -- from %s" % name, font=myFont, fill =(255, 255, 255))

            myFont = ImageFont.truetype('Ubuntu-BI.ttf', 60)
            I1.text((75, 100), "\"%s\"" % ans, font=myFont, fill =(255, 255, 255), align="center")
            fire.save(fn)


    with open("src/python/text_subs.js", "w") as outfile:
        outfile.write("const fetchedMsgs = ")
        dumps = json.dumps(msgs, indent=4)
        dumps = dumps.replace("NaN", "\"\"", len(msgs))
        for tag in ["name", "en", "jp", "ans", "img_path"]:
            dumps = dumps.replace("\"%s\"" % tag, tag, len(msgs))

        outfile.write(dumps)
        outfile.write("\nexport default fetchedMsgs;")
    '''
    
    