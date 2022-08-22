import sys

sys.stdin = open("input.txt")

input = sys.stdin.readline

T, W = map(int, input().split())

arr = [0]
for _ in range(T):
    arr.append(int(input()))

dp = [[0] * (T + 1) for _ in range(W + 1)]

for i in range(1, T + 1):
    if arr[i] == 1:
        dp[0][i] = dp[0][i - 1] + 1
    else:
        dp[0][i] = dp[0][i - 1]

for i in range(1, W + 1):
    for j in range(1, T + 1):
        if i % 2:
            if arr[i] == 2:
                dp[i][j] = dp[i - 1][j] + 1
            else:
                dp[i][j] = dp[i - 1][j] - 1
        else:
            if arr[i] == 1:
                dp[i][j] = dp[i - 1][j] + 1
            else:
                dp[i][j] = dp[i - 1][j] - 1

result = 0
for a in dp:
    temp = max(a)
    if result < temp:
        result = temp

print(result)