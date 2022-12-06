# vuejs3-laravue

Curso de VueJS3 do Tiago Matos

Anotações

```html
:class="card"

v-model.lazy
v-model.number
v-model.trim

@click.prevent
@submit.prevent
@click.self
@keyup.enter
```


```js
card: {
  'card': true,
  'bg-blue': true
}
```

## Enviando dados de pai para filho

O filho recebe a `props`.
E o pai passa os valores via *atributos*.

```html
<template id="card">
  <card-description :description="cardDescription"></card-description>
</template>

<templatee id="cardDescription">
  {{ description }}
</templatee>
```

```js
app.component('card', {
  template: '#card',
  data() {
    return {
      description: 'Teste descrição'
    }
  }
})

app.component('card-description', {
  template: '#cardDescription',
  props: ['cardDescription'],
  data() {
    return {
    }
  }
})
```

### Passando array via props

```html
<div>
  <card v-for="post in posts" :post="post"></card>
</div>

<template id="card">
  <div class="card shadow-sm">
    <card-image :image="post.image"></card-image>

    <div class="card-body">
      <card-description :description="post.description"></card-description>
      <card-actions :view="post.view" :edit="post.edit"></card-actions>
      
    </div>
  </div>
</template>
```

## Enviando dados do componente filho para o pai

O filho envia um evento `$emit`

```js
this.$emit('search')
```

E o pai captura esse evento com

```js
<search-user v-on:search="paiSearch"></search-user>

methods: {
  paiSearch() {
    console.log('pai')
  }
}
```

### Passando parâmetros

```js
// pai
    methods: {
        paiSearch(user) {
            console.log('pai search', user)
        }
    }

// filho
app.component('search-user', {
    template: '#searchUser',
    data() {
        return {
            user: '',
        }
    },
    methods: {
        search() {
            this.$emit('search', this.user)
        }
    }
})
```

## Componentes - usando v-model

Aula 44

```html
<div id="app">
  <div class="container mt-5">
    <div class="mx-auto">
      <search-user v-model="paiUser"></search-user>
    </div>
  </div>
</div>

<template>
  <input
    v-model="user"
    type="text"
    @keyup="search"
  >
  <!-- O @keyup="search" vai garantir que os dados sejam atualizados em tempo real. -->
</template>

<script>
  app.component('search-user', {
    template: '#searchUser',
    methods: {
      search() {
        this.$emit('update:modelValue', this.user)
      }
    }
  })
</script>
```

### Two-way data binding entre componentes

Aula46

```js
app.component('search-user', {
  template: '#searchUser',
  props: ['modelValue'],
  data() {
    return {
      user: '',
    }
  },
  created() {
    this.user = this.modelValue
  },
  methods: {
    search() {
      this.$emit('update:modelValue', this.user)
    }
  }
})
```

## Componentes - slots

```html
<div id="app">
  <app-button>
    <b>Button</b>
  </app-button>
</div>

<template id="appButton">
  <button>
    <slot></slot>
  </button>
</template>
```

### slots nomeados

```html
<div id="app">
  <app-button>
    <b>Button</b>
  </app-button>

  <app-button>
    <template v-slot:icon>
      <i class="fa fa-check"></i>
    </template>

    Meu botão
  </app-button>
</div>

<template id="appButton">
  <button class="btn btn-primary">
    <slot></slot>
    <slot name="icon"></slot>
  </button>
</template>
```

### scoped slots

```html
<div id="app">
  <movies>
    <template #default="slotProps">
      <i class="fa fa-tv"></i> {{ slotProps.movie.title }} ({{ slotProps.movie.release }})
    </template>
  </movies>
</div>

<template id="movies">
  <ul class="list-group">
    <li
      v-for="movie in movies"
      class="list-group-item"
    >
      <slot :movie="movie">
        {{ movie.title }}
      </slot>
    </li>
  </ul>
</template>
```

ou sem o `slotProps`

```html
<div id="app">
  <movies>
    <template #default="{ movie }">
      <i class="fa fa-tv"></i> {{ movie.title }} ({{ movie.release }})
    </template>
  </movies>
</div>

<template id="movies">
  <ul class="list-group">
    <li
      v-for="movie in movies"
      class="list-group-item"
    >
      <slot :movie="movie">
        {{ movie.title }}
      </slot>
    </li>
  </ul>
</template>
```

ou com `index`

