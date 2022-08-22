import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline
N = int(input())

schedule = [(0, 0)]
dp = [0] * (N + 2)
for _ in range(N):
    t, p = map(int, input().split())
    schedule.append((t, p))

for i in range(1, N + 1):
    for j in range(i + 1, N + 2):
        if j - i >= schedule[i][0]:
            dp[j] = max(dp[i] + schedule[i][1], dp[j])
print(max(dp))