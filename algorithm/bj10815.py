'''
5
6 3 2 10 -10
8
10 9 -5 2 3 4 5 -10
'''

import sys
sys.stdin = open("input.txt")

N = int(input())
arr = list(map(int, input().split()))
arr.sort()

M = int(input())
numbers = list(map(int, input().split()))

# def binary_search(num):
#     start = 0
#     end = N - 1

#     while start <= end:
#         mid = (start + end) // 2

#         if arr[mid] == num:
#             return 1

#         if arr[mid] > num:
#             end = mid - 1
#         else:
#             start = mid + 1

#     return 0

# for num in numbers:
#     print(binary_search(num), end=" ")

# bisect 라이브러리 사용 
from bisect import bisect_left

for num in numbers:
    index = bisect_left(arr, num)
    if index + 1 > N:
        print(0, end=" ")
    elif arr[index] == num:
        print(1, end=" ")
    else:
        print(0, end=" ")