import sys
sys.stdin = open("input.txt")

N = int(input())

if N <= 5:
    print(N)
else:
    quotient = N // 2
    remainder = N % 2

    print(N + quotient - 2 + remainder)