from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from datetime import datetime
import time
import random
import json
import pandas as pd
import ast
import json
from datetime import datetime, timedelta

from selenium.webdriver.chrome.service import Service


class analyze ():
    def __init__(self):
        self.driver = None        
        # 스크래핑 할 URL 세팅
        self.URL = ''
        # 스크래핑 할 URL 세팅
        self.content_total_title = []
        self.content_total_link = []
        self.content_view_cnt = []
        self.content_upload_date = []
        self.content_duration_kr = []
        self.content_duration_sec = []
        #누적 조회수
        self.cumulative_views = 0
        #self.threshold 이상 조회수의 영상수
        self.video_cnt = 0
        #최고 조회수
        self.max_views = 0
        #상위 n개 조회수
        self.max_n_datas = []
        #self.threshold 이상 조회수의 index
        self.idx = []
        self.threshold = 10000
        self.lastupdate_time = ''
        self.cumulative_sec = 0
        self.average_sec = 0
        self.exceptcnt = 0
        self.average_views = 0
        today = datetime.today()

        self.date_dict = {}

        month_ago = today - timedelta(days=60)

        for i in range((today - month_ago).days):
            date = month_ago + timedelta(days=i)
            date_str = date.strftime("%Y-%m-%d")
            self.date_dict[date_str] = 0

    def scroll(self):
        try:        
            # 페이지 내 스크롤 높이 받아오기
            last_page_height = self.driver.execute_script("return document.documentElement.scrollHeight")
            while True:
                # 임의의 페이지 로딩 시간 설정
                # PC환경에 따라 로딩시간 최적화를 통해 scraping 시간 단축 가능
                pause_time = random.uniform(1, 2)
                # 페이지 최하단까지 스크롤
                self.driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
                # 페이지 로딩 대기
                time.sleep(pause_time)
                # 무한 스크롤 동작을 위해 살짝 위로 스크롤(i.e., 페이지를 위로 올렸다가 내리는 제스쳐)
                self.driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight-50)")
                time.sleep(pause_time)
                # 페이지 내 스크롤 높이 새롭게 받아오기
                new_page_height = self.driver.execute_script("return document.documentElement.scrollHeight")
                # 스크롤을 완료한 경우(더이상 페이지 높이 변화가 없는 경우)
                if new_page_height == last_page_height:
                    print("스크롤 완료")
                    break
                    
                # 스크롤 완료하지 않은 경우, 최하단까지 스크롤
                else:
                    last_page_height = new_page_height
        except Exception as e:
            print("에러 발생: ", e)

    def crawling(self, SEARCH_KEYWORD):
        # 검색 키워드 설정: 키워드 내 띄어쓰기는 URL에서 '+'로 표시되기 때문에 이에 맞게 변환
        SEARCH_KEYWORD = SEARCH_KEYWORD.replace(' ', '+')
        self.driver = webdriver.Chrome()
        self.URL = "https://www.youtube.com/results?search_query=" + SEARCH_KEYWORD + '&sp=CAISBAgEEAE%253D'
        # 크롬 드라이버를 통해 지정한 URL의 웹 페이지 오픈
        self.driver.get(self.URL)
        # 웹 페이지 로딩 대기
        time.sleep(3)
        # 무한 스크롤 함수 실행
        self.scroll()
        # 페이지 소스 추출
        html_source = self.driver.page_source
        soup_source = BeautifulSoup(html_source, 'html.parser')

        # 콘텐츠 모든 정보
        content_total = soup_source.find_all(class_ = 'yt-simple-endpoint style-scope ytd-video-renderer')
        # 콘텐츠 제목만 추출
        self.content_total_title = list(map(lambda data: data.get_text().replace("\n", ""), content_total))
        # 콘텐츠 링크만 추출
        self.content_total_link = list(map(lambda data: "https://youtube.com" + data["href"], content_total))
        # 콘텐츠 길이만 추출
        duration_raw_list = list(map(lambda data: "https://youtube.com" + data["aria-label"], content_total))
        self.content_duration_kr = [duration_raw_list[i][duration_raw_list[i].find(' 전 ') + 3: duration_raw_list[i].find('조회수') - 1] for i in range(len(duration_raw_list))]
        #--------조회수 & 업로드 날짜 추출(Updated at 2022-10-11)--------#
        content_record_src = soup_source.find_all(class_ = 'style-scope ytd-video-meta-block')
        self.content_view_cnt = [content_record_src[i].get_text().replace('조회수 ', '') for i in range(5, len(content_record_src), 10)]
        #---------------------------------------------------------#
    def extract_data(self):

        if len(self.content_total_link) == 0:
            return

        for i in range(len(self.content_duration_kr)):
            try:
                sec = 0
                ret1 = self.content_duration_kr[i].find('시간')
                ret2 = self.content_duration_kr[i].find('분')
                ret3 = self.content_duration_kr[i].find('초')

                if ret1 != -1:
                    sec += int(self.content_duration_kr[i][:ret1]) * 3600
                if ret2 != -1:
                    if ret1 != -1:
                        sec += int(self.content_duration_kr[i][ret1 + 2:ret2]) * 60
                    else:
                        sec += int(self.content_duration_kr[i][:ret2]) * 60
                if ret3 != -1:
                    if ret2 != -1:
                        sec += int(self.content_duration_kr[i][ret2 + 1:ret3])
                    else:
                        sec += int(self.content_duration_kr[i][:ret3])
                self.content_duration_sec.append(sec)
            except:
                self.exceptcnt += 1

        for i in range(len(self.content_view_cnt)):
            val = ''
            base = 1
            for j in range(len(self.content_view_cnt[i])):
                if self.content_view_cnt[i][j] == '\n' or self.content_view_cnt[i][j] == ' ' or self.content_view_cnt[i][j] == '•' or self.content_view_cnt[i][j] == '전':
                    continue
                elif self.threshold <= 1 and self.content_view_cnt[i][j] == '회':
                    self.cumulative_views += float(val)
                    self.video_cnt += 1
                    self.idx.append([float(val),i])
                    #self.cumulative_sec += self.content_duration_sec[i]
                    break
                elif self.threshold <= 1000 and self.content_view_cnt[i][j] == '천':
                    base = 1000
                    self.cumulative_views += float(val) * base
                    self.video_cnt += 1
                    self.idx.append([float(val) * base,i])
                    #self.cumulative_sec += self.content_duration_sec[i]
                    break
                elif self.threshold <= 10000 and self.content_view_cnt[i][j] == '만':
                    base = 10000
                    self.cumulative_views += float(val) * base
                    self.video_cnt += 1
                    self.idx.append([float(val) * base,i])
                    #self.cumulative_sec += self.content_duration_sec[i]
                    break
                elif self.threshold <= 100000000 and self.content_view_cnt[i][j] == '억':
                    base = 100000000
                    self.cumulative_views += float(val) * base
                    self.video_cnt += 1
                    self.idx.append([float(val) * base,i])
                    #self.cumulative_sec += self.content_duration_sec[i]
                    break
                else:
                    val += self.content_view_cnt[i][j]


        self.cumulative_sec = sum(self.content_duration_sec)
        if(len(self.idx) != 0):
            self.average_views = self.cumulative_views / len(self.idx)
        else:
            self.average_views
        if(self.video_cnt != 0):
            self.average_sec = self.cumulative_sec / self.video_cnt
        else :
            self.average_sec = 0

        self.idx.sort(key=lambda x: x[0], reverse = True)
        print(self.idx)
        now = datetime.now()
        self.lastupdate_time = now.strftime('%Y-%m-%d %H:%M:%S')
        if(len(self.idx) != 0):
            self.max_views = self.idx[0][0]
        self.get_upload_date()
        self.fill_views_in_dic()
        for i in range(min(5, len(self.idx))):
            self.max_n_datas.append(json.dumps({'view' : self.idx[i][0], 'video_name' : self.content_total_title[self.idx[i][1]], 'youtube_link' : self.content_total_link[self.idx[i][1]]}))
        

    def get_upload_date(self):
        for link in self.content_total_link:
            self.driver.get(link)
            time.sleep(1)


            try:
                self.driver.find_element_by_xpath("//*[@id='expand']").click()
            except:
                try:
                    self.driver.find_element_by_xpath("//*[@id='button-shape']/button/yt-touch-feedback-shape/div/div[2]").click()
                    self.driver.find_element_by_xpath("//*[@id='items']/ytd-menu-service-item-renderer/tp-yt-paper-item/yt-formatted-string").click()
                    html = self.driver.page_source
                    soup = BeautifulSoup(html, 'html.parser')
                    tags = soup.findAll('div', attrs={'class': 'factoid style-scope ytd-factoid-renderer'})
                    upload_date = tags[2].attrs['aria-label']
                    self.content_upload_date.append(upload_date)
                    continue
                except:
                    continue

            html = self.driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            tags = soup.findAll('span', attrs={'class': 'style-scope yt-formatted-string bold'})
            self.content_upload_date.append(tags[2].get_text())
    
    def fill_views_in_dic(self):
        for element in self.idx:
            index = element[1]
            try:
                self.date_dict[datetime.strptime(self.content_upload_date[index][:-1].replace('.','-').replace(' ',''), "%Y-%m-%d").strftime("%Y-%m-%d")] += 1
            except:
                self.date_dict[datetime.strptime(self.content_upload_date[index][14:-1].replace('.','-').replace(' ',''), "%Y-%m-%d").strftime("%Y-%m-%d")] += 1
        print(self.date_dict)

    def get_data(self):
        data = {'average_view' : int(self.average_views),
            'max_view' : self.max_views,
            'lastest_updatetime' : datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'top5links' : ','.join(self.max_n_datas),
            'average_video_length' : self.average_sec,
            'data' : json.dumps(self.date_dict)
        }
        return json.dumps(data)

if __name__ == "__main__":

    a = analyze()
    str = str(input())
    a.crawling(str)
    a.extract_data()
    print(a.get_data())


# crawling.py 이용법 
# 1. analyze 객채 생성     ex) instance = analyze()
# 2. instance.crawling() 메서드 실행
# 3. instance.extract_data() 메서드 실행
# 4. ret = instance.get_data() 메서드 실행 해서 json 파일 받기