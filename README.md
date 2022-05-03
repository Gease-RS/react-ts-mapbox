<div align="center">
  <p align="center">
    <img src="src/assets/img/mapbox.png" width="680" height="290" alt="Mapbox Maps" />
  </p>
 <h1>MAPBOX Maps</h1>
 <h3>Desenvolvendo mapas com Mapbox<h3>
</div>

1. Crie o projeto React Typescript
```bash
$ npx create-react-app react-ts-mapbox --template=typescript
```

2. Crie a chave api em: https://www.mapbox.com/

3. Instale o pacote Mapbox
```bash
$ yarn add mapbox-gl
$ yarn add -D @types/mapbox-gl
```

>Seguindo a documentação do MapBox não consegui evoluir com a versão "mapbox-gl": "^2.8.1". Tive sucesso mudando para versão "mapbox-gl": "^2.6.1"

4. Instale o pacote Axios
```bash
$ yarn add axios
```

>Para fazer o build da aplicação aplicar a configuração a seguir em todas as importações do mapbox-gl adicionando o sinal de ! e as duas linhas de ignorar devido a problema de transcopilação.

```
/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import mapboxgl from "!mapbox-gl";

npm run build

```