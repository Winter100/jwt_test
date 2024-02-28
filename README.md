# JWT 토큰 활용 연습을 위한 Next.js (app) 테스트 코드

<hr>

## JWT 테스트하며 생겼던 문제들

### 1. Mixed Content 에러

- 프론트(https)에서 백엔드(http)로 데이터 요청시 에러 발생
>Mixed Content: The page at 'https://프론트의주소' was loaded over HTTPS, but requested an insecure resource 'http://백엔드API'. This request has been blocked; the content must be served over HTTPS.

위와 같은 에러 메시지가 발생했다.

#### 에러 원인
- 웹 페이지가 HTTPS로 로드 되었지만, 페이지가 http로 요청한 안전하지 않은 자원이 있어서 브라우저가 차단했음
- 즉 프론트와 백엔드의 프로토콜이 달라 발생한 에러

#### 해결 방법
- 두 개발서버 모두 한쪽으로 맞추어 진행하였음
- 초기에는 프론트 및 백엔드둘다 http로 진행한뒤 https로 변경 및 테스트 후 배포

*참고) 프론트도 로컬에서 https환경을 세팅해서 개발 가능*

<hr>

### 2. CORS 에러
>Access to fetch at 'http://백엔드API' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

#### 에러 원인
- CORS (Cross-Origin Resource Sharing) 정책에 위반 되었다는 에러
- CORS는 브라우저에서 스크립트가 다른 도메인으로 리소스를 요청하는 것을 방지하기 위한 보안 메커니즘이다.

#### 해결 방법
- 백엔드에서 Access-Control-Allow-Origin를 설정하지 않아 발생한 에러로 백엔드에서 Origin설정 후 해결

*참고) 프론트에서 프록시를 이용하여 해결할 수 도 있음.*

<hr>

### 3. 프리플라이트 관련 에러
>Access to fetch at 'http://백엔드API' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status

- 내용은 CORS와 비슷하지만 preflight라는 내용이 들어가 있음

#### 에러 원인
- 프리플라이트(preflight)는 CORS프로토콜의 일부로, 브라우저가 실제 요청을 보내기 전에 서버에게 요청을 보내는 과정이다.
- 일반적으로 http요청을 보내기전에 option을 설정해 프리플라이트 요청을 보낸다.
```js
const option = {
  method:"POST",
  headers: {
    "Content-Type":"application/json",
    },
  body:JSON.stringify(...)
                     
const response = await fetch("백엔드api",option)
```
- 위 코드와 같이 fetch에 option을 첨부하여 headers를 설정해주었다. 하지만 백엔드에서는 저 headers와 관련된 내용을 처리해주는 코드가 없었기 때문에 발생한 에러

#### 해결 방법
- 백엔드에서 프리플라이트에 따라 코드를 처리 할 수 있게 변경 후 해결

*참고) 프리플라이트의 목적은 다음과 같다
1. 메서드확인
2. 헤더확인
3. 인증확인
이런 목적이 있으니 백엔드와 협업할때 프리플라이트가 필요한지 또는 어떻게 설정한 것인지도 얘기해보자.*

<hr>

### 4. 백엔드에서 set-cookie 해줬지만 프론트에서 요청시 쿠키가 첨부안됨
로그인 이후 백엔드에서 set-cookie설정으로 토큰을 프론트에게 리턴을 해주고 프론트가 다시 인증이 필요한 api요청시 브라우저가 자동으로 쿠키를 보내줘야 하지만 보내주지 않았음.

#### 에러 원인
- 프론트에서 fetch 또는 axios를 이용하여 데이터를 요청할때 자동으로 쿠키를 첨부하는줄 알았는데 아니었음.
- 쿠키를 첨부해주는 옵션을 추가 하지 않아서 발생했음

#### 해결 방법
1. fetch 사용
```js
fetch('https://your-api-endpoint.com/your-endpoint', {
  method: 'GET',
  headers: headers,
  credentials: 'include', // 이 옵션을 통해 쿠키를 요청에 포함시킴
})
```

2. axios 사용
```js
axios.post('endpoint...',{
  withCredentials: true, // 쿠키를 요청에 포함시키기 위해 withCredentials 설정
  headers: {
    'Content-Type': 'application/json',
  },
});
```
위 코드 처럼 옵션을 추가해주면 브라우저가 자동으로 set-cookie로 설정된 옵션들을 추가해서 보내줌
