import sys
sys.stdin = open("input.txt")

N, Q = map(int, sys.stdin.readline().rstrip().split())

a = list(map(int, sys.stdin.readline().rstrip().split()))
a.sort()

dp = [0] * (N + 1)
for i in range(1, N + 1):
    dp[i] = dp[i - 1] + a[i - 1]

for _ in range(Q):
    L, R = map(int, sys.stdin.readline().rstrip().split())
    print(dp[R] - dp[L - 1])