```html
<div id="app">
  <movies>
    <template #default="{ movie, index }">
      <i class="fa fa-tv"></i> {{ index }} - {{ movie.title }} ({{ movie.release }})
    </template>
  </movies>
</div>

<template id="movies">
  <ul class="list-group">
    <li
      v-for="(movie, index) in movies"
      class="list-group-item"
    >
      <slot :movie="movie" :index="index">
        {{ movie.title }}
      </slot>
    </li>
  </ul>
</template>
```

## Componentes - dinâmicos

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <div class="container mt-5">
      <h1>{{ title }}</h1>

      <div v-for="question in questions">
        <h6>{{ question.title }}</h6>

        <component :is="`form-${question.type}`"></component>
        <br>
      </div>
    </div>
  </div>

  <template id="formInput">
    <input type="text" class="form-control">
  </template>

  <template id="formTextarea">
    <textarea class="form-control"></textarea>
  </template>

  <script>
    const app = Vue.createApp({
      data() {
        return {
          title: 'Title',
          type: 'input',
          questions: [
            { title: 'Questão 1', type: 'input' },
            { title: 'Questão 2', type: 'textarea' },
            { title: 'Questão 3', type: 'input' },
            { title: 'Questão 4', type: 'textarea' },
            { title: 'Questão 5', type: 'input' },
          ]
        }
      }
    })
      .component('form-input', {
        template: '#formInput'
      })
      .component('form-textarea', {
        template: '#formTextarea'
      })
      .mount('#app')
  </script>
</body>
</html>
```

## Provide/inject

```html
<div id="app">
  <pai>
    <filho>
      <neto></neto>
    </filho>
  </pai>
</div>

<template id="pai">
  {{ todos }}
</template>

<template id="filho"></template>

<template id="neto">
  {{ todos }}
</template>

<script>
  const app = Vue.createApp({
    provide() {
      return {
        todos: this.todos
      }
    },
    data() {
      return {
        todos: ['Um', 'Dois', 'Três']
      }
    }
  })
    .component('pai', {
      inject: ['todos'],
      template: '#pai'
    })
    .component('filho', {
      template: '#filho'
    })
    .component('neto', {
      inject: ['todos'],
      template: '#neto'
    })
    .mount('#app')
</script>
```

# Vue CLI

cli.vuejs.org

```
npm install -g @vue/cli
```

## Criando um projeto

```
vue create my-project
```

### Trabalhando com Single File Component

```
mkdir sfc
cd sfc
touch App.vue
```

```js
// App.vue
<template>
  <div>
    <h1>Hello World!</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style>
  .title {}
</style>
```

### Prototipagem

https://v4.cli.vuejs.org/guide/prototyping.html

[Instant Prototyping v5](https://cli.vuejs.org/guide/prototyping.html)

```
npm install -g @vue/cli @vue/cli-service-global

cd sfc
vue serve
```

Este comando não está compatível com a versão 18, então use

```
nvm use 16.17.0
npm install -g @vue/cli @vue/cli-service-global

vue serve
```

## Criando projeto

```
vue create my-app
cd my-app
npm run serve
```

# Vue Route

## Instalando

```
npm add vue-router@4
```

Edite `main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld'

