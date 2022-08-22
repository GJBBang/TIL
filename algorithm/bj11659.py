'''
5 3
5 4 3 2 1
1 3
2 4
5 5
'''

import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline

N, M = map(int, input().split())
numbers = list(map(int, input().split()))

sum_numbers = []
sum_numbers.append(numbers[0])
for i in range(1, N):
    sum_numbers.append(sum_numbers[i - 1] + numbers[i])

for _ in range(M):
    i, j = map(int, input().split())
    if i == 1:
        print(sum_numbers[j - 1])
    else:
        print(sum_numbers[j - 1] - sum_numbers[i - 2])
