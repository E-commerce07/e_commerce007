Voici la version en français du cours avancé sur Redux Toolkit :

### Utilisation Avancée de Redux Toolkit

#### 1. **Gestion de la logique asynchrone avec les Thunks**

Redux Toolkit inclut `createAsyncThunk`, qui simplifie la gestion de la logique asynchrone comme la récupération de données d'une API. Il génère automatiquement des types d'actions pour les états `pending`, `fulfilled`, et `rejected`.

**Exemple : Utiliser createAsyncThunk pour les requêtes API**

```javascript
// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Définir un thunk asynchrone pour récupérer des données utilisateur
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

#### 2. **Utiliser les Sélecteurs pour un État Dérivé**

Les sélecteurs permettent d'accéder efficacement aux valeurs d'état et de dériver de nouveaux états. Ils peuvent aussi améliorer les performances en mémorisant les états dérivés.

**Exemple : Créer des Sélecteurs**

```javascript
// src/redux/selectors.js
import { createSelector } from "@reduxjs/toolkit";

// Sélecteur pour obtenir l'état utilisateur
const selectUser = (state) => state.user;

// Sélecteur mémorisé pour obtenir le nom de l'utilisateur
export const selectUserName = createSelector(
  [selectUser],
  (user) => user.userInfo?.name
);
```

**Utilisation dans un Composant :**

```javascript
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/selectors";

const UserProfile = () => {
  const userName = useSelector(selectUserName);

  return <div>Nom d'utilisateur : {userName}</div>;
};
```

#### 3. **Middleware pour la Logique Personnalisée**

Les middleware dans Redux permettent d'exécuter une logique personnalisée entre la distribution d'actions et la mise à jour de l'état. Redux Toolkit inclut `getDefaultMiddleware`, qui peut être personnalisé.

**Exemple : Ajouter un Middleware Personnalisé**

```javascript
// src/redux/store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// Exemple de middleware personnalisé
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Action dispatchée :", action);
  const result = next(action);
  console.log("État suivant :", store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
```

#### 4. **Normaliser l'État avec les Entités**

Redux Toolkit fournit `createEntityAdapter` pour gérer un état normalisé, ce qui peut être utile pour gérer des collections d'éléments comme des listes.

**Exemple : Utiliser createEntityAdapter**

```javascript
// src/redux/todosSlice.js
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const todosAdapter = createEntityAdapter({
  // Trier par logique personnalisée, par exemple par date de création
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

// Sélecteurs générés par createEntityAdapter
export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);
```

### Conseils Supplémentaires :

- **Sécurité de Type :** Si vous utilisez TypeScript, Redux Toolkit s'intègre bien avec, fournissant une forte typage pour les actions et l'état.
- **Intégration avec DevTools :** Par défaut, Redux Toolkit est configuré pour fonctionner parfaitement avec Redux DevTools, facilitant le débogage.
- **Immuabilité et Sérialisation :** Redux Toolkit inclut automatiquement un middleware pour vérifier l'immuabilité et la sérialisation, aidant à prévenir les bugs courants.

Ces techniques avancées devraient vous donner une solide compréhension de la façon d'utiliser Redux Toolkit pour construire une gestion d'état évolutive et efficace dans vos applications. Faites-moi savoir si vous avez besoin de plus d'exemples détaillés ou d'explications !