const routes = [
    { path: '/', component: HelloWorld }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
  .use(router)
  .mount('#app')
```

## Criando primeiras rotas

Crie uma pasta `src/views`

```
cd my-app
mkdir -p src/views
```

E dentro de `src/views` crie os arquivos

```
touch src/views/{Home,Company,Contact}.vue
```

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home'
import Company from './views/Company'
import Contact from './views/Contact'

const routes = [
    { path: '/', component: Home },
    { path: '/empresa', component: Company },
    { path: '/contato', component: Contact },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
  .use(router)
  .mount('#app')
```

```js
// App.vue
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <router-link to="/">Home</router-link>
     |
    <router-link to="/empresa">Empresa</router-link>
     |
    <router-link to="/contato">Contato</router-link>
  </div>

  <router-view />
</template>
```

## History modes

```js
// main.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes,
})
```

## Nomeando rotas

```js
// main.js
const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/empresa', name: 'company', component: Company },
    { path: '/contato', name: 'contact', component: Contact },
]
```

```js
// App.vue
<div>
  <router-link :to="{ name: 'home' }">Home</router-link>
   |
  <router-link :to="{ name: 'company' }">Empresa</router-link>
   |
  <router-link :to="{ name: 'contact' }">Contato</router-link>
</div>
```

## Adicionando Alias

```js
// main.js
{
  path: '/empresa',
  name: 'company',
  alias: '/a-empresa',
  component: Company
}
```

## Redirecionamento de rotas

```js
// main.js
{
  path: '/a-empresa',
  // redirect: '/empresa', ou
  redirect: { name: 'company' },
},
{
  path: '/empresa',
  name: 'company',
  // alias: '/a-empresa',
  component: Company
}
```

## Rotas com parâmetros

Crie um componente chamado `Team`

```
touch src/views/Team.vue
```

```js
// main.js
import Team from './views/Team'

{
  path: '/equipe/:member',
  name: 'team',
  component: Team
},
```

```js
// App.vue
<router-link :to="{ name: 'team', params: { member: 'regis' }}">Equipe</router-link>
```

## Validando parâmetros

Regex somente com letras

```js
// main.js
{
  path: '/equipe/:member([a-z]+)',
}
```

Regex somente com números

```js
// main.js
{
  path: '/equipe/:member([0-9]+)',
}
```

Regex somente com dígitos (números)

```js
// main.js
{
  path: '/equipe/:member(\\d+)',
}
```

Regex somente com palavras (aceita números)

```js
// main.js
{
  path: '/equipe/:member(\\w+)',
}
```

## Parâmetros opcionais

Basta adicionar o sinal de `?`

```js
// main.js
{
  path: '/equipe/:member?',
}
```

```js
// main.js
{
  path: '/equipe/:member(\\w+)?',
}
```

## Parâmetros repetíveis

Basta adicionar o sinal de `+`

```js
// main.js
{
  path: '/equipe/:member+',
}
```

com isso você poderá digitar no rota, por exemplo:

```
http://localhost:8080/equipe/2022/12/3
```

## Adicionando rota padrão

Crie um componente chamado `Error404`

```
touch src/views/404.vue
```

```js
// main.js
import Error404 from './views/404'

{
  path: '/:pathMatch(.*)',
  component: Error404
}
```

Então, entre numa página não existente.


## Objeto Route vs Router

`this.$route` traz informações da rota.

`this.$router` é a instância do vue-router. Tem a ver com ações.

```js
// Home.vue
created() {
  console.log(this.$route)
  console.log(this.$router)
}
```

## Navegação programática

O `push` a seguir vai servir de redirecionamento.

```js
// Home.vue
created() {
  // this.$router.push('/a-empresa') ou
  // this.$router.push({ path: '/a-empresa' }) ou
  // this.$router.push({ name: 'company' }) ou
  // this.$router.push({ name: 'company', query: { curso: 'laravue' } }) ou com query
  // this.$router.push({ name: 'company', hash: '#laravue' }) ou com hash
  // this.$router.push({ name: 'team', params: { member: 'regis' } }) ou com params
  console.log(this.$router)
}
```

## Navegando pelo histórico de rotas

```js
// App.vue
<a href="" @click.stop.prevent="goBack()">Voltar</a>

<script>
export default {
  name: 'App',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
```

## Pegando dados da rota atual

Mas esse processo deixa o componente muito dependente do sistema de roteamento.

```js
// Team.vue
<template>
  <div>
    <h1>Equipe</h1>
    <h2>{{ member }}</h2>

    <div v-if="member === 'regis'">
      Bio Regis
    </div>

    <div v-else-if="member === 'tiago'">
      Bio Tiago
    </div>

    <div v-else>
      Membro comum
    </div>

    <p>Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Quem num gosta di mé, boa gentis num é. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.</p>
  </div>
</template>

<script>
  export default {
    name: 'Team',
    data() {
      return {}
    },
    computed: {
      member() {
        return this.$route.params.member
      }
    },
    methods: {}
  }
</script>
```

## Passando props para o componente da rota

Com esse processo podemos deixar o componente mais flexível e independente do sistema de roteamento.

Edite `main.js`

```js
// main.js
{
  path: '/equipe/:member',
  name: 'team',
  component: Team,
  props: {
    color: 'red',
    member: 'regis',
  }
}
```

```js
// Team.vue
<script>
  export default {
    name: 'Team',
    props: {
      color: {
        type: String,
        default: '',
      },
      member: {
        type: String,
        default: '',
      },
    },
    data() {
      return {}
    },
    // computed: {
    //   member() {
    //     return this.$route.params.member
    //   }
    // },
    methods: {}
  }
</script>
```

Ou dinamicamente podemos fazer:

```js
// main.js
{
  path: '/equipe/:member',
  name: 'team',
  component: Team,
  props: route => ({ member: route.params.member, color: 'green' })
}
```

## Criando subrotas

Atributo `children`

```js
// main.js
import Company from './views/Company'
import CompanyHistory from './views/CompanyHistory'
import CompanyAwards from './views/CompanyAwards'

{
  path: '/empresa',
  name: 'company',
  // alias: '/a-empresa',
  component: Company,
  children: [
    {
      path: 'historia',  // não coloque barra aqui
      name: 'company-history',
      component: CompanyHistory,
    },
    {
      path: 'premios',  // não coloque barra aqui
      name: 'company-awards',
      component: CompanyAwards,
    },
  ]
},
```

Crie os componentes

```
touch src/views/{CompanyHistory,CompanyAwards}.vue
```

```js
// Company.vue
<div>
  <router-link :to="{ name: 'company-history' }">História</router-link>
  |
  <router-link :to="{ name: 'company-awards' }">Prêmios</router-link>
</div>

<router-view />
```

## Passando propriedades estáticas
￼
Atributo `meta`

```js
// main.js
{
  path: '/empresa',
  // ...
  meta: {
    sidebar: true,
    auth: false,
  }
```

```js
// Company.vue
<template>
  <div>
    <h1>A empresa</h1>

    <div :class="{ 'sidebar': sidebar }">
      <router-link :to="{ name: 'company-history' }">História</router-link>
      |
      <router-link :to="{ name: 'company-awards' }">Prêmios</router-link>
    </div>

    {{ sidebar }}

    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'Company',
    data() {
      return {}
    },
    computed: {
      sidebar() {
        return this.$route.meta.sidebar
      }
    },
  }
</script>

<style>
  .sidebar {
    background-color: #CCC;
    padding: 5px;
  }
</style>
```

## Guards locais

```js
// main.js
{
  path: '/contato',
  name: 'contact',
  component: Contact,
  beforeEnter: (to, from, next) => {
    console.log('to', to)
    console.log('from', from)
    next()
  }
}
```

Ou dentro do componente

```js
// Company.vue
export default {
  name: 'Company',
  data() {
    return {}
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    console.log('to', to)
    console.log('from', from)
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
    console.log('to', to)
    console.log('from', from)
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    console.log('to', to)
    console.log('from', from)
    next()
  },
}
```

## Guards globais

```js
// main.js
router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
  console.log('to', to)
  console.log('from', from)
})
```

## Bloqueando rotas com guards

```js
// main.js
{
  path: '/contato',
  name: 'contact',
  component: Contact,
  meta: {
    auth: true,
  },
}

const isLogged = false

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !isLogged) {
    next({ name: 'home' }) // Se não estiver logado, ele redireciona.
  } else {
    next()
  }
})
```

E ainda podemos melhorar o código com

```js
// main.js
router.beforeEach((to, from, next) => {
  let n = null

  if (to.meta.auth && !isLogged) {
    n = { name: 'home' }
  }

  next(n)
})
```

## Comportamento da barra de rolagem

```js
//main.js
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehaviour(to, from, savePosition) {
    return { 
      el: '#main',
      top: 0
    }
  }
})
```

## Rotas carregamento lento

```js
//main.js
// import Home from './views/Home'
const Home = () => import(/* webpackChunkName: "home" */ './views/Home')
// import Company from './views/Company'
// const Company = () => import(/* webpackChunkName: "company" */ './views/Company') ou
const CompanyHistory = () => import(/* webpackChunkName: "company-history" */ './views/CompanyHistory')
const CompanyAwards = () => import(/* webpackChunkName: "company-awards" */ './views/CompanyAwards')
const Contact = () => import(/* webpackChunkName: "contact" */ './views/Contact')
const Team = () => import(/* webpackChunkName: "team" */ './views/Team')
const Error404 = () => import(/* webpackChunkName: "error404" */ './views/404')

{
    path: '/empresa',
    name: 'company',
    // alias: '/a-empresa',
    component: () => import(/* webpackChunkName: "company" */ './views/Company'), // <<<
```

## Busca de dados

```js
// Company.vue
watch: {
  // '$route'(newValue, oldValue) {
  //   this.fetchData()
  //   console.log(newValue)
  //   console.log(oldValue)
  // }
  '$route'() {
    this.fetchData()
  }
},
methods: {
  fetchData() {
    // ajax
    console.log('fetchData')
  }
}
```

## Organizando arquivo de rotas

Crie uma pasta `router` e um arquivo `index.js`

```
mkdir src/router
touch src/router/index.js
```

E limpe o `main.js`

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
```

## Instalando Vue Router pelo Vue CLI

```
vue create my-app-router
cd my-app-router

vue add router

npm run serve
```

# Vuex

https://vuex.vuejs.org/

Gerenciador de Estado Global


**state** são os dados.

**mutations** é a central onde se controla as alterações do estado.

**actions** são ações que podem alterar os dados.

Em resumo, quando você executa uma `actions`, ele ativa uma `mutations`, que por fim altera o `state`.

![](https://vuex.vuejs.org/vuex.png)


## Diferença entre mutations e actions

**mutations** são síncronas.

**actions** são **assíncronas**. Por exemplo, ajax pode ser feito nas `actions`.


## Instalação

Crie uma nova app

```
vue create my-app-vuex
cd my-app-vuex
```

e depois instale o vuex.

```
npm install vuex@next --save
```

```js
// main.js
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
  state() {
    return {
      first_name: 'Jon',
      last_name: 'Snow',
      email: 'jon@snow.com',
    }
  },

  mutations: {
    updateName() {}
  }
})

