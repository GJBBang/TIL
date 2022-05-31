import sys
sys.stdin = open("input.txt")

# from collections import deque
#
# def find_cost():
#     global min_cost
#
#     queue = deque()
#     # 시작점 추가
#     queue.append((0, 1, arr[0][1]))
#
#     while queue:
#         x, y, cost = queue.popleft()
#         # y값에 따른 모든 방향 체크
#         for m, n in d[y]:
#             nx = x + m
#             ny = y + n
#             if nx < N:
#                 new_cost = cost + arr[nx][ny]
#                 # 도착 지점일 때 체크
#                 if nx == N - 1 and ny == 1:
#                     if min_cost > new_cost:
#                         min_cost = new_cost
#                 else:
#                     queue.append((nx, ny, new_cost))
#
#
# tc = 0
# while True:
#     N = int(input())
#     if N == 0:
#         break
#
#     tc += 1
#     arr = [list(map(int, input().split())) for _ in range(N)]
#     d = [[(1, 0), (1, 1), (0, 1)],
#          [(1, -1), (1, 0), (1, 1), (0, 1)],
#          [(1, -1), (1, 0)]]
#
#     min_cost = 987654321
#     find_cost()
#     print(str(tc) + ". " + str(min_cost))

tc = 0
while True:
    N = int(input())
    if N == 0:
        break

    tc += 1
    arr = [list(map(int, input().split())) for _ in range(N)]
    dp = [[0, 0, 0] for _ in range(N)]
    # 초기값 설정
    dp[0][0] = 1000
    dp[0][1] = arr[0][1]
    dp[0][2] = arr[0][1] + arr[0][2]

    for i in range(1, N):
        dp[i][0] = arr[i][0] + min(dp[i - 1][0], dp[i - 1][1])
        dp[i][1] = arr[i][1] + min(dp[i][0], dp[i - 1][0], dp[i - 1][1], dp[i - 1][2])
        dp[i][2] = arr[i][2] + min(dp[i][1], dp[i - 1][1], dp[i - 1][2])

    print(str(tc) + ". " + str(dp[N-1][1]))