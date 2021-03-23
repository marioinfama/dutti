# Antes de empezar:
- Para reportar tu trabajo debes crear un repositorio GIT público.

- Crea tantos commits como consideres necesario. Parte de nuestra evaluación se basa en como afrontas los problemas y la única forma que tenemos de verlo es mediante commits. Esta parte puede ser más decisiva que la calidad de la entrega.
- En el comentario del commit especifica los cambios que has realizado, así como explicaciones o aportaciones que consideres importante comentar. Valoraremos especialmente que los commits estén bien documentados
- En caso de que surjan dudas intenta buscar alternativas y justifícalas en el mensaje de commit.

# Tasks.

1.  RE-Estructura el proyecto como mejor consideres. 
    1.  Como mínimo se debe crear un modulo a parte para la autenticación y registro.
    2.  Implementa Interficies  o clases  para los tipos de datos que consideres.
2. Implementa un sistema de login/registro que persista los datos correctamente.
   1. Puedes utilizar:
      1. LocalStorage, 
      2. Alguna api externa
      3. Implementar servicio propio con Nodejs.
3. Implementa el patron de diseño redux para la gestion del listado de naves.
   1. No es necesario implementar redux para todo el aplicativo, solo para la gestión de naves.
4.  Implementa la carga de multiples "páginas" en el apartado de ships.
    1.   Actualmente solo carga una página de la api.
    2.   Revisar la API para saber como consumir el resto de páginas. https://swapi.dev/
5.  Implementa test unitarios para el modulo de login/registro.
6.  Añade imágenes a las CARDS de naves: Puedes usar esta api  'https://starwars-visualguide.com/assets/img/starships/' + ID_DE NAVE -->  https://starwars-visualguide.com/assets/img/starships/5.jpg
7.  Suponiendo que esta página tiene un numero elevado de usuarios simultáneos, implementa las mejoras que consideres oportunas para evitar la saturación del servidor.
    1.  Si alguna de las medidas no es de código, comentalas a continuación en este Readme.


# Getting Started 

`npm i`  for install
Run `npm run start` for a dev server. 
Navigate to `http://localhost:4200/`.


# Notas del desarrollador:

1. Reestructuración
    Se reestructura el proyecto dividiendo en módulos users y pages optando por seguir la siguiente estructura:
    -app
    --module1
    ---components
    ---services
    ---interfaces
    --module2
    ---components
    ---services
    ---interfaces
    ....

    El módulo principal se renombra a pages así como el routing.

2. Se implementa el login/registro/logout consumiendo un servicio nodejs + express implementado para la ocasión y que está en el repositorio git https://github.com/marioinfama/duttiServer
    Este servicio se conecta con una bbdd mongoDB creada en un cluster en la propia web de mongodb.
    Tanto el login como el resgistrar generan un token de seguridad con JWT que es guardado en el localStorage para comprobar que puede acceder a las distintas páginas ya que está logueado.
    En cuanto a la encriptación de la password se realiza con bcryptjs.

3. Se implementa el patrón redux para el componente ships y controlar la carga del listado

4. Se puede implementar con el payload de redux, pero lo he realizado creando un nuevo método en el servicio y llamando dentro del subcomponente details. De la otra manera se puede hacer emmitiendo eventos del componente padre.

7. En el caso de las aplicaciones angular para no saturar el servidor podemos mejorar el rendimiento de la misma... Esto se lleva a cabo con buenas prácticas de programación en este framework como por ejempo:
    - Uso de lazy loading de modulos (implementado en esta aplicación en la última subida)
    - Uso de canLoad en los routing (implementado en esta aplicación para controlar la vistas cuando no hay usuario login)
    - Intentar usar lo menos posible las escuchas de angular (onChange, onAfterChange...), esto eleva el número de peticiones al servidor.
    - Usar los get y set lo menos posible, y en su lugar usar _<nombre_variable> para devolever/cargar el valor de la misma.
    - Controlar la carga de los componentes que dependen para mostrarse de alguna variable que se carga con método asincrono, de esta forma no se cargará varias veces (ejemplo implementado en el componente ships)
    - No realizar operaciones costosas en la vista, para esto existen las pipes.
    - Uso de memoria caché para cargas innecesarias
    ...

    Aparte de controlar el rendimiento de la aplicación desarrollada, a nivel de sistemas, una solución es motar un claster de servidores con réplicas de la aplicación en cada uno de ellos y balancear las peticiones dependiendo de la carga dentro de ese mismo cluster.
