import pandas as pd
from ast import literal_eval

df = pd.read_json('perfumes.json')

# accords, notes --> null 인 향수 제거
for i in df.index:
    if df['main_accords'][i] == 'null' or df['notes'][i] == 'null':
        df.drop(i, axis=0, inplace=True)

# 인덱스 초기화
df.reset_index(inplace=True, drop=True)

for i in df.index:
    df['notes'][i] = df['notes'][i].replace('null', 'None')

df['main_accords'] = df['main_accords'].apply(literal_eval)
df['notes'] = df['notes'].apply(literal_eval)
df['longevity'] = df['longevity'].apply(literal_eval)
df['sillage'] = df['sillage'].apply(literal_eval)

# list 및 dict value --> 띄어쓰기로 구분된 str으로 변환
# for i in df.index:
#     df['main_accords'][i] = ' '.join(df['main_accords'][i])
#     if type(df['notes'][i]) == list:
#         df['notes'][i] = ' '.join(df['notes'][i])
#     elif type(df['notes'][i]) == dict:
#         temp = ''
#         for value in df['notes'][i].values():
#             if type(value) == list:
#                 temp += ' '.join(value)
#                 temp += ' '
#         if temp:
#             df['notes'][i] = temp[:-1]

df.to_json('data_preprocessing1.json', orient='records')