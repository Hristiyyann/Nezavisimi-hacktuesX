import os
import sys
import pathlib
from math import sqrt

EVALUATION_FILE = ""
MODEL_FILE = "./model.csv"
DATA_DIR = "./data/"
path = pathlib.Path(sys.argv[0])
folder = str(path.parent) + "/"
MODEL_FILE = folder + MODEL_FILE
DATA_DIR = folder + DATA_DIR

def load_model(file):
    weights = {}
    with open(file, "r", encoding="utf-8") as f:
        str = f.readline()
        str = f.readline().strip("\n")
        while str:
            row = str.split(", ")
            if row[0] not in weights:
                weights[row[0]] = {}
            c = 1
            for p_f in os.scandir(DATA_DIR):
                weights[row[0]][p_f.name] = float(row[c])
                c += 1
            str = f.readline().strip("\n")
    return weights

        
def save_model(weights, file):
    with open(file, "w", encoding="utf-8") as f:
        f.write("word")
        for party_folder in os.scandir(DATA_DIR):
            f.write(", " + party_folder.name)
        f.write("\n")
        for key in weights:
            f.write(key)
            for party in weights[key]:
                f.write(", " + str(weights[key][party]))
            f.write("\n")


def relative_frequency(text):
    frequencies = {}
    count = 0
    words = text.replace("\n", " ").split(' ')
    for w in words:
        #Strip special characters from words
        real_w = w.strip(" )(;:.,„“\"+=_-–!?><#@*\\/'").lower()
        if real_w:
            if real_w not in frequencies:
                frequencies[real_w] = 0
            frequencies[real_w] += 1
            count += 1
    frequencies['#'] = count
    return frequencies

def evaluate(file):
    result = {}
    text = ""
    weights = load_model(MODEL_FILE)
    errors = {}
    with open(file, "r", encoding="utf-8") as f:
        text = f.read()
    frequencies = relative_frequency(text)
    scores = {}
    for p_f in os.scandir(DATA_DIR):
        errors[p_f.name] = 0
        scores[p_f.name] = 0
        scored_words = 0
        for word in frequencies:
            if word in weights:
                scores[p_f.name] += frequencies[word] / frequencies["#"] * weights[word][p_f.name]
                scored_words += 1
        for word in frequencies:
            if word in weights:
                errors[p_f.name] += frequencies[word] / frequencies["#"] * ((weights[word][p_f.name] - scores[p_f.name]) ** 2)
        if scored_words != 0:
            errors[p_f.name] = sqrt(errors[p_f.name]) / sqrt(scored_words)
        else:
            errors[p_f.name] = 0

    result["scores"] = scores
    result["errors"] = errors
    return result

if __name__ == "__main__":
    if len(sys.argv) > 1:
        EVALUATION_FILE = sys.argv[1]
    else:
        print("Please provide name of file for evaluation as argument")
        exit
    print(evaluate(EVALUATION_FILE))