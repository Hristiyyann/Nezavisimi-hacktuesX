import os

weights = {}
parties = [ x.name for x in os.scandir("data/") ]

def load_model(file):
    global weights
    with open(file, "r"):
        pass

def save_model(weights, file):
    with open(file, "w", encoding="utf-8") as f:
        f.write("word")
        for party in parties:
            f.write(", " + party)
        f.write("\n")
        for key in weights:
            f.write(key)
            for party in weights[key]:
                f.write(", " + str(weights[key][party]))
            f.write("\n")

def update_frequencies_cumm(frequencies, text):
    count = frequencies["#"]
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

def read_data_file(party_folder, file):
    text = ""
    with open("data/{0}/{1}".format(party_folder, file), "r", encoding='utf-8') as f:
        text = f.read()
    return text

def frequencies_to_relatives_cumm(relatives, party_frequencies, party):
    for keyword in party_frequencies:
        if keyword == "#":
            continue
        if keyword not in relatives:
            relatives[keyword] = {}
        relatives[keyword][party] = party_frequencies[keyword] / party_frequencies["#"]
    return relatives

def relatives_to_probabilities(relatives):
    global parties
    probabilities = {}
    for keyword in relatives:
        if keyword not in probabilities:
            probabilities[keyword] = {}
            for p in parties:
                probabilities[keyword][p] = 0
        
        #Get Sum of Fwp
        total_relative_frequency = 0
        for p in relatives[keyword]:
            total_relative_frequency += relatives[keyword][p]

        #Divide each entry by the sum for the given keyword
        for p in relatives[keyword]:
            probabilities[keyword][p] = relatives[keyword][p] / total_relative_frequency

    return probabilities

def add_weights_cumm(weights, probabilities, party):
    global parties
    for keyword in probabilities:
        if keyword not in weights:
            weights[keyword] = {}
        for p in parties:
            if p not in weights[keyword]:
                weights[keyword][p] = 0

        #Modify these lines to adjust weight of each party probability
        for p in parties:
            if p == party:
                weights[keyword][party] += probabilities[keyword][p]
            # else:
            #     weights[keyword][party] -= probabilities[keyword][p]
    return weights

def main():
    global weights
    global parties
    relatives = {}
    probabilities = {}

    for party_folder in os.scandir("data/"):
        frequencies = {}
        frequencies["#"] = 0

        entries = os.scandir(party_folder)
        
        for entry in entries:
            # if "programa" in entry.name:
            text = read_data_file(party_folder.name, entry.name)
            frequencies = update_frequencies_cumm(frequencies, text)
            
        #Function updates relatives every cycle
        relatives = frequencies_to_relatives_cumm(relatives, frequencies, party_folder.name)
    probabilities = relatives_to_probabilities(relatives)
    save_model(probabilities, "probabilities.csv")
    for party in parties:
        weights = add_weights_cumm(weights, probabilities, party)
    return weights

if __name__ == "__main__":
    save_model(main(), "model.csv")

