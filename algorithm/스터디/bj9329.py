import sys
sys.stdin = open("input.txt")

# 상금 계산 함수
def calc(arr):
    reward = 0 
    while True:
        for i in range(1, arr[0] + 1):
            if stickers[arr[i]] == 0:
                return reward
            else:
                stickers[arr[i]] -= 1
        reward += arr[-1]


tc = int(input())
for _ in range(tc):
    n, m = map(int, input().split())
    info = [list(map(int, input().split())) for _ in range(n)]
    stickers = [0] + list(map(int, input().split()))

    max_reward = 0
    for i in range(n):
        max_reward += calc(info[i])

    print(max_reward)