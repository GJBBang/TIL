from cgi import print_arguments
import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline
N = int(input().rstrip())
innings = [list(map(int, input().split())) for _ in range(N)]

visited = [0] * 10
hitter = [0] * 8
visited[1] = 1

def test(k):
    if k == 8:
        print(hitter)
        return

    for i in range(1, 10):
        if not visited[i]:
            visited[i] = 1
            hitter[k] = i
            test(k + 1)
            visited[i] = 0

test(0)