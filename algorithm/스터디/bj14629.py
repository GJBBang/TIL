import sys
sys.stdin = open("input.txt")

N = input()
length = len(N)
N = int(N)

visited = [0] * 10
result = 9876543210
number = ["0"] * length

def check(k):
    global result
    
    if k == length:
        if abs(N - result) > abs(N - int("".join(number))):
            result = int("".join(number))
        return
        
    for i in range(10):
        if visited[i] == 0:
            number[k] = str(i)
            visited[i] = 1
            check(k + 1)
            number[k] = "0"
            visited[i] = 0

if N >= 9876543210:
    print(9876543210)
else:
    check(0)
print(result)