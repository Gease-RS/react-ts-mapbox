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