import sys
sys.stdin = open("input.txt")

from collections import deque

T = int(input())

for tc in range(1, T + 1):
    # input 받기
    N, M = map(int, input().split())
    X = int("".join(input().split()))
    Y = int("".join(input().split()))
    board = deque(map(int, input().split()))

    win_count = 0
    # 돌림판에 적힌 모든 숫자 체크
    for i in range(N):
        temp = 0
        # 시계방향으로 M칸 연속되는 수 구하기
        for j in range(M):
            temp = temp * 10 + board[j]

        # 조건 확인
        if X <= temp <= Y:
            win_count += 1
        # board 재정렬
        board.append(board.popleft())

    print(win_count)


