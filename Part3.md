#### 1. React Project Build

* 웹 브라우저는 HTML, CSS, JavaScript 세 가지만 해석할 수 있으므로, React 에서 작성한 state, JSX 등의 문법을 이해할 수 없음.
* 따라서 React Project 는 Build 를 통해 브라우저 친화적인 HTML, CSS, JS 파일로 만듦.
* 프로젝트를 빌드하여 Github Pages 를 이용하여 배포까지 진행.

**배포 시 확인 사항**

* www.naver.com/blog 처럼 하위 경로에 배포를 할 경우에는 프로젝트 설정이 별도 필요.

* package.json 파일에서 homepage 라는 키 값을 추가히고 배포할 사이트 경로를 추가.

  ```json
  "homepage" : "http://www.naver.com/blog",
  ```

* 리액트 라우터가 설치되었다면, 라우터가 제공하는 `basename=" "` 속성을 추가하는게 더 라우팅 잘 됨.

>##### 1. 페이지 로딩 속도
>
>* 트래픽을 조금이라도 느리게 줄이고 싶으면, 컴포넌트를 lazy 한 방식으로 로딩.
>* 공식 홈에 있는 lazy 함수 참조.
>
>##### 2. Build 시 압축하지 않고 남기고 싶은 파일
>
>* `./` 부터 시작하는 경로로 첨부하는 이미지, js 파일은 모두 압축되고 이름이 변환됨.
>* 이름 변경을 하지 않을 경우, public 폴더에 넣고 빌드.
>
>##### 3. 메인페이지 말고 특정 페이지로 접속하면 404 에러가 발생하는 이유
>
>* 세부 페이지 URL 을 직접 입력하면 404 에러가 발생할 수 있는데,
>* 이는 서버에서 상세 페이지로 직접 접속했을 때, 해당 경로로 안내할 수 있도록 API 개발이 되어 있어야 함.
>* 또는 # 기호가 붙는 hashrouter 를 사용.



#### 2. Context API

* 중첩된 컴포넌트로 인해 props 연속 사용이 어려울 경우, `Redux` 또는 Context API 를 사용.
  * 중첩된 컴포넌트가 많아서, props 를 계속 넘겨야 할 경우에만 Context API 추천. 컴포넌트가 많이 없을 경우엔 props 를 추천.
  * Context API 도 초기 설정이 다소 필요하기 때문.
* Context API 는 하위 컴포넌트들이 props 구문을 사용하지 않아도 state 를 사용 가능하게 만들어주는 문법.



1. Context 범위를 지정하는 컴포넌트를 생성 (Context Component 생성)

   * 여기서 생성된 stockContext 라는 변수는 컴포넌트 객체가 됨.

   ```jsx
   // App.js 에서 전역 변수로 선언.
   let stockContext = React.createContext();
   // App.js 의 App 컴포넌트에 선언.
   let [stock, chageStock] = useState([10, 11, 12]);
   ```

2. Context Component 을 이용하여, state 값을 공유할 컴포넌트 범위를 감싸줌.

   * Context Component 명 : stockContext.
   * Context Component 적용 : `<stockContext.Provider value={stock}>`

   ```jsx
   // 여기에 포함되는 Component 는 모두 stock 이라는 state 를 접근.
   // 단 각 컴포넌트에 props 를 대체할 수 있는 useContext 훅을 적용(아래 참조).
   <stockContext.Provider value={stock}>
     <Layout></Layout>
   </stockContext.Provider>
   ```

3. Context Component 범위에 포함되는 컴포넌트에서 데이터를 사용.

   * useContext( ) Hook 을 이용하여 원하는 Context 를 호출.

   ```jsx
   import {useContext} from 'react';
   
   function Layout(){
   	let stock = useContext(stockContext);
     return(
       ...
       {stock[i]}
       	<DeeperComponent></DeeperComponent>
       </div>
     )
   }
   ```

4. Layout Component 아래, DeeperComponent 추가 + Context 적용.

   * 위 1, 2에서 Context Component 를 생성하고, 컴포넌트를 범위에 맞게 적용했으므로,
   * 위 3번 과정만 반복하면 됨.

   ```jsx
   import {useContext} from 'react';
   function DeeperComponent(){
     let stock = useContext(stockContext);
     return(
       	...
       	{stock}
       </div>
     )
   }
   ```

   

#### 3. 조건부 컴포넌트 적용(3개 이상)

* Bootstrap Tab Component 를 이용하여, Tab 바를 만들고,

* 각 탭을 선택했을 때, 노출되는 Component 를 갈아끼움.

* 이럴 경우, 탭이 2 개 이상이되면 삼항 연산자로 Component 를 표시하는 것이 불가.

  ```jsx
  state ? <Component1> : <Component2>;
  ```
  
  * 따라서, onClick Event 발생 시 state 값을 바꿔주고, 값에 따라 컴포넌트를 변경.
  
  * 삼항 연산자를 이용할 수 없으므로, 조건문이 포함된 Component 를 새로 생성.
  
  ```jsx
  function Detail(){
    let [tabPressed, changeTab] = useState(0);
    return(
      <div>
        ...
        <Tab onClick={()=>{ changeTab(0)}}></Tab>
        <Tab onClick={()=>{ changeTab(1)}}></Tab>
        <Tab onClick={()=>{ changeTab(2)}}></Tab>
  			<TabContent tabPressed={tabPressed}/>
      </div>
    )
  }
  function TabContent(props){
    if(props.tab === 0){
      return(<div>ZERO</div>)
    }else if(props.tab === 1){
      return(<div>ONE</div>)
    }else if(props.tab === 2){
      return(<div>TWO</div>)
    }
  }
  ```



