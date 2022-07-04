'''
4 7
20 15 10 17
'''

import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline

N, M = map(int, input().split())
tree = list(map(int, input().split()))

start = 0
end = 2000000000

while start <= end:
    tree_length = 0
    mid = (start + end) // 2

    for t in tree:
        length = t - mid

        if length > 0:
            tree_length += length

    if tree_length < M:
        end = mid - 1
    else:
        start = mid + 1  

print(start - 1)

