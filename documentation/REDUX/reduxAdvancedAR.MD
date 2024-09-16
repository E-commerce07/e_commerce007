هاو الترجمة للكورس المتقدم حول Redux Toolkit بالدارجة التونسية:

### الاستخدام المتقدم لـ Redux Toolkit

#### 1. **التعامل مع المنطق اللازامني (Asynchrone) باستخدام Thunks**

Redux Toolkit فيها `createAsyncThunk`، اللي تسهل عليك خدمة المنطق اللازامني كيما جلب الداتا من API. هي تعمل آليًا على إنشاء أنواع الأكشن للـ `pending`, `fulfilled`, و `rejected`.

**مثال: استخدام createAsyncThunk لطلبات API**

```javascript
// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء thunk لازمني لجلب بيانات المستخدم
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

#### 2. **استخدام الـ Selectors للحصول على حالة مشتقة**

الـ selectors يخليك توصل بسهولة لقيم الحالة وتستخرج منها حالات جديدة. ينجموا زادة يحسنوا الأداء من خلال تخزين الحالات المشتقة.

**مثال: إنشاء Selectors**

```javascript
// src/redux/selectors.js
import { createSelector } from "@reduxjs/toolkit";

// Selector باش تاخو الحالة متاع المستخدم
const selectUser = (state) => state.user;

// Selector مخزن باش ياخو اسم المستخدم
export const selectUserName = createSelector(
  [selectUser],
  (user) => user.userInfo?.name
);
```

**الاستخدام في مكون:**

```javascript
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/selectors";

const UserProfile = () => {
  const userName = useSelector(selectUserName);

  return <div>اسم المستخدم: {userName}</div>;
};
```

#### 3. **Middleware للمنطق المخصص**

الميدلوير في Redux تخليك تنفذ منطق مخصص بين توزيع الأكشن وتحديث الحالة. Redux Toolkit فيها `getDefaultMiddleware` اللي تقدر تعدلها.

**مثال: إضافة Middleware مخصص**

```javascript
// src/redux/store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// مثال ميدلوير مخصص
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Action معمل:", action);
  const result = next(action);
  console.log("الحالة التالية:", store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
```

#### 4. **تطبيع الحالة باستخدام الكيانات (Entities)**

Redux Toolkit توفر `createEntityAdapter` باش تدير الحالة المطبوعة، وهذا مفيد للتعامل مع مجموعات من العناصر كيما القوائم.

**مثال: استخدام createEntityAdapter**

```javascript
// src/redux/todosSlice.js
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const todosAdapter = createEntityAdapter({
  // ترتيب بالمنطق المخصص، مثلاً حسب تاريخ الإنشاء
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const initialState = todosAdapter.getInitialState({
  status: "idle",
  error: null,
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: todosAdapter.addOne,
    removeTodo: todosAdapter.removeOne,
    updateTodo: todosAdapter.updateOne,
  },
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;

// Selectors المتولدين من createEntityAdapter
export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);
```

### نصائح إضافية:

- **أمان النوعية:** إذا كنت تستعمل TypeScript، Redux Toolkit تندمج بشكل جيد معها وتوفر نوعية قوية للأكشن والحالة.
- **التكامل مع DevTools:** بشكل افتراضي، Redux Toolkit مصممة لتشتغل بسهولة مع Redux DevTools، وهذا يسهل عملية الديباغ.
- **عدم التغيير والتسلسل:** Redux Toolkit تشمل بشكل آلي ميدلوير للتحقق من عدم تغيير الحالة والتسلسل، وهذا يساعد في منع الأخطاء الشائعة.

التقنيات المتقدمة هذه بش تعطيك فهم قوي لكيفية استخدام Redux Toolkit لبناء إدارة حالة قابلة للتطور وفعالة في التطبيقات متاعك. قولي كان تحب أمثلة أو تفسيرات أكثر!