createApp(App)
  .use(store)
  .mount('#app')

console.log(store.state.email)
```

## State

Você pode pegar os dados diretamente no template com

```html
<p>{{ $store.state.email }}</p>
```

Ou podemos fazer um mapeamento no `computed`

```js
// HelloWorld.vue
computed: {
    userFirstName() {
      return this.$store.state.first_name
    },
    fullName() {
      return `${ this.$store.state.first_name } ${ this.$store.state.last_name }`
    }
  }
```

E teremos:

```vue
// HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <p>{{ userFirstName }}</p>
    <p>{{ fullName }}</p>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    userFirstName() {
      return this.$store.state.first_name
    },
    fullName() {
      return `${ this.$store.state.first_name } ${ this.$store.state.last_name }`
    }
  }
}
</script>
```

## State - mapState helper

Podemos importar o mapState

```js
import { mapState } from 'vuex'
```


e fazer

```js
computed: mapState({
  firstName: (state) => {
    return state.first_name
  }
})
```


E esta função de uma forma mais simples é

```js
computed: mapState({
  firstName: state => state.first_name,
})
```

Agora vamos usar [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) para mergear os objetos.

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <p>{{ firstName }} {{ lastName }}</p>
    <p>{{ email }}</p>
    <p>{{ fullName }}</p>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      firstName: state => state.first_name,
      lastName: state => state.last_name,
      email: state => state.email,
    }),
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
</script>
```

