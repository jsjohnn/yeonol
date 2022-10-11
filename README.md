# ✈여기서 놀자

사랑하는 가족, 연인, 친구 때로는 혼자 여행을 떠나고 싶은 사람들을 위한 패키지 여행 예약 서비스 입니다. <br />
여행 상품을 조회하고 장바구니에 추가하고 주문할 수 있습니다.

<br>

## 핵심 기능

1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD**
2. **여행 패키지 상품 목록**을 조회 및, **상세 정보**를 조회 가능함.
3. 장바구니에 상품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage)
5. 상세 페이지 혹은 장바구니에서 주문을 할 수 있으며, **주문 완료 후 조회 및 삭제**가 가능함.
6. **관리자 페이지**에서 주문 조회 및 삭제가 가능함.
<br>

## 주요 사용 기술

### 1. 백엔드

- **Express.js - Node.js**
- Mongodb, Mongoose
- 이외

### 2. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css**)
- BootStrap
- 이외

<br>

## 폴더 구조

- 프론트: `src/views` 폴더
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

## 설치 방법

1. **.env 파일 설정 (MONGODB_URL 환경변수를, 개인 로컬 혹은 Atlas 서버 URL로 설정해야 함)**

2. express 실행

```bash
# npm 을 쓰는 경우
npm install
npm run start

# yarn 을 쓰는 경우
yarn
yarn start
```

<br>

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
