import sys
sys.stdin = open("input.txt")

import heapq

input = sys.stdin.readline

N, E = map(int, input().split())
INF = int(1e9)
graph = [[] for _ in range(N + 1)]
distance_v0 = [INF] * (N + 1)
distance_v1 = [INF] * (N + 1)
distance_v2 = [INF] * (N + 1)

for _ in range(E):
    a, b, c = map(int, input().split())
    graph[a].append((b, c))
    graph[b].append((a, c))

v0 = 1
v1, v2 = map(int, input().split())

def dijkstra(start, distance):
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


dijkstra(v0, distance_v0)
dijkstra(v1, distance_v1)
dijkstra(v2, distance_v2)

case_one = distance_v0[v1] + distance_v1[v2] + distance_v2[N]
case_two = distance_v0[v2] + distance_v2[v1] + distance_v1[N]
if case_one >= INF and case_two >= INF:
    print(-1)
else:
    print(min(case_one, case_two))