#### 4. 애니메이션(react-transition-group)

* react-transition-group 라이브러리 적용 & import

  ```bash
  $ yarn add react-transition-group
  ```

  ```jsx
  // 애니메이션을 적용할 컴포넌트 파일.
  import {CSSTransition} from 'react-transition-group';
  ```

1. CSSTransition 태그를 생성하고 애니메이션을 적용할 HTML 을 감싸줌.

   ```jsx
   <div>
     <CSSTransition in={true} classNames="wow" timeout={500}>
       <TabContent/ tabPressed={tabPressed}>
     </CSSTransition>
   </div>
   ```

2. CSSTransition 태그에 `in`, `classNames`, `timeout` 속성을 부여.

   * in : 스위치 역할, true 일 때 애니메이션을 적용시켜줌.
   * classNames : 어떤 애니메이션을 적용할 지 작명해주는 부분이며, 끝에 s 가 붙음.
   * timeout : 작동 시간.

3. Component 가 적용된 JS 파일와 연결된 CSS 파일에서 애니메이션 디자인.

   ```css
   .wow-enter {
     opacity : 0
   }
   .wow-enter-active {
     opacity : 1;
     transition : all 500ms;
   }
   ```



#### 5. Redux : props 를 대체하는 다른 방법

* 실제 개발 환경에서는 redux 를 설치하여 사용하는 곳이 많음.
* 이는 props 전송 없이도 모든 컴포넌트들이 state 를 사용할 수 있게 만들어 줌.
* 중첩된 컴포넌트에서 여러번 props 전달을 하지 않아도 됨. Context API 와 같은 역할.
* 연습을 위한 `Cart.js`  파일 생성 + Bootstrap Template Table 을 적용.
  * URL `/cart` 경로에 접속했을 때, Cart.js 를 등장시키고, 테이블에 데이터를 불러옴.
  * 이 테이블에 상품데이터를 바인딩 할 것인데, 이 데이터를 `redux` 를 이용하여 보관.



1. Redux 설치.

   * `redux`, `redux-react` 두 개의 라이브러리가 필요.
   * redux 는 데이터를 엄격하게 관리하기 위한 기능,
   * `redux-react` 는 Redux 를 React 에 적용하는 기능을 제공.

   ```bash
   $ yarn add redux react-redux
   ```

   

2. src/Cart.js 생성 + App.js 에서 경로 설정.

   * 데이터 바인딩을 위한 카트 테이블 생성.

   ```jsx
   // Cart.js
   import React from 'react';
   import {Table} from 'react-bootstrap';
   function Cart(){
     return(
       <div>
         <Table>
           ...
         </Table>
       </div>
     )
   }
   ```

   ```jsx
   // App.js
   <Router path="/cart">
     <Cart/>
   </Router>
   ```

   

3. index.js 에 적용.

   * Provider 컴포넌트를 react-redux 라이브러리에서 import 한 뒤,
   * state 데이터를 공유할 컴포넌트에 감싸줌.
   * Provider 태그 안의 모든 컴포넌트는 state 를 props 없이 사용할 수 있음.

   ```jsx
   // index.js
   import {Provider} from 'react-redux';
   ReactDOM.render(
     <React.StrictMode>
       <BrowserRouter>
         <Provider>
           <App/>
         </Provider>
       </BrowserRouter>
     </React.StrictMode>
   )
   ```

   

4. Redux 에서 사용할 데이터를 만들기 위해 `createStore( )` 함수를 사용.

   * redux 라이브러리에서 createStore 함수를 import.

   ```jsx
   import {createStore} from 'redux';
   ```

   * createStore( ) 함수의 인자에는 callback function 을 넣고, 
   * callback function 에는 사용자가 원하는 state 초기 값을 반환.
   * \<Provider\> 태그에 state 를 props 처럼 등록하여 전달.

   ```jsx
   // index.js
   import {Provider} from 'react-redux';
   import {createStore} from 'redux';
   let store = createStore(()=>{
     return [{
       id: 0,
       name : "NikeJordan",
       quantity : 3
     }]
   })
   ReactDOM.render(
     <React.StrictMode>
       <BrowserRouter>
         <Provider store={store}>
           <App/>
         </Provider>
       </BrowserRouter>
     </React.StrictMode>
   );
   ```

   * 즉, Redux 를 통해 생성한 `Store` 에 `State` 데이터가 들어간다고 생각하면 됨.

   

5. Store 에 저장된 State 데이터 꺼내쓰는 법.

   * Cart.js 에서 데이터를 꺼내와 데이터 바인딩을 시켜줘야 함.
   * 이때, 그냥 사용할 수 없고, Store 안의 데이터를 Props 형태로 등록시켜줘야 함.

   * `import {connect} from 'react-redux';`
   * `export default` 를 connect 를 사용하여 변형.
     * connect 함수에 stateToProps 를 집어넣음. (자유 작명 방식)
     * redux store 에 있던 데이터들이 props 로 엮인 채로 Component 가 export 됨.

   ```jsx
   // Cart.js
   import {connect} from 'react-redux';
   function Cart(props){
     return(
       <div>
         {props.cartState1}
         {props.cartState2}
       </div>)
   }
   function stateToProps(state){
     return {
       cartState1 : state,			 // 이런식으로 객체 전체를 넘기고, 사용할 때 조건을 적용하여 출력하거나,
       cartState2 : state[0].id // 객체를 넘길때 상세 조건을 적용하고, 사용할때 간결하게 적용.
     }
   }
   export default connect(stateToProps)(Cart);
   ```

   

