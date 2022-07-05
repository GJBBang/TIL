'''
quqacukqauackck
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

def insert_room(index, w):
    for room in rooms:
        if len(room) == index:
            room.append(w)
            return
    return


sounds = input()
duck = ["q", "u", "a", "c", "k"]
rooms = deque()

for w in sounds:
    if w == "q":
        if rooms and len(rooms[0]) == 5:
            rooms.popleft()
        rooms.append([w])
    else:
        index = duck.index(w)
        insert_room(index, w)

result = 0
if rooms:
    for room in rooms:
        if len(room) == 5:
            result += 1
        else:
            result = -1
            break
else:
    result = -1

print(result)