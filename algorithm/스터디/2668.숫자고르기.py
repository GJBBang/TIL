'''
7
3
1
1
5
5
4
6
'''

import sys

from matplotlib.pyplot import flag
sys.stdin = open("input.txt")

input = sys.stdin.readline

N = int(input())
arr = []
for _ in range(N):
    arr.append(int(input()))
