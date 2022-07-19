'''
3 4 6
....
.T..
....
'''

import sys
sys.stdin = open("input.txt")

def find(k, x, y):
    global result

    if k == K:
        if x == 0 and y == C - 1:
            result += 1
        return

    for m, n in (-1, 0), (0, 1), (1, 0), (0, -1):
        if 0 <= x + m < R and 0 <= y + n < C:
            if not visited[x + m][y + n] and arr[x + m][y + n] != "T":
                visited[x + m][y + n] = True
                find(k + 1, x + m, y + n)
                visited[x + m][y + n] = False
        

input = sys.stdin.readline

R, C, K = map(int, input().split())

arr = [input().rstrip() for _ in range(R)]
visited = [[False] * C for _ in range(R)]
result = 0
visited[R - 1][0] = True
find(1, R - 1, 0)
print(result)