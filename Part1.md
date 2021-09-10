#### 1. React

* Web App (웹 애플리케이션)
  * 다른 페이지로 넘어가거나 포스팅을 발행해도, 새로고침 되지 않고 부드럽게 동작.
  * UX 가 뛰어나서 좋은 사용자 경험을 제공.
  * HTML 관리가 수월.
  * 구매전환율을 높일 수 있음.
  * React 문법으로 iOS/Android  모바일 앱 제작 가능.
  * 서버 개발자가 편리.
* Ajax + HTML 을 사용해서 위 같은 웹 앱을 만들 수 있으나, 관리가 불편함.
* 따라서, `React`, `Vue`, `Angular` 등의 라이브러리를 사용하여 간결한 코드로 개발.

> ##### Ajax (Asynchronous JavaScript and XML)
>
> * 비동기적 웹 애플리케이션 제작을 위해 다음 조합을 이용하는 웹 개발 기법.
>   * 표현 정보를 위한 HTML + CSS.
>   * 동적인 화면 출력 및 표시 정보와의 상호작용을 위한 DOM, JavaScript.
>   * 웹 서버와 비동기적으로 데이터를 교환하고 조작하기 위한 XML, XSLT, XMLHttpRequest.
> * Ajax 자체는 하나의 특정한 기술을 말하는 것이 아니며, 함께 사용하는 기술의 묶음을 지칭하는 용어.
> * Ajax 애플리케이션은 실행을 위한 플랫폼으로 위에 열거된 기술을 지원하는 웹 브라우저를 이용.
>
> **기존 기술과의 차이점**
>
> * 기존 웹 애플리케이션은 웹 서버에 요청된 요청에 따라 데이터를 가공하여 새로운 웹 페이지를 작성하고 응답으로 반환.
> * 이때 기존 페이지와 반환된 페이지는 일반적으로 유사한 내용을 가지고 있는 경우가 많음.
> * 결과적으로 중복되는 HTML 코드를 한번 더 전송 받음으로써 많은 대역폭을 낭비하게 됨.
>   * 대역폭 낭비는 금전적 손실과 이어지며, 사용자와 상호 반응이 많은 서비스를 만들기 어렵게 함.
> * 반면, Ajax 애플리케이션은 필요한 데이터만 웹 서버에 요청하고, 클라이언트에서 데이터에 대한 처리를 함.
> * 보통 `SOAP`, `XML` 기반의 웹 서비스 프로토콜이 이용되며, 
> * 웹 서버의 응답을 처리하기 위해서 클라이언트는 JavaScript 를 사용.
> * 필요한 데이터만 요청/반환 되므로 교환되는 데이터량과,
> * 데이터 처리 일부분이 클라이언트에서 진행되므로 데이터 처리량도 줄어들게 됨.
>
> ##### 장점
>
> * 페이지 이동 없이 고속으로 화면 전환 가능.
> * 서버 처리를 기다리지 않고, 비동기 요청이 가능.
> * 수신하는 데이터 양을 줄일 수 있고, 클라이언트에게 처리를 위임할 수도 있음.
> * 플러그인 없이도 인터렉티브 한 페이지를 구현할 수 있음.
>
> ##### 단점
>
> * Ajax 를 쓸 수 없는 브라우저에 대한 문제가 있음.
> * HTTP 클라이언트의 기능이 한정적.
> * 페이지 이동 없는 통신으로 인한 보안상의 문제.
> * 지원하는 Charset 이 한정적.
> * 스크립트로 작성되므로, 디버깅이 용이하지 않음.



#### 2. React 세팅

```bash
$ yarn create react-app {projectName}
$ cd {projectName}
$ yarn start
```



#### 3. JSX

* React 프로젝트에서는 순수 HTML 말고, `JSX` 라고 불리는 JavaScript 를 확장한 문법을 사용함.

  * JavaScript 의 모든 기능이 포함되어 있음.

