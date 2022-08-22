'''
quqacukqauackck
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

def insert_room(index, w):
    global flag

    for duck in ducks:
        if len(duck) == index:
            duck.append(w)
            return
    
    flag = True
    return


sounds = input()
sound = ["q", "u", "a", "c", "k"]
ducks = deque()

flag = False
for w in sounds:
    if w == "q":
        if ducks and len(ducks[0]) == 5:
            ducks.popleft()
        ducks.append([w])
    else:
        index = sound.index(w)
        insert_room(index, w)
        if flag:
            break

result = 0
if flag:
    result = -1
elif ducks:
    for duck in ducks:
        if len(duck) == 5:
            result += 1
        else:
            result = -1
            break
else:
    result = -1

print(result)