6. 데이터 바인딩하여 table 요소에 적용

   ```jsx
   <tr>
   	<td>{props.state.name}</td>
   </tr>
   ```



> **Redux에 대한 의견**
>
> * Redux 를 사용하는 것은, 중첩된 컴포넌트 구조에서 하위 컴포넌트로 데이터를 전달할 때 props 를 간결하게 적용할 수 있는 tool 역할.
>



#### 6. Redux : reducer / dispatch

* Redux 를 이용한 state 변경 방법은 다음과 같음.

  * `reducer` (자유 작명) 라는 함수를 만들고, 함수 내에 데이터를 수정하는 방법을 정의.
  * 그리고 프로젝트 실행 코드 중에 `dispatch( )` 함수를 사용하여 `reducer` 에게 수정 요청을 보냄.
  * 복잡해 보일 수 있으나, 이렇게 사용하는 이점이 있음(아래 설명).
* 실습 내용.

  * Cart 테이블에 + / - 버튼을 만들고, 클릭할 경우 수량을 증가 감소시킴.
  * 버튼에 onClick 이벤트를 걸고, reducer 가 실행될 수 있도록 코드 작성.
* `reducer`  함수는 다음을 포함함.

  * state 초기값.
  * state 데이터 수정 방법이 포함된 함수.

1. reducer 함수가 초기값만 반환할 경우.

   * 앞전엔 `createStore( )` 함수에 store 초기값을 직접 입력했으나, 지금부터는 `reducer` 에 초기값을 포함할 것.

   ```jsx
   // index.js
   function reducer(){
     return [
       {id: 0, name: "Jordan", quantity: 2},
       {id: 1, name: "Jasper", quantity: 4}
     ]
   }
   let store = createStore(reducer);
   ```

2. reducer 함수에 초기값과 데이터 수정 방법까지 포함할 경우.

   * initState, reducer 함수, store 를 각각 분리해서 생성.

   ```jsx
   // index.js
   let initState = [
     {id: 0, name: "Jordan", quantity: 2},
     {id: 1, name: "Jasper", quantity: 4}
   ];
   function reducer(state = initState, action){
     if(action.type === 'inc'){
       let copy = [...state];
       copy[0].quantity++;
       return copy
     }else{
       return state
     }
   }
   let store = createStore(reducer)
   ```

> **Default Parameter 문법**
>
> * 함수를 만들 때, 실수 또는 의도적으로 파라미터를 입력하지 않았을 경우,
>
> * 기본으로 가질 파라미터를 부여할 수 있음.
>
>   ```jsx
>   function test(a=10, b=20){
>     console.log(a+b);
>   }
>   test(1);	// b 인자에 들어온 값이 없으므로 a 에는 1이 적용, b 는 default parameter 20 이 적용. 결과 21.
>   ```
>

* onClick 이벤트에 적용될 action 을 추가.

  ```jsx
  // Cart.js 에 적용한 Button
  <button onClick={()=>{props.dispatch(type:'inc')}}>
  	+
  </button>
  ```


> **Redux 사용하는 이유**
>
> * 현재 예제에서는 props, useState 를 사용하는 것에 비해 부가적인 코드가 많아짐.
> * 이 같은 소규모 웹 사이트에서는 Redux 의 효과를 발휘할 수 없음. 배보다 배꼽이 더 커지는 꼴.
> * 대규모 사이트에서는 Component 가 매우 많은데, 이때 특정 State 에서 버그가 생길 경우 트래킹 하는 것이 어려움.
> * Redux 를 이용해서, Reducer 함수에 State 를 수정하는 방법을 미리 정의해두면, 관리하기 용이함.
> * Reducer 함수를 한 군데에서 관리하게 되면, 서버의 데이터 입출력 API 를 미리 정의하듯 사용할 수 있음.



#### 7. Redux : 추가적인 state / reducer

* Store 객체에 여러가지 state 가 필요하다는 가정을 위해, `/cart` 경로에 버튼을 클릭 시 카드 레이아웃이 닫히는 것을 구현.
* 카드 레이아웃 열림/닫힘 state 데이터 생성을 위해 새로운 reducer 를 사용.
  * 기존 reducer 에 boolean 값을 추가하면 값을 꺼내서 파싱할 때 헷갈릴 수 있음 (이렇게 사용할 수는 있음).

1. 따라서 신규 reducer 생성 (aka. reducer2).

   * 새로운 reducer를 생성하면, 동일하게 store 에 등록해야 함.
   * 단, reducer 이 두 개 이상 생성되었으므로, `combineReducers` 라는 함수를 이용하여 모든 reducer 를 object 형식으로 담음.

   ```jsx
   // index.js
   import {createStore, combineReducers} from 'redux';
   let initAlert = true;
   function reducer2(state = initAlert, action){
     if(action.type === "close"){
       return initAlert = false;
     }else{
       return state;
     }
   }
   let store = createStore(combineReducers(
     {
       reducer, 
       reducer2
     }
   ));
   ```

2. 생성된 reducer 를 `Cart.js` 에서 사용.

   * combineReducers 함수를 통해 store 에는 reducer 를 key 로하는 object 형식으로 저장됨.
   * 따라서, store 에서 데이터를 꺼낼때, 필요한 reducer 를 지정해서 사용해야 함.

   ```jsx
   // Cart.js
   function stateToProps(state) {
     return {
       state : state.reducer,
       alert : state.reducer2
     }
   }
   export default connect(stateToProps)(Cart)
   ```

