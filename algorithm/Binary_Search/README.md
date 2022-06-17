# ✌ 이분 탐색 / 이진 탐색 (Binary Search)



> **Binary Search 란**
>
>  오름차순으로 정렬된 정수의 리스트를 같은 크기의 두 부분 리스트로 나누고 필요한 부분에서만 탐색하도록 제한하여 원하는 원소를 찾는 알고리즘이다. 리스트의 중간 부분에 찾는 원소가 있는지 확인하고, 없으면 위쪽에 있는지 아래쪽에 있는지 판단하여 맨 앞부터 검색하거나 중간부터 검색한다.



![BinarySearch](https://user-images.githubusercontent.com/97500667/174205232-29242f01-f568-49ed-85cb-195f96438866.gif)

- **정렬되어 있는 리스트**에서 탐색 범위를 절반씩 좁혀가며 데이터를 탐색하는 방법
- 배열이 <u>**정렬되어 있어야만**</u> 사용할 수 있는 알고리즘
- 3개의 변수(start, mid, end)를  사용하여 찾고자 하는 데이터와 중간점(mid) 데이터를 반복적으로 비교하며 원하는 데이터를 찾는 것
- 시간복잡도 O (logN)



### Binary Search 코드 (파이썬)

```python
## 재귀 함수
def binary_search(arr, target, start, end):
    if start > end:
        return None
    
    mid = (start + end) // 2    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, end)
   	else:
        return binary_search(arr, target, start, end - 1)
    
## 반복문
def binary_search(arr, target, start, end):
    while start <= end:
        mid = (start + end) // 2        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            start = mid + 1
        else:
            end = mid - 1
```



### Binary Search 코드 (자바스크립트)

```javascript
// 반복문
def binarySearch = (arr, target, start, end) => {
    let mid = 0;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        if (arr[mid] === target) {
            return mid;
        } elif (arr[mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
}
```



#### ✨ (추가) Python 이진 탐색 라이브러리

python에서 **bisect**라는 이진 탐색 라이브러리(모듈)을 지원한다.

- bisect_left(arr, x) => 정렬된 순서를 유지하면서 리스트 arr에 데이터 x를 삽입할 가장 왼쪽 인덱스를 찾는 메소드
- bisect_right(arr, x) => 정렬된 순서를 유지하면서 리스트 arr에 데이터 x를 삽입할 가장 오른쪽 인덱스를 찾는 메소드

```python
from bisect import bisect_left, bisect_right

arr = [1, 1, 3, 5, 8, 9, 9, 11, 13, 14]
x = 9

print(bisect_left(arr, x))
>> 5
# 리스트 arr에서 9를 삽입할 가장 왼쪽 인덱스는 5이다.
print(bisect_right(arr, x))
>> 7
# 리스트 arr에서 9를 삽입할 가장 오른쪽 인덱스는 7이다.


## 정렬된 리스트에서 특정 범위에 속하는 원소의 개수를 구할 때 용이하다.
def count_by_range(arr, left_value, right_value):
    right_index = bisect_right(arr, right_value)
    left_index = bisect_left(arr, left_value)
    return right_index - left_index

print(count_by_range(arr, 3, 13))
>> 7
# 리스트 arr에서 3 ~ 13 사이의 값은 총 7개 존재한다.
```

