# BULB 프로젝트


# Input_Layer
태민이가 채워주세요

# SGNS
Skip-Gram 모델과 Skip-Gram모델에서 사용되는 모듈들이 있는 directory입니다. 모델은 pytorch를 사용하여 구현되어 있고, Negative-Sampling을 사용하여 기존의 Skip-Gram 모델보다 좋은 성능을 보입니다. Skip-gram 모델은 기존에 존재하는 .txt 파일을 사용하여 pre-training 한 후, 사용자의 input 값이 들어오면, output값으로 input값과 관련된 수식어구들이 나옵니다.  


# crawling.py 

crawling.py 모델은 input값으로 단어가 들어오면, 한 달 동안 input값으로 들어온 단어와 연관된 유튜브 영상을 크롤링 하는 프로그램입니다. 
Selenium 과 Beautifulsoup을 사용하여 구현했습니다. 
shell에서 crawling.py를 사용하는 법은 다음과 같습니다.
```
pip install bs4==0.0.1
pip install selenium==4.1.2
pip install webdriver-manager==3.5.3
pip install pandas==1.4.1
pip install numpy==1.22.2

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
```
# Web

Web directory는 Frontend directory와 Backend directory로 이루어져 있습니다. Frontend는 react를 사용하여 구현이되어있고, Backend는 fastapi와 sqlite를 사용하여 구현이 되어이습니다.

# clustering.py
clustering.py 프로그램은 비지도 학습 알고리즘인 k-means 알고리즘을 사용하여 훈련시킬 데이터를 클러스터링 합니다. K 값은 hyper-parameter 입니다.
