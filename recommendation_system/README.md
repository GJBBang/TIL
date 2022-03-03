# 추천 시스템 정리

  

추천 시스템은 기본적으로 <u>**콘텐츠 기반 필터링 (content based filtering)**</u> 방식과 <u>**협업 필터링 (collaborative filtering)**</u> 방식이 있다.  

  

추가적으로 딥러닝(deep learning) 등을 활용한 추천 방식과 하이브리드(Hybrid) 방식도 있다.  

  

### 콘텐츠 기반 필터링 (content based filtering)

  

콘텐츠 기반 필터링 방식은 사용자가 특정 아이템을 선호하는 경우 해당 아이템과 비슷한 아이템을 추천해주는 방식이다.  



<img src='https://tech.kakao.com/wp-content/uploads/2022/01/%E1%84%80%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B71.png' width='600' height='300'>

단순한 아이디어로 추천 시스템 초반에 많이 사용했다.  

추천 로직을 예로 들면 사용자가 <u>돼지고기가 들어간 음식 A</u>를 좋아한다고 했다면 <u>돼지고기가 들어간 음식 B</u>를 추천해주는 방식이다.  

정확도가 떨어지기 때문에 요즘에는 잘 사용하지 않는다.  

  

### 협업 필터링 (collaborative filtering)

  

실생활에서 새로운 음식점이 생기거나, 영화가 개봉하는 등 새로운 무언가 생겼을 때 다른 사람들의 평점이나 리뷰를 들어본 뒤 선택하는 경우가 많다. (시간 낭비, 돈 낭비를 하지 않기 위해)  

  

이처럼 사용자가 아이템에 매긴 평점, 리뷰 등의 사용자 **행동 양식(user behavior)** 을 기반으로 추천하는 것이 협업 필터링이다.  

  

이러한 협업 필터링은 메모리 기반 (memory based) (혹은 최근접 이웃 기반 협업 필터링 nearest neighbor collaborative filtering) 협업 필터링과 잠재 요인 협업 필터링 (latent factor collaborative filtering) 으로 나뉘어진다.  

  

#### 1. 최근접 이웃 기반 협업 필터링 (nearest neighbor collaborative filtering)

  

최근접 이웃 기반 협업 필터링은 사용자-아이템 행렬에서 사용자가 아직 평가하지 않은 아이템을 예측하는 것이 목표이다.  

  

<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXXq0r2XQ8OYRofmiDOM2WBUQECa4DQ_XZQ&usqp=CAU' width='500'>

  

위 그림처럼 user1 은 Item2 와 Item4 에 대한 평가를 내리지 않았으므로 이를 어떻게 평가할 지 예측하는 것이다.  

  

이처럼 최근접 이웃 기반 협업 필터링은 사용자-아이템 평점 행렬과 같은 모습을 가지고 있어야한다. 따라서 column은 아이템이 되어야하고 row는 user가 되어야 하는 듯한 모습을 가지고 있어야한다.  

  

<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVPgxs3ix3HoMDIV_6t1RXLWE8Nix5cFvAw&usqp=CAU' width='750' height='400'>

  

그렇기 때문에 위 그림의 왼쪽 사진과 같이 데이터가 주어지면 오른쪽과 같이 데이터를 변경해주어야 한다.  

  

이러한 테이블 변경은 **Python pandas에서 pivot table**로 지원해준다.  

  

하지만 오른쪽 그림의 테이블 모습에서 알 수 있듯이 공간 낭비가 심해지는 문제가 발생한다. 그림에서는 4개의 아이템 뿐이지만 만약 유튜브나 넷플릭스와 같은 서비스에서 영상 아이템이 수만개에서 수억개가 될텐데 사용자가 이러한 영상을 다 봤을리가 없기 때문이다.  

  

이러한 최근접 이웃 기반 협업 필터링은 사용자 기반 협업 필터링(user based collaborative filtering) 과 아이템 기반 협업 필터링(item based collaborative filtering) 으로 또 다시 2가지로 나뉘어진다.  

  

##### 1-1. 사용자 기반 협업 필터링(user based collaborative filtering)

  

사용자 기반 : 비슷한 고객들이 OO한 Item을 소비했다.  

|       |              ItemA               |              ItemB               |              ItemC               |                    ItemD                    |                    ItemE                    |
| :---: | :------------------------------: | :------------------------------: | :------------------------------: | :-----------------------------------------: | :-----------------------------------------: |
| user1 | <span style='color:red'>3</span> | <span style='color:red'>4</span> | <span style='color:red'>4</span> | <span style='color:#c0c0c0'>3 (예상)</span> |                      1                      |
| user2 | <span style='color:red'>4</span> | <span style='color:red'>4</span> | <span style='color:red'>4</span> |                      3                      | <span style='color:#c0c0c0'>1 (예상)</span> |
| user3 |                1                 |                1                 |                2                 |                      5                      |                                             |

위 테이블에서 user1 과 user2 는 ItemA 에서 ItemC 까지의 평점이 비슷하기 때문에 user1 과 user2 는 유사도가 높다고 판단할 수 있다. 따라서 user1 의 경우 ItemD 의 평점을 3점으로 예상할 수 있고 user2 의 경우 ItemE 의 평점을 1점으로 예상할 수 있다.  

  

##### 1-2. 아이템 기반 협업 필터링(item based collaborative filtering)

  

아이템 기반 : OO한 Item을 소비한 고객들은 다음과 같은 상품도 구매했다.  

|       |              user1               |              user2               |              user3               |                    user4                    |                    user5                    |
| :---: | :------------------------------: | :------------------------------: | :------------------------------: | :-----------------------------------------: | :-----------------------------------------: |
| ItemA | <span style='color:red'>5</span> | <span style='color:red'>4</span> | <span style='color:red'>4</span> | <span style='color:#c0c0c0'>5 (예상)</span> |                      5                      |
| ItemB | <span style='color:red'>4</span> | <span style='color:red'>4</span> | <span style='color:red'>4</span> |                      5                      | <span style='color:#c0c0c0'>5 (예상)</span> |
| ItemC |                1                 |                1                 |                2                 |                      3                      |                                             |

사용자 기반 협업 필터링과 다르게 Item-user 행렬을 가지고 있다.  

ItemA 과 ItemB 는 비슷한 평점 분포를 가지고 있다. 따라서 ItemA 와 ItemB 는 유사도가 높다고 판단할 수 있다. 그래서 user4 에게 ItemA 를 user5 에게 ItemB 를 추천해준다.  

  

일반적으로 사용자 기반 협업 필터링보다 아이템 기반 협업 필터링이 좀 더 정확도가 높다.  

  

그 이유로 비슷한 상품을 좋아한다고 취향이 비슷한건 아니라는 의견이 많다.  

  

따라서 최근접 이웃 기반 협업 필터링을 사용할 때는 아이템 기반 협업 필터링을 많이 사용한다고 한다.  

  

#### 2. 잠재 요인 협업 필터링 (latent factor collaborative filtering)

