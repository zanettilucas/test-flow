Hice algunos cambios en los endopoints, los especifico y explico porque:

v1/location <- quedo igual.
v1/current <- recibe por queryparams "cities" que puede contener un array.
v1/forecast <- idem current.
Ej: v1/current?cities=london
    v1/forecast?cities=london&cities=amsterdam

Decidí hacerlo de esta manera ya que si lo hacía v1/current/cities, pensé que al no tener
citie como entidad, estaría conceptualmente mal.

En vez de usar modulos para las request o logs, preferi añadir codigo mío que he usado en
otras ocasiones, para que puedan ver un poco más de como desarrollo.

Decidí agregar el buscador de ip en el middleware ya que en este caso siempre se utiliza,
si no fuese así, lo usaría como primera function en las rutas correspondientes.

Se podría haber hecho mucho menos complejo a nivel estructura, pero prioricé que fuera 
más fácil escalarlo en caso de ser necesario, necesitando menor refactorización si hubiese
más pasos.

Mi punto debil en este caso fueron los test. No tengo mucha experiencia en eso, decidí hacer uno
sobre status solamente. Intente mockear las request a los servicios externos, ya que no deberían
ser usados en tests, sin exito. No seguí insistiendo por temas de tiempo. Igual estoy muy 
interesado en profundizar conocimientos sobre este aspecto.

No fui commiteando paso a paso ya que al hacerla solo y espaciado durante varios días, pensé que iba
a confundir más que esclarecer.
