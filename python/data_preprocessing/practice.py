# import pandas as pd

# data = {
#     '이름' : ['채치수', '정대만', '송태섭', '서태웅', '강백호', '변덕규', '황태산', '윤대협'],
#     '학교' : ['북산고', '북산고', '북산고', '북산고', '북산고', '능남고', '능남고', '능남고'],
#     '키' : [197, 184, 168, 187, 188, 202, 188, 190],
#     '국어' : [90, 40, 80, 40, 15, 80, 55, 100],
#     '영어' : [85, 35, 75, 60, 20, 100, 65, 85],
#     '수학' : [100, 50, 70, 70, 10, 95, 45, 90],
#     '과학' : [95, 55, 80, 75, 35, 85, 40, 95],
#     '사회' : [85, 25, 75, 80, 10, 80, 35, 95],
#     'SW특기' : ['Python', 'Java', 'Javascript', '', '', 'C', 'PYTHON', 'C#']
# }

# df = pd.DataFrame(data)

# data2 = {
#     'id' : [1, 2, 3, 4, 5, 6, 7, 8]
# }
# data3 = {
#     'id' : [1, 2, 3, 4, 5, 6, 7, 8]
# }

# a = [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8]]


# a = [{x: []} for x in range(-1, 164)]
# print(a)


# from sklearn.cluster import DBSCAN
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import time

# start = time.time()

# answerData = {
# 			"a1": 3,
# 			"a2": 4,
# 			"a3": 0,
# 			"a4": 2,
# 			"a5": 2,
# 		}

# input_data = {
#     "id": "",
#     "perfume": "user",
#     "brand": "",
#     "image": "",
#     "launch_year": 0,
#     "main_accords": "aromatic citrus floral woody fresh spicy",
#     "notes": "Lavender Violet Musk Leather Woody Notes Lemon Bergamot Cardamom",
#     "longevity": "weak",
#     "sillage": "intimate",
#     "total_survey": 61,
#     "similar_perfume": [
#       9903, 7600, 31781, 31808, 19746, 2254, 13591, 25907, 35841, 30273
#     ]
# }

# if answerData["a5"] == 0:
#     df = pd.read_json("popular.json")
# elif answerData["a5"] == 1:
#     df = pd.read_json("unpopular.json")
# else:
#     df = pd.read_json("unknown.json")

# df = df.append(input_data, ignore_index=True)

# if answerData["a5"] == 0:
#     new_df = df
# else:
#     tfidfv = TfidfVectorizer().fit(df['main_accords'])
#     data = tfidfv.transform(df['main_accords']).toarray()
#     data = pd.DataFrame(data)

#     model = DBSCAN(eps=0.5, min_samples=20)
#     predict = pd.DataFrame(model.fit_predict(data))
#     predict.columns = ['predict']

#     filt = (predict['predict'] == predict.iloc[-1, 0])
#     new_df = df[filt]

# feature = new_df['main_accords'] + ' ' + new_df['notes']

# tfidf_vector = TfidfVectorizer(ngram_range=(1, 1))
# c_vector_perfume = tfidf_vector.fit_transform(feature)

# perfume_c_sim = cosine_similarity(c_vector_perfume, c_vector_perfume).argsort()[:, ::-1]

# if len(new_df) < 30:
#     sim_index = perfume_c_sim[len(new_df) - 1].reshape(-1)
# else:
#     sim_index = perfume_c_sim[len(new_df) - 1, :30].reshape(-1)
# sim_index = sim_index[sim_index != len(new_df) - 1]
# result = new_df.iloc[sim_index]

# print(result)

# print('종료 시간 : ', time.time() - start)

import pandas as pd

df = pd.read_json('perfume_data.json')

accord = {
    "0": "soapy",
    "1": "vodka",
    "2": "cinnamon",
    "3": "mossy",
    "4": "foresty",
    "5": "sour",
    "6": "animalic",
    "7": "cherry",
    "8": "bbq",
    "9": "lavender",
    "10": "tobacco",
    "11": "leather",
    "12": "watery",
    "13": "furity",
    "14": "alcohol",
    "15": "tuberose",
    "16": "vanilla",
    "17": "woody",
    "18": "gourmand",
    "19": "martini",
    "20": "musky",
    "21": "coconut",
    "22": "rum",
    "23": "fresh spicy",
    "24": "ozonic",
    "25": "nutty",
    "26": "caramel",
    "27": "cognac",
    "28": "terpenic",
    "29": "herbal",
    "30": "wine",
    "31": "yellow floral",
    "32": "rose",
    "33": "cacao",
    "34": "earthy",
    "35": "wet plaster",
    "36": "almond",
    "37": "caramela",
    "38": "anis",
    "39": "whiskey",
    "40": "vinil",
    "41": "bitter",
    "42": "camphor",
    "43": "salty",
    "44": "coca-cola",
    "45": "Champagne",
    "46": "balsamic",
    "47": "white wine",
    "48": "oud",
    "49": "conifer",
    "50": "sand",
    "51": "violet",
    "52": "patchouli",
    "53": "beeswax",
    "54": "milky",
    "55": "sweet",
    "56": "powdery",
    "57": "citrus",
    "58": "amber",
    "59": "clay",
    "60": "savory",
    "61": "asphault",
    "62": "tennis ball",
    "63": "industrial glue",
    "64": "narcotic",
    "65": "smoky",
    "66": "soft spicy",
    "67": "honey",
    "68": "plastic",
    "69": "tropical",
    "70": "aromatic",
    "71": "white floral",
    "72": "aldehydic",
    "73": "floral",
    "74": "green",
    "75": "iris",
    "76": "metallic",
    "77": "warm spicy",
    "78": "cannabis",
    "79": "fruity",
    "80": "coffee",
    "81": "fresh",
    "82": "aquatic",
    "83": "lactonic",
    "84": "marine"
  }

