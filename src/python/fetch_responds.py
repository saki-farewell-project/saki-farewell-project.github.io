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
    "企画へのアドバイスはありますか？", # dummy field, not used 
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
    js_file = open("src/python/text_subs.js", "w")
    js_file.write("const fetchedMsgs = ")
    for is_jp, datas in enumerate(resps): 
        datas = [datas[cols] for cols in datas]
        for df_en_msg, df_jp_msg, df_urls, df_cred, df_name, df_quote in zip(*datas):
            out_dict = {"is_jp": is_jp, "name": df_name, "quote": df_quote}
            df_urls = [url for url in str(df_urls).split(", ") if url.startswith("http")]
            if df_urls:
                out_dict["imgs"] = []
                out_dict["cred"] = df_cred
                for url in df_urls: 
                    os.system("gdown %s" % url.replace("open", "uc"))
                    new_files = [f for f in listdir() if isfile(f)]
                    out_dict["imgs"] += [f for f in new_files if f not in old_files]
                    old_files = new_files

                assert len(out_dict["imgs"]) == len(df_urls)
                for i, img in enumerate(out_dict["imgs"]): 
                    out_dict["imgs"][i] = os.path.join(folder, os.path.basename(img))
                    shutil.move(img, out_dict["imgs"][i])
                    out_dict["imgs"][i].replace("public/", "")

            out_dict["jp"] = df_jp_msg
            if not is_jp:
                out_dict["en"] = df_en_msg

            msgs.append(out_dict)


    with open("src/python/text_subs.js", "w") as js_file:
        js_file.write("const fetchedMsgs = ")
        dumps = json.dumps(msgs, indent=4, ensure_ascii=False)
        dumps = dumps.replace("NaN", "\"\"", len(msgs))
        for out_dict in msgs:
            for tag in out_dict:
                dumps = dumps.replace("\"%s\"" % tag, tag)
            
        js_file.write(dumps)
        js_file.write("\nexport default fetchedMsgs;")
       