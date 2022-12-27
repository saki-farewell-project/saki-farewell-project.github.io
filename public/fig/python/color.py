#!/usr/bin/env python3
import numpy as np
from PIL import Image
from argparse import ArgumentParser
import os


def inputDir(fn: str): 
    assert "file not found" and os.path.isfile(fn) and os.path.exists(fn)
    return fn

def outputName(fn: str):
    assert "invalid filename with '/' " and fn.find('/') == -1 
    return fn

parser = ArgumentParser(description="change color of monochrome pictures")
parser.add_argument('input', type=inputDir, help='path to input image')
parser.add_argument('output', type=outputName, help='raw output filename')
parser.add_argument('rgb', type=float, nargs=3, help='new color (rgb:[0, 255])')



if __name__ == "__main__": 
    args = parser.parse_args()
    img = Image.open(args.input) 
    data = np.array(img.convert('RGBA'))  

    visible_areas = data[:,:,3] != 0
    data[:,:,:3][visible_areas] = args.rgb

    img = Image.fromarray(data)
    dir = os.path.dirname(args.input)
    output = os.path.join(dir, args.output)
    
    img.save(output)
    print('file saved as %s' % output)