* React 에서는 본질적으로 렌더링 조직을 UI 로직 기준으로 구분함.

  * 이벤트가 처리되는 방식, 시간에 따라 State 가 변하는 방식, 데이터 로딩 방식 등.
  * React 에서 JSX 사용이 필수는 아니지만, 일반적으로 JavaScript 코드 안에서 UI 관련 작업을 할 때 시각적으로 도움이 됨.

* App.js 파일에 NavBar 적용.

  * React 에서 HTML 태그에 `class` 속성을 적용하고 싶으면, `className` 이라고 사용해야 함.
  * JSX 도 일종의 JS 이므로, JS 에서 사용하는 class 키워드를 막 사용할 수 없음.

  ```jsx
  // App.js
  function App(){
      var data = "Hello";
      return(
          <div className="App">
              <div className="black-nav">
                  <div>DevLog</div>
              </div>
          </div>
      )
  }
  ```

* JSX 에서 데이터 바인딩.

  * 쉽게 말해, JavaScript 데이터를 HTML 에 꽂아 넣는 작업.
  * 오늘날의 FE 웹 앱 개발에는 데이터바인딩을 할 작업이 많은데, React 는 이를 쉽게 구현시킴.
  * 중괄호 안에 데이터바인딩 시킬 변수명만 담으면 됨.

  ```jsx
  <div>{data}</div>
  ```

  * VanillaJS 문법을 사용한다면 아래처럼 복잡했을 것.

  ```js
  document.getElementById().innerHTML = '';
  ```

* href, id, className, src 등 여러가지 HTML 속성에도 데이터바인딩 할 수 있음.

  ```jsx
  <div className={ data }>...</div>
  <div style={ styleObjectData }></div>
  ```



#### 4. State 선언

* React 에서는 데이터바인딩과 관련된 중요한 데이터를 저장할 땐, 일반 변수 대신 State 를 사용.

* 일반 변수와 비교했을 때, 선언과 재할당 과정이 비교적 복잡해 보이지만 `State` 를 사용하는 이유는 다음과 같음.

  * 데이터가 HTML 에 데이터바인딩 되어 있고,
  * 해당 데이터가 변경되었을 때 자동으로 관련 HTML 을 재렌더링 시켜줌.
  * 그러나 일반 변수는 변경이 발생해도 자동으로 재렌더링 시켜주지 않음.

* 글 목록 List 를 만들고, 포스트 객체에 State 데이터를 적용.

  ```jsx
  // App.js
  import { useState } from "react";
  function App(){
      var data = "Hello";
      let [postTitle, changeTitle] = useState("Michelin Guide")
      return(
          <div className="App">
              <div className="black-nav"> ... </div>
              <div className="list">
                  <h4>{postTitle}</h4>
                  <p>2020/8/15</p>
              </div>
          </div>
      )
  }
  ```

* State 를 사용하기 위해선 `useState( )` 함수를 사용.

  * useState( 초기 저장시킬 데이터 ) 이런 형식으로 사용.
  * useState 는 [데이터1, 데이터2] 처럼 생긴 Array 로 반환.
  * 데이터1 변수에는 실제 저장할 데이터가 들어있고,
  * 데이터2 변수엔 저장할 데이털르 변경시키는 함수가 들어 있음.

  ```jsx
  let [postTitle, changeTitle] = useState("Michelin Guide")
  ```

  * 위 state 선언은 ES6의 Destructuring 문법을 사용한 것.



#### 5. State 변경

* state 데이터 변경은 useState 함수가 반환하는 두 번째 변수를 사용.

