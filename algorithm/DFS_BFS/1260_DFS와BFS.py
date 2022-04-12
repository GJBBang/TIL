# import sys
# sys.stdin = open('test.txt')
from collections import deque

def dfs(x):
    print(x, end=' ')
    visited[x] = 1
    
    for w in range(1, N + 1):
        if graph[x][w] == 1 and visited[w] == 0:
            dfs(w)


def bfs(x):
    queue = deque()
    visited_bfs = [0] * (N + 1)
    visited_bfs[x] = 1
    queue.append(x)

    while queue:
        v = queue.popleft()
        print(v, end=' ')
        for w in range(1, N + 1):
            if graph[v][w] == 1 and visited_bfs[w] == 0:
                visited_bfs[w] = 1
                queue.append(w)


N, M, V = map(int, input().split())
graph = [[0] * (N + 1) for _ in range(N + 1)]
visited = [0] * (N + 1)

for _ in range(M):
    x, y = map(int, input().split())
    graph[x][y] = 1
    graph[y][x] = 1

dfs(V)
print()
bfs(V)