from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

f = open('designers.txt', 'w')

url_designers = Request('https://www.fragrantica.com/designers/', headers = {'User-Agent': 'x'})
read_designers = urlopen(url_designers).read()

soup = BeautifulSoup(read_designers, 'html.parser')
designers = soup.find_all('div', attrs={'class':'designerlist'})
for designer in designers:
    url_designer = designer.select('a')[0]['href']
    f.write('https://www.fragrantica.com{}\n'.format(url_designer))
    # print('https://www.fragrantica.com' + url_designer)
f.close()