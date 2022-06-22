import sys
sys.stdin = open("input.txt")

def find(x, y):
    global result

    if result == "happy":
        return

    if abs(arr[-1][0] - x) + abs(arr[-1][1] - y) <= 1000:
        result = "happy"
        return
    
    for i in range(1, n + 1):
        if not visited[i] and abs(arr[i][0] - x) + abs(arr[i][1] - y) <= 1000:
            visited[i] = 1
            find(arr[i][0], arr[i][1])
            visited[i] = 0


input = sys.stdin.readline
t = int(input())
for tc in range(t):
    n = int(input())
    arr = []
    for _ in range(n + 2):
        x, y = map(int, input().split())
        arr.append((x, y))
    
    result = "sad"
    visited = [0] * (n + 1)
    find(arr[0][0], arr[0][1])
    print(result)