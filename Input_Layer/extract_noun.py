from konlpy.tag import Kkma
from konlpy.tag import Okt
from konlpy.tag import Komoran

def get_noun(route: str):
    sentences = open(route, "r", encoding="utf-8").read().splitlines()

    words_in_sentences = []
    vocab = []

    kkma = Kkma()
    for sentence in sentences:
        nouns = kkma.nouns(sentence)
        words_in_sentences.append(nouns)
        vocab += nouns

    return words_in_sentences, set(vocab)

if __name__ == "__main__":
    sentences = open("Data/wiki_corpus.txt", "r").read().splitlines()

    kkma = Kkma()
    okt = Okt()
    komoran = Komoran()
    
    total = len(sentences)
    s = 0

    file = open("Data/nouns_wiki_corpus.txt", "w")

    for sentence in sentences:
        s += 1
        print("{}   %".format(s / total * 100))
        if(sentence == ""): continue
        nouns = okt.nouns(sentence)
        nouns_sentence = ' '.join(nouns)
        if s != total: nouns_sentence += "\n"
        file.write(nouns_sentence)
        
    file.close()