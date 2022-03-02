from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
from time import sleep

f = open('designers.txt', 'r')
lines = f.readlines()

ff = open('perfumes.txt', 'w')

for line in lines:
    try:
        url_perfumes = Request(line, headers = {'User-Agent': 'x'})
        read_perfume = urlopen(url_perfumes).read()

        soup = BeautifulSoup(read_perfume, 'html.parser')
        perfume_list = soup.find_all('div', attrs={'class':'flex-child-auto'})
        for perfume in perfume_list:
            url_perfume = perfume.select('a')[0]['href']
            ff.write('https://www.fragrantica.com{}\n'.format(url_perfume))
        sleep(10)
    except:
        print('실패')

f.close()
ff.close()