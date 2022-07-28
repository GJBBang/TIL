'''
4 2 0 0 8
0 2
3 4
5 6
7 8
4 4 4 1 3 3 3 2
'''

import sys
sys.stdin = open("input.txt")

def move(a, b, arr):
    dx = [0, 0, 0, -1, 1]
    dy = [0, 1, -1, 0, 0]

    i, j = a, b
    for n in arr:
        if 0 <= i + dx[n] < N and 0 <= j + dy[n] < M:
            i += dx[n]
            j += dy[n]
            dice_update(n)
            num_change(i, j)
            print(dice[1])


def dice_update(n):
    if n == 1:
        dice[5], dice[4], dice[1], dice[3] = dice[1], dice[3], dice[4], dice[5]
    elif n == 2:
        dice[4], dice[5], dice[3], dice[1] = dice[1], dice[3], dice[4], dice[5]
    elif n == 3:
        dice[3], dice[0], dice[1], dice[2] = dice[0], dice[1], dice[2], dice[3]
    else:
        dice[1], dice[2], dice[3], dice[0] = dice[0], dice[1], dice[2], dice[3]


def num_change(i, j):
    if not board[i][j]:
        board[i][j] = dice[3]
    else:
        dice[3] = board[i][j]
        board[i][j] = 0


input = sys.stdin.readline

N, M, x, y, k = map(int, input().split())
board = []

for _ in range(N):
    temp = list(map(int, input().split()))
    board.append(temp)

command = list(map(int, input().split()))
dice = [0, 0, 0, 0, 0, 0]
move(x, y, command)
