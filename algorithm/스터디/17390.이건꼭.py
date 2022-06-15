import sys
sys.stdin = open("input.txt")

N, Q = map(int, input().split())

a = list(map(int, input().split()))
count = [0] * (max(a) + 1)
## Counting sort
for num in a:
    count[num] += 1
for i in range(1, N + 1):
    count[i] += count[i - 1]

b = [0] * N
for num in a:
    i = count[num]
    b[i - 1] = num
    count[num] -= 1

dp = [0] * (N + 1)
for i in range(1, N + 1):
    dp[i] = dp[i - 1] + b[i - 1]

for _ in range(Q):
    L, R = map(int, input().split())
    print(dp[R] - dp[L - 1])