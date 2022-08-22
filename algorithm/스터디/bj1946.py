import sys
sys.stdin = open("input.txt")

input = sys.stdin.readline

T = int(input())

for tc in range(1, T + 1):
    N = int(input())
    applicant = []
    for _ in range(N):
        grade = list(map(int, input().split()))
        applicant.append(grade)
    
    applicant.sort()
    start = applicant[0][1]
    cnt = 1
    for i in range(1, N):
        if start > applicant[i][1]:
            start = applicant[i][1]
            cnt += 1
    
    print(cnt)
