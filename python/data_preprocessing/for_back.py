import pandas as pd

# 향수 데이터 읽기
df = pd.read_json('data_preprocessing.json')

# 브랜드 unique 추출
brand_name = df['brand'].unique()
# 브랜드 데이터 생성
brand_data = {
    'eng_name' : brand_name
}

# 브랜드 데이터 --> df 객체 생성
df_brand = pd.DataFrame(brand_data)
# 브랜드 df --> json 파일 생성
df_brand.to_json('eng_name.json', orient='records')