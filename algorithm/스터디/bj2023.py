'''
4
'''

import sys
sys.stdin = open("input.txt")

def check_prime_number(number):
    for i in range(2, number):
        if not (number % i):
            return False    
    return True


def find_prime_number(num):
    if len(str(num)) == N:
        print(num)
        return

    for i in [1, 3, 7, 9]:
        if check_prime_number(num * 10 + i):
            find_prime_number(num * 10 + i)    


N = int(input())

for n in [2, 3, 5, 7]:
    find_prime_number(n)
