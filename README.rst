=============================
votai-theme
=============================

.. image:: https://travis-ci.org/YoQuieroSaber/votai-theme.svg?branch=master
    :target: https://travis-ci.org/YoQuieroSaber/votai-theme

.. image:: https://coveralls.io/repos/YoQuieroSaber/votai-theme/badge.png?branch=master
    :target: https://coveralls.io/r/YoQuieroSaber/votai-theme?branch=master

Tema de la instnancia de Vota Inteligente para YoQuieroSaber Argentina, elecciones 2015. Incluye el juego de Yo Quiero Saber.


Features
--------

* Juego interactivo
* Da la cara
* Perfiles de todos los candidatos
* Múltiples elecciones simultáneas
* Funcionalidad de compartir en redes sociales con generación reducida de sombra (SocialSharePrivacy)
* Theme y juego responsive y compatible con la mayoría de dispositivos.

Releases
--------

El branch master incluye el código estable que está funcionando en www.yoquierosaber.org, además se realizan modificaciones de desarrollo en el branch dev.

Cada vez que se llega a un nivel estable con nuevas funciones, se realiza un nuevo release. Puede ver el último release en la página de releases
	https://github.com/YoQuieroSaber/votai-theme/releases

Relase del 15/ago/2015: 1.1.443
	https://github.com/YoQuieroSaber/votai-theme/releases/tag/1.1.443


Instalación
----------

Este tema funciona como un módulo de django utilizado por el votainteligente-portal-electoral.

Ante cualquier duda siga las instrucciones en:
	http://github.com/YoQuieroSaber/votainteligente-portal-electoral

Para instalar los requerimientos básicos:
	sudo apt-get install virtualenv virtualenvwrapper python git g++ 

Clone votainteligente somewhere in your system.
	git clone https://github.com/YoQuieroSaber/votainteligente-portal-electoral.git

Enter the installation directory
	cd votainteligente-portal-electoral

Create a virtual environment
	virtualenv votainteligente

Activate your virtual environment
	source votainteligente/bin/activate

Algunos de los módulos de python resultan difíciles de instalar, por favor verifique que funcionan pgmagick y Pillow antes de continuar.
	sudo apt-get install libgraphicsmagick++1-dev libgraphicsmagick++3 libboost-python-dev python-pgmagick python-dev libpython-dev libevent-dev graphicsmagick imagemagick libmagickcore-dev libmagickwand-dev

	pip install pgmagick

	pip install Pillow

Si recibe algún error, refiérase a la documentación de pgmagick http://pythonhosted.org/pgmagick/tutorial.html#installation

Una vez que esté instalado pgmagick y pillow, instale todos los requerimientos.

Install the requirements that votainteligente needs in the current virtualenvironment
	pip install -r requirements.txt

It might take some time to get all installed.

Create the database and tables.
	python manage.py syncdb

Update the tables with migrations
	python manage.py migrate


Asegúrese de que el theme en el archivo local_settings.py de votainteligente para que este funcione, ejemplo:
	vi votainteligente/local_settings.py

Contenido:
	THEME = 'votai_theme'

Hay muchas más opciones para personalizar en este archivo. Si lo desea puede solicitar un archivo local_settings completo. Otra cosa importante en este archivo es:
	DEBUG=False

Clone the theme in another directory
	cd ..
	
	git clone https://github.com/YoQuieroSaber/votai-theme.git

En entornos de desarrollo, será necesario ejecutar el siguiente comando para actualizar los cambios, asegurándose de estar en la carpeta del theme y con el virtualenv activado.
	cd votai-theme
	
	python setup.py install



Datos
-----

Los datos utilizados en la instancia de YoQuieroSaber están disponibles bajo licencia CC-BY-SA como un archivo JSON que se puede importar nuevamente.

URL de descarga:
	http://www.yoquierosaber.org/static/data/data-20150815.json

Comando para exportar datos
	./manage.py dumpdata --indent 4 candidator elections popolo votai_theme -o ../votai-theme/votai_theme/static/data/data-[FECHA].json

Comando para importar datos
	./manage.py loaddata data-20150815.json


Nota: Para importar los datos  https://github.com/YoQuieroSaber/votai-theme/issues/60


API
---

Está disponible una API REST en:
	http://www.yoquierosaber.org/api

Esta API provee acceso a diferentes objetos y es conformante con el standard Popolo.

Además se provee una API para el juego, que está disponible dentro de cada elección
	* http://www.yoquierosaber.org/theme/election/pre-candidato-a-presidente/media-naranja.json
	* http://www.yoquierosaber.org/theme/election/pre-candidato-a-gobenador-de-tucuman/media-naranja.json
	* http://www.yoquierosaber.org/theme/election/pre-candidato-a-gobenador-de-buenos-aires/media-naranja.json
	* http://www.yoquierosaber.org/theme/election/pre-candidato-a-gobenador-de-entre-rios/media-naranja.json
	* http://www.yoquierosaber.org/theme/election/pre-candidato-a-gobenador-de-san-juan/media-naranja.json


Estos datos están disponibles bajo licencia CC-BY-SA



Deploy
------

Configuración propuesta
* nginx como servidor web para elementos estáticos y cache
* nginx funciona como proxy a una aplicación python
* esta aplicación python es iniciada por supervisord
* el intérprete de python utilizado es uwsgi

Por favor revisar las configuraciones sugeridas para nginx, supervisor y autodeploy en el repositorio yqs-tools:
	https://github.com/YoQuieroSaber/yqs-tools


Para usarlo en un nuevo proyecto (que no sea vota inteligente), es necesario que el proyecto incluya el theme en los requerimientos e importarlo dentro del archivo .py que quiera utilizarlo.

    import votai-theme

El theme debe estar instalado en el mismo entorno virtual (virtualenv) que el votainteligente. Esto se realiza con el siguiente comando:

    pip install votai-theme


Bug reports
-----------
Cualquier problema que encuentre, por favor repórtelo en nuestra sección de issues
	http://github.com/yoquierosaber/votai-theme

Cualquier problema que encuentre con vota inteligente, por favor reportarlo en el repositorio correspondiente: 
	http://github.com/ciudadanointeligente/votainteligente-portal-electoral

