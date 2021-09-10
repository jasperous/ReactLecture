#### 1. 프로젝트 생성 & Bootstrap 설치

* 신규 프로젝트 생성.

  ```bash
  $ yarn create-react-app emall
  ```

* HTML, CSS 를 직접 하나씩 구현하는 것은 번거롭기 때문에 `Bootstrap` 이라는 라이브러리를 사용.

* [Bootstrap 홈페이지][https://getbootstrap.com/] 의 예제 코드만 복사 붙여넣기만 해도, 다양한 UI 를 사용할 수 있음.

* React 애플리케이션은 일반적으로 React Bootstrap 에 맞게 변형된 라이브러리를 설치해서 사용. 

  ```bash
  $ yarn react-bootstrap bootstrap
  ```

* Bootstrap 특정 기능을 사용할 경우, Bootstrap CSS 를 요구하는 경우가 있음.

  * 이를 위해 사이트의 CSS 파일을 index.html 파일의 \<head\> 태그에 붙여넣기. 
  * CDN 방식으로 추가.
  * 서버 상의 문제와 같은 돌발상황을 방지하기 위해, 필자는 CSS 파일을 레포지토리에 직접 저장함.
  
* Importing Contents.

  * Bootstrap 전체 라이브러리를 import 하면 실행 속도가 상당히 느려짐.
  * 따라서, 사용할 Bootstrap Component 에 맞춰, 개별적으로 라이브러리로부터 import 할 것.

  ```jsx
  // Bootstrap 을 적용할 js 파일
  import { Button } from 'react-bootstrap';
  ```



#### 2. 쇼핑몰 레이아웃 디자인

* Navigation Bar / Jumbotron / 상품 3개 정렬 순서.

> ##### src directory
>
> * 프로젝트의 src 폴더 내 파일들은 리액트 앱을 Build 했을 때, 저절로 압축되고 파일명이 변경됨.
> * public 폴더의 파일들은 사이트의 루트 경로에 그대로 남겨져 있음.
> * React 17 버전 이상에선, public 폴더의 이미지를 CSS 파일에서 ./image.jpg 형태로 첨부할 수 없음. 따라서 CSS 파일에 적용할 이미지는 src 파일을 사용할 것.



#### 3. import / export 문법

* 프로젝트의 규모가 커지거나, 컴포넌트 또는 데이터를 여러 파일로 분산하여 관리할 경우가 많음.
* 이때, 각 파일에서 타 파일의 데이터(변수, 함수 등)을 공유하여 사용할 필요가 있음.

**export default**

* 파일에서 중요한 변수를 export 할 땐, export default 문법을 쓰고, 우측에 원하는 변수를 담음.

  * 변수명, 함수명, 자료형 전부 가능.

* 해당 파일에서 export default 는 단 하나만 존재할 수 있음.

  ```jsx
  // ex) data.js
  export default [
    "Seoul", "Busan", "Vancouver", "Seattle"
  ] 
  ```

  ```jsx
  let cities = ["Seoul", "Busan", "Vancouver", "Seattle"]
  export default cities;
  ```

  ```jsx
  function App(){
    ...App Component
  }
  export default App;
  ```

**import**

* 타 파일에서 export 된 데이터를 사용하고 싶을 때, `import {varName} from "PATH"` .

* export default 로 보내진 데이터는, import 시 해당 파일에 맞게 작명할 수 있음.

  * 예를 들어, data.js 에서는 cities 라는 이름으로 보내졌으나,
  * import 시에는 countries 라는 이름으로 받을 수 있음.

  ```jsx
  // ex) App.js
  import data from "./data.js"
  ```

**export { }**

* export default 와 달리, 여러개의 변수를 내보내야 할 때 다음과 같이 사용.

  * 단, 데이터 명을 필수적으로 선언한 후에 보낼 수 있음.

  ```jsx
  // ex) data.js
  let firstName = "Jasper";
  let lastName = "Kim"
  export {firstName, lastName}
  ```

**import { }**

* export { } 으로 보내진 변수를 사용하기 위해선, import { } 를 사용.

* 그러나, 이 경우엔 export 된 데이터 명 그대로 사용해야 됨. 작명 불가.

  ```jsx
  // ex) App.js
  import {firstName, lastName} from "./data.js"
  ```

* React-Bootstrap 에서 컴포넌트를 사용할 경우, import 한 경우와 유사.

  * `"react-bootstap"` 라이브러리에서 각 컴포넌트명을 그대로 import.



#### 4. Router : 세팅과 기본 라우팅

* 애플리케이션에서 여러가지 페이지를 만들고 싶을 경우, 라우터를 사용.

* `react-router-dom` 이라는 공식 라이브러리를 설치해서 사용.

  ```bash
  $ yarn add react-router-dom
  ```

1. `index.js` 설정

* Raw 상태의 index.js 는 \<App\> 컴포넌트를 `index.html` 에 바꿔치기 하게끔 설정하는 코드.

* 이 소스에 다음 내용을 추가.

  * BrowserRouter 를 import.
  * \<BrowserRouter\> 태그를 \<App\> 태그 주변으로 둘러 쌈.

  ```jsx
  // index.js
  import { BrowserRouter } from 'react-router-dom';
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
    document.getElementById('root')
  );
  ```

> **HashRouter**
>
> * index.js 에 세팅할 때, HashRouter 태그를 사용할 수도 있음.
> * 이를 사용하면 사이트 방문 시, URL 맨 뒤에 /#/ 이 붙은채로 시작함.
> * 브라우저 주소창에 URL 을 입력하여 페이지를 요청하게 됨.
> * 이때, 존재하지 않는 경로의 페이지를 입력하면 서버에 요청을 하여 404 에러 등이 발생할 수 있음.
> * 이처럼 실수로 서버에 요청을 하지 않게 하기 위해서 안전하게 # 을 붙임.

2. 라우팅 하기

* `/` 경로와 `/detail` 경로에 따라 다른 상세페이지를 구현.

* react-router-dom 라이브러리에서 태그 import.

  ```jsx
  // App.js
  import {Link, Route, Switch} from "react-router-dom";
  ```

* 라우팅을 원하는 JSX 코드에, \<Route\> 태그를 작성.

* \<Route> 태그 안에, path 와, path 방문 시 보여줄 HTML을 적으면 됨.

  ```jsx
  // App.js
  function App(){
    return (
      <div>
        ...
        <Route path="/"> 
          <div>Main Page</div>
        </Route>
        <Route path="/detail">
          <div>Detail Page</div>
        </Route>
      </div>
    )
  }
  ```

* HTML 대신 특정 컴포넌트를 보여줄 경우, 다음과 같이 사용 가능.

  ```jsx
  // 방법1
  <Route path="/detail" component={Detail} ></Route> 
  // 방법2
  <Route path="/detail">
    <Detail/>
  </Route>
  ```

* React-Router 는 각 페이지마다 다른 HTML 을 보여주는 것이 아님.
  * Route 태그 영역에, 각자 다른 내용의 HTML 을 갈아끼워서 페이지처럼 흉내내는 것.

> **페이지가 중복되어 노출되는 경우**
>
> * 위 예시는 /detail 로 접속했으나, 메인페이지와 상세페이지가 모두 나타나게 됨.
>
> * /detail 경로에는 / 경로도 포함되어 있기 때문.
>
> * 이렇게 중복으로 나타나는 것을 방지하기 위해, exact 속성을 부여.
>
>   ```jsx
>   <Route exact path="/">
>   	<div>Main Page</div>
>   </Route>
>   ```



#### 5. Router : Link, History, Switch

1. Link 태그로 페이지 이동 버튼 생성

* 페이지 이동을 원하는 HTML 요소에 \<Link\> 태그를 감싸기.

* Link 는 "react-router-dom" 에서 import 해 온 컴포넌트.

  ```jsx
  <Link to="/">Home</Link>
  <Link to="/detail">Detail</Link>
  ```

  * \<a\> 태그를 생성하는 것과 유사.

2. History

* Link 태그와 같은 버튼 말고, 코드 실행 중간중간에 페이지를 이동할 경우도 있음.

  * 예를 들어, Page1, Page2, Page3 에서 각각 Detail 페이지로 이동할 수 있는데, Detail 페이지에서 뒤로가기 버튼을 만들 경우, 각각 기존 페이지로 돌아가야 함.
  * Link  를 사용하면, 특정 경로를 지정하므로 직전 페이지로 이동하는 등의 기능을 구현할 수 없음.

* useHistory 함수를 import.

  ```jsx
  // Detail.js
  import {useHistory} from "react-router-dom";
  function Detail(){
    let history = useHistory();
    return(
    	...
      <button onClick={()=>{ history.goBack() }}></button>
    )
  }
  ```

  * useHistory( ) 는 일종의 Hook. (useState 처럼).
  * history 변수에 담으면, 해당 변수에는 페이지 이동 내역과 유용한 함수가 {객체} 형식으로 저장됨.

* 특정 페이지로 이동하는 기능을 만들고 싶다면, push() 함수를 사용.

  * 이는 Link 태그의 to 속성과 유사.

  ```jsx
  <button onClick={()=>{ history.push("/") }}></button>
  ```

3. Switch

* 매치되는 Route 를 모두 보여주지 말고, 한번에 하나만 보여주도록 하는 기능.

* 이를 사용하면 exact path 를 사용하지 않고도, 1개의 페이지만 노출시킬 수 있음.

* Switch 기능을 적용할 Route 태그를 감싸줌.

  ```jsx
  <Switch>
    <Route path="/"> 
      <div>Main Page</div>
    </Route>
    <Route path="/detail">
      <div>Detail Page</div>
    </Route>
  </Switch>
  ```



#### 6. Router : URL Parameter

* URL Parameter 란 URL 뒤에 무엇을 작성하든, 해당 URL 경로로 이동하는 것을 의미.

  * 예를 들어 `/detail/10` 이런 경로와 같이, URL 뒤에 상품 id 값을 적을 경우에 사용.

* 각 아이템에 대한 /detail 페이지를 각각 구성할 수도 있으나, URL 만들땐, Parameter 문법을 사용.

  ```jsx
  // URL Parameter 문법을 적용하지 않음.
  <Route path="/detail/0">
    <Detail item={item}/>
  </Route>
  <Route path="/detail/1">
    <Detail item={item}/>
  </Route>
  <Route path="/detail/2">
    <Detail item={item}/>
  </Route>
  // URL Parameter 문법을 적용한 경우.
  <Route path="/detail/:id">
    <Detail item={item}/>
  </Route>
  ```

  *  `:id` 콜론 기호는, 해당 자리에 아무 문자나 입력하면, \<Detail\> 컴포넌트로 이동하게 됨.
  * 따라서, /detail/1234 로 이동할 경우, \<Detail\> 페이지로 이동하되, id 에 맞는 데이터를 불러옴.

* id 에 맞는 데이터를 불러오기 위해서 데이터 바인딩이 필요.

* useParams( ) 함수를 이용하여 변수로 저장.

  * useParams( ) 함수는 현재 URL 에 저장된 모든 Parameter 를 객체 형태로 저장해주는 함수.
  * 이 함수의 반환값을 Destructuring 문법으로 id 에 저장.

  ```jsx
  // Detail.js
  import {useParams} from "react-router-dom";
  function Detail(props){
    let {id} = useParams();
    return(
    	...
      <div>{props.item[id].title}</div>
    )
  }
  ```

> **props 데이터 흐름**
>
> * React, Vue, Angular 등의 라이브러리를 사용할 때, 데이터는 항상 위에서 아래로 흘러야 함.
> * 상위 컴포넌트가 중요 데이터를 모두 가지고 있어야 함.
> * 그리고 하위 컴포넌트는 데이터를 props 로 받아서 사용.
>   * 데이터가 양방향으로 전달되면 데이터 관리, debugging 등 문제가 있을 수 있음.
> * 따라서, state 를 만들 땐 state 를 필요로하는 컴포넌트들 중 최상위 컴포넌트에 보관.



#### 7. Styled-Component



#### 8. SASS

```bash
$ yarn add node-sass
```



#### 9. Component LifeCycle

* 앱 컴포넌트는 Lifecycle 이라는 개념이 존재. 

  * 생성, 삭제, 업데이트(ReRender) 등이 발생할 수 있음.

* 이러한 Lifecycle 중간 중간 Hook 을 걸 수 있음.

  * Hook 을 이용하여, 컴포넌트가 생성되거나, 사라지거나, 데이터가 업데이트 되었을 때 로직을 구현할 수 있음.

* 이러한 Hook 문법은 원래 Class 로 생성된 React Component 에서 사용가능 함.

  * 과거의 문법.

  ```jsx
  class Detail extends React.Component {
    componentDidMount(){
      // This will happen after Component Mounts.
    }
    componentWillUnmount(){
      // This will happen before Component Unmounts.
    }
  }
  ```

* 요즘 사용하는 React 문법(function 으로 생성하는 Component) 에는 `useEffect` 를 사용.

  * useEffect Hook 적용 시점은, Component Return 문 전에 적용. 
  * import useEffect 필수.
  * useEffect 함수 안에는 콜백 함수가 들어감.
  * 콜백 함수에 포함된 코드는 1. Mount 된 후 , 2. ReRendering 된 후 실행됨.
    * Mount / ReRendering 조건을 구분하는 것은 뒤에 설명.
  * 따라서, 컴포넌트 로드 후 또는 업데이트 시 실행하고자 하는 코드를 작성하면 됨.

  ```jsx
  function App(){
    useEffect(()=>{
      // This code will be executed,
      // right after Component is Mounted or Rerendered.
    });
    return(
      ...
    )
  }
  ```

  * 컴포넌트가 사라질 때 실행할 코드는 콜백 함수의 return 문에 작성하면 됨.

  ```jsx
  function App(){
    useEffect(()=>{
      ...
      return function funcName(){
        // This code will be executed,
        // right before Component is Unmounted.
      }
    });
    return(
      ...
    )
  }
  ```

* `useEffect` 의 Mount / ReRender 조건 구분/

  * `useEffect` 훅에 들어가는 코드는, mount 되거나 ReRender 될 때 실행되는데,
  * mount 될 경우에만 실행되게끔 할 경우엔 다음과 같이 사용.
  * useEffect 두 번째 파라미터로 대괄호 인자를 전달.
  
  ```jsx
  useEffect(()=>{
    setTimeout(()=>{
      toggleAlert(false);
    }, 2000);
  }, [])
  ```
  
  * 대괄호에는 state 변수명이 들어가며, 해당 state 값이 변경될 경우에만 trigger 되는 조건이 됨.
  * 따라서, 대괄호가 비어있을 경우엔, ReRendering 되어도 useEffect 가 실행되지 않음.

> **중첩된 링크 태그에 대한 경고**
>
> * NavBar 에 생성한 Link 태그로 인해, \<a\> 태그에 \<a\> 를 넣지마라는 경고 메세지가 발생.
>
> * \<Nav.Link\> 태그도 일종의 링크 태그인데, 그 안에 \<Link\> 태그를 삽입했기 때문에 발생.
>
> * 다음과 같이 수정.
>
>   ```jsx
>   // Before
>   <Nav.Link>
>     <Link to="/">Home</Link>
>   </Nav.Link>
>   // After
>   <Nav.Link as={Link} to="/">
>   	Home
>   </Nav.Link>
>   ```

> ##### 타이머 해제
>
> * setTimeout 을 적용했으면, 타이머 해제도 해줘야 함.
> * 어플리케이션 사이즈가 커지면, 남아있는 타이머로 인한 버그가 발생할 수 있음.
> * 따라서, `useEffect` return 문에(컴포넌트가 사라지기 전) timer 를 없애는 것이 필요.
>
> ```jsx
> useEffect(()=>{
>   let timer = setTimeout(()=>{
>   }, 2000);
>   return ()=>{clearTimeout(timer)}
> },[]);
> ```



#### 11. Ajax : Ajax 란 무엇인가, 요청 방법

GET Data URL : https://codingapple1.github.io/shop/data2.json

* Ajax 요청은 서버에 Request 를 보내는데, 새로고침 없이 할 수 있게 도와주는 일종의 코드.
  * jQuery, axios, fetch 이 세 가지를 이용하여 사용할 수 있음.
  * React, Vue 환경에서는 axios 를 많이 사용.
  
* axios 설치 및 import

  ```bash
  $ yarn add axios
  ```

  ```jsx
  import axios from "axios";
  ```

* `axios.get('URL')`  을 사용하여 데이터를 받음.
  
  * 성공 시, then / 실패 시, catch.

```jsx
<button className="btn btn-danger" onClick={()=>{
    axios.get("https://codingapple1.github.io/shop/data2.json")
      .then((result)=>{
      console.log(result.data);
      shoeListChange([...shoeList, ...result.data]);
    }).catch(()=>{
      console.log("Failed");
    })
  }}>See more</button>
```

* Vanilla JS 의 `fetch( )`  문법도 거의 비슷하게 사용할 수 있음.
  * fetch('URL') 을 사용하면 GET 요청이 전달됨.
  * then(), catch() 도 동일.
  * 하지만, 이는 받아온 자료를 JSON 그대로 반환. Object 형식으로 변형하지 않음.
  * 반면, axios 는 JSON 데이터를 object 로 변환하여 반환하기 때문에 데이터로 즉시 사용 가능.

* `axios.post(URL, {data})`
  * POST 역시 then, catch 함수안에서 원하는 코드를 입력하면 됨.
  * 요청 시 header 정보도 보낼 수 있음.



#### 12. Component 중첩 시 State 전달

* 세 개 이상의 Component 가 중첩될 경우, props 속성을 이용하여 State를 반복해서 전달.
* 하위 컴포넌트가 많아질수록 props 의 양이 증가하고 복잡해짐.
  * Part 3 에서 Context 문법 또는 redux 를 사용하여 해소. 
