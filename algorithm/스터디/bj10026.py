import sys
sys.stdin = open("input.txt")

from collections import deque

def find(arr, x, y):
    queue = deque()
    color = arr[x][y]
    queue.append((x, y))

    while queue:
        i, j = queue.popleft()
        for m, n in (0, -1), (1, 0), (0, 1), (-1, 0):
            if 0 <= i + m < N and 0 <= j + n < N and arr[i + m][j + n] == color:
                arr[i + m][j + n] = 0
                queue.append((i + m, j + n))


input = sys.stdin.readline
N = int(input())

normal = [[] for _ in range(N)]
abnormal = [[] for _ in range(N)]
for i in range(N):
    temp = input().rstrip()
    for w in temp:
        normal[i].append(w)
        if w == "G":
            abnormal[i].append("R")
        else:
            abnormal[i].append(w)

normal_cnt = 0
abnormal_cnt = 0
for i in range(N):
    for j in range(N):
        if normal[i][j]:
            find(normal, i, j)
            normal_cnt += 1
        if abnormal[i][j]:
            find(abnormal, i, j)
            abnormal_cnt += 1

print(f"{normal_cnt} {abnormal_cnt}")