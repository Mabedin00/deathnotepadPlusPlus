import numpy as np
from PIL import Image
import json

PATH = 0
WATER = 1
LAND = 2

file = input('select a file to create: ')
img = Image.open('static/images/maps/' + file + '_placement.png')
array = np.array(img)
# output = json.dumps(array.tolist())
y = 0
output = []
while(y < len(array)):
    x = 0
    output.append([])
    while (x < len(array[y])):
        if (list(array[y][x]) == [255, 255, 255, 255]):
            output[y].append(PATH)
        elif (list(array[y][x]) == [0, 0, 255, 255]):
            output[y].append(WATER)
        else:
            output[y].append(LAND)
        x += 1
    y += 1
# The output is in teh fromat (y,x)
# print(output[200][400], output[400][200])

with open(file + ".js", "w") as f:
    f.write(str(output))
print ("Segmentation fault (core dumped)\n")
