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

TODO

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

## 