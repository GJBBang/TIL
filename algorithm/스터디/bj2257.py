import sys
sys.stdin = open("input.txt")

def check_mass_list(temp):
    global total_mass

    if len(mass):
            mass[-1] += temp
    else:
        total_mass += temp


form = list(input())
total_mass = 0
multiple = [0] * 50
mass = []

element_list = ["H", "C", "O"]
element_mass = [1, 12, 16]

count = 0
while len(form):
    char = form.pop()
    ## 원소 일 때
    if char in element_list:
        temp = element_mass[element_list.index(char)]
        check_mass_list(temp)
    elif char == "(":
        temp = mass.pop()
        count -= 1
        if multiple[count]:
            temp *= multiple[count]
            multiple[count] = 0
        check_mass_list(temp)
    elif char == ")":
        mass.append(0)
        count += 1
    ## 숫자 일 때
    else:
        if form[-1] == ")":
            multiple[count] = int(char)
        else:
            temp = element_mass[element_list.index(form.pop())] * int(char)
            check_mass_list(temp)

print(total_mass)