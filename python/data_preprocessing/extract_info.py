import pandas as pd

# 향수 데이터 읽기
df = pd.read_json('data_preprocessing1.json')

# 추출용 df 생성
df_brand = pd.DataFrame()
df_accord = pd.DataFrame()
df_note = pd.DataFrame()

# 브랜드 unique 추출
brand = df['brand'].unique()

# 브랜드 데이터 추가 및 json 파일 생성
# df_brand['brand'] = brand
# df_brand.to_json('brand_data.json', orient = 'columns')

# 특징 unique 추출
accord = set()
for accords in df['main_accords']:
    accord.update(accords)
accord = list(accord)

# 특징 데이터 추가 및 json 파일 생성
df_accord['accords'] = accord
df_accord.to_json('accords_data.json', orient = 'columns')

# notes unique 추출
note = set()
for notes in df['notes']:
    note.update(notes)
note = list(note)

# 노트 데이터 추가 및 json 파일 생성
df_note['notes'] = note
df_note.to_json('notes_data.json', orient = 'columns')
