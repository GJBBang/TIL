import sys
sys.stdin = open("input.txt")

s, c = map(int, input().split())

green_onion = []
for _ in range(s):
    green_onion.append(int(input()))

