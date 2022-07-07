'''
2 20 50
50 30
20 40
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

def find(i, j):
    global flag

    q = deque()
    pc = []
    q.append((i, j))
    pc.append((i, j))
    
    cnt = 0
    population = 0
    while q:
        x, y = q.popleft()
        for m, n in (-1, 0), (0, 1), (1, 0), (0, -1):
            if 0 <= x + m < N and 0 <= y + n < N and not visited[x + m][y + n]:
                if L <= abs(area[x][y] - area[x + m][y + n]) <= R:
                    q.append((x + m, y + n))
                    visited[x + m][y + n] = True
                    cnt += 1
                    population += area[x + m][y + n]
                    pc.append((x + m, y + n))
    
    if len(pc) >= 2:
        flag = True
        move(pc, cnt, population)


def move(pc, cnt, population):
    value = population // cnt
    for x, y in pc:
        area[x][y] = value


input = sys.stdin.readline

N, L, R = map(int, input().split())
area = [list(map(int, input().split())) for _ in range(N)]

result = 0
flag = True
while flag:
    flag = False
    visited = [[False] * N for _ in range(N)]

    for i in range(N):
        for j in range(N):
            if not visited[i][j]:
                find(i, j)
    if flag:
        result += 1

print(result)