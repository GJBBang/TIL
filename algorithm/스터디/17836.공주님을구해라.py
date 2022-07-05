import sys
sys.stdin = open("input.txt")

from collections import deque

def find():
    q = deque()
    q.append((0, 0, 0, 0))
    v_no_gram[0][0] = True

    while q:
        x, y, is_gram, cnt = q.popleft()
        # N, M 인지 확인
        if x == N - 1 and y == M - 1:
            return cnt
        # 그람을 먹기 전
        if not is_gram:
        # 4방향 확인
            for n, m in (-1, 0), (0, 1), (1, 0), (0, -1):
                if 0 <= x + n < N and 0 <= y + m < M:
                    if arr[x + n][y + m] != 1 and not v_no_gram[x + n][y + m]:
                        v_no_gram[x + n][y + m] = True
                        # 다음 칸이 빈 칸일 때
                        if not arr[x + n][y + m]:
                            q.append((x + n, y + m, 0, cnt + 1))         
                        # 다음 칸에 그람이 있을 때
                        else:
                            q.append((x + n, y + m, 1, cnt + 1))
                            v_gram[x + n][y + m] = True
        # 그람을 먹은 후
        else:
            for n, m in (-1, 0), (0, 1), (1, 0), (0, -1):
                if 0 <= x + n < N and 0 <= y + m < M and not v_gram[x + n][y + m]:
                    q.append((x + n, y + m, 1, cnt + 1))
                    v_gram[x + n][y + m] = True

    return "Fail"    


input = sys.stdin.readline

N, M, T = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

v_no_gram = [[False] * M for _ in range(N)]
v_gram = [[False] * M for _ in range(N)]

result = find()
if result == "Fail":
    print(result)
else:
    if result > T:
        print("Fail")
    else:
        print(result)