3. dispatch 를 적용한 버튼 생성.

   ```jsx
   // Cart.js
   <Button onClick={()=>{props.dispatch({type:'close'})}}></Button>
   ```



#### 8. Redux : dispatch + payload

* detail.js 에서 장바구니 추가 버튼을 누를 경우, Store 에 State 데이터를 추가하는 예제.

1. reducer 에 데이터를 수정하는 방법을 정의(데이터를 추가하는 수정).

   ```jsx
   // index.js
   function reducer(state = initState, action){
     if(action.type === 'addItem'){
       let copy = [...state];
       copy.push(action.payload);
       return copy;
     }else if(action type === 'inc'){
       ...
     }...
   }
   ```

2. 장바구니 추가 버튼에 dispatch 요청을 추가.

   * dispatch 요청에, State 에 추가할 Payload 를 Key 값으로 하여 데이터를 실어보낼 수 있음.
   * payload 를 Key 로 하는 객체가, 위 index.js 에서 payload 로 받아져서 state 에 추가됨.

   ```jsx
   // Detail.js
   <Button onClick={()=>{
       props.dispatch({
         type: "addItem", 
         payload: {
           id: 2,
           name: "newProduct",
           quantity: 5
         }})
     }}>
   </Button>
   function stateToProps(state){
     return{
       state: state.reducer,
       alert: state.reducer2
     }
   }
   export default connect(stateToProps)(Detail);
   ```

* `action.payload` 라고 쓰면, dispatch 할 때 실어보냈던 데이터가 나옴.
  * action 이라고 하는 파라미터는 dispatch() 소괄호에 들어있는 모든것이 포함됨.
  * 따라서 payload 뿐만아니라 다른 정보를 함께 보낼 수 있음. 

> **Redux 외**
>
> * Redux 문법은 특유의 복잡함 때문에 미래에는 다른 라이브러리로 대체될 가능성이 있음.
> * 예를 들어, React Effector, React Recoil 등의 라이브러리가 있는데, 이들은 store, reducer 등을 사용하지 않고 state 를 생성, 수정, 관리할 수 있음.
> * 다만 현재는 Redux 로 개발된 곳이 많기 때문에, 이를 활용.



#### 9. Redux : useSelector, useDispatch

> **Review**
>
> * redux 를 사용하는 이유는, 모든 컴포넌트가 연속적인 props 바인딩 없이 state 를 사용할 수 있도록 하기 위함.
> * state 데이터 디버깅에 용이.
>   * state 를 변경하기 위해선, reducer 함수에 사전 정의 되어 있어야 함. 
>   * 따라서 데이터가 잘못 되었을 경우 reducer 함수만 찾아봐도 디버깅이 용이해짐.

* 이전까지는 store 에 저장된 state 데이터를 사용하기 위해 `stateToProps` 와 같은 함수를 생성하여 전달.
* dispatch 를 사용하기 위해 `props.dispatch({...})` 와 같은 형태로 사용.
* 지금부터 Redux 를 더욱 수월하게 사용하는 신문법 소개.

**useSelector**

* state 를 사용하기 위해 stateToProps 라는 함수를 만들어줬는데, 대신에 useSelector Hook 을 적용.

  * use 라는 prefix 가 붙으므로, 대략 Hook 임을 예상할 수 있음.

  ```jsx
  // Cart.js
  import {useSelector} from 'react-redux';
  function Cart(props){
    let cartData = useSelector((state)=>state.reducer)
    let alert = useSelector((state)=>state.reducer2)
    ...
  }
  // stateToProps 를 사용하지 않으므로, 아래는 원래 형태로 변경해둠
  export default Cart;
  ```

**useDispatch**

* dispatch 변수에 useDispatch 를 담음.

  * props.dispatch 로 수정 요청을 보내던 것을, dispatch( ) 만으로 사용할 수 있음.
  
  ```jsx
  import { useSelector, useDispatch } from 'react-redux';
  
  function Cart(props) {
    let state = useSelector((state) => state )
    let dispatch = useDispatch()
    ...
  } 
  ```
  



#### 10. React 에서 자주 사용하는 if 문 작성 패턴

**1. 컴포넌트 안에서 사용하는 if/else**

* 컴포넌트에서 JSX 를 이용하여 조건부로 표현하고 싶으면 아래처럼 사용.

* return 문 JSX 에서는 조건문을 사용할 수 없으므로, 조건에 해당되는 Component 를 return 하는 방법.

  ```jsx
  function Component() {
    if(true){
      return <p>Show this Tag when it's TRUE.</p>
    }
    return <p>Show this when it's FALSE.</p>
  }
  ```



**2. Ternary Operator(삼항연산자)**

* 삼항연산자 : Ternary Operator.

* 이를 중첩으로 적용할 수도 있음.

  ```jsx
  function Component(){
    return(
      <div>
        {
          isTrue
            ? <Component1/>
            : (isReal
               ? <Component2/>
               : <Component3/>)
        }
      </div>
    )
  }
  ```

  

**3. && 연산자로 if 역할 대신하기**

- `&&` 연산자를 사용할 때, true or false 가 아닌 자료형을 넣으면 아래와 같이 됨.

  - boolean 자료형이 아닌, 다른 자료형을 넣으면 다음과 같이 출력됨.
  - `&&` 기호를 중첩해서 여러개 쓰면, 연산자 사이에서 처음 등장하는 falsy 값을 찾아주고, 그게 아니면 마지막 값을 남김.

  ```jsx
  true && 'James';	// James
  false && 'John';	// false
  ```

