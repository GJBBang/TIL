from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# 향수 데이터 df 생성 및 사용할 칼럼 추출
df = pd.read_json('perfumes.json')
data = df[['main_accords', 'notes', 'perfume']].copy()


# 문자열로 된 list, dict --> 실제 list, dict 으로 변환
for i in range(len(data['notes'])):
    data['notes'][i] = data['notes'][i].replace('null', 'None')
    data['main_accords'][i] = data['main_accords'][i].replace('null', 'None')

data['main_accords'] = data['main_accords'].apply(literal_eval)
data['notes'] = data['notes'].apply(literal_eval)

# list 및 dict value --> 띄어쓰기로 구분된 str으로 변환
for i in range(len(data['notes'])):
    if type(data['notes'][i]) == list:
        data['notes'][i] = ' '.join(data['notes'][i])
    elif type(data['notes'][i]) == dict:
        temp = ''
        for value in data['notes'][i].values():
            if type(value) == list:
                temp += ' '.join(value)
                temp += ' '
        if temp:
            data['notes'][i] = temp[:-1]

print('1차')
# print(data['notes'])
count_vector = CountVectorizer(ngram_range=(1, 3))
c_vector_notes = count_vector.fit_transform(data['notes'])

print('2차')
# 코사인 유사도를 구한 벡터 저장
notes_c_sim = cosine_similarity(c_vector_notes, c_vector_notes).argsort()[:, ::-1]

print('3차')
def get_recommend_perfume_list(df, perfume, top=30):
    # 특정 perfume (입력값) 데이터 추출
    target_perfume_index = df[df['perfume'] == perfume].index.values
    
    # 코사인 유사도 중 비슷한 코사인 유사도를 가진 정보 추출
    sim_index = notes_c_sim[target_perfume_index, :top].reshape(-1)
    # 본인 제외
    sim_index = sim_index[sim_index != target_perfume_index]

    # df 생성
    result = df.iloc[sim_index][:10]
    return result

print('4차')
print(get_recommend_perfume_list(data, perfume='Power by 50 Cent'))