* 버튼을 이용하여, 클릭 시 state 가 변하는 로직을 구현.

  * 버튼에 onClick 함수를 적용.
  * JSX 는 함수를 넣어야 하지만, 즉시 실행함수를 넣을 경우 코드처럼 사용할 수 있음.

  ```jsx
  // VanillaJS
  <div onClick="JS Code"></div>
  // JSX
  <div onClick={JS Function}></div>
  ```

  * `titleChange` 라는 새로운 함수를 만들어서, `Button` 태그의 onClick 속성의 실행 함수로 적용.

  ```jsx
  let titleChange = (index) => {
    let copy = [...postTitle];
    copy[index] = "Incheon";
    changeTitle(copy);
  }
  ...  
  <Card>
    <Card.Body>
      <Card.Title>{postTitle[index]}</Card.Title>
      <Card.Text>{postDate[index]}</Card.Text>
      <Button variant="primary" onClick={()=>{titleChange(index)}}>
        ChangeTitle</Button>
    </Card.Body>
  </Card>         
  ```

> **DeepCopy**
>
> * titleChange 함수에서 postTitle 의 데이터를 직접 바꾸지 않고, copy 라는 새로운 배열을 선언하여 복사.
> * JavaScript 에는 자료형을 복사할 때, `Deep Copy` / `Shallow Copy` 라는 두 가지 개념이 존재하는데, 위 예시에서는 Deep Copy 를 적용.
>   * JavaScript 의 참조형 데이터는, 일반적인 복사를 하게 되면 신규 변수에 Shallow Copy 를 하게 됨.
>   * 따라서, Deep Copy 를 하여 신규변수를 수정하고, state 수정함수에 적용.



#### 6. React Component

* 특정 Post 를 선택할 경우, 아래에 관련 Modal 창을 띄움.

  * Modal 영역을 컴포넌트화 시킬 예정.

* Modal 을 개발하기 위해서는 그에 맞는 HTML 태그를 구현.

  * **주의** : return 의 최상위 태그는 단 하나만 존재할 수 있음.
  * 일번적으로 return 문에 최상위 `div` 태그를 삽입.

* Modal 에 포함되는 태그가 많으므로, 이를 하나의 태그로 간결하게 관리할 경우 `React Component` 문법을 사용.

  * 즉, 긴 HTML 태그를 한 단어로 치환해서 넣을 수 있는 기능을 제공.
  * 태그를 이용하여 변수처럼 다른 Component 에 삽입할 수 있음.

  ```react
  // App.js 
  function Modal() {
    <div className="modal">
      <h2>Title</h2>
      <p>Date</p>
      <p>Content</p>
    </div>
  }
  ```

  ```react
  // App Component 에 아래 두 가지 방법으로 적용할 수 있음.
  <Modal />
  <Modal></Modal>
  ```

* Component 특징

  1. 일반적으로 컴포넌트명은 대문자로 시작함.

  2. `return()` 문 안에는 단 하나의 최상위 태그가 들어감.

     여러개의 태그를 쓰고싶으면 \<div\> 태그로 묶음.

  3. Component 내에는 미리 만들어둔 Component 가 들어갈 수 있음.

* Component 하면 좋은 예시
  1. 반복 출현하는 HTML 코드.
  2. 내용이 자주 변경될 것 같은 HTML.
  3. 다른 페이지를 만들고 싶다면, 그 페이지 HTML 자체를 하나의 컴포넌트로 만드는 것이 좋음.
  4. 팀원과의 협업을 위해 컴포넌트화 하는 경우도 있음.
  
* Component 의 단점.
  1. 깔끔하게 관리하기 위해, 화면 요소를 많이 분할하였지만, 그만큼 데이터 관리가 복잡해짐.
  2. 예를 들어, App 컴포넌트의 데이터를 Modal 컴포넌트에서 바로 사용할 수 없음.
  3. 이는 props 라는 문법을 이용하여, state 를 Modal 컴포넌트로 전달해줘야 비로소 사용할 수 있음.



#### 7. Component Toggle

