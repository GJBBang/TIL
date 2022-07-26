'''
4
2 1 1 0
'''

import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline

N = int(input())
arr = list(map(int, input().split()))
line = [0] * N

for i in range(N):
    cnt = 0
    for j in range(N):
        if cnt == arr[i] and line[j] == 0:
            line[j] = i + 1
            break
        elif cnt < arr[i] and line[j] == 0:
            cnt += 1

print(*line)