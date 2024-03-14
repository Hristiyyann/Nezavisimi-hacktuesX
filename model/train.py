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

def read_data_file(party_folder, file):
    text = ""
    with open("data/{0}/{1}".format(party_folder, file), "r", encoding='utf-8') as f:
        text = f.read()
    return text

def add_relative_frequencies(relatives, frequencies, party):
    for key_word in frequencies:
        if key_word not in relatives:
            relatives[key_word] = {}
        #Create dict entries for each party and null them
        for p in parties:
            if p not in relatives[key_word]:
                relatives[key_word][p] = 0
        #Computing relative frequency of each word
        relatives[key_word][party] += frequencies[key_word] / frequencies["#"]
    return relatives

def add_probabilities(weights, relatives, party):
    global parties
    for keyword in relatives:
        if keyword not in weights:
            weights[keyword] = {}
            for p in parties:
                weights[keyword][p] = 0
        total_relative_frequency = 0
        for p in weights[keyword]:
            total_relative_frequency += relatives[keyword][p]
        
        weights[keyword][party] = relatives[keyword][party] / total_relative_frequency 
    return weights

def main():
    global weights
    global parties
    relatives = {}
    for party_folder in os.scandir("data/"):
        entries = os.scandir(party_folder)
        for entry in entries:
            text = read_data_file(party_folder.name, entry.name)
            frequencies = relative_frequency(text)
            relatives = add_relative_frequencies(relatives, frequencies, party_folder.name)
    for party in parties:
        weights = add_probabilities(weights, relatives, party)

    print(weights)

main()
save_model(weights, "model.csv")
