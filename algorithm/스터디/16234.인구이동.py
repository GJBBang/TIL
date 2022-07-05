'''
2 20 50
50 30
20 40
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

def check():
    for i in range(N):
        for j in range(N):
            for m, n in (-1, 0), (0, 1), (1, 0), (0, -1):
                if 0 <= i + m < N and 0 <= j + n < N:
                    if L <= abs(area[i][j] - area[i + m][j + n]) <= R:
                        return False
    return True


def find(i, j):
    q = deque()
    q.append((i, j))
    
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
    
    return cnt, population


def move(i, j, cnt, population):
    q = deque()
    q.append((i, j))

    moved = [[False] * N for _ in range(N)]

    while q:
        x, y = q.popleft()
        for m, n in (-1, 0), (0, 1), (1, 0), (0, -1):
            if 0 <= x + m < N and 0 <= y + n < N:
                if visited[x + m][y + n] and not moved[x + m][y + n]:
                    q.append((x + m, y + n))
                    moved[x + m][y + n] = True
                    area[x + m][y + n] = population // cnt


input = sys.stdin.readline

N, L, R = map(int, input().split())
area = [list(map(int, input().split())) for _ in range(N)]

result = 0
while True:
    if check():
        break
    visited = [[False] * N for _ in range(N)]
    result += 1

    for i in range(N):
        for j in range(N):
            if not visited[i][j]:
                cnt, population = find(i, j)
                
                if visited[i][j]:
                    move(i, j, cnt, population)

print(result)