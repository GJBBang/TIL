'''
3
1030 1300
1900 2110
1230 1650
'''

import sys
sys.stdin = open("input.txt")

def time(s, l):
    s_h = s // 100
    s_m = s % 100
    l_h = l // 100
    l_m = l % 100

    if s_m > l_m:
        h = l_h - s_h - 1
        m = l_m - s_m + 60
    else:
        h = l_h - s_h
        m = l_m - s_m
    
    return h * 60 + m


input = sys.stdin.readline

N = int(input())
arr = []
for _ in range(N):
    arr.append(list(map(int, input().split())))
arr.sort()

start = 1000
end = 2200
result = 0

for i in range(N):
    temp = time(start, arr[i][0])
    if i == 0:
        if temp > 10 and result < temp - 10:
            result = temp - 10
        start = arr[i][1]
    else:
        if arr[i][0] > start:
            if temp > 20 and result < temp - 20:
                result = temp - 20
            start = arr[i][1]
        elif arr[i][0] < start and arr[i][1] > start:
            start = arr[i][1]

temp = time(arr[-1][1], end)
if temp > 10 and result < temp - 10:
    result = temp - 10
           
print(result)