import sys
sys.stdin = open("input.txt")

def quad(n, x, y):

    if n == 1:
        cnt[arr[x][y]] += 1
        return

    flag = 0
    for i in range(n):
        if flag:
            break
        else:
            for j in range(n):
                if arr[x][y] != arr[x + i][y + j]:
                    flag = 1
                    break

    if flag:
        n //= 2
        quad(n, x, y)
        quad(n, x + n, y)
        quad(n, x, y + n)
        quad(n, x + n, y + n)
    else:
        cnt[arr[x][y]] += 1


N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
cnt = [0, 0]
quad(N, 0, 0)
print(cnt[0])
print(cnt[1])