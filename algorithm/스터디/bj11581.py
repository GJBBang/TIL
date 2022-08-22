import sys
sys.stdin = open("input.txt")

def check(x):
    global result

    if visited[x]:
        result = "CYCLE"
        return

    visited[x] = 1
    for j in range(N):
        if arr[x][j]:
            check(j)
    visited[x] = 0


N = int(input())
arr = [[0] * N for _ in range(N)]
visited = [0] * N
result = "NO CYCLE"

for i in range(N - 1):
    num = int(input())
    if num:
        cross_num = list(map(int, input().split()))
        for j in cross_num:
            arr[i][j - 1] = 1
check(0)
print(result)