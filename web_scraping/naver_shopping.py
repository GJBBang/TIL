import requests
import re
from bs4 import BeautifulSoup
import csv

filename = '향수리뷰.csv'
f = open(filename, 'w', encoding='utf-8-sig', newline='')
writer = csv.writer(f)

table_title = ['향수명', '등록일', '주요제품특징', '종류', '성별', '타입', '메인향', '네이버쇼핑url', '가격(최저가)', '이미지url', '리뷰내용', '리뷰등록일']
writer.writerow(table_title)

headers = {'User-Agent':'x'}
url = 'https://search.shopping.naver.com/catalog/22856706427?query=%ED%96%A5%EC%88%98&NaPm=ct%3Dl00hcc2g%7Cci%3De4ed91390f6a9fe5390423398a47671c35c08310%7Ctr%3Dslsl%7Csn%3D95694%7Chk%3D824f8beb80620eb1c2aa31ed2efe1f5b0c34a93e'
res = requests.get(url, headers=headers)
res.raise_for_status()
soup = BeautifulSoup(res.text, 'lxml')

info = soup.find('div', attrs={'class':'top_summary_title__15yAr'})

name = info.find('h2').get_text()
# rate = info.find('div', attrs={'class':'top_grade__3jjdl'}).get_text()[2:]
# print(rate)

detail_info = info.find_all('span', attrs={'class':re.compile('top_cell__3DnEV')})

made_by = ''
brand = ''
regi_date = ''
gender = ''
main_char = ''
perfume_category = ''
perfume_type = ''
main_scent = ''

for detail in detail_info:
    if detail.find('span', attrs={'class':'top_brand__1Q2zO'}):
        continue
    inner_text = detail.get_text()
    if '제조사' in inner_text:
        made_by = detail.find('em').get_text()
        # print(made_by)
    # if '브랜드' in detail.get_text():
    #     print(detail.find('em'))
    #     brand = detail.find('em').get_text()
        # print(brand)
    if '등록일' in inner_text:
        regi_date = detail.find('em').get_text()
        # print(regi_date)
    elif '주요제품특징' in inner_text:
        main_char = inner_text[9:]
        # print(main_char)
    elif '종류' in inner_text:
        perfume_category = inner_text[5:]
        # print(perfume_category)
    elif '성별' in inner_text:
        gender = inner_text[5:]
        # print(gender)
    elif '타입' in inner_text:
        perfume_type = inner_text[5:]
        # print(perfume_type)
    elif '메인향' in inner_text:
        main_scent = inner_text[6:]
        # print(main_scent)

price = soup.find('em', attrs={'class':'lowestPrice_num__3AlQ-'}).get_text()
img_url = soup.find('div', attrs={'class':'image_thumb__20xyr'}).img['src']

review_items = soup.find('ul', attrs={'class':'reviewItems_list_review__1sgcJ'})

review_regi_date = ''
review_content = ''

for review_item in review_items:
    review_regi_date = review_item.find_all('span', attrs={'class':'reviewItems_etc__1YqVF'})[2].get_text()
    review_content = review_item.find('p', attrs={'class':'reviewItems_text__XIsTc'}).get_text()

    writer.writerow([name, regi_date, main_char, perfume_category, gender, perfume_type, main_scent, url, price, img_url, review_content, review_regi_date])
    