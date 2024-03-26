import os
from evaluate import evaluate

data = []

with open("GERB-VUZR-corr.csv", "w") as f:
    f.write("x, y\n")
    for entry in os.scandir("data/GERB"):
        scores = evaluate("data/GERB/" + entry.name)
        f.write(str(scores["GERB"]) + ", " + str(scores["Vuzrazhdane"]))