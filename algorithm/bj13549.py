'''
5 17
'''

import sys
sys.stdin = open("input.txt")

import heapq
input = sys.stdin.readline

INF = int(1e9)
N, K = map(int, input().split())
graph = [[] for _ in range(100001)]
seconds = [INF] * 100001

graph[0].append((1, 1))
graph[1].append((0, 2))
graph[1].append((1, 0))
graph[100000].append((1, 99999))

for i in range(2, 100000):
    graph[i].append((1, i + 1))
    graph[i].append((1, i - 1))
    if i * 2 <= 100000:
        graph[i].append((0, i * 2))

def dijkstra(start):
    hq = []
    heapq.heappush(hq, (0, start))
    seconds[start] = 0

    while hq:
        sec, location = heapq.heappop(hq)
        if seconds[location] < sec:
            continue

        for s, l in graph[location]:
            cost = seconds[location] + s
            if seconds[l] > cost:
                seconds[l] = cost
                heapq.heappush(hq, (cost, l))


dijkstra(N)
print(seconds[K])