import sys
sys.stdin = open("input.txt")

K, N = map(int, sys.stdin.readline().rstrip().split())
arr = []

for _ in range(K):
    arr.append(int(sys.stdin.readline().rstrip()))

start, end = 1, 2 ** 31 - 1
while start <= end:
    count = 0
    mid = (start + end) // 2

    for num in arr:
        count += num // mid
    
    if count < N:
        end = mid - 1
    else:
        start = mid + 1

print(end)