- 모든 항이 true 일 경우 마지막 요소를 반환, false 인 항이 있을 경우 false를 반환.

  ```jsx
  function Component(){
  	return(
    	<div>
        {
          isTrue && <p>Show this TAG when it's true.</p>
          // isTrue 참일 경우 p 태그를 표시하고, 거짓일 경우 null.
        }
      </div>
    )
  }
  ```



**4. Switch / Case**



**5. [★중요★] Object 자료형을 응용한 enum**

- 경우에 따라서 다른 HTML 을 노출시킬 경우.

- 예를 들어, state 종류에 따라 info, shipping, refund component 를 보여야할 경우.

  - State 를 만들어놓고, if 문으로 조건 확인을 할 수도 있지만, 여기서는 JavaScript Object 자료형에 담을 HTML 을 모두 넣음.
  - 마지막에 object{ } 뒤에 [ ] 대괄호를 붙여서, key 값이 currentState 인 자료형을 사용할 것을 명시.

  ```jsx
  function Component(){
    var currentState = 'info';
    return(
      <div>
        {
          {
            info : <p>상품정보</p>,
            shipping : <p>배송관룐</p>,
            refund : <p>환불약관</p>
          }[currentState]
        }
      </div>
    )
  }
  ```

- 또는 다음처럼 객체를 변수로 사용해서 변형하여 사용 가능.

  ```jsx
  var tabUI = {
    info : <p>상품정보</p>,
    shipping : <p>배송관룐</p>,
    refund : <p>환불약관</p>
  }
  function Component(){
    var currentState = 'info';
    return(
    	<div>
        {
          tabUI[currentState]
        }
      </div>>
    )
  }
  ```



#### 11. state 변경함수 사용 시 주의점 : async

- JavaScript 는 일반적인 코드를 작성하면 Synchronous 하게 실행됨.

- 그러나, 특정 함수를 사용할 경우 Async(비동기적)하게 실행.

  - 예) ajax, event Listener, setTimeout 등.

- 위 예시들처럼, React 의 setState 함수는 async 하게 실행됨.

  - 즉, setState 함수의 실행이 오래 걸리면, 다음 줄 코드가 먼저 실행될 수 있음.

  ```jsx
  function App() {
      let [count, changeCount] = useState(0);
      let [age, changeAge] = useState(26);
      return (
          <div>
              <div>Im {age}</div>
              <button onClick={() => {
                  changeCount(count++);
                  if (count < 3) {
                      changeAge(age++);
                  }
              }}>Click</button>
          </div>
      )
  }
  ```

  - 위 예제가 Synchrounous 하게 실행될 경우, count 값이 3 이상일 경우 age 값은 변경되지 않아야 함.
  - 그러나 changeCount 함수가 비동기함수이므로, count 값이 변경되기 전에 if 문을 먼저 실행.
  - 따라서, 아직 count 는 2인 값이므로 age 값을 올리게 됨.

- 이러한 문제를 해결하기 위해 `useEffect` 를 사용.

  - useEffect 는 특정 state 가 변경될 때 실행되는 조건을 설정할 수 있음.

  ```jsx
  useEffect(()=>{
    if(count < 3){
      changeAge(age++)
    }
  }, [count])
  ```



#### 12. 성능 잡기 : lazy loading / React Devtools

- 기능 구현을 완료하면, 그 다음은 성능 향상과 유지 관리에 신경써야 함.
- React Component 의 로딩 속도 등을 향상시킬 수 있는 몇 가지 방법을 소개.
  1. 익명 함수 / 익명 Object 사용하지 않기.
  2. Layout 에 애니메이션 주지 않기.
  3. Component Lazy Loading 하기.
  4. Chrome React Dev Tools 를 이용하여 테스트 하기.

**1. 익명 함수 / Obejct 사용하지 않기.**

- Component 가 재렌더링 될 때 변수에 저장하지 않은, 즉 이름이 없는 function 또는 Object 는 매번 새로운 메모리 영역을 할당하기 때문에, 느려질 수 있음.

- 이를 방지하기 위해 변수에 저장하는 것이 좋음.

  ```jsx
  // 비추천
  function Cart(){
    return(
      <div style={ {color : 'red'} }></div>
    )
  }
  // 추천
  let style = { color : 'red' };
  function Cart(){
    return(
      <div style={style}></div>
    )
  }
  ```



**2. 애니메이션을 줄 때, 레이아웃 변경은 주지 않을 것.**

- React 에만 적용되는 것이 아닌, 전반적인 CSS 코딩 팁.
- 레이아웃이란 width, margin, padding, left right top bottom 등을 뜻하는데, JavaScript 나 transition 을 이용해 레이아웃을 변경하는 것은, 브라우저 입장에서 큰 부담이 됨.
- 따라서 애니메이션을 넣어도 성능에 큰 지장이 없기 위해선, transform, opacity 같은 CSS 속성을 이용하여 애니메이션을 설정할 것.



**3. lazy import 활용.**

- `App.js` 를 보듯, 웹 앱 사이트들은 import 가 많음.
- 처음 페이지 로딩 시, 각 페이지의 모든 컴포넌트를 import 하면, 초기 접속 속도가 상당히 느려질 수 있음.
- App.js 에서, Cart.js, Detail.js 는 처음부터 불러올 필요가 없는 파일.
  - 실제로 해당 컴포넌트가 필요한 경우에 import 하면 됨.

1. React 라이브러리에서 lazy, Suspense 를 import.

2. import Detail / Cart 하던것을 lazy 함수를 이용하여 수정.

