import numpy as np
from PIL import Image
import json

file = input('select a file to create, note code will break if file is not exact: ')
img = Image.open('static/images/maps/' + file + '_placement.png')
array = np.array(img)
# print(array[0][620])      # (100, 200, 4)
# output = json.dumps(array.tolist())
y = 0
output = []
while(y < len(array)):
    x = 0
    output.append([])
    while (x < len(array[y])):
        if (list(array[y][x]) == [255, 255, 255, 255]):
            output[y].append(0)
        elif (list(array[y][x]) == [0, 0, 255, 255]):
            output[y].append(1)
        else:
            output[y].append(2)
        x += 1
    y += 1
# The output is in teh fromat (y,x)
# print(output[200][400], output[400][200])

with open(file + ".js", "w") as f:
    f.write(str(output))
print ("Segmentation Fault (Core Dumpted)\n")
