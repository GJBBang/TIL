# 👉 우선순위 큐 (Priority Queue)

</br>

> **우선순위 큐**는 우선순위가 가장 높은 데이터를 가장 먼저 삭제하는 자료구조

</br>

#### 우선순위 큐를 구현하는 방법

1. 리스트 기반 구현
2. 연결 리스트 기반 구현
3. **힙 기반 구현**

여기서 리스트 및 연결 리스트 기반으로 구현하게 될 경우 data의 양이 많아지게 되면 연산 양이 많아지고 시간 및 비용이 매우 커진다.

따라서 보통 우선순위 큐는 **힙(Heap)**을 이용하여 구현한다.

</br>

### 힙(Heap)

> 우선순위 큐를 구현하기 위해 고안된 자료구조. **완전 이진 트리**의 형태를 가지고 있다.

</br>

#### 힙의 종류

1.  최대 힙(Max Heap)
   - 루트 노드가 가장 큰 값을 가진다. 따라서 가장 큰 데이터가 우선적으로 제거된다.
2.  최소 힙(Min Heap)
   - 루트 노드가 가장 작은 값을 가진다. 따라서 가장 작은 데이터가 우선적으로 제거된다.

![최대최소힙](https://user-images.githubusercontent.com/97500667/174730302-cd94fc3a-378f-4fd6-bd54-8eeb1bfa5e5e.png)

#### 힙의 삽입 (최대 힙)

1. 마지막 단말 노드에 데이터를 삽입한다.
2. 부모 노드와 비교하며 부모 노드보다 자신이 크다면 부모와 자신의 위치를 swap한다.
3. 2번 조건을 만족하지 않거나 자신이 루트 노드가 될 때 까지 반복한다.

![최대힙삽입](https://user-images.githubusercontent.com/97500667/174731742-f5cdbc0e-f3d4-4646-b0aa-5824553405b7.png)

#### 힙의 삭제 (최대 힙)

1. 루트 노드 데이터 삭제한다.
2. 마지막 단말 노드 데이터를 루트 노드 자리에 대체한다.
3. 대체 된 루트 노드부터 자식 노드와 비교하며 힙 재구조화 과정을 수행한다.

![최대힙삭제](https://user-images.githubusercontent.com/97500667/174732283-cfb10201-16d7-422b-b77d-f68b290ae9f9.png)

#### 시간복잡도(O)

N개의 원소로 힙을 구성하는 과정(build heap)은 O(NlogN)의 시간 복잡도를 가진다.

원소 하나를 삽입 및 삭제한 후 재구조화(heapify)를 진행하는 것은 O(logN)의 시간 복잡도를 가진다. 이 과정이 원소의 개수만큼 반복되므로 결국 O(NlogN)의 시간 복잡도를 가진다.

따라서 힙 정렬은 **O(NlogN) + O(NlogN) = O(NlogN)**의 시간 복잡도를 가진다.

</br>

### Heap 코드 (파이썬)

파이썬의 경우 우선순위 큐 **PriorityQueue** 와 최소 힙 **heapq** 을 모듈로 제공하고 있다.

```python
from queue import PriorityQueue

q = PriorityQueue()
q1 = PriorityQueue(maxsize=10) # maxsize를 활용하여 크기 제한 가능

# .put(item) 원소 넣기
q.put(3)
q.put(4)
q.put(2)
q.put(8)

q1.put((1, "apple")) # (우선순위, 값)의 형태로 저장할 수 있다.

# .get() 원소 삭제 및 반환
q.get()
q.get()
q.get()
>> 2
>> 3
>> 4
q1.get()[1] # (우선순위, 값)의 형태에서 값 반환
```

```python
import heapq
hq = []

# push >> heapq.heappush(heap, item) > 힙의 형태를 유지하면서 item을 push
heapq.heappush(hq, 4)
heapq.heappush(hq, 1)
heapq.heappush(hq, 3)
heapq.heappush(hq, 7)

# pop >> heapq.heappop(heap) > 힙의 형태를 위지하면서 가장 작은 항목을 제거 및 반환
# 비어있을 시 IndexError 발생
# 반환하지 않고 접근하고 싶을 때 heap[0] 활용
heapq.heappop(hq)
>> 1

# heapify >> heapq.heapify(x) > 리스트 x를 선형 시간으로 제자리에서 heap으로 변환
x = [4, 3, 1, 2, 5, 6]
print(x)
>> [4, 3, 1, 2, 5, 6]
heapq.heapify(x)
print(x)
>> [1, 2, 4, 3, 5, 6]
```

PriorityQueue 보다 heapq가 더 빠르기 때문에 heapq를 많이 사용한다.

#### heapq를 활용하여 최대 힙 구현

```python
import heapq
hq = []

x = [4, 3, 1, 2, 5, 6]

for value in x:
    heapq.heappush(hq, (-value, value))

print(heapq.heappop(hq)[1])
print(heapq.heappop(hq)[1])
>> 6
>> 5
```

heap에 원소를 넣을 때 **가짜 우선순위와 실제 우선순위를 넣어준다.** 따라서 가짜 우선순위 기준으로 최소 힙이 구성되고 꺼낼 때는 실제 우선순위로 꺼내면 최대힙을 사용한 것과 같은 결과를 얻을 수 있다.

```python
hq = [(-6, 6), (-5, 5), (-4, 4), (-3, 3), (-2, 2), (-1, 1)]
```

