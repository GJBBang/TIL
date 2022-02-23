import requests
import re
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}

for i in range(1, 5):
    url = 'https://www.coupang.com/np/search?q=%EC%BB%B4%ED%93%A8%ED%84%B0&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page={}&rocketAll=false&searchIndexingToken=1=6&backgroundColor='.format(i)
    res = requests.get(url, headers=headers)
    res.raise_for_status() # 에러시 프로그램 종료
    soup = BeautifulSoup(res.text, 'lxml')

    items = soup.find_all('li', attrs={'class':re.compile('search-product')})
    for item in items:
        # 이름
        name = item.find('div', attrs={'class':'name'}).get_text()
        # 가격
        price = item.find('strong', attrs={'class':'price-value'}).get_text()
        # 평점
        rate = item.find('em', attrs={'class':'rating'})
        # 평점 없는 제품 예외 처리
        if rate:
            rate = rate.get_text()
        else:
            rate = '평점이 없는 제품 입니다.'
        # 리뷰 수
        review_cnt = item.find('span', attrs={'class':'rating-total-count'})
        # 리뷰 없는 제품 예외 처리
        if review_cnt:
            review_cnt = review_cnt.get_text()[1:-1]
        else:
            review_cnt = '리뷰가 없는 제품 입니다.'
        # 리뷰 50개 이상만 출력
        if int(review_cnt) >= 50:
            print(f'제품명 : {name}')
            print(f'가격 : {price}')
            print(f'평점 : {rate}')
            print(f'리뷰 수 : {review_cnt}')