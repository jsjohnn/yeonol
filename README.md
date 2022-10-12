## ✈여기서 놀자

사랑하는 가족, 연인, 친구 때로는 혼자 여행을 떠나고 싶은 사람들을 위한 패키지 여행 예약 서비스 입니다. <br />
여행 상품을 조회하고 장바구니에 추가하고 주문할 수 있습니다.<br /><br />


<img src="https://user-images.githubusercontent.com/63035520/195042827-04399bc2-9c2b-4a08-8021-55fcbe0dabbb.png" width="600" height="300" />

<br />

## 1. 핵심 기능
1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD**
2. **여행 패키지 상품 목록**을 조회 및, **상세 정보**를 조회 가능함.
3. 장바구니에 상품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage)
5. 상세 페이지 혹은 장바구니에서 주문을 할 수 있으며, **주문 완료 후 조회 및 삭제**가 가능함.
6. 관리자 페이지에서 **전체 주문 조회 및 삭제**가 가능함.

<br />

## 2. 시연 영상
### 메인 페이지
<img src="https://user-images.githubusercontent.com/63035520/195245053-69188e40-ba7e-42d9-a11e-f8e85136192e.gif"  width="600" height="300"/>

<br />

### 회원가입
- 데이터 유효성 검증 
<img src="https://user-images.githubusercontent.com/63035520/195245254-7f734068-2125-43aa-97fa-1a82d01a1364.gif" width="600" height="300"/>

<br />

### 로그인

<img src="https://user-images.githubusercontent.com/63035520/195246998-3b966fba-30bd-44f1-9256-8c57b1d6e2f5.gif" width="600" height="300" />

<br />

### 회원 정보 수정

<img src="https://user-images.githubusercontent.com/63035520/195247385-75ed82ad-1bcc-4a4a-9997-3fb5bd7de4f4.gif" width="600" height="300" />

<br />

### 관리자 기능
- 관리자 권한을 부여할 수 있음
- 관리자는 모든 유저의 예약 리스트를 확인할 수 있음 (추후 시연 영상에 반영)
<img src="https://user-images.githubusercontent.com/63035520/195247780-7b30d8f6-64ae-4404-9690-3e1708e4fbf1.gif" width="600" height="300" />

<br />

### 상품 추가

<img src="https://user-images.githubusercontent.com/63035520/195248677-7b829532-249d-469e-9144-100a02d4658e.gif" width="600" height="300" />

<br />

### 상품 상세

<img src="https://user-images.githubusercontent.com/63035520/195248938-148028f2-07f8-41b3-a2c8-a25c1fa28f2a.gif" width="600" height="300" />

<br />

### 장바구니

<img src="https://user-images.githubusercontent.com/63035520/195249219-20134998-da10-492c-89a0-1ce9a929d385.gif" width="600" height="300" />

<br />

### 예약하기

<img src="https://user-images.githubusercontent.com/63035520/195249302-97cbd891-eced-4664-86fd-a4b646aaf795.gif" width="600" height="300" />

<br />

### 주문 조회 및 메일 확인
- nodemailer를 활용, 예약 확인 메일 발송
<img src="https://user-images.githubusercontent.com/63035520/195249448-76876d81-9cab-44df-a4af-dfea803e3233.gif" width="600" height="300" />

<br />


## 3. 주요 사용 기술
### 백엔드
- **Express.js - Node.js**
- Mongodb, Mongoose
- 이외

### 프론트엔드
- **Vanilla javascript**, html, css (**Bulma css**)
- BootStrap
- 이외

<br />

## 4. 폴더 구조
- 백: `src/views` 이외 폴더 전체
- 프론트: `src/views` 폴더
