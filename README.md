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

# Vue Route

Instalando

```
npm add vue-router@4
```

Edite `main.js`

```js
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