* Post Card 를 클릭하면, 하단에 Modal 창이 Toggle 되도록 구현.

  * VanillaJs 에서는 style 속성을 이용하여 display : none 처리하여 화면 렌더링을 조정하지만,
  * React 에서는 Component 표시 여부를 state 에 저장하여, true 면 표시 / false 면 숨김.

* JSX 의 HTML 코드 사이에, `{ }`  중괄호를 사용하여 JavaScript 코드를 입력함. 

  * 단, 중괄호 내에는 if - 조건문은 사용할 수 없기 때문에, 삼항연산자를 사용.

  ```react
  {
    state ? <Modal /> : null
  }
  ```

* JSX 에서 빈 HTML (즉, 컴포넌트를 표시하지 않음) 을 의미하는 것은 `null` 자료형.

> **JSX 의 중괄호 { }**
>
> * JSX  문법의 중괄호에는 변수와 함수만 들어갈 수 있음.
> * 따라서 반복문, 조건문과 같이 '문' 이 되는 statement 는 포함될 수 없음.



#### 8. Iteration of Components (map)

* React 환경에서는 반복문을 이용하여 HTML 태그를 간략하게 표시할 수 있음.
  * 사용자 컴포넌트 포함.
* JSX 문법으로는 for - 반복문을 사용할 수 없으며, 특별한 문법이 있음 → map.

**map 함수**

* JSX 의 중괄호 `{ }` 내부에는 변수명과 함수명만 들어갈 수 있음.

  * 8 의 설명 참고.

* 따라서 중괄호 내에서는 map 이라는 함수를 이용하여 반복문처럼 활용.

  * 이는 반복문이 아니며 array 자료형에 붙일 수 있는 일종의 내장함수.

* map 함수는 배열의 인덱스 만큼 순회하며, 모든 자료형에 똑같은 작업을 시킴.

* map 함수의 parameter 로 넘겨진 값은, 배열 내부의 자료를 출력해주는 역할을 함.

  * 일반적으로 두 개의 parameter 를 넘길 수 있는데, 첫 번째는 각 데이터 자체를 의미, 두 번째는 순회중인 인덱스를 의미.
  
  ```react
  {
    let arr = [7,9,2,5];
    arr.map((content, index)=>{
      console.log(content);	// 7, 9, 2, 5
  		console.log(index);		// 0, 1, 2, 3
      return content * 10;	// 70, 90, 20, 50
    })
  }
  ```

* JSX 에서 HTML 태그를 map 함수로 반환하는 방법.

  ```react
  {
    arr.map(()=>{
      return (
        <div>{postTitle}</div>
      )
    })
  }
  ```

* map 함수를 사용하지 않고, 일반적인 for 문을 사용할 경우.

  * JSX 의 중괄호 안에는 문(statement)가 사용될 수 없으므로, for 문을 포함하는 함수를 선언하고,
  * 중괄호에 해당 함수를 호출.
  
  ```react
  function App(){
    function repeatedTag(){
      let arr = [];
      for(let i=0; i<10; i++){
        arr.push(<div>Hello</div>);
      }
      return arr;
    }
    return(
      <div>
      	...HTML
        {repeatedTag()}
      </div>
    )
  }
  ```
  
  

#### 9. props

* 현 단계까지, App 이라는 컴포넌트 내에 NavBar, Modal 이라는 하위 컴포넌트를 생성함.
  * App 은 부모 컴포넌트이며, NavBar, Modal 은 자식 컴포넌트 관계가 됨.
* Modal 컴포넌트와 같은 자식 컴포넌트가 부모 컴포넌트의 데이터를 사용할 경우, `props` 문법을 이용.
  * props 문법을 이용하여, 자식 컴포넌트로 하여금 부모 컴포넌트의 데이터에 바인딩을 시킴.

**props 사용 방법**

