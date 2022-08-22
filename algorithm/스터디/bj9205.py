'''
2
2
0 0
1000 0
1000 1000
2000 1000
2
0 0
1000 0
2000 1000
2000 2000
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

input = sys.stdin.readline

def bfs():
    queue = deque()
    queue.append(0)
    visited[0] = True
    
    while queue:
        location = queue.popleft()

        for i in range(1, n + 2):
            if not visited[i] and songdo[location][i] == 1:
                queue.append(i)
                visited[i] = True


T = int(input())
for tc in range(1, T + 1):
    n = int(input())
    coordinate = []
    for _ in range(n + 2):
        x, y = map(int, input().split())
        coordinate.append((x, y))
    
    songdo = [[0] * (n + 2) for _ in range(n + 2)]
    visited = [False] * (n + 2)

    for i in range(n + 2):
        for j in range(i + 1, n + 2):
            dist = abs(coordinate[i][0] - coordinate[j][0]) + abs(coordinate[i][1] - coordinate[j][1])
            if dist <= 1000:
                songdo[i][j] = songdo[j][i] = 1
    
    bfs()
    if visited[-1]:
        print("happy")
    else:
        print("sad")