import sys
sys.stdin = open("input.txt")

N, Q = map(int, sys.stdin.readline().rstrip().split())

a = list(map(int, sys.stdin.readline().rstrip().split()))
a.sort()

for i in range(1, N):
    a[i] += a[i - 1]

for _ in range(Q):
    L, R = map(int, sys.stdin.readline().rstrip().split())
    if L == 1:
        print(a[R - 1])
    else:
        print(a[R - 1] - a[L - 2])