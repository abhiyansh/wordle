def generateSet(filename):
    f = open(filename, "r")
    st = f.read()
    f.close()
    ls = st.split('\n')
    ls = ['"'+st.lower()+'"' for st in ls]

    return set(ls)

def subtract(s1, s2):
    s = [c for c in s1 if c not in s2]

    return s

def writeListOfWords(ls, filename):
    file = open(filename,"w")
    file.write(',\n'.join(ls))
    file.close()

def main():
    completeList = generateSet("complete_list.txt")
    stopwords = generateSet("stopwords.txt")

    filteredList = subtract(completeList, stopwords)

    print(len(filteredList))

    writeListOfWords(filteredList, "list.txt")


if __name__ == '__main__':
    main()