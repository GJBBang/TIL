import sys
sys.stdin = open("input.txt")

S, C = map(int, input().split())

green_onion = []
total_length = 0
for _ in range(S):
    length = int(input())
    total_length += length
    green_onion.append(length)

left, right = 1, 1000000000

while left <= right:
    mid = (left + right) // 2
    cnt = 0

    for i in range(S):
        cnt += green_onion[i] // mid
    
    if cnt < C:
        right = mid - 1
    else:
        left = mid + 1

print(total_length - right * C)
