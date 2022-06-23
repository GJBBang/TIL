import sys
sys.stdin = open("input.txt")

import heapq
input = sys.stdin.readline

V, E = map(int, input().split())
start = int(input())
INF = int(1e9)
graph = [[] for _ in range(V + 1)]
distance = [INF] * (V + 1)

for _ in range(E):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

def dijkstra(start):
    hq = []
    heapq.heappush(hq, (0, start))
    distance[start] = 0

    while hq:
        dist, node = heapq.heappop(hq)
        if distance[node] < dist:
            continue
        for v, w in graph[node]:
            cost = distance[node] + w
            if distance[v] > cost:
                distance[v] = cost
                heapq.heappush(hq, (cost, v))


dijkstra(start)
for i in range(1, V + 1):
    if distance[i] == INF:
        print("INF")
    else:
        print(distance[i])