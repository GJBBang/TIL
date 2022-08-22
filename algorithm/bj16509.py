'''
4 2
2 5
'''

import sys
sys.stdin = open("input.txt")

from collections import deque

def find():
    queue = deque()
    queue.append((r1, c1, 0))
    visited[r1][c1] = True

    while queue:
        x, y, cnt = queue.popleft()
        for i in range(8):
            n = x + dx[i]
            m = y + dy[i]
            if 0 <= n < 10 and 0 <= m < 9 and not visited[n][m]:
                if n == r2 and m == c2:
                    return cnt + 1
                else:
                    flag = True
                    a = x
                    b = y
                    for j in range(3):
                        a += check_x[i][j]
                        b += check_y[i][j]
                        if board[a][b]:
                            flag = False
                            break
                    if flag:
                        queue.append((n, m, cnt + 1))
                        visited[n][m] = True

    return -1                


r1, c1 = map(int, input().split())
r2, c2 = map(int, input().split())

board = [[0] * 9 for _ in range(10)]
visited = [[False] * 9 for _ in range(10)]

board[r2][c2] = 1

dx = [-3, -3, -2, 2, 3, 3, 2, -2]
dy = [-2, 2, 3, 3, 2, -2, -3, -3]

check_x = [[-1, -1, -1], [-1, -1, -1], [0, -1, -1], [0, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 1], [0, -1, -1]]
check_y = [[0, -1, -1], [0, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 1], [0, -1, -1], [-1, -1, -1], [-1, -1, -1]]

result = find()
print(result)