باش نعاونك في إعداد Redux ونقدم لك كورس يشمل الأكواد اللي شاركتهم، هاو دليل كامل:

### كورس Redux Toolkit

#### 1. **مقدمة في Redux Toolkit**

Redux Toolkit هي الطريقة الرسمية والمفضلة لكتابة المنطق تاع Redux. تقدم أدوات قوية لتبسيط إعداد الـ store تاع Redux وslices.

#### 2. **إعداد الـ Store تاع Redux**

باش نبدأو، خلينا نعملو إعداد لـ store بسيط تاع Redux باستخدام `configureStore` من Redux Toolkit. الـ store بش يجمع عدة reducers في root reducer.

**مثال كود: إعداد الـ Store**

```javascript
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // إستورد الـ root reducer متاعك

const store = configureStore({
  reducer: rootReducer, // جمع جميع الـ reducers هنا
});

export default store;
```

#### 3. **إنشاء Reducers باستخدام Slices**

الـ reducers هي وظائف تحدد التغييرات في حالة التطبيق. Redux Toolkit تسهل عملية إنشاء الـ reducers باستخدام الـ slices.

**مثال كود: إنشاء Slice للعداد (Counter)**

```javascript
// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

#### 4. **دمج الـ Reducers**

تقدر تدمج عدة reducers باستخدام `rootReducer`. كل reducer يتضاف تحت مفتاح يمثل الجزء متاعه من الحالة.

**مثال كود: دمج الـ Reducers**

```javascript
// src/redux/rootReducer.js
import counterReducer from "./counterSlice";
// import anotherReducer from "./anotherSlice"; // مثال لـ reducer آخر

const rootReducer = {
  counter: counterReducer,
  // another: anotherReducer, // تقدر تضيف reducer آخر هنا
};

export default rootReducer;
```

#### 5. **ربط Redux مع مكونات React**

باش تستخدم حالة Redux وتبعث الـ actions داخل مكون React، تقدر تستخدم الـ hooks `useSelector` و`useDispatch` من React-Redux.

**مثال كود: استخدام Redux في مكون React**

```javascript
// src/UI/Counter.js
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
};

export default Counter;
```

#### 6. **إدماج الـ Store مع تطبيق React**

أخيرًا، لف التطبيق متاعك بالـ `Provider` من React-Redux باش تعدي الـ store تاع Redux.

**مثال كود: إدماج الـ Store تاع Redux**

```javascript
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### الخلاصة

الدليل هذا يغطي الأساسيات في إعداد Redux Toolkit في تطبيق React، من إنشاء slices إلى ربط حالة Redux مع مكونات React. باتباع الخطوات هذي، تقدر تدير حالة التطبيق متاعك بكفاءة باستخدام Redux Toolkit.
