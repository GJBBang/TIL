from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from time import sleep
import requests
import re
import pandas as pd
import numpy as np
import os

def add_dataframe(cnt, perfume_id, name, rate, madeby, brand, regi_date, char, category, gender, type, scent, price, perfume_url, img_url, reviews):
    global total_cnt

    df1 = pd.DataFrame(columns = ['perfume_id', 'name', 'rate', 'madeby', 'brand', 'regi_date', 'char', 'category', 'gender', 'type', 'scent', 'price', 'perfume_url', 'img_url', 'reviews'])
    n = 1 + total_cnt
    if (cnt > 0):
        for i in range(0, cnt - 1):
            df1.loc[n] = [perfume_id, name, rate, madeby, brand, regi_date, char, category, gender, type, scent, price, perfume_url, img_url, reviews[i]]
            i += 1
            n += 1
    else:
        df1.loc[n] = [perfume_id, name, rate, madeby, brand, regi_date, char, category, gender, type, scent, price, perfume_url, img_url, '']
        n += 1

    total_cnt += cnt - 1
    return df1


def save():
    if not os.path.exists('output1.csv'):
        df1.to_csv('output1.csv', encoding='utf-8-sig', mode='w')
    else:
        df1.to_csv('output1.csv', encoding='utf-8-sig', mode='a', header=False)


perfume_id = 693
total_cnt = 168395
browser = webdriver.Chrome('./chromedriver.exe')
headers = {'User-Agent': 'x'}
for i in range(1, 950):
    url = 'https://search.shopping.naver.com/search/all?frm=NVSHMDL&origQuery=%ED%96%A5%EC%88%98&pagingIndex={}&pagingSize=40&productSet=model&query=%ED%96%A5%EC%88%98&sort=rel&timestamp=&viewType=list'.format(i)

    browser.get(url)
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')
    sleep(2)
    if i == 12:
        j = 28
    else:
        j = 1
    while True:
        try:
            perfume_review_cnt = '/html/body/div/div/div[2]/div[2]/div[3]/div[1]/ul/div/div['+ str(j) +']/li/div[1]/div[2]/div[5]/a/em'
            
            review_cnt = browser.find_element_by_xpath(perfume_review_cnt).text
            review_cnt = re.sub(',', '', review_cnt)
            pagination_cnt = int(np.ceil(int(review_cnt) / 20))
            if pagination_cnt > 75:
                pagination_cnt = 75
            perfume_url = '/html/body/div/div/div[2]/div[2]/div[3]/div[1]/ul/div/div['+ str(j) +']/li/div[1]/div[1]/div/a'
            browser.find_element_by_xpath(perfume_url).click()
            sleep(2)
            browser.switch_to.window(browser.window_handles[-1])
            sleep(2)
            perfume_url = browser.current_url

            # xpath
            perfume_name = '/html/body/div/div/div[2]/div[2]/div[1]/h2'
            perfume_rate = '/html/body/div/div/div[2]/div[2]/div[1]/div[1]'
            perfume_price = '/html/body/div/div/div[2]/div[2]/div[2]/div[1]/div/div[2]/div[1]/div[1]/em'
            perfume_img_url = '/html/body/div/div/div[2]/div[2]/div[2]/div[1]/div/div[1]/div/div/img'
            perfume_review = '/html/body/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/ul/li[3]/a/strong'

            perfume_res = requests.get(perfume_url, headers=headers)
            perfume_soup = BeautifulSoup(perfume_res.text, 'lxml')
            info = perfume_soup.find('div', attrs={'class':'top_summary_title__15yAr'})

            detail_info = info.find_all('span', attrs={'class':re.compile('top_cell__3DnEV')})

            name = browser.find_element_by_xpath(perfume_name).text
            rate = browser.find_element_by_xpath(perfume_rate).text[2:]
            madeby = ''
            brand = ''
            regi_date = ''
            char = ''
            category = ''
            gender = ''
            type = ''
            scent = ''
            price = browser.find_element_by_xpath(perfume_price).text
            img_url = browser.find_element_by_xpath(perfume_img_url).get_attribute('src')
            reviews = []
            review_page = 1
            cnt = 1

            for detail in detail_info:
                if detail.find('span', attrs={'class':'top_brand__1Q2zO'}):
                    continue
                inner_text = detail.get_text()
                if '제조사' in inner_text:
                    madeby = detail.find('em').get_text()
                    # print(madeby)
                elif '브랜드' in detail.get_text():
                    brand = detail.get_text()[4:]
                    # print(brand)
                elif '등록일' in inner_text:
                    regi_date = detail.find('em').get_text()
                    # print(regi_date)
                elif '주요제품특징' in inner_text:
                    char = inner_text[9:]
                    # print(char)
                elif '종류' in inner_text:
                    category = inner_text[5:]
                    # print(category)
                elif '성별' in inner_text:
                    gender = inner_text[5:]
                    # print(gender)
                elif '타입' in inner_text:
                    type = inner_text[5:]
                    # print(type)
                elif '메인향' in inner_text:
                    scent = inner_text[6:]
                    # print(scent)
            
            while True:
                sleep(2)

                review_list = browser.find_elements_by_class_name('reviewItems_text__XIsTc')
                for review in review_list:
                    review_content = review.text
                    reviews.append(review_content)  
                    cnt += 1 

                sleep(2)
                
                review_page += 1
                if pagination_cnt < review_page:
                    break
                pagination_list = browser.find_elements_by_class_name('pagination_pagination__2M9a4')
                for pagination in pagination_list:
                    elem = pagination.find_elements_by_tag_name('a')
                    if 'rev' in elem[0].get_attribute('data-nclick'):
                        review_pagination = elem
                        for e in elem:
                            if review_page < 10 and e.get_attribute('data-nclick')[-1] == str(review_page):
                                e.click()
                            elif review_page < 100 and e.get_attribute('data-nclick')[-2:] == str(review_page):
                                e.click()
                            elif review_page < 1000 and e.get_attribute('data-nclick')[-3:] == str(review_page):
                                e.click()
                            elif review_page < 10000 and e.get_attribute('data-nclick')[-4:] == str(review_page):
                                e.click()
                        
            df1 = add_dataframe(cnt, perfume_id, name, rate, madeby, brand, regi_date, char, category, gender, type, scent, price, perfume_url, img_url, reviews)
            save()
                        
            browser.close()
            browser.switch_to.window(browser.window_handles[0])
            sleep(2)

            if j % 2 == 0: #화면에 2개씩 보이도록 스크롤
                ELEMENT = browser.find_element_by_xpath('/html/body/div/div/div[2]/div[2]/div[3]/div[1]/ul/div/div['+ str(j) +']/li/div[1]/div[1]/div/a')
                browser.execute_script("arguments[0].scrollIntoView(true);", ELEMENT) 

            j += 1
            perfume_id += 1
        except: break
                
    sleep(2)