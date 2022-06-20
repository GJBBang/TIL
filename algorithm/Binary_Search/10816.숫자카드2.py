import sys
sys.stdin = open("input.txt")

from bisect import bisect_left, bisect_right

N = input()
sang_geun = list(map(int, sys.stdin.readline().split()))
sang_geun.sort()
M = int(input())
num_list = list(map(int, sys.stdin.readline().split()))

for i in range(M):
    right_index = bisect_right(sang_geun, num_list[i])
    left_index = bisect_left(sang_geun, num_list[i])
    print(right_index - left_index, end=" ")
