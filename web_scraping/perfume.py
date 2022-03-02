import pandas as pd

df =pd.read_csv('향수데이터.txt')

df.to_csv('data.csv', encoding='utf-8-sig')