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
sys.stdin = open("input.txt")

def dfs(x):
    if num == arr[x - 1]:
        result.append(num)
    else:
        if not visited[arr[x - 1]]:
            visited[arr[x - 1]] = 1
            dfs(arr[x - 1])
            visited[arr[x - 1]] = 0
        else:
            return


input = sys.stdin.readline

N = int(input())
arr = []
for _ in range(N):
    arr.append(int(input()))

new_arr = list(set(arr))
result = []
visited = [0] * (N + 1)

for i in new_arr:
    num = i
    visited[i] = 1
    dfs(i)
    visited[i] = 0

print(len(result))
print(*result, sep="\n")