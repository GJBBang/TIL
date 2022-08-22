import sys
sys.stdin = open("input.txt")

n, m = map(int, input().split())
chess_piece = [list(map(int, input().split())) for _ in range(3)]
chess_board = [[0] * m for _ in range(n)]
visited = [[0] * m for _ in range(n)]

## 체스 보드 및 방문 체크
## 퀸 = 1, 나이트 = 2, 폰 = 3 으로 표시
## 방문체크 = 1
for i in range(3):
    for j in range(chess_piece[i][0]):
        chess_board[chess_piece[i][j * 2 + 1] - 1][chess_piece[i][j * 2 + 2] - 1] = i + 1
        visited[chess_piece[i][j * 2 + 1] - 1][chess_piece[i][j * 2 + 2] - 1] = 1

## 체스 보드 순회
for i in range(n):
    for j in range(m):
        # 퀸 체크
        if chess_board[i][j] == 1:
            for x, y in (-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1):
                check_i, check_j = i, j
                while True:
                    # 벽, 장애물 체크
                    if 0 <= check_i + x < n and 0 <= check_j + y < m and chess_board[check_i + x][check_j + y] == 0:
                        check_i += x
                        check_j += y
                        visited[check_i][check_j] = 1
                    else:
                        break
        # 나이트 체크
        elif chess_board[i][j] == 2:
            for x, y in (-2, -1), (-1, -2), (1, -2), (2, -1), (2, 1), (1, 2), (-1, 2), (-2, 1):
                # 벽 체크
                if 0 <= i + x < n and 0 <= j + y < m:
                    visited[i + x][j + y] = 1

## 안전한 칸 세기
result = 0
for i in range(n):
    result += sum(visited[i])

print(n * m - result)