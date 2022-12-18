#!/usr/bin/env python3
import pandas as pd
import json
import os
import shutil
from os import listdir
from os.path import isfile
from datetime import datetime
import pytz


JP_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTd0fr7ChGEmaSu7PJPdDhJgdXsqtk3fWxYUgBcOetkiEMAIYPJsnlv2e_fdo1O1Wqkb8fQEV6z08T/pub?output=csv" 
EN_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXV-67qyDzHbtYYopleeThlSahG8fIifW-pnpiPAfqrrmwmSWRDKXOYPeZ_h-nhBSWSEZZC5P-H7NE/pub?output=csv"

EN_COLS = [
    "Type your message to Saki here (English)", 
    "Type your message to Saki here (Japanese)", 
    "Upload your image(s) here", "Fanart credit to? (optional)",
    "Your nickname", "Saki has become my \" \""
]

JP_COLS = [
    "企画へのアドバイスはありますか？", # dummy field, not used 
    "サキへのメッセージを入力してください", 
    "ここに画像をアップロードしてください", "ファンアートの作者は？", 
    "ニックネーム", "サキは私の「 」になりました"
]



if __name__ == "__main__": 
    print("fetching msgs...")
    jst = datetime.now(pytz.timezone('Asia/Tokyo'))
    resps = zip([EN_CSV, JP_CSV], [EN_COLS, JP_COLS])
    resps = [pd.read_csv(csv).filter(items=cols) for csv, cols in resps]

    print("exporting...")
    msgs = []
    folder = "public/fig/fanarts"
    old_files = [f for f in listdir() if isfile(f)]
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
                    new_dir = os.path.join(folder, os.path.basename(img))
                    shutil.move(img, new_dir)
                    out_dict["imgs"][i] = new_dir.replace("public/", "")

            out_dict["jp"] = df_jp_msg
            out_dict["en"] = "" if is_jp else df_en_msg

            msgs.append(out_dict)


    with open("src/python/fetched_msgs.js", "w") as js_file:
        var_name = "FETCHED_MSGS"
        js_file.write("const %s = " % var_name)
        dumps = json.dumps(msgs, indent=4, ensure_ascii=False)
        dumps = dumps.replace("NaN", "\"\"", len(msgs))
        for out_dict in msgs:
            for tag in out_dict:
                dumps = dumps.replace("\"%s\"" % tag, tag)
            
        js_file.write(dumps)
        js_file.write("\nexport default %s;" % var_name)

    with open("src/python/last_update.js", "w") as js_file:
        var_name = "LAST_UPDATE"
        js_file.write("const %s = " % var_name)
        js_file.write("\"%s (JST)\";" % jst.strftime("%Y-%m-%d %H:%M:%S"))
        js_file.write("\nexport default %s;" % var_name)