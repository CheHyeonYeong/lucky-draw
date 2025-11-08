# 오늘의 운세 - Lucky Draw App

모바일 최적화된 운세 뽑기 웹 애플리케이션입니다.

## 주요 기능

- **운세 뽑기**: 큰 버튼을 눌러 랜덤으로 운세를 뽑을 수 있습니다
- **애니메이션**: 운세를 뽑을 때 2-3초간 애니메이션이 재생됩니다
- **관리자 페이지**: 운세 데이터와 애니메이션을 관리할 수 있습니다
- **모바일 최적화**: 모바일 화면에 최적화된 디자인
- **localStorage 저장**: 모든 데이터가 브라우저에 저장됩니다

## 시작하기

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

### GitHub Pages 배포

```bash
# GitHub Pages에 배포
npm run deploy
```

## 사용 방법

### 메인 화면 (/)

1. "운세 뽑기" 버튼을 클릭합니다
2. 애니메이션이 재생됩니다
3. 랜덤으로 선택된 운세가 표시됩니다
4. "다시 뽑기" 버튼으로 새로운 운세를 뽑을 수 있습니다

### 관리자 페이지 (/#/admin)

- **기본 비밀번호**: `admin1234`

#### 애니메이션 설정
- 영상 파일을 `public` 폴더에 업로드하고 URL을 입력하세요
- 예: `/animation.mp4`
- 지원 형식: mp4, mov, gif

#### 운세 관리
- **추가**: 제목, 내용, 색상을 입력하여 새로운 운세를 추가
- **수정**: 운세 항목의 "수정" 버튼을 클릭하여 내용 변경
- **삭제**: 운세 항목의 "삭제" 버튼을 클릭하여 제거

## 샘플 데이터

앱에는 5개의 샘플 운세가 포함되어 있습니다:

1. **대길** - 행운이 가득한 날
2. **중길** - 차근차근 노력하면 좋은 결과
3. **소길** - 작은 행복을 발견하는 날
4. **평** - 평온한 하루
5. **희망** - 희망을 잃지 않는 날

## 커스터마이징

### 애니메이션 추가하기

1. 영상 파일을 `public` 폴더에 복사
2. 관리자 페이지에서 파일 경로 입력 (예: `/my-animation.mp4`)
3. "저장" 버튼 클릭

### 운세 데이터 수정하기

관리자 페이지에서 운세를 자유롭게 추가, 수정, 삭제할 수 있습니다.

## 기술 스택

- React 19
- React Router DOM 7
- HTML5 Video
- CSS
- localStorage API

## 프로젝트 구조

```
lucky/
├── public/
│   ├── index.html
│   └── (애니메이션 파일 위치)
├── src/
│   ├── components/
│   │   ├── AnimationPlayer.js
│   │   ├── AnimationPlayer.css
│   │   ├── FortuneResult.js
│   │   └── FortuneResult.css
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── Admin.js
│   │   └── Admin.css
│   ├── utils/
│   │   └── storage.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

## 라이선스

MIT
