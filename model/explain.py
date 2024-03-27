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

LOW = "малка"
MEDIUM = "средна"
HIGH = "висока"

party_to_transcript = {
    "BSP": "БСП",
    "DPS": "ДПС",
    "GERB": "ГЕРБ",
    "PP-DB": "ПП-ДБ",
    "Vuzrazhdane": "Възраждане",
    "ITN": "ИТН"
}

def equal_within(num1, num2, limit):
    if abs(num1 - num2) <= limit:
        return True
    return False

def explain(results):
    
    scores = [ results.get("scores").get(x) for x in results.get("scores") ]  
    parties = [ x for x in results.get("scores")]


    tops = []
    bots = []
    maxscore = max(scores)
    minscore = min(scores)
    min_error = results.get("errors").get(list(filter(lambda x: results["scores"][x] == minscore, results["errors"]))[0])
    max_error = results.get("errors").get(list(filter(lambda x: results["scores"][x] == maxscore, results["errors"]))[0])

    if maxscore == 0:
        results["explanation"] = NEUTRAL#.encode("cp866")
        return results
    
    # GROUP TOP RESULTS
    for party in results["scores"]:
        if equal_within(results["scores"][party], maxscore, results["errors"][party] + max_error):
            tops.append(party)
        else:
            bots.append(results["scores"][party])

    if len(tops) == len(parties):
        results["explanation"] = NEUTRAL#.encode("cp866")
        return results
    elif len(tops) > 1:
        avg = sum(bots) / len(bots)
        SE = results["errors"][tops[0]] + min_error
        if maxscore - minscore < SE * 2:
            results["explanation"] = TOP_MULTIPLE.format(LOW, ", ".join(list(map(lambda x: party_to_transcript.get(x), tops))))
            return results
        elif maxscore - minscore < SE * 3:
            results["explanation"] = TOP_MULTIPLE.format(MEDIUM, ", ".join(list(map(lambda x: party_to_transcript.get(x), tops))))
            return results
        elif maxscore - minscore >= SE * 3:
            results["explanation"] = TOP_MULTIPLE.format(HIGH, ", ".join(list(map(lambda x: party_to_transcript.get(x), tops))))
            return results
    elif len(tops) == 1:
        avg = sum(bots) / len(bots)
        SE = results["errors"][tops[0]] + min_error
        if maxscore - minscore < SE * 2:
            results["explanation"] = TOP_ONE.format(LOW, list(map(lambda x: party_to_transcript.get(x), tops))[0])
            return results
        elif maxscore - minscore < SE * 3:
            results["explanation"] = TOP_ONE.format(MEDIUM, list(map(lambda x: party_to_transcript.get(x), tops))[0])
            return results
        elif maxscore - minscore >= SE * 3:
            results["explanation"] = TOP_ONE.format(HIGH, list(map(lambda x: party_to_transcript.get(x), tops))[0])

    return results


if(__name__ == "__main__"):
    if len(sys.argv) < 2:
        print("Enter file name")
        exit
    result = explain(evaluate(sys.argv[1]))
    print(result.__str__())
