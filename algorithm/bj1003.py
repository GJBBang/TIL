import sys
sys.stdin = open("input.txt")

def fibo_dp(n, k):
    if len(fibo_list) > n:
        return

    fibo_list.append([fibo_list[k][0] + fibo_list[k + 1][0], fibo_list[k][1] + fibo_list[k + 1][1]])
    fibo_dp(n, k + 1)

T = int(input())

for tc in range(1, T+1):
    n = int(input())
    fibo_list = [[1, 0], [0, 1]]
    fibo_dp(n, 0)
    print(*fibo_list[n])