print(df['main_accords'][0])

data = {}

for i in range(85):
    data[accord[str(i)]] = 0

for i in range(37000):
    for word in df['main_accords'][i]:
        data[word] += 1

print(data)

# print(df[['longevity', 'sillage']].describe(include='object'))
# condition1 = (df['sillage'] == 'intimate')
# condition2 = (df['sillage'] == 'moderate')
# condition3 = (df['sillage'] == 'strong')
# condition4 = (df['sillage'] == 'enormous')
# condition5 = (df['longevity'] == 'very weak')
# print(df.loc[condition1, 'sillage'].count())
# print(df.loc[condition2, 'sillage'].count())
# print(df.loc[condition3, 'sillage'].count())
# print(df.loc[condition4, 'sillage'].count())
# print(df.loc[condition5, 'longevity'].count())

# from sklearn.cluster import DBSCAN
# import pandas as pd
# import json
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity


# mapping_table = [
#     {
#         0: ["cherry", "tropical", "fruity", "sour", "terpenic", "citrus", "tropical"],
#         1: ["lavender", "tuberose", "terpenic", "yellow floral", "rose", "violet", "patchouli", "white floral", "aldehydic", "floral", "iris"],
#         2: ["mossy", "foresty", "woody", "oud", "conifer", "patchouli"],
#         3: ["ozonic", "aquatic", "marine"]
#     },
#     {
#         0: ["cinnamon", "cherry", "vanilla", "gourmand", "coconut", "caramel", "balsamic", "beeswax", "sweet", "amber", "honey", "tropical", "fruity"],
#         1: ["soapy", "musky", "beeswax", "powdery", "amber", "aldehydic"],
#         2: ["vanilla", "gourmand", "coconut", "nutty", "beeswax", "milky", "lactonic"],
#         3: ["cinnamon", "animalic", "vanilla", "fresh spicy", "camphor", "balsamic", "patchouli", "soft spicy", "aromatic", "warm spicy", "cannabis"],
#         4: ["mossy", "foresty", "herbal", "earthy", "patchouli", "aromatic", "green"]
#     },
#     {
#         0: ["eternal", "long lasting", "moderate"],
#         1: ["weak", "very weak"]
#     },
#     {
#         0: ["intimate"],
#         1: ["moderate", "strong", "enormous"]
#     }
# ]

# def recommend_like_based(accord_list, a5):

#     input_data = {
#         "id": "",
#         "perfume": "user",
#         "brand": "",
#         "image": "",
#         "launch_year": 0,
#         "main_accords": accord_list,
#         "notes": "",
#         "longevity": "",
#         "sillage": "",
#         "total_survey": 0,
#         "similar_perfume": []
#     }

#     if a5 == 0:
#         df = pd.read_json("./data_algorithms/algorithms/popular.json")
#     else:
#         df = pd.read_json("unpopular.json")

#     df = df.append(input_data, ignore_index=True)

#     if a5 == 0:
#         new_df = df
#     else:
#         tfidfv = TfidfVectorizer().fit(df['main_accords'])
#         data = tfidfv.transform(df['main_accords']).toarray()
#         data = pd.DataFrame(data)

#         model = DBSCAN(eps=0.5, min_samples=20)
#         predict = pd.DataFrame(model.fit_predict(data))
#         predict.columns = ['predict']

#         filt = (predict['predict'] == predict.iloc[-1, 0])
#         new_df = df[filt]

#     feature = new_df['main_accords'] + ' ' + new_df['notes']

#     tfidf_vector = TfidfVectorizer(ngram_range=(1, 1))
#     c_vector_perfume = tfidf_vector.fit_transform(feature)

#     perfume_c_sim = cosine_similarity(c_vector_perfume, c_vector_perfume).argsort()[:, ::-1]

#     if len(new_df) < 30:
#         sim_index = perfume_c_sim[len(new_df) - 1].reshape(-1)
#     else:
#         sim_index = perfume_c_sim[len(new_df) - 1, :30].reshape(-1)
#     sim_index = sim_index[sim_index != len(new_df) - 1]
#     result = new_df.iloc[sim_index][:3].to_dict('list')['id']

#     return result

# if __name__ == '__main__':
#     arr = "wine vanilla sweet woody aromatic leather fruity warm spicy powdery animalic fresh violet"
#     result = recommend_like_based(arr, 0)
#     print(result)