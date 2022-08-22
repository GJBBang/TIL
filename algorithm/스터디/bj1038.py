'''
18
'''

import sys
sys.stdin = open("input.txt")

def decreasing_number(x, num, n, k):

    if x == k:
        dp.append(num)
    
    for i in range(n):
        decreasing_number(x + 1, num * 10 + i, i, k)
        

N = int(input())

dp = []
for k in range(1, 11):
    decreasing_number(0, 0, 10, k)

if N < 1023:
    print(dp[N])
else:
    print(-1)