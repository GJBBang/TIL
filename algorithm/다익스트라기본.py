'''
입력 값 예제
5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6
'''
import sys
sys.stdin = open("input.txt")

V, E = map(int, input().split())
start = int(input())
INF = int(1e9)
graph = [[] for _ in range(V + 1)]
visited = [False] * (V + 1)
distance = [INF] * (V + 1)

for _ in range(E):
    u, v, w = map(int, sys.stdin.readline().rstrip().split())
    graph[u].append((v, w))

# next 노드 찾기 (아직 방문하지 않은 노드 중 출발점에서부터 거리가 가장 짧은 노드)
def get_next_node():
    min_value = INF
    index = 0
    for i in range(1, V + 1):
        if not visited[i] and min_value > distance[i]:
            min_value = distance[i]
            index = i
    return index

# 기본 Dijkstra 구현
def basic_dijkstra(start):
    ## 스타트 거리 0 초기화
    distance[start] = 0
    ## 스타트 방문 처리
    visited[start] = True
    ## 스타트 인접 노드 거리 초기화
    for v, w in graph[start]:
        distance[v] = w
    ## V - 1 개의 노드 한 번씩 순회하면서 거리 초기화
    for _ in range(V - 1):
        node = get_next_node()
        visited[node] = True
        for v, w in graph[node]:
            ## node 를 거쳐서 인접한 노드에 가는 비용
            cost = distance[node] + w
            if distance[v] > cost:
                distance[v] = cost


basic_dijkstra(start)
print(distance)