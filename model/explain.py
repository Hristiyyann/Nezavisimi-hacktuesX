from evaluate import evaluate
import os
import pathlib
import sys
import math
DATA_FOLDER = "data/"
NEUTRAL = "Това че резултатите на всички партии са сравнително близо едни до други означава, че текстът е по-скоро неутрален"
TOP_ONE = "Има {0} вероятност текстът да подкрепя повече вижданията на партия {1}"
TOP_MULTIPLE = "Има {0} вероятност текстът да подкрепя повече вижданията на партиите {1}"

path = sys.argv[0]
path = pathlib.Path(path)
folder = str(path.parent) + "/"
DATA_FOLDER = folder + DATA_FOLDER

party_to_transcript = {
    "BSP": "БСП",
    "DPS": "ДПС",
    "GERB": "ГЕРБ",
    "PP-DB": "ПП-ДБ",
    "Vuzrazhdane": "Възраждане",
    "ITN": "ИТН"
}

def equal_within(num1, num2, limit):
    if abs(num1 - num2) < limit:
        return True
    return False

def explain(results):
    
    scores = [ results.get("scores").get(x) for x in results.get("scores") ]  
    old_scores = results["scores"]
    parties = [ x.name for x in os.scandir(DATA_FOLDER) ]
    minscore = min(scores)

    tops = []
    bots = []
    maxscore = max(scores)
    if maxscore == 0:
        results["explanation"] = NEUTRAL
        return results
    
    # GROUP TOP RESULTS
    for party in results["scores"]:
        if equal_within(results["scores"][party], maxscore, results["errors"][party]):
            tops.append(party)
        else:
            bots.append(results["scores"][party])

    print(tops)

    if len(tops) == len(parties):
        results["explanation"] = NEUTRAL
        return results
    elif len(tops) > 1:
        avg = sum(bots) / len(bots)
        if maxscore - avg < 0.1:
            results["explanation"] = TOP_MULTIPLE.format("малка", ", ".join(list(map(lambda x: party_to_transcript.get(x), tops))))
            return results
        elif maxscore - avg < 0.15:
            results["explanation"] = TOP_MULTIPLE.format("средна", ", ".join(list(map(lambda x: party_to_transcript.get(x), tops))))
            return results
        elif maxscore - avg >= 0.15:
            results["explanation"] = TOP_MULTIPLE.format("голяма", ", ".join(list(map(lambda x: party_to_transcript.get(x), tops))))
            return results
    elif len(tops) == 1:
        avg = sum(bots) / len(bots)
        if maxscore - avg < 0.1:
            results["explanation"] = TOP_ONE.format("малка", list(map(lambda x: party_to_transcript.get(x), tops))[0])
            return results
        elif maxscore - avg < 0.15:
            results["explanation"] = TOP_ONE.format("средна", list(map(lambda x: party_to_transcript.get(x), tops))[0])
            return results
        elif maxscore - avg >= 0.15:
            results["explanation"] = TOP_ONE.format("голяма", list(map(lambda x: party_to_transcript.get(x), tops))[0])
    return results


if(__name__ == "__main__"):
    if len(sys.argv) < 2:
        print("Enter file name")
        exit
    print(explain(evaluate(sys.argv[1])))