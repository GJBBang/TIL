import sys
sys.stdin = open("input.txt")

N = input()
length = len(N)
visited = [0] * 10
result = 9876543210
number = ["0"] * length

def check(k):
    global result

    if k != 0 and abs(int(N) - result) < abs(int(N) - int("".join(number))):
        return
    
    if k == length:
        result = int("".join(number))
        print(result)
        return
        
    for i in range(9, -1, -1):
        if visited[i] == 0:
            number[k] = str(i)
            visited[i] = 1
            check(k + 1)
            number[k] = "0"
            visited[i] = 0

check(0)
print(result)