* 부모 컴포넌트에서 자식 컴포넌트를 선언할 때, 아래와 같이 사용.

  * stateName 을 사용할 경우엔 `{ }` 를 이용하여 변수명을 사용.
  * 일반 텍스트를 전송하고 싶을 경우엔 따옴표를 사용.

  ```jsx
  <childComponent props={props}>
  ```

  * 등호 앞의 props 는 childComponent 에서 사용될 props 명.
  * 중괄호 안의 props 는 실제 state 명.
  * state 데이터 뿐만 아니라, state 를 변경하는 함수명도 전달할 수 있음.
  * 텍스트를 그대로 보낼 경우, `<childComp props="textHere">` 처럼 사용할 수도 있음.

* 자식 컴포넌트를 선언하는 function 에는 함수의 인자로 props 를 전달.

  ```react
  function App(){
    let [postTitle, changeTitle] = useState(['비빔밥', '물회', '낙곱새']);
    return(
      <div>
        ... 
        <Modal postTitle={postTitle}/>
      </div>
    )
  }
  function Modal(props){
    return(
      <div className="modal">
        <h2>Title {props.postTitle}</h2>
        <p>Date</p>
        <p>Content</p>
      </div>
    )
  }
  ```

* 자식 컴포넌트에 props 데이터 바인딩할 때, props 속성이 필요한 만큼 무한히 연결할 수 있음.

* 자식 컴포넌트의 생성 함수 인자로 넘겨주는 props 에는 모든 props 데이터가 들어가있음. 

  * 자식 컴포넌트에서 사용되는 props 는 객체 자료형.
  * 따라서 `props.` 뒤에 사용할 데이터만 추가해서 사용하면 됨.



#### 10. input 데이터 처리 : 데이터를 State 로 저장

* 사용자의 입력값을 데이터로 받아오기 위해서 빈 state 값을 선언.

* `input` 태그의 `onChange` 이벤트를 사용하여 데이터를 받음.

  * VanillaJS 문법으로 입력값에 대해 콘솔에 출력하는 코드.

  ```react
  <input onChange={(e)=>{console.log(e.target.value)}}/>
  ```

  * `e.target` 은 VanillaJS 문법으로 "현재 이벤트가 작동하는 HTML 요소" 를 의미.
  * `.value` 부분은, 해당 input 데이터의 값을 의미.



> **map 함수를 사용할 때, Console 창에 Warning 이 발생하는 경우**
>
> * return 하는 태그에 key 속성을 추가하지 않았기 때문.
> * React 에서는 반복문을 돌린 HTML 요소에 꼭 `key = { }`  속성을 적을 것을 권장하는데, 이 데이터에는 0, 1, 2 처럼 순차적으로 증가하는 변수를 넣으면 됨.
> * map 함수에는 이 같은 변수가, 두 번째 인자 index 로 항상 존재하으므로 이를 사용.
>
> ```jsx
> array.map((item, index)=>{
>   return(
>     <div className="list" key={index}>
>     	... 
>     </div>
>   )
> })
> ```



#### 11. input 2 데이터 처리 : 입력 받은 데이터를 Posting

* 사용자의 입력값을 받아서, 신규 postName, postUpdate, postLike 를 state 에 추가.

  ```jsx
   <div className="publish">
    	<input />
    	<input />
    	<button onClick={(e) => {
     	   let newPosts = [...postTitle];
     	   let newLikes = [...postLikes];
     	   let newUpdate = [...postUpdate];
     	   newPosts.unshift(e.target.previousElementSibling.previousElementSibling.value);
     	   newLikes.unshift(0);
     	   newUpdate.unshift(e.target.previousElementSibling.value);
     	   changeTitle(newPosts);
     	   changeLikes(newLikes);
     	   changeUpdate(newUpdate);
     	 }}>Save
    	</button>   
  </div>
  ```

* `array.prototype.unshift` 메소드는 배열의 맨 앞에 push 하는 키워드.



#### 12. Class 를 이용한 예전의 React 문법