3. \<Suspense\> 라는 컴포넌트로 lazy import 할 컴포넌트들을 감싸줌.

4. fallback 속성에는 불러올 컴포넌트 로딩 전까지 띄울 원하는 HTML 을 직접 작성.

   ```jsx
   // App.js
   import React, { useContext, useState, lazy, Suspense } from 'react';
   let Detail = lazy(()=>{ return import('./Detail.js') });
   let Cart = lazy(()=>{ return import('./Cart.js') });
   ...
   render(
     <Suspense fallback={ <div> Loading ... </div> }>
       <Detail> ... </Detail>
     </Suspense>
   )
   ```



**4. React Developer Tools (Chrome Extensions 에서 설치)**

* Components 메뉴 : 현재 페이지에 사용된 모든 컴포넌트들을 쭉 나열해서 보여줌.
* Profiler 메뉴 : 컴포넌트들이 렌더링 된느 속도를 측정할 수 있음. 자주 렌더링이 되는 컴포넌트가 있는지 등을 확인.



#### 13. 성능 잡기 : 재렌더링을 막는 memo

- 컴포넌트는 컴포넌트와 관련된 state 혹은 props 가 변경되면 항상 자동 재렌더링 됨.

- 그러나, 가만히 있어야할 컴포넌트들도 이유 없이 재렌더링 되는 경우가 있음.

- 특히, 중첩된 컴포넌트의 경우, 부모 컴포넌트의 props 내용이 일부 변경되면, props 전송을 받고 있는 Child 컴포넌트도 전부 재렌더링이 됨.

- 예를 들어, 다음과 같이 Parent Component, Child1 Component, Child2 Component 세 가지 컴포넌트를 생성.

  ```jsx
  function Parent(props){
      return(
          <div>
              <Child1 name={props.name}></Child1>
              <Child2 age={props.age}></Child2>
          </div>
      )
  }
  function Child1(){
      useEffect(()=>{console.log("Rendered 1")});
      return(
          <div>
              1111
          </div>
      )
  }
  function Child2(){
      useEffect(()=>{console.log("Rendered 2")});
      return(
          <div>
              2222
          </div>
      )
  }
  ```

- React 개발자 도구를 활용하여, Parent Component 의 props.name 속성만 변경했는데도, Child1, Child2 모두 재렌더링 되는 것을 볼 수 있음.

  - useEffect() 를 사용하였기 때문에, 값이 변경될 때 마다 재렌더링이 되는 것인데, 아무런 관계가 없는 Child2 도 렌더링이 되는 현상이 발생.

- `memo()` 를 활용하여 불필요한 컴포넌트 재렌더링 막기.

  1. React 라이브러리에서 memo 를 import.
  2. 원하는 컴포넌트를 memo 로 감싸기.

  - memo 는, 이 컴포넌트가 관련있는 props 속성이 변경될 때만 재렌더링을 시키는 기능.

  ```jsx
  let Child2 = memo(()=>{
      useEffect(()=>{console.log("Rendered 2");})
      return(
          <div>
              2222
          </div>
      )
  })
  ```

  - 이렇게 구현할 경우, Child1 과 관련된 props 속성이 변경될 때, Child2 컴포넌트는 재렌더링이 되지 않음.

> ##### memo 사용 시 주의사항
>
> - memo 로 감싼 컴포넌트는, 비효율적인 재렌더링을 막기 위해 기존 props 와 바뀐 props 를 비교하는 연산이 추가로 진행됨.
> - props 가 크고 복잡하면 이 자체로도 부담이 될 수 있음.
> - 개발자 도구에서 성능을 측정하면서 비교할 수 있으나, 작은 사이트를 만들거나, 컴포넌트의 HTML 내용이 적을 경우엔 굳이 memo 를 사용할 필요 없음.



#### 14. PWA (Progressive Web App)

* 웹 사이트를 Andriod / iOS 모바일 앱 처럼 사용할 수 있게 만드는 일종의 웹 개발 기술.

  * 지금까지 만들어 놓은 프로젝트를 모바일 앱처럼 발행해서 사용하는 것이 핵심.
  * 실제 앱으로 발행하는 것은 아니고, 웹 사이트 자체를 스마트폰 홈에 설치하는 것.

* PWA 장점

  1. 스마트폰, 태블릿 바탕화면에 웹 사이트를 설치하는 것이 가능
     * 앱을 누르면, 브라우처 창이 제거된 크롬 브라우저가 설치됨.
     * 일반 사용자는 PWA 와 앱을 구분하기 힘듦.
  2. 오프라인에서도 동작 가능.
     * service-worker.js 라는 파일과 브라우저의 Cache Storage 를 사용.
  3. 설치 유도 비용이 적게 소요.
     * 사용자가 앱을 설치하고 다운로드 받게 만드는 마케팅 비용을 감축.

* PWA 로 만들기 위해선 `manifest.json` / `service-worker.js` 파일이 필요.

  * 그리고 HTTPS 사이트여야 함.

* 2020년 11월부터 React 업데이트 내용에 따라, PWA 생성 방법이 달라짐.

  1. `manifest.json` / `service-worker.js` 두 가지 파일이 필요.

     * 업데이트 기점 이전에는 프로젝트를 빌드하여도, `manifest.json` 파일 하나만 생성되므로, 새 프로젝트를 생성해야 함.

  2. 다음 명령어를 통한, 신규 프로젝트 생성.

     ```bash
     $ yarn create react-app emall-pwa --template cra-template-pwa
     ```

  3. 새로운 프로젝트에, 소스코드만 복사-붙여넣기 할 것.

     * 기존 프로젝트에 설치한 라이브러리는 새 프로젝트에서 재설치.

  4. 코드 수정.

     ```js
     // index.js
     // Before
     serviceWorkerRegistration.unregister();
     // After
     serviceWorkerRegistration.register();
     ```

  5. `yarn build`

     * 명령어를 실행시키면, 위 두가지 파일이 자동 생성됨.

     ```bash
     $ yarn build
     ```



