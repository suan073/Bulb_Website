# NEEDle_ideaBank


# crawling.py shell 에서 사용하는 법
# $ pip install bs4==0.0.1
# pip install selenium==4.1.2
# $ pip install webdriver-manager==3.5.3
# $ pip install pandas==1.4.1
# $ pip install numpy==1.22.2

import crawling
from crawling import analyze

# analyze 객채 생성
a = analyze()

# 크롤링을 한다.
a.crawling()

# 데이터 추출
a.extract()

# 데이터 받아오기
print(a.get_data())
