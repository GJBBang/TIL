import requests
from bs4 import BeautifulSoup
import csv

url = 'https://www.google.com/search?hl=en-KR&gl=kr&q=Bukchon+Hanok+Village,+37+%EA%B3%84%EB%8F%99%EA%B8%B8+Jongno-gu,+Seoul&ludocid=14824929312700491162&lsig=AB86z5XWT5ncPnu7achvKLr4U8Qm&ved=0CBAQ9aIFahgKEwjo35bimZb2AhUAAAAAHQAAAAAQmQY&hl=en-KR&gl=kr#lrd=0x357ca2daaff8c14f:0xcdbcbaa9ffc9e59a,1'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}

# filename = '북촌한옥마을 리뷰.csv'
# f = open(filename, 'w', encoding='urf-8-sig', newline='')
# writer = csv.writer(f)

# title = 'name   review'.split('\t')
# writer.writerow()

res = requests.get(url, headers=headers)
res.raise_for_status()
soup = BeautifulSoup(res.text, 'lxml')

data_rows = soup.find('div', attrs={'class':'RMCqNd'}).find('div', attrs={'class':'WMbnJf'})
print(data_rows)