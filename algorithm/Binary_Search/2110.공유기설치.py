'''
5 3
1
2
8
4
9
'''

import sys
sys.stdin = open("input.txt")

def check(num):
    last_location = house[0]
    cnt = 1

    for i in range(1, N):
        if house[i] - last_location >= num:
            last_location = house[i]
            cnt += 1
    
    return cnt


input = sys.stdin.readline

N, C = map(int, input().split())
house = []
for _ in range(N):
    house.append(int(input()))
house.sort()

start = 0
end = 1000000000

while start < end:
    mid = (start + end) // 2

    if check(mid) < C:
        end = mid
    else:
        start = mid + 1

print(start - 1)