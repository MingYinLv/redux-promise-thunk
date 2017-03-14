# redux-promise-thunk

redux异步请求的时候防止重复提交，兼容`redux-thunk`。

配置
```ecmascript 6
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, ...middleware)
    ),
  );
```
使用
```ecmascript 6
    function action(args){
      return new Promise((resolve) => {
          resolve({
            requestId: function requestFunc(dispatch, getState){}
          })
      });
    }
```
`action`: redux的action

`requestId`: 根据requestId判断是否重复提交

`requestFunc`: 和redux-thunk的函数一样，但要求返回Promise.
