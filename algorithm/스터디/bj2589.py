'''
5 7
WLLWWWL
LLLWLLL
LWLWLWW
LWLWLLL
WLLWLWW
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

def find(x, y):

    visited = [[0] * C for _ in range(R)]
    q = deque()
    q.append((x, y))
    visited[x][y] = 1

    while q:
        i, j = q.popleft()
        for m, n in (-1, 0), (0, 1), (1, 0), (0, -1):
            if 0 <= i + m < R and 0 <= j + n < C:
                if arr[i + m][j + n] == "L" and not visited[i + m][j + n]:
                    q.append((i + m, j + n))
                    visited[i + m][j + n] = visited[i][j] + 1
    
    return visited[i][j] - 1


input = sys.stdin.readline

R, C = map(int, input().split())
arr = [input().rstrip() for _ in range(R)]

result = 0
for i in range(R):
    for j in range(C):
        if arr[i][j] == "L":
            temp = find(i, j)
            if result < temp:
                result = temp

print(result)            