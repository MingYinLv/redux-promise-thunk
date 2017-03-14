/**
 * Created by MingYin Lv on 2017/3/14 下午3:39.
 */

function createThunkMiddleware(extraArgument) {
  const map = {};
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    } else if (action instanceof Promise) {
      // 如果action是Promise
      return action.then((data) => {
        // data包含一个执行异步的函数
        const keys = Object.keys(data);
        if (keys.length !== 1) {
          // data只能有一个属性
          throw Error('The data length must be 1');
        }
        const func = keys[0];
        if (typeof data[func] !== 'function') {
          // data的属性必须是函数
          throw Error('%s must be function', func);
        }
        if (!map[func]) {
          // 根据map中存储的值判断当前操作是否在执行
          map[func] = true; // 当前操作标记为在执行
          // 执行异步操作
          data[func](dispatch, getState)
            .then(() => {
              // 完成后标记为没有在执行
              map[func] = false;
            })
            .catch(() => {
              // 完成后标记为没有在执行
              map[func] = false;
            });
        }
      });
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

