import secrets
import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline
N = int(input())

schedule = [(0, 0)]
dp = [0] * (N + 1)
for _ in range(N):
    t, p = map(int, input().split())
    schedule.append((t, p))

for i in range(1, N + 1):
    if i + schedule[i][0] <= N:
        dp[i + schedule[i][0]] = max(dp[i] + schedule[i][1], dp[i + schedule[i][0] - 1])
print(dp)