'''
3
3 3 0 1
4 2 1 3
4 2 2 1
'''

import sys
sys.stdin = open("input.txt")

# from collections import deque

# def find(x, y, k, q):
#     if k == g:
#         return

#     dxx = [0, -1, 0, 1]
#     dyy = [-1, 0, 1, 0]
#     dd = [1, 2, 3, 0]

#     i, j = x, y
#     d_arr = list(q)
#     for n in d_arr:
#         i += dxx[n]
#         j += dyy[n]
#         arr[j][i] = 1
#         q.appendleft(dd[n])
    
#     find(i, j, k + 1, q)


# input = sys.stdin.readline

# N = int(input())

# arr = [[0] * 101 for _ in range(101)]
# dx = [1, 0, -1, 0]
# dy = [0, -1, 0, 1]
# for _ in range(N):
#     x, y, d, g = map(int, input().split())
#     q = deque()
#     q.append(d)
#     arr[y][x] = arr[y + dy[d]][x + dx[d]] = 1
#     find(x + dx[d], y + dy[d], 0, q)

# result = 0
# for i in range(100):
#     for j in range(100):
#         if arr[i][j] and arr[i + 1][j] and arr[i + 1][j + 1] and arr[i][j + 1]:
#             result += 1

# print(result)

##
a=[[0]*101 for _ in range(101)]
dr=[[0]]
for _ in range(10):
  dr.append(dr[-1]+[i+1 for i in dr[-1][::-1]])
dx=[1,0,-1,0]
dy=[0,-1,0,1]
for _ in range(int(input())):
  x,y,d,g=map(int,input().split())
  a[x][y]=1
  for k in dr[g]:
    x+=dx[(d+k)%4]
    y+=dy[(d+k)%4]
    a[x][y]=1
cnt=0
for i in range(100):
  for j in range(100):
    if a[i][j] and a[i][j+1] and a[i+1][j] and a[i+1][j+1]:
      cnt+=1
print(cnt)