**manifest.json**

* 웹 앱의 아이콘, 이름, 테마색 등을 결정하는 부분.

  ```json
  {
    "version" : "웹앱의 버전.. 예를 들면 1.12 이런거",
    "short_name" : "설치후 앱런처나 바탕화면에 표시할 짧은 12자 이름",
    "name" : "기본이름",
    "icons" : { 
      여러가지 사이즈별 아이콘 이미지 경로 
    },
    "start_url" : "앱아이콘 눌렀을 시 보여줄 메인페이지 경로",
    "display" : "standalone 아니면 fullscreen",
    "background_color" : "앱 처음 실행시 잠깐 뜨는 splashscreen의 배경색",
    "theme_color" : "상단 탭색상 등 원하는 테마색상",
  }
  ```

* 이 파일은 웹 앱에서 사용하는 모든 HTML 안에 아래와 같은 방법으로 집어넣어야 하는데, 이것은 React 가 알아서 삽입함.

  ```html
  <link rel="mainfest" href="/mainfest.webmanifest">
  ```



**service-worker.js**

* 카카오톡과 같은 애플리케이션을 설치하면, 구동에 필요한 이미지, 데이터 등을 모두 하드웨어에 설치함.
* 그리고, 실행하면 로와 같은 데이터를 서버에 요청하지 않고 하드웨어에 있는 것을 그대로 사용.
* 이런것을 흉내내는 것이 본 파일의 목적.
* 이 파일 설정을 잘 하면 웹 앱을 설치했을 때, 어떤 CSS, JS, HTML 파일을 하드웨어에 설치할 지 결정할 수 있음.
* 따라서, PWA 를 실행할 때 마다 위 파일들을 Cache Storage 에서 불러옴.
* 모든 HTML, CSS, JS 파일을 Cache Storage 에 저장하도록 기본 세팅되어 있음.

> * 저장하면 안되는, 자주 변하는 파일 등은 sevice-worker.js 파일을 수정하여 설정.
> * 본 파일에 대한 문법이 별도로 있으므로, 구글 공식 영상을 보고 학습.

* 웹 앱에 필요한 HTML, CSS, JS 파일이 변경되면, 하드에 있는 것이 아니라 서버에 요청을 하기 때문에, 유저는 새로운 파일을 사용할 수 있음.



**PWA 디버깅**

* 개발자 도구에서, Application 메뉴를 참조.



**PWA Customize**

* PWA 발행이 쉬운 이유는, 구글의 Workbox 라는 라이브러리가 create react-app 때 함께 설치되었기 때문.
* PWA 커스터마이징을 위해선 Workbox 사용법을 익혀야함.

> 대표적으로 하드에 설치할 파일중, HTML 을 제외하고 싶다면?
>
> * HTML 파일은 자주 변하기 때문에, 이럴 경우가 많음.
> * `node_modules/react-scripts/config/webpack.config.js`  다음 경로에서 수정.



#### 15. localStorage

* 페이지를 새로고침하면, 프로젝트의 모든 데이터가 초기화됨.

  * JS 파일을 처음부터 다시 읽기 때문.
  * 그렇기 때문에, Cart 와 같은 페이지의 데이터가 새로고침 시 삭제되는 것.

* 데이터 초기화를 원치 않을 경우 다음 방법이 있음.

  1. 서버 DB 에 저장.
  2. 브라우저의 localStorage 에 저장.

* localStorage.

  * 사이트 마다 5MB 정도의 텍스트 및 숫자를 저장할 수 있음.
  * 유저가 브라우저를 청소하지 않는 이상, 영구적으로 남아 있음.

* localStorage 문법.

  ```js
  localStorage.setItem("DataName", "Value");
  localStorage.getItem("DataName");
  localStorage.removeItem("DataName");
  ```

  * Object 자료형처럼 Key : Value 형태로 자료를 저장.

* localStorage 에 Object / Array 를 저장할 경우.

  * localStorage 에는 숫자 또는 문자열만 들어갈 수 있으므로, Obj / Arr 를 바로 저장할 수 없음.
  * 저장이 필요할 경우, JSON 이라는 걸 바꿔준 뒤 저장.

  ```jsx
  localStorage.setItem("obj", JSON.stringify({name : "Kim"}));
  // then its saved as, {"name" : "Kim"}
  ```

  * 저장된 Obj / Arr 데이터를 다시 사용하려면, JSON 형태 그대로 출력되므로 자료 조작이 불가능.
  * 따라서, 다시 원래 자료형 형태로 바꿔주기 위해 다음 문법을 적용.

  ```js
  var a = localStorage.getItme("DataName");
  var b = JSON.parse(a); 
  ```

  

#### 16. NodeJS + Express + React

* 서버는 클라이언트가 메인페이지로 접속하면, 리액트로 만든 HTML 파일을 보내주는 역할.
  * 리액트는 HTML 을 쉽고 예쁘게 만들어주는 툴의 역할이며, 만들어진 HTML  파일을 Node 서버를 이용하여 서비스.

1. Node 서버 프로젝트 생성

   * Node 서버를 실행시킬 신규 프로젝트 폴더 생성.
   * 이 폴더 안에, React 프로젝트를 생성할 예정.

   ```bash
   $ mkdir projectDir
   $ cd projectDir
   $ npm init
   ```

