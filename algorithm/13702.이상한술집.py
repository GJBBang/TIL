import sys
sys.stdin = open("input.txt")

N, K = map(int, input().split())
makgeolli = []
for _ in range(N):
    makgeolli.append(int(input()))

left, right = 0, 2 ** 31 - 1

while left <= right:

    mid = (left + right) // 2
    cnt = 0
    for i in range(N):
        cnt += makgeolli[i] // mid
    
    if cnt < K:
        right = mid - 1
    else:
        left = mid + 1

print(right)