* 과거의 React Component 를 생성하는 문법은 class 객체를 생성하고, `React.Component` 를 상속받음.

  * 아래는 가장 기본적인 Component 생성 포맷.
  * React.Component 로 상속을 받으며, 기본적으로 constructor 함수, render 함수가 필요.
  * return 소괄호 내에, 하나의 최상위 태그만 가능한 것은 기본적으로 동일. 

  ```jsx
  class newComponent extends React.Component {
    constructor() {
      super();
    }
    render() {
      return(
        <div>
          HTML goes here...
        </div>
      )
    }
  }
  ```

* class 내에 state 데이터를 만들고 사용하는 방법.

  ```jsx
  constructor() {
    super();
    this.state = {
      name : "Kim",
    	age : 26
    }
  }
  render() {
    return(
      <div>
      	<h3>this is my name : {this.state.name} </h3>
        <button onClick={this.setState({name : "Junghyun"})}></button>
      </div>
    )
  }
  ```

  * 선언은 `constructor` 내부, `super( )` 아래 영역에 함.
  * state 를 사용하기 위해서는 `this.state` 키워드를 사용.
  * state 를 변경하기 위해서는 `this.setState` 내장 함수를 필수로 사용함.
    * this.setState 내장 함수의 소괄호에는, 변경할 state 데이터만 넣으면 됨.

* state 데이터를 변경하는 방법

  * 위 예시에서는 onClick 중괄호 내에, this.setState 함수를 즉시 사용했으나, 별도의 함수를 생성하는 방법을 알아봄.

  ```jsx
  constructor() {
  	...
  }
  changeName() {
    this.setState({name:"Park"});
  }
  render() {
    return(
      <div>
        ...
        <button onClick={this.changeName}>Button</button>
      </div>
    )
  }
  ```

  * 위 처럼 사용할 경우, this.changeName 에서 에러가 발생하는데, 이는 this.changeName 을 선언하는 function 문법에서 this 를 새롭게 재정의 했기 때문.
  * 따라서, this 가 재정의 되지 않도록 아래 두 가지 방식을 대체할 수 있음.

  ```jsx
  this.changeName.bind(this);		// 사용할 때 this 를 바인딩
  ```

  ```jsx
  changeName = () => {					// 함수 선언 시 Arrow Function 을 사용
    this.setState({name : "Park"});
  }
  ```

  

> **Class**
>
> * `Class` 는 함수 또는 데이터를 보관하는 집합.
> * `extends` 키워드는 상위 클래스(오른쪽에 명시된 React.Component) 의 성질을 물려 받아서 집합을 만든다는 의미.
> * 따라서 위 코드의 newComponent 는 React.Component 의 성질을 가지고 있는 집합.
> * 계속해서 extends 하여 사용했던 컴포넌트를 사용할 수 있음. 
> * React 라이브러리에 저장된 컴포넌트 성질을 이용하여 새로운 컴포넌트를 생성하는 방법.
> * Class 문법은 여러개의 데이터나 함수를 한 곳에 보관할 경우 사용하는 문법.
>   * `class className { }` 이런 식으로 중괄호 내에 데이터나 함수를 담으면 됨.
> * ​	Class 를 만들어 두면 이가 가지고 있는 데이터를 그대로 복사해서 사용할 수 있은 Object 를 쉽게 만들 수 있음.
> * 혹은 Class 가 가지고 있는 데이터를 그대로 복사해서 사용할 수 있는 Class 도 만들 수 있음.
>
> **Constructor**
>
> * `constructor( )` 는 여러가지 변수와 함수가 포함된 class 를 생성할 때, 새로운 변수를 넣는 공간.
> * 여기에 포함된 `super( )` 라는 함수는, 상속받은 React.Component 클래스의 변수를 그대로 물려 받아 사용하는 의미.
> * 따라서, `super( )` 를 먼저 입력해야 state 를 사용할 수 있음.
> * React.Component 에 state 데이터가 있으므로. 













