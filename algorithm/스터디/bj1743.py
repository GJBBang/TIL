'''
3 4 5
3 2
2 2
3 1
2 3
1 1
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

def find_cnt(x, y):
    queue = deque()
    queue.append((x, y))
    visited[x][y] = 1

    cnt = 1
    while queue:
        a, b = queue.popleft()
        for n, m in (-1, 0), (0, 1), (1, 0), (0, -1):
            if 0 <= a + n < N and 0 <= b + m < M:
                if arr[a + n][b + m] and not visited[a + n][b + m]:
                    queue.append((a + n, b + m))
                    visited[a + n][b + m] = 1
                    cnt += 1
    
    return cnt


input = sys.stdin.readline

N, M, K = map(int, input().split())
arr = [[0] * M for _ in range(N)]
for _ in range(K):
    x, y = map(int, input().split())
    arr[x - 1][y - 1] = 1

visited = [[0] * M for _ in range(N)]
result = 0

for i in range(N):
    for j in range(M):
        if arr[i][j] and not visited[i][j]:
            temp = find_cnt(i, j)
            if result < temp:
                result = temp

print(result)