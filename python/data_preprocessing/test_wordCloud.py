from wordcloud import WordCloud
from collections import Counter

word_list = ["citrus", "woody", "powdery", "iris", "violet", "fresh", "musky", "amber", "earthy", "fruity", "leather", "powdery", "sweet", "violet", "animalic", "patchouli", "vanilla", "floral", "woody", "leather", "fruity", "woody", "aromatic", "warm", "spicy", "sweet", "powdery", "animalic", "fresh", "spicy", "violet"]

counts = Counter(word_list)
print(dict(counts))

wc = WordCloud(font_path="tvN 즐거운이야기 Bold.ttf", width=400, height=400, background_color="white", max_font_size=250)
cloud = wc.generate_from_frequencies(counts)

cloud.to_file('test.jpg')