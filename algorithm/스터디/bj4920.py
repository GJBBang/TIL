import sys
sys.stdin = open("input.txt")

def check(x, y):
    global result

    # ㅡ 체크
    fir_d = [[0, 1], [0, 2], [0, 3]]
    temp1 = arr[x][y]
    temp2 = arr[x][y]
    cnt1 = 0
    cnt2 = 0
    for i in range(3):
        if 0 <= x + fir_d[i][0] < N and 0 <= y + fir_d[i][1] < N:
            temp1 += arr[x + fir_d[i][0]][y + fir_d[i][1]]
            cnt1 += 1

        if 0 <= x + fir_d[i][1] < N and 0 <= y + fir_d[i][0] < N:
            temp2 += arr[x + fir_d[i][1]][y + fir_d[i][0]]
            cnt2 += 1
        
        if cnt1 == 3 and result < temp1:
            result = temp1
        
        if cnt2 == 3 and result < temp2:
            result = temp2
    # ㄹ 체크
    sec_d = [[0, 1], [1, 1], [1, 2]]
    temp1 = arr[x][y]
    temp2 = arr[x][y]
    cnt1 = 0
    cnt2 = 0
    for i in range(3):
        if 0 <= x + sec_d[i][0] < N and 0 <= y + sec_d[i][1] < N:
            temp1 += arr[x + sec_d[i][0]][y + sec_d[i][1]]
            cnt1 += 1

        if 0 <= x - sec_d[i][1] < N and 0 <= y + sec_d[i][0] < N:
            temp2 += arr[x - sec_d[i][1]][y + sec_d[i][0]]
            cnt2 += 1

        if cnt1 == 3 and result < temp1:
            result = temp1
        
        if cnt2 == 3 and result < temp2:
            result = temp2
    # ㄱ 체크
    thir_d = [[0, 1], [0, 2], [1, 2]]
    temp1 = arr[x][y]
    temp2 = arr[x][y]
    temp3 = arr[x][y]
    temp4 = arr[x][y]
    cnt1 = 0
    cnt2 = 0
    cnt3 = 0
    cnt4 = 0
    for i in range(3):
        if 0 <= x + thir_d[i][0] < N and 0 <= y + thir_d[i][1] < N:
            temp1 += arr[x + thir_d[i][0]][y + thir_d[i][1]]
            cnt1 += 1

        if 0 <= x - thir_d[i][1] < N and 0 <= y + thir_d[i][0] < N:
            temp2 += arr[x - thir_d[i][1]][y + thir_d[i][0]]
            cnt2 += 1
        
        if 0 <= x - thir_d[i][0] < N and 0 <= y - thir_d[i][1] < N:
            temp3 += arr[x - thir_d[i][0]][y - thir_d[i][1]]
            cnt3 += 1
        
        if 0 <= x + thir_d[i][1] < N and 0 <= y - thir_d[i][0] < N:
            temp4 += arr[x + thir_d[i][1]][y - thir_d[i][0]]
            cnt4 += 1

        if cnt1 == 3 and result < temp1:
            result = temp1
        
        if cnt2 == 3 and result < temp2:
            result = temp2
        
        if cnt3 == 3 and result < temp3:
            result = temp3
        
        if cnt4 == 3 and result < temp4:
            result = temp4
    # ㅗ 체크
    four_d = [[0, 1], [0, 2], [1, 1]]
    temp1 = arr[x][y]
    temp2 = arr[x][y]
    temp3 = arr[x][y]
    temp4 = arr[x][y]
    cnt1 = 0
    cnt2 = 0
    cnt3 = 0
    cnt4 = 0
    for i in range(3):
        if 0 <= x + four_d[i][0] < N and 0 <= y + four_d[i][1] < N:
            temp1 += arr[x + four_d[i][0]][y + four_d[i][1]]
            cnt1 += 1

        if 0 <= x - four_d[i][1] < N and 0 <= y + four_d[i][0] < N:
            temp2 += arr[x - four_d[i][1]][y + four_d[i][0]]
            cnt2 += 1

        if 0 <= x - four_d[i][0] < N and 0 <= y - four_d[i][1] < N:
            temp3 += arr[x - four_d[i][0]][y - four_d[i][1]]
            cnt3 += 1
        
        if 0 <= x + four_d[i][1] < N and 0 <= y - four_d[i][0] < N:
            temp4 += arr[x + four_d[i][1]][y - four_d[i][0]]
            cnt4 += 1

        if cnt1 == 3 and result < temp1:
            result = temp1
        
        if cnt2 == 3 and result < temp2:
            result = temp2
        
        if cnt3 == 3 and result < temp3:
            result = temp3
        
        if cnt4 == 3 and result < temp4:
            result = temp4
    # ㅁ 체크
    fift_d = [[0, 1], [1, 1], [1, 0]]
    temp1 = arr[x][y]
    cnt1 = 0
    for i in range(3):
        if 0 <= x + fift_d[i][0] < N and 0 <= y + fift_d[i][1] < N:
            temp1 += arr[x + fift_d[i][0]][y + fift_d[i][1]]
            cnt1 += 1
        
        if cnt1 == 3 and result < temp1:
            result = temp1


input = sys.stdin.readline

tc = 0
while True:
    N = int(input())
    if not N:
        break
    tc += 1
    arr = [list(map(int, input().split())) for _ in range(N)]

    result = -10000000
    for i in range(N):
        for j in range(N):
            check(i, j)

    print(f"{tc}. {result}")