// Libros de dominio público y recursos educativos de acceso libre
const LIBROS_PRECARGADOS = [
  {
    id: 'pre_edu_delors',
    titulo: 'La educación encierra un tesoro — UNESCO',
    autor: 'Jacques Delors (UNESCO)',
    paginas: [
      { texto: 'LA EDUCACIÓN ENCIERRA UN TESORO\nInforme a la UNESCO de la Comisión Internacional sobre la Educación para el Siglo XXI\nJacques Delors — 1996\n\nFRENTE A LOS MÚLTIPLES DESAFÍOS DEL PORVENIR\n\nLa educación constituye un instrumento indispensable para que la humanidad pueda progresar hacia los ideales de paz, libertad y justicia social. La Comisión desea transmitir un mensaje esperanzador: la educación puede contribuir a lograr un mundo más seguro, más sano, más próspero y, al mismo tiempo, más solidario, como instrumento de desarrollo de la persona humana.', nota: '' },
      { texto: 'LOS CUATRO PILARES DE LA EDUCACIÓN\n\nAprender a conocer: Este tipo de aprendizaje, que tiende menos a la adquisición de conocimientos clasificados y codificados que al dominio de los instrumentos mismos del saber, puede considerarse a la vez medio y finalidad de la vida humana.\n\nAprender a hacer: Aprender a conocer y aprender a hacer son, en gran medida, indisociables. Pero lo segundo está más estrechamente vinculado a la cuestión de la formación profesional: ¿cómo enseñar al alumno a poner en práctica sus conocimientos y, al mismo tiempo, cómo adaptar la enseñanza al futuro mercado de trabajo?', nota: '' },
      { texto: 'Aprender a vivir juntos: Sin duda, este aprendizaje constituye una de las principales empresas de la educación contemporánea. Demasiado a menudo la violencia que impera en el mundo contradice la esperanza que algunos habían depositado en el progreso de la humanidad.\n\nAprender a ser: Desde sus primeras páginas, el informe Aprender a ser (1972) proclamaba: "El fin del desarrollo es el florecimiento completo del hombre, en toda su riqueza y en la complejidad de sus expresiones y de sus compromisos." Esta afirmación sigue siendo actual.\n\nLa educación debe contribuir al desarrollo global de cada persona: cuerpo y mente, inteligencia, sensibilidad, sentido estético, responsabilidad individual, espiritualidad.', nota: '' },
      { texto: 'EL PAPEL DEL DOCENTE\n\nTodo el mundo conviene en que es necesario mejorar la calidad y la motivación del personal docente, pues de ellos depende en gran medida la calidad de la enseñanza. Pero si bien se pide mucho a los maestros, también se les da poco margen de iniciativa.\n\nEl papel del maestro no consiste solamente en transmitir información ni siquiera conocimientos, sino en presentarlos en forma de problemática, situándolos en un contexto y poniendo los problemas en perspectiva, de manera que el alumno pueda establecer el nexo entre su solución y otros interrogantes de mayor alcance.', nota: '' },
    ],
    portada: null, creado: 'UNESCO 1996', ultimaPag: 0, marcadores: [], palabras: 380, fuente: 'precargado'
  },
  {
    id: 'pre_edu_freire',
    titulo: 'Pedagogía del Oprimido',
    autor: 'Paulo Freire',
    paginas: [
      { texto: 'PEDAGOGÍA DEL OPRIMIDO\nPaulo Freire — 1968\n\nCAPÍTULO 1\n\nLa presente investigación, que se origina en una inquietud por el hombre y su destino, busca plantear de manera objetiva la situación de violencia en que se encontraban los hombres del Tercer Mundo.\n\nEl ser humano es un ser de relaciones y no solo de contactos, no solo está en el mundo sino con el mundo. El estar con el mundo resultante de su apertura a la realidad le posibilita relacionarse con ella, de una manera que, a los animales, su inmersión en la realidad no les es posible hacer.', nota: '' },
      { texto: 'LA CONCEPCIÓN BANCARIA DE LA EDUCACIÓN\n\nUn análisis crítico de la concepción bancaria de la educación sugiere que quizás no se percibe en la misma contradicción que se pone de manifiesto en la siguiente situación: en tanto la práctica bancaria acentúa la dicotomía entre los seres humanos y el mundo, la práctica problematizadora parte del carácter histórico y de la historicidad de los hombres.\n\nEn la concepción bancaria, el educador conduce a los educandos a la memorización mecánica del contenido narrado. Más aún, la narración los transforma en "vasijas", en recipientes que deben ser "llenados" por el educador.', nota: '' },
      { texto: 'EL DIÁLOGO COMO ESENCIA DE LA EDUCACIÓN\n\nNo es posible el diálogo entre los que quieren pronunciar el mundo y los que no quieren hacerlo; entre los que niegan a los demás el derecho de decir la palabra y los que se hallan negados de este derecho.\n\nEl diálogo, como encuentro de los hombres para la "pronunciación" del mundo, es una condición fundamental para su verdadera humanización.\n\nEl diálogo es el encuentro amoroso de los hombres que, mediatizados por el mundo, lo "pronuncian", esto es, lo transforman y, transformándolo, lo humanizan para la humanización de todos.', nota: '' },
    ],
    portada: null, creado: 'Clásico Educación', ultimaPag: 0, marcadores: [], palabras: 320, fuente: 'precargado'
  },
  {
    id: 'pre_edu_inclusiva',
    titulo: 'Educación Inclusiva — Marco Conceptual',
    autor: 'UNESCO',
    paginas: [
      { texto: 'EDUCACIÓN INCLUSIVA\nMarco Conceptual — UNESCO\n\n¿QUÉ ES LA EDUCACIÓN INCLUSIVA?\n\nLa educación inclusiva puede ser concebida como un proceso que permite abordar y responder a la diversidad de las necesidades de todos los educandos a través de una mayor participación en el aprendizaje, las actividades culturales y comunitarias y reducir la exclusión dentro y fuera del sistema educativo.\n\nEl objetivo de la inclusión es brindar respuestas apropiadas al amplio espectro de necesidades de aprendizaje tanto en entornos formales como no formales de la educación.', nota: '' },
      { texto: 'PRINCIPIOS DE LA EDUCACIÓN INCLUSIVA\n\n1. La inclusión es un proceso. Es decir, no se trata simplemente de una cuestión de fijación y logro de determinados objetivos, es una búsqueda interminable de formas más adecuadas de responder a la diversidad.\n\n2. La inclusión busca la presencia, la participación y el éxito de todos los estudiantes. Aquí "presencia" se relaciona con el lugar donde son educados los niños y con qué fiabilidad asisten a clases.\n\n3. La inclusión precisa la identificación y la eliminación de barreras. Las barreras pueden adoptar muchas formas: actitudes, información, prácticas institucionales y estructuras.', nota: '' },
      { texto: 'BARRERAS PARA EL APRENDIZAJE\n\nEl concepto de "barreras para el aprendizaje y la participación" fue desarrollado para contrastar con el de "necesidades educativas especiales". Las barreras al aprendizaje y a la participación surgen de la interacción entre los estudiantes y sus contextos: las personas, las políticas, las instituciones, las culturas y las circunstancias sociales y económicas que afectan sus vidas.\n\nEsta forma de pensar desafía la visión de que los problemas que experimentan los estudiantes son producto de sus deficiencias o dificultades personales, y pone el foco en eliminar los obstáculos del entorno.', nota: '' },
      { texto: 'EL ROL DOCENTE EN LA INCLUSIÓN\n\nLos docentes son agentes clave del cambio en la construcción de escuelas inclusivas. Para asumir este rol necesitan:\n\n• Creer que todos los estudiantes pueden aprender.\n• Conocer estrategias de enseñanza diferenciada.\n• Trabajar colaborativamente con otros docentes, familias y profesionales.\n• Reflexionar continuamente sobre su práctica.\n• Adaptar los materiales curriculares a las necesidades del grupo.\n\nLa formación continua y el apoyo institucional son esenciales para que los docentes puedan responder efectivamente a la diversidad del aula.', nota: '' },
    ],
    portada: null, creado: 'UNESCO', ultimaPag: 0, marcadores: [], palabras: 360, fuente: 'precargado'
  },
  {
    id: 'pre_edu_vigotsky',
    titulo: 'Zona de Desarrollo Próximo — Vigotsky',
    autor: 'Lev Vigotsky',
    paginas: [
      { texto: 'ZONA DE DESARROLLO PRÓXIMO\nLev Semionovich Vigotsky\n\nEL APRENDIZAJE Y EL DESARROLLO\n\nVigotsky propuso que el aprendizaje ocurre en un espacio entre dos niveles de desarrollo: el nivel de desarrollo real (lo que el niño puede hacer solo) y el nivel de desarrollo potencial (lo que puede hacer con ayuda de otro más capaz).\n\nA este espacio lo llamó Zona de Desarrollo Próximo (ZDP): "la distancia entre el nivel real de desarrollo, determinado por la capacidad de resolver independientemente un problema, y el nivel de desarrollo potencial, determinado a través de la resolución de un problema bajo la guía de un adulto o en colaboración con otro compañero más capaz."', nota: '' },
      { texto: 'EL ROL DEL LENGUAJE\n\nPara Vigotsky, el lenguaje juega un papel fundamental en el desarrollo cognitivo. El habla privada (cuando el niño habla consigo mismo mientras resuelve un problema) no es una conducta egocéntrica sin sentido, sino una herramienta de pensamiento.\n\nEl lenguaje primero cumple una función comunicativa y social; luego se interioriza y se convierte en pensamiento verbal. Esta transición de lo social a lo individual es la clave del desarrollo: todas las funciones superiores se originan como relaciones entre seres humanos.\n\n"En el desarrollo cultural del niño, toda función aparece dos veces: primero entre personas, y luego en el interior del propio niño."', nota: '' },
      { texto: 'IMPLICANCIAS PEDAGÓGICAS\n\nLas ideas de Vigotsky tienen consecuencias profundas para la enseñanza:\n\n• El docente debe conocer la ZDP de cada alumno para proponer desafíos que estén un poco más allá de lo que puede hacer solo.\n• El trabajo colaborativo entre pares es valioso: un alumno puede ser el "más capaz" para otro en una tarea determinada.\n• El andamiaje (scaffolding) es el apoyo temporario que brinda el docente o un compañero, que luego se retira cuando el alumno puede hacerlo solo.\n• La evaluación debe mostrar no solo lo que el alumno ya sabe, sino lo que está en proceso de aprender.', nota: '' },
    ],
    portada: null, creado: 'Psicología Educacional', ultimaPag: 0, marcadores: [], palabras: 320, fuente: 'precargado'
  },

  {
    id: 'pre_quijote',
    titulo: 'Don Quijote de la Mancha',
    autor: 'Miguel de Cervantes',
    paginas: [
      { texto: 'CAPÍTULO PRIMERO\nQue trata de la condición y ejercicio del famoso hidalgo Don Quijote de la Mancha\n\nEn un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.\n\nUna olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda.\n\nEl resto della concluían sayo de velarte, calzas de velludo para las fiestas con sus pantuflos de lo mismo, y los días de entre semana se honraba con su vellorí de lo más fino.', nota: '' },
      { texto: 'Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro; gran madrugador y amigo de la caza.\n\nQuieren decir que tenía el sobrenombre de Quijada o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque por conjeturas verosímiles se deja entender que se llamaba Quijana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.', nota: '' },
      { texto: 'Es, pues, de saber que este sobredicho hidalgo, los ratos que estaba ocioso —que eran los más del año— se daba a leer libros de caballerías con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de la caza y aun la administración de su hacienda; y llegó a tanto su curiosidad y desatino en esto, que vendió muchas hanegas de tierra de sembradura para comprar libros de caballerías en que leer, y así llevó a su casa todos cuantos pudo haber dellos.\n\nEn resolución, él se enfrascó tanto en su lectura, que se le pasaban las noches leyendo de claro en claro, y los días de turbio en turbio; y así, del poco dormir y del mucho leer, se le secó el cerebro de manera que vino a perder el juicio.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 380, fuente: 'precargado'
  },
  {
    id: 'pre_fierro',
    titulo: 'Martín Fierro',
    autor: 'José Hernández',
    paginas: [
      { texto: 'MARTÍN FIERRO\nJosé Hernández — 1872\n\nAquí me pongo a cantar\nal compás de la vigüela,\nque el hombre que lo desvela\nuna pena estraordinaria,\ncomo la ave solitaria\ncon el cantar se consuela.\n\nPido a los Santos del Cielo\nque ayuden mi pensamiento;\nles pido en este momento\nque voy a cantar mi historia\nme refresquen la memoria\ny aclaren mi entendimiento.', nota: '' },
      { texto: 'Vengan santos milagrosos,\nvengan todos en mi ayuda,\nque la lengua se me añuda\ny se me turba la vista;\npido a mi Dios que me asista\nen una ocasión tan ruda.\n\nYo he visto muchos cantores,\ncon famas bien obtenidas,\ny que después de adquiridas\nno las quieren sustentar:\nparece que sin largar\nse cansaron en partidas.\n\nMas ande otro criollo pasa\nMartín Fierro ha de pasar;\nnada lo hace recular\nni las fantasmas lo espantan;\ny dende que todos cantan\nyo también quiero cantar.', nota: '' },
      { texto: 'Cantando me he de morir,\ncantando me han de enterrar,\ny cantando he de llegar\nal pie del Eterno Padre:\ndende el vientre de mi madre\nvine a este mundo a cantar.\n\nQue no se trabe mi lengua\nni me falte la palabra:\nel cantar mi gloria labra\ny poniéndome a cantar,\ncantando me han de encontrar\naunque la tierra se abra.\n\nMe siento en el plan de un bajo\na cantar un argumento;\ncomo si soplara el viento\nhago tiritar los pastos;\ncon oros, copas y bastos\njuega allí mi pensamiento.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 220, fuente: 'precargado'
  },
  {
    id: 'pre_facundo',
    titulo: 'Facundo',
    autor: 'Domingo F. Sarmiento',
    paginas: [
      { texto: 'FACUNDO\nCivilización y Barbarie\nDomingo Faustino Sarmiento — 1845\n\nCAPÍTULO I — ASPECTO FÍSICO DE LA REPÚBLICA ARGENTINA\n\nL\'immensité partout, l\'immensité dans les plaines, l\'immensité dans les forêts.\n—Marmier\n\nEl continente americano termina al sur en una punta, en cuya extremidad se forma el estrecho de Magallanes. Al oeste y a corta distancia de los Andes, el mar Pacífico; al este, el Atlántico. La pampa extiéndese al norte por espacio de dos mil leguas; y si continuáis subiendo, los bosques del trópico os cerrarán el paso antes de que hayáis llegado a la línea.', nota: '' },
      { texto: 'El territorio que hoy ocupan las provincias argentinas contenía, en 1810, cerca de un millón de habitantes; Buenos Aires no llegaba entonces a cincuenta mil almas. La campaña, pues, estaba poblada muy a la ligera, y las ciudades eran pobres y mezquinas, excepto Buenos Aires y Córdoba.\n\nLa extensión de las pampas, ese mar de tierra que no tiene fin conocido, esa llanura sin accidentes, esa uniformidad que cansa la vista, esa soledad sin límites, esa soledad que se puebla de fantasmas y llena de terrores al viajero, es sin duda alguna lo que da a la vida del argentino su carácter peculiar.', nota: '' },
      { texto: 'El hombre de la ciudad viste el traje europeo, vive de la vida civilizada tal como la conocemos en todas partes: allí están las leyes, las ideas de progreso, los medios de instrucción, alguna organización municipal, el gobierno regular, etc. Saliendo del recinto de la ciudad, todo cambia de aspecto: el hombre de campo lleva otro traje, que llamaré americano, por ser común a todos los pueblos; sus hábitos de vida son diferentes; sus necesidades, peculiares y limitadas; parecen dos sociedades distintas, dos pueblos extraños uno al otro.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 280, fuente: 'precargado'
  },
  {
    id: 'pre_matadero',
    titulo: 'El Matadero',
    autor: 'Esteban Echeverría',
    paginas: [
      { texto: 'EL MATADERO\nEsteban Echeverría — escrito ~1838\n\nA pesar de que la mía es historia, no la empezaré por el arca de Noé y la genealogía de sus ascendientes como acostumbraban hacerlo los antiguos historiadores españoles de América, que deben ser nuestros prototipos.\n\nTengo muchas razones para no seguir ese ejemplo, las que callo por no ser difuso. Diré solamente que los sucesos de mi narración pasaban por los años de Cristo de 183... Estábamos, a más, en el período cuaresmal en que la Iglesia Católica reprueba la sangre impura.', nota: '' },
      { texto: 'La carne es pecaminosa, y como dice el proverbio, busca al pecador. Por otra parte, la Iglesia tiene el poder de adoptar providencias preventivas contra las tentaciones de la carne.\n\nY como la Iglesia, adrede o sin querer, por un principio de amor cristiano, nos priva en la Cuaresma del sustento de carne, con el objeto sin duda de que nos saciemos en los espirituales, el resultado de esta medida es que la gente se hace más hambrienta de la una que de los otros, por una razón muy natural y muy fisiológica.\n\nLlovía a cántaros. El Plata bramaba de frío, y la inundación penetraba por todas partes.', nota: '' },
      { texto: 'El Matadero de la Convalecencia o del Alto, sito en las quintas al sur de la ciudad, es una gran playa en forma rectangular, colocada al extremo de dos calles, una de las cuales allí termina y la otra se prolonga hasta el este.\n\nEsta playa, con declive al sur, está cortada por un zanjón labrado por la corriente de las aguas pluviales, en cuyos bordes laterales se muestran innumerables cuevas de ratones y cuyo cauce recoge, en tiempo de lluvia, toda la sangraza seca o reciente, los desperdicios y grasas echadas del matadero.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 290, fuente: 'precargado'
  },
  {
    id: 'pre_celestina',
    titulo: 'La Celestina',
    autor: 'Fernando de Rojas',
    paginas: [
      { texto: 'LA CELESTINA\nFernando de Rojas — 1499\n\nACTO PRIMERO\n\nCALISTO.— En esto veo, Melibea, la grandeza de Dios.\nMELIBEA.— ¿En qué, Calisto?\nCALISTO.— En dar poder a natura que de tan perfecta hermosura te dotase, y hacer a mí, inmérito, tanta merced que verte alcanzase, y en tan conveniente lugar, que mi secreto dolor manifestarte pudiese. Sin duda, incomparablemente es mayor tal galardón que el servicio, sacrificio, devoción y obras pías que por este lugar alcanzar yo tengo a Dios ofrecido.', nota: '' },
      { texto: 'MELIBEA.— Por gran premio tienes éste, Calisto.\nCALISTO.— Téngolo por tanto, en verdad, que si Dios me diese en el cielo la silla sobre sus santos, no lo ternía por tanta felicidad.\nMELIBEA.— Pues aún más igual galardón te daré yo, si perseveras.\nCALISTO.— ¡Oh bienaventuradas orejas mías, que indignamente tan gran palabra habéis oído!\nMELIBEA.— Más desventuradas de que me acabes de oír. Porque la paga será tan fiera cuanto merece tu loco atrevimiento. Y el intento de tus palabras, Calisto, ha seydo de un hombre sin seso. Vete, vete de aquí, torpe; que no puede mi paciencia tolerar que haya subido en corazón humano conmigo el ilícito amor comunicar su deleite.', nota: '' },
      { texto: 'CALISTO.— Iré como aquel contra quien solamente la adversa fortuna pone su estudio con odio cruel.\n\n[Sale Calisto]\n\nSEMPRONIO.— ¿Qué es esto? ¿Qué cosa puede ser ésta tan grave que haya echo perder el color que en la cara traes?\n\nCALISTO.— ¡Vete de aquí! No me hables; si no, quizá ante del tiempo de mi rabiosa muerte mis manos causarán tu arrebatado fin.\nSEMPRONIO.— [Aparte] Iré, pues solo quieres penar. [Aparte] ¡Oh soberano Dios! ¡Cuán altos son tus misterios! ¡Cuánta premia pusiste en el amor, que es necesaria turbación en su principio!', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 300, fuente: 'precargado'
  },
  {
    id: 'pre_lazarillo',
    titulo: 'Lazarillo de Tormes',
    autor: 'Anónimo',
    paginas: [
      { texto: 'LAZARILLO DE TORMES\nAnónimo — 1554\n\nTRATADO PRIMERO\nCuenta Lázaro su vida y cuyo hijo fue\n\nPues sepa Vuestra Merced ante todas cosas que a mí llaman Lázaro de Tormes, hijo de Tomé González y de Antona Pérez, naturales de Tejares, aldea de Salamanca. Mi nacimiento fue dentro del río Tormes, por la cual causa tomé el sobrenombre; y fue desta manera: mi padre, que Dios perdone, tenía cargo de proveer una molienda de una aceña que está ribera de aquel río, en la cual fue molinero más de quince años.', nota: '' },
      { texto: 'Siendo yo niño de ocho años, achacaron a mi padre ciertas sangrías mal hechas en los costales de los que allí a moler venían, por lo cual fue preso, y confesó y no negó, y padeció persecución por justicia. Espero en Dios que está en la gloria, pues el Evangelio los llama bienaventurados. En este tiempo se hizo cierta armada contra moros, entre los cuales fue mi padre, que a la sazón estaba desterrado por el desastre ya dicho, con cargo de acemilero de un caballero que allá fue; y con su señor, como leal criado, fenecció su vida.', nota: '' },
      { texto: 'Mi viuda madre, como sin marido y sin abrigo se viese, determinó arrimarse a los buenos por ser uno dellos, y vínose a vivir a la ciudad y alquiló una casilla y metióse a guisar de comer a ciertos estudiantes, y lavaba la ropa a ciertos mozos de caballos del Comendador de la Magdalena, de manera que fue frecuentando las caballerizas.\n\nElla y un hombre moreno de aquellos que las bestias curaban vinieron en conocimiento. Éste algunas veces se venía a nuestra casa y se iba a la mañana; otras veces de día llegaba a la puerta en achaque de comprar huevos y entrábase en casa.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 300, fuente: 'precargado'
  },
  {
    id: 'pre_becquer',
    titulo: 'Rimas y Leyendas',
    autor: 'Gustavo Adolfo Bécquer',
    paginas: [
      { texto: 'RIMAS Y LEYENDAS\nGustavo Adolfo Bécquer\n\nRIMA I\n\nYo sé un himno gigante y extraño\nque anuncia en la noche del alma una aurora,\ny estas páginas son de ese himno\ncadencias que el aire dilata en las sombras.\n\nYo quisiera escribirle, del hombre\ndomando el rebelde, mezquino idioma,\ncon palabras que fuesen a un tiempo\nsuspiros y risas, colores y notas.\n\nPero en vano es luchar; que no hay cifra\ncapaz de encerrarlo, y apenas ¡oh hermosa!\nsi, teniendo en mis manos las tuyas,\npudiera, al oído, cantártelo a solas.', nota: '' },
      { texto: 'RIMA IV\n\nNo digáis que, agotado su tesoro,\nde asuntos falta, enmudeció la lira;\npodrá no haber poetas; pero siempre\nhabrá poesía.\n\nMientras las ondas de la luz al beso\npalpiten encendidas;\nmientras el sol las desgarradas nubes\nde fuego y oro vista;\nmientras el aire en su regazo lleve\nperfumes y armonías;\nmientras haya en el mundo primavera,\n¡habrá poesía!\n\nMientras la ciencia a descubrir no alcance\nlas fuentes de la vida,\ny en el mar o en el cielo haya un abismo\nque al cálculo resista;\nmientras la humanidad, siempre avanzando,\nno sepa a do camina;\nmientras haya un misterio para el hombre,\n¡habrá poesía!', nota: '' },
      { texto: 'LA LEYENDA DE LOS OJOS VERDES\n\nHace mucho tiempo que tenía ganas de escribir algo con este título. Hoy, que se me ha presentado ocasión, lo hago con placer. La razón es que nada me seduce como lo poético, lo indefinido, lo vago.\n\nFernando de Argensola halló, un día de verano, a orillas de un lago, a una mujer de inusitada belleza. Sus ojos eran de un color que Fernando nunca antes había visto: el color del agua profunda, verde, transparente, luminosa. La joven lo miró con una fijeza extraña, y una sonrisa apenas perceptible se dibujó en sus labios.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 310, fuente: 'precargado'
  },
  {
    id: 'pre_romeo',
    titulo: 'Romeo y Julieta',
    autor: 'William Shakespeare',
    paginas: [
      { texto: 'ROMEO Y JULIETA\nWilliam Shakespeare\nTraducción al español\n\nPRÓLOGO\n\nDos familias, iguales en dignidad,\nen la hermosa Verona donde situamos nuestra escena,\npor antiguo rencor vuelven a la lucha,\ntiñendo con sangre civil las manos de ciudadanos.\n\nDe las entrañas fatales de estos dos enemigos\nnacieron dos amantes marcados por las estrellas;\nsu desventurado y lamentable fin\nentierra con su muerte las querellas de sus padres.', nota: '' },
      { texto: 'ACTO PRIMERO — ESCENA PRIMERA\n\nUna plaza pública. Entran SANSÓN y GREGORIO armados con espadas y broqueles.\n\nSANSÓN.— Te digo, Gregorio, que no llevaremos la deshonra a cuestas.\nGREGORIO.— No; porque entonces la llevaríamos en las espaldas.\nSANSÓN.— Quiero decir que si nos hacen encolerizar, desenvainamos.\nGREGORIO.— Sí, sin duda, de eso se trata: movidos a la cólera, desenvainamos.\nSANSÓN.— Yo soy tan pronto a reñir como cualquier otro cuando se me provoca.\nGREGORIO.— Pero no eres tan pronto a ser provocado.', nota: '' },
      { texto: 'ACTO SEGUNDO — ESCENA SEGUNDA\nEl jardín de los Capuleto. Entra ROMEO.\n\nROMEO.— [Mirando hacia la ventana] ¿Qué luz es ésa que se abre paso por aquella ventana? Es el Oriente, y Julieta es el sol. ¡Alza, bello sol, y mata a la envidiosa luna, que ya está enferma y pálida de pesar porque tú, su doncella, la aventajas en hermosura!\n\nJULIETA aparece en el balcón.\n\nJULIETA.— ¡Ay de mí!\nROMEO.— Habla. ¡Oh! habla otra vez, ángel resplandeciente, porque esta noche apareces tan gloriosa sobre mi cabeza como un alado mensajero del cielo.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 320, fuente: 'precargado'
  },
  {
    id: 'pre_divina',
    titulo: 'La Divina Comedia',
    autor: 'Dante Alighieri',
    paginas: [
      { texto: 'LA DIVINA COMEDIA\nDante Alighieri\nTraducción al español\n\nINFIERNO — CANTO PRIMERO\n\nA la mitad del camino de nuestra vida\nme encontré en una selva oscura,\nporque la senda recta se había perdido.\n\n¡Ay, cuán difícil es describir\ncómo era aquella selva áspera y espesa\ncuyo recuerdo renueva el miedo!\n\nEs tan amargo que la muerte apenas lo es más;\npero para tratar del bien que allí encontré,\nhe de hablar de otras cosas que allí vi.', nota: '' },
      { texto: 'No sé decir bien cómo entré en ella,\ntan lleno estaba de sueño en aquel momento\nen que abandoné el verdadero camino.\n\nPero cuando llegué al pie de una colina\nen el lugar en que acababa aquel valle\nque me había helado el corazón de miedo,\nalcé los ojos y vi sus hombros\nvestidos ya con los rayos del planeta\nque guía a los hombres por todo camino recto.\n\nEntonces se calmó un poco el miedo\nque había durado en el lago de mi corazón\nla noche que pasé con tanta angustia.', nota: '' },
      { texto: 'CANTO TERCERO — LA PUERTA DEL INFIERNO\n\nPOR MÍ SE VA A LA CIUDAD DEL LLANTO,\nPOR MÍ SE VA AL DOLOR ETERNO,\nPOR MÍ SE VA HACIA LA GENTE PERDIDA.\n\nLa JUSTICIA movió a mi excelso HACEDOR;\nme hicieron la DIVINA POTESTAD,\nla SUMA SABIDURÍA y el PRIMER AMOR.\n\nAntes que yo no había cosas creadas\nsino eternas, y yo eterno duro.\n¡VOSOTROS QUE ENTRÁIS, ABANDONAD TODA ESPERANZA!\n\nMaestro, estas palabras son duras para mí —dije.\nY él, como hombre experimentado, me respondió:\nAquí conviene dejar todo recelo; conviene que aquí muera toda cobardía.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 300, fuente: 'precargado'
  },
  {
    id: 'pre_iliada',
    titulo: 'La Ilíada',
    autor: 'Homero',
    paginas: [
      { texto: 'LA ILÍADA\nHomero\nTraducción al español\n\nCANTO PRIMERO\n\nCanta, oh diosa, la cólera del Pelida Aquiles,\ncólera funesta que causó infinitos males a los aqueos\ny precipitó al Hades muchas almas valerosas de héroes,\ny a ellos mismos los hizo presa de perros\ny de toda clase de aves —y así se cumplía la voluntad de Zeus—\ndesde que se separaron disputando\nAtrida, rey de hombres, y el divino Aquiles.', nota: '' },
      { texto: '¿Cuál de los dioses los puso en esa discordia y querella?\nEl hijo de Leto y de Zeus. Pues indignado con el rey,\nsuscitó en el ejército una maligna epidemia\ny los hombres perecían, porque el Atrida había afrentado\na Crises, sacerdote de Apolo.\n\nEste había llegado a las veloces naves de los aqueos\na rescatar a su hija y traía un cuantioso rescate,\nostentatodo las insignias de Apolo el que hiere de lejos\nen el cetro de oro y la cinta sagrada,\ny suplicaba a todos los aqueos,\ny muy especialmente a los dos Atridas, jefes del pueblo.', nota: '' },
      { texto: 'Atridas y demás aqueos de hermosas grebas:\nos quieran los dioses que moran en los palacios del Olimpo\nconcederos destruir la ciudad de Príamo y regresar felizmente a casa;\npero liberad a mi hija y aceptad el rescate,\nrespetando al hijo de Zeus, Apolo el que hiere de lejos.\n\nEntonces todos los aqueos asintieron con aclamaciones,\nrespetando al sacerdote y aceptando el glorioso rescate.\nPero no fue del agrado del Atrida Agamenón,\nque lo despidió duramente y añadió graves palabras:\nNo te encuentre yo, anciano, junto a las cóncavas naves.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 290, fuente: 'precargado'
  },
  {
    id: 'pre_poe',
    titulo: 'Cuentos — Poe',
    autor: 'Edgar Allan Poe',
    paginas: [
      { texto: 'EL CORAZÓN DELATOR\nEdgar Allan Poe\nTraducción al español\n\n¡Es verdad! Soy nervioso, muy nervioso, terriblemente nervioso, y siempre lo he sido; pero ¿por qué afirmáis que estoy loco? La enfermedad había agudizado mis sentidos, no los había destruido, no los había embotado. Tenía el oído muy fino. Oía todas las cosas del cielo y de la tierra. Oía muchas cosas del infierno. ¿Cómo podía estar loco? Escuchad y observad con cuánta cordura, con qué tranquilidad puedo contaros toda la historia.', nota: '' },
      { texto: 'Es imposible decir cómo la idea entró primeramente en mi cerebro; pero, una vez concebida, me obsesionó noche y día. No había objeto. No había pasión. Amaba al viejo. Nunca me había hecho ningún mal. Nunca me había insultado. Su oro no me seducía. Creo que fue su ojo, ¡sí, era eso! Uno de sus ojos semejaba el de un buitre, un ojo pálido azulado con una película sobre él. Cada vez que se posaba sobre mí, se me helaba la sangre, y así, lentamente, gradualmente, se me fue metiendo en la cabeza la idea de quitarle la vida al viejo para librarme para siempre de aquel ojo.', nota: '' },
      { texto: 'LA MÁSCARA DE LA MUERTE ROJA\n\nLa Muerte Roja había devastado el país durante largo tiempo. Jamás pestilencia alguna fue tan fatal ni tan espantosa. La sangre era su sello distintivo y su emblema —el rojo y el horror de la sangre.\n\nSentíanse agudos dolores, un vértigo repentino y luego brotaba un sudor abundante por los poros, y de esto resultaba la disolución del ser. Las manchas escarlatas en el cuerpo, y especialmente en el rostro de la víctima, eran el bando que la ponía fuera del socorro y de la simpatía de sus semejantes.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 320, fuente: 'precargado'
  },
  {
    id: 'pre_zaratustra',
    titulo: 'Así habló Zaratustra',
    autor: 'Friedrich Nietzsche',
    paginas: [
      { texto: 'ASÍ HABLÓ ZARATUSTRA\nFriedrich Nietzsche\nTraducción al español\n\nDEL PRÓLOGO DE ZARATUSTRA\n\nCuando Zaratustra tenía treinta años, abandonó su tierra natal y el lago que era su patria y se fue a las montañas. Allí gozó de su espíritu y de su soledad durante diez años sin cansarse de ello. Pero al fin su corazón se transformó, y una mañana se levantó con la aurora, se puso delante del sol y le habló así:\n\n"¡Gran astro! ¿Qué sería de tu felicidad si no tuvieras a aquellos a quienes iluminas?"', nota: '' },
      { texto: '"He aquí que estoy harto de mi sabiduría, como la abeja que ha recogido demasiada miel; necesito manos que se extiendan hacia mí.\n\nQuisiera regalar y distribuir hasta que los sabios de entre los hombres hayan vuelto a gozarse en su locura y los pobres en su riqueza.\n\nPara ello debo descender a las profundidades: como lo haces tú al atardecer cuando te hundes detrás del mar y llevas tu luz incluso al mundo subterráneo, ¡astro exuberante!\n\nComo tú, debo declinar, como dicen los hombres a quienes quiero bajar."', nota: '' },
      { texto: 'DE LAS TRES TRANSFORMACIONES\n\nTres transformaciones del espíritu os menciono: cómo el espíritu se convierte en camello, el camello en león, y el león, por último, en niño.\n\nHay muchas cosas pesadas para el espíritu, para el espíritu fuerte y paciente en quien habita la veneración: su fortaleza ambiciona lo pesado, lo más pesado de todo.\n\n¿Qué es pesado? —así pregunta el espíritu paciente, y se arrodilla como el camello y quiere que lo carguen bien.\n\n¿Qué es lo más pesado, héroes? —así pregunta el espíritu paciente. Para que yo tome sobre mí esto y me regocije de mi fortaleza.', nota: '' },
    ],
    portada: null, creado: 'Clásico', ultimaPag: 0, marcadores: [], palabras: 300, fuente: 'precargado'
  },
];
