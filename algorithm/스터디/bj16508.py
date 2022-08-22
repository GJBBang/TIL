import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline
T = input().rstrip()
N = int(input())
arr = []
for _ in range(N):
    cost, name = input().rstrip().split(" ")
    arr.append([int(cost), name])
visited = [0] * N
visited_word = [[0] * len(arr[i][1]) for i in range(N)]

def find(k, sum_cost):
    global result

    if result <= sum_cost:
        return

    if k == len(T):
        if result > sum_cost:
            result = sum_cost
        return
    
    for i in range(N):
        for j in range(len(arr[i][1])):
            if T[k] == arr[i][1][j] and not visited_word[i][j]:
                visited_word[i][j] = 1
                if visited[i]:
                    find(k + 1, sum_cost)
                else:
                    visited[i] = 1
                    find(k + 1, sum_cost + arr[i][0])
                    visited[i] = 0
                visited_word[i][j] = 0
    

result = 987654321
find(0, 0)

if result == 987654321:
    print(-1)
else:
    print(result)