2. Express 라이브러리 설치.

   ```bash
   $ yarn add express
   ```

3. server.js 파일을 만들고 다음 코드 작성.

   * Express 라이브러리를 실행시키기 위한 가장 기본적인 코드.

   ```js
   // server.js
   const express = require('express');
   const path = require('path');
   const app = express();
   
   const http = require('http').createServer(app);
   http.listen(8080, function () {
     console.log('listening on 8080')
   }); 
   ```

4. server.js 실행.

   ```bash
   $ node server.js
   또는
   $ yarn nodemon server.js
   ```

* React 를 사용할 경우, Node.js 서버의 View 부분 기능 개발이 필요 없음.
  * Node.js  + Express 강좌에서, ejs/html 파일을 여러개 만들어서 페이지를 만들었는데, 이런 개발은 React 코드로 할 수 있으므로, ejs 는 무시해도 됨.
  * 따라서, React 를 잘 사용하면 서버에 작성할 코드는 클라이언트의 DB 데이터 요청에 대한 입출력 API 만 남길 수 있음. 
  * 그리고 서버 코드는 미들웨어로 "로그인 여부" 정도만 확인.
  * 그러나 마냥 리액트만 사용하는 것이 좋은것도 아님. 리액트로만 개발하면 코드가 더러워질 수 있음.

1. React 프로젝트 생성.

   * Node 서버 프로젝트에, 서브 폴더로 리액트 프로젝트 ( `react-project` )를 생성.

   ```bash
   PWD : /projectDir
   $ yarn create react-app react-project
   ```

2. React 프로젝트 Build.

   * 프로젝트를 빌드하여, 완성본 파일을 build 폴더에 생성.

   ```bash
   PWD : /projectDir/react-project
   $ yarn build
   ```

3. react-project/build/HTML 파일.

   * 프로젝트를 빌드하면, 폴더 내 HTML 파일은 단 한개만 생성됨. `index.html`
   * 나머지 파일은 프로젝트를 구동하기 위한 역할 (CSS, js).
   * /projectDir/server.js 에 React + Node.js 에 대한 코드를 작성하면, 서버 합치는 과정은 끝.
   * 사용자가 메인페이지로 접속하면 React 로 빌드한 index.html 내보내는 코드.

   ```js
   // server.js 추가
   app.use(express.static(path.join(__dirname, 'react-project/build')));
   app.get('/', function (request, response) {
     response.sendFile(path.join(__dirname, '/react-project/build/index.html'));
   });
   ```

4. React 에서 라우팅을 담당할 경우.

   * Node 서버 코드에서 라우팅하지 않고, React 에서도 라우팅할 수 있음.
   * `react-router-dom` 라이브러리 사용.
   * React 프로젝트에서 라우팅 경로를 설정하여도, 해당 경로를 직접 URL  입력했을 때 표시되지 않음.
     * 왜냐하면, 브라우저 URL 창에 입력하는 것은, 서버에 요청하는 것이지 React 라우터에게 라우팅 요청을 하는 것이 아님.
     * React 가 라우팅할 수 있도록 전권을 넘기고 싶다면, `server.js` 에 다음 내용을 추가.

   ```js
   // server.js 추가
   app.get('*', function (request, response) {
     response.sendFile(path.join(__dirname, '/react-project/build/index.html'));
   });
   ```

   * \* 란 모든 문자를 의미. 고객이 URL 란에 아무거나 입력하여도, 리액트 프로젝트로 이동함을 의미.



> **React 를 이용하여 프론트엔드를 만들 경우의 개발 흐름.**
>
> * 예를 들어, DB 글 목록 데이터를 꺼내서 HTML 로 보여주고 싶은 경우.
>
>   1. 서버는 클라이언트가 /list 로 GET 요청을 하면, DB 에서 글 목록 데이터를 보내준다고 API 를 구현.
>   2. React 는 글 목록 데이터를 보여주기 위해 서버로 AJAX GET 요청을 보냄.
>   3. React 가 받아온 데이터를, HTML 영역에 집어넣어서 개발.
>
>   * React  는 페이지가 `index.html` 하나만 있기 때문에, 서버와의 통신은 거의 AJAX 로 진행.
>
> **Sub-Directory 에 React 앱을 발행할 경우.**
>
> * 지금까지는 메인 페이지에 접속.
>
> * 만일, `/react` 경로에서 부터만 React 앱을 보이고 싶을 경우.
>
>   ```js
>   // /projectDir/server.js
>   app.use( '/', express.static( path.join(__dirname, 'public') ))
>   app.use( '/react', express.static( path.join(__dirname, 'react-project/build') ))
>   app.get('/', function(request, response){
>     response.sendFile( path.join(__dirname, 'public/main.html') )
>   }) 
>   app.get('/react', function(request, response){
>     response.sendFile( path.join(__dirname, 'react-project/build/index.html') )
>   })
>   ```
>
>   * React-project 디렉토리의 package.json hompage 항목을 아래로 변경.
>
>   ```js
>   // react-project/package.json
>   {
>     "homepage": "/react",
>      ...
>   }
>   ```
>
> ##### 서버 앱과 React 앱을 동시에 띄워서 개발을 진행하고 싶을 경우.
>
> * react-project 의 package.json 의 proxy 라는 부분의 설정을, 서버 미리보기 띄우던 localhost:#### 으로 설정.
> * 그러면 React 에서 서버로 AJAX 요청이 잘 됨.
> * [참조](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

