## Mutations

Defina a mutation em `main.js`

```js
// main.js
mutations: {
  increment(state) {
    state.counter += 1;
  },

  decrement(state) {
    state.counter -= 1;
  },
}
```

Depois, use-a com o comando `commit()` em `CounterView.vue`

```vue
// CounterView.vue
<script>
export default {
  name: 'CounterView',
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    }
  },
}
</script>
```

## Mutations - passando parâmetros

```js
// main.js
mutations: {
    increment(state, value) {
      state.counter += value;
    },

    decrement(state, value) {
      state.counter -= value;
    },
  }
```

```vue
// CounterView.vue
methods: {
    increment() {
      this.$store.commit('increment', 10)
    },
    decrement() {
      this.$store.commit('decrement', 10)
    }
  }
```

Ou podemos passar um objeto:

```js
// main.js
mutations: {
    increment(state, payload) {
      state.counter += payload.value;
    },

    decrement(state, payload) {
      state.counter -= payload.value;
    },
  }
```

```vue
// CounterView.vue
methods: {
    increment() {
      this.$store.commit('increment', { value: 10 })
    },
    decrement() {
      this.$store.commit('decrement', { value: 10 })
    }
  },
}
```

## Mutations - mapMutations helper

Mapeamos um array de commits:

```js
// main.js
mutations: {
    increment(state, value) {
      state.counter += value;
    },

    decrement(state, value) {
      state.counter -= value;
    },
  }
```

```vue
// CounterView.vue
@click.stop.prevent="decrement(10)"

@click.stop.prevent="increment(10)"

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CounterView',
  methods: {
    ...mapMutations(['increment', 'decrement'])
  },
}
</script>
```

