#!/usr/bin/env python3
import pandas as pd
import json
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import os

class MsgCard:
    def __init__(self, name, msg_en, msg_jp):
        self.name = name
        self.msg_en = msg_en
        self.msg_en = msg_jp


if __name__ == "__main__": 
    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6rr99D5UgPT_h6v3Gppke1ygVF31dR42FXoRrF6guJFParapzZ6d2HHP-Atcj6Xq0stJDmmYvVWgh/pub?output=csv"
    
    print("fetching msgs...")
    df = pd.read_csv(url)
    labels = ["Type your message to Saki here (%s)" % lang for lang in ("English", "Japanese")]
    labels += ["Your nickname", "Type of submission", "Saki has become my \" \""]
    datas = [df[label] for label in labels]

    msgs = []
    folder = "public/fig/cards"
    name_ids = {}
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
    
    