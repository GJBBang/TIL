import sys
sys.stdin = open("input.txt")

import heapq

N = int(input())
hq = []

for _ in range(N):
    num = sys.stdin.readline().rstrip()
    heapq.heappush(hq, num)