E por fim vamos mapear o `state.counter`

```vue
// CounterView.vue
<input
  :value="counter"

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CounterView',

  computed: {
    ...mapState({
      counter: state => state.counter
    })
  },

  methods: {
    ...mapMutations(['increment', 'decrement'])
  },
}
</script>
```

Também podemos mapear as mutations como objetos, a partir daí podemos alterar o nome da mutation, caso necessário.

```vue
// CounterView.vue
@click.stop.prevent="remove(10)"

@click.stop.prevent="add(10)"

  methods: {
    ...mapMutations({
      'add': 'increment',
      'remove': 'decrement',
    })
  },
```

Ou melhorando ainda mais o código podemos ter


```vue
// CounterView.vue
@click.stop.prevent="decrement()"

@click.stop.prevent="increment()"

  methods: {
    ...mapMutations({
      $_add: 'increment',
      $_remove: 'decrement',
    }),
    increment() {
      this.$_add(10)
    },
    decrement() {
      this.$_remove(10)
    },
  },
```

## Mutations - padrão de código

Defina o nome das mutations em maiúscula

```js
// main.js
mutations: {
    INCREMENT(state, value) {
      state.counter += value;
    },

    DECREMENT(state, value) {
      state.counter -= value;
    }
```

```vue
// CounterView.vue
  methods: {
    ...mapMutations({
      $_add: 'INCREMENT',
      $_remove: 'DECREMENT',
    }),
    ...
  },
```

Também podemos definir o nome da mutations num arquivo separado. Meio repetitivo, mas tudo bem.

```
touch src/mutations.js
```

```js
// mutations.js
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
```

```js
// main.js
import { INCREMENT } from './mutations'

  mutations: {
    [INCREMENT](state, value) {
      state.counter += value;
    },

```

Colocando entre colchetes o nome da variável fica dinâmico.


## Actions

```js
// main.js
actions: {
    counter(context, payload) {}
  }
```

O comando `dispatch()` é que executa a `action` de fato.

```js
// CounterView.vue
  methods: {
    increment() {
      this.$store.dispatch('counter', 5)
    },
  }
```

Então devemos ter

```js
// main.js
actions: {
    counter(context, payload) {
      context.commit('INCREMENT', payload)
    }
  }
```

Ou simplesmente, apenas o `commit`.

```js
// main.js
actions: {
    counter({ commit }, payload) {
      commit('INCREMENT', payload)
    }
  }
```

Mas ainda falta o `decrement`, então façamos

```js
// main.js
actions: {
    counter({ commit }, { type, value }) {
      commit(type, value)
    }
  }
```

```js
// CounterView.vue
methods: {
    ...mapMutations({
      $_add: 'INCREMENT',
      $_remove: 'DECREMENT',
    }),
    increment() {
      this.$store.dispatch('counter', { type: 'INCREMENT', value: 10 })
    },
    decrement() {
      this.$store.dispatch('counter', { type: 'DECREMENT', value: 10 })
    },
  }
```

Ou seja, as `actions` são usadas para criar contextos.


## Actions - mapActions helper

```js
// CounterView.vue
<input
      :value="counting"

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CounterView',

  computed: {
    ...mapState({
      counting: state => state.counter  // aqui foi renomeado
    })
  },

  methods: {
    ...mapMutations({
      $_add: 'INCREMENT',
      $_remove: 'DECREMENT',
    }),

    ...mapActions(['counter']),  // <<<

    increment() {
      this.counter({ type: 'INCREMENT', value: 10 })
    },

    decrement() {
      this.counter({ type: 'DECREMENT', value: 10 })
    },
  },
}
</script>
```

Podemos refatorar ainda mais o nosso código mapeando as actions

```js
// CounterView.vue
methods: {
  ...mapActions({
    $_counter: 'counter'
  }),

  increment() {
    this.$_counter({ type: 'INCREMENT', value: 10 })
  },

  decrement() {
    this.$_counter({ type: 'DECREMENT', value: 10 })
  }
}
```

## Getters

`Getters` é equivalente ao `computed`.

```js
// main.js
getters: {
    fullName(state) {
      return `${ state.first_name } ${ state.last_name }`
    }
  }
```

```vue
// App.vue
<template>
  <div class="container mt-10">
    {{ $store.getters.fullName }}
    <Counter />
  </div>
</template>
```





