/** mainGame.js
* Esta es la funcionalidad principal del juego de YoQuieroSaber
* Authors: Juan Pablo Amato, Martín Szyszlican
* TODO:
* * Poner el selector en la elección actual en desktop
* * Poner un link al sitio completo en mobile cuando no es iframe
* * Ver qué pasa con las preguntas salteadas porque la categoría no tiene suficientes preguntas
* * Ver qué pasa que no se puede volver atrás después de haber llegado a resuFinal
*/

function showDetalle(eleNum){
	if ($(".detalle"+eleNum).is(':visible')) {
		$(".detalle"+eleNum).hide();
		$(".detalleButton"+eleNum).html("+");
	}else{
		$(".detalle"+eleNum).show();
		$(".detalleButton"+eleNum).html("-");
	}
};
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
var app = (function(){

	var elecciones = {};
	var eleccion = {};
	var categorias = {};
	var candidatos = {};
	var preguntas = [];
	var preguntaActual = {};

	var pregCount=0;
	var lastPreg;

	var MaxPreg=8;
	var valorPuntos = [100,66,33,0];

	var animando=false;

	var w=0;
	var h=0;
	var pregFS=0;
	var resuFS=0;
	var iniPadH=0.2;
	var gameTop=100;
	var tarjeH100=0;
	var tarjeFactor = 0.45;
	var tarjePadF = 0.05;
	var punSize=0;
	var factorDot=1.5;

	var sobreFondoH=0;
	var sobreFreDiff=0.4;
	var sobreF1HFact=0.592;
	var sobreF_CHFact=0.975;

	var urna1H=0;

	var cantOp=4;
	var opScroll = false;

	var puntajes = [];
	var punParcial = [];
	var punPreg = [];
	var fotos = [];

	var userRes = [];

	var barraH=20;

	var mobile=true;

	var correoUser = "";

	var esperando = false;
	var tar12FS = 4;
	var tar3FS = 2;

	var shareTxt = "#YoQuieroSaber";

	function puntajeCalc(userR){
		var cant = candidatos.length;
		for(var i=0;i<cant;i++){
			//se guarda el indice del candidato segun el orden de puntajes
			var cInd = puntajes[i][1];
			//se define el mismo indice para el puntaje parcial de esta pregunta
			punPreg[i][1]=cInd;

			var qresp = {};
			qresp = $.grep(candidatos[cInd]["positions"], function(e){ return e["question_id"] == preguntaActual["question_id"]; })[0];
			if(qresp!=null){
				//console.log(qresp);
				var ansId = qresp.answer_id;
				//console.log("A: "+ansId);
				qresp = $.grep(preguntaActual["answers"], function(e){ return e.answer_id == ansId; })[0];
				var candR = qresp.answer_value;
				//console.log("B: "+candR);

			if(Math.abs(userR-candR)==0){// Si no hay diferencia, ergo es igual, entonces el mayor puntaje
				puntajes[i][0]+=valorPuntos[0];
				punPreg[i][0]=valorPuntos[0];
				puntajes[i][2]++;
			}else if(Math.abs(userR-candR)==3){// Si la diferencia es la mayor posible, entonces el menor puntaje
				puntajes[i][0]+=valorPuntos[3];
				punPreg[i][0]=valorPuntos[3];
				puntajes[i][2]++;
			}else if(parseInt(userR*0.5)==parseInt(candR*0.5)){//Si no coincide exacto pero está en el mismo sentido, entonces el segundo mayor puntaje
				puntajes[i][0]+=valorPuntos[1];
				punPreg[i][0]=valorPuntos[1];
				puntajes[i][2]++;
			}else{//Finalmente, si no coincide el sentido, puede ser el tercer mejor puntaje o el cuarto y último
				if(Math.abs(userR-candR)==1){
					puntajes[i][0]+=valorPuntos[2];
					punPreg[i][0]=valorPuntos[2];
					puntajes[i][2]++;
				}else{
					puntajes[i][0]+=valorPuntos[3];
					punPreg[i][0]=valorPuntos[3];
					puntajes[i][2]++;
				}
			}
				punParcial[i][1]=cInd;
				punParcial[i][2]=puntajes[i][2];
				punParcial[i][0] = puntajes[i][0]/punParcial[i][2];
				//console.log("PunPar "+candidatos[cInd]["candidate_name"]+": "+punParcial[i]);
			}else{
				punParcial[i][1]=cInd;
				punParcial[i][2]=puntajes[i][2];
				if(punParcial[i][2]>0){
					punParcial[i][0] = puntajes[i][0]/punParcial[i][2];
				}else{
					punParcial[i][0] = -1;
				}
				punPreg[i][0]=-1;
				//console.log("PunPar "+candidatos[cInd]["candidate_name"]+": "+punParcial[i]);
			}

		}

		punParcial.sort(function(a, b){
			return b[0] - a[0];
		});
	}

	function ordenarAfinidad(){
		var aH = 0;
		if(mobile){
			aH = parseFloat($(".afiniImg").css("height"));
		}else{
			aH = parseFloat($(".afiniImg2").css("width"));
		}
		var cant = candidatos.length;
		var invMaxPunt = 1/(valorPuntos[0]);
		for(var i=0;i<cant;i++){
			var canInd = punParcial[i][1];
			//console.log("Puntaje "+(candidatos[canInd]["candidate_name"])+": "+(punParcial[i][0]));
			$(".cFoto"+i).attr("src",fotos[canInd].src);
			$(".cFoto"+i).attr("title",candidatos[canInd]["candidate_name"]);
			$(".cFoto"+i).css("background-color",candidatos[canInd]["candidate_color"]);
			var fW = 0;
			if(punParcial[i][2]>0){
				fW = (aH*0.5)+(aH*0.5)*(punParcial[i][0])*invMaxPunt;
				$(".cFoto"+i).css({
				    '-webkit-filter':'grayscale(0%)',
				    '-moz-filter': 'grayscale(0%)',
				    '-o-filter': 'grayscale(0%)',
				    '-ms-filter': 'grayscale(0%)'
				});
			}else{
				fW = (aH*0.5);
				$(".cFoto"+i).css({
				    '-webkit-filter':'grayscale(100%)',
				    '-moz-filter': 'grayscale(100%)',
				    '-o-filter': 'grayscale(100%)',
				    '-ms-filter': 'grayscale(100%)'
				});
			}
			$(".cFoto"+i).css("width",fW+"px");
			$(".cFoto"+i).css("height",fW+"px");
		}
	}



	function GetUrlValue(varsearch){
		var searchstring = window.location.search.substring(1)+"&"+window.location.hash;
		var variablearray = searchstring.split('&');
		for(var i = 0; i < variablearray.length; i++){
			var keyvaluepair = variablearray[i].split('=');
			if(keyvaluepair[0].replace("#","") == varsearch){
				return keyvaluepair[1];
			}
		}
	}


	function shuffle(categorias,norecursion) {
		var preguntas = [];

		//Ir por todas las categorias
		for (c in categorias) {
			categoria = categorias[c];
			for (q in categorias[c].questions) {
				var pregunta = categorias[c].questions[q];

				preguntasPasadasString = GetUrlValue("preguntasPasadas");
				if (preguntasPasadasString) {
					preguntasPasadas = JSON.parse(preguntasPasadasString);
				}
				else {
					preguntasPasadas = [];
				}

				//Si la pregunta no se usó en la partida anterior
				if (preguntasPasadas.indexOf(pregunta["question_id"]) == -1) {
					//Agregar la pregunta al array en orden lineal
					preguntas.push(pregunta);
				}
			}
		}
		if (preguntas.length < 2 && !norecursion) {
			alert("Vuelve a jugar con todas las preguntas.")
			location.hash = "";
			return shuffle(categorias,true);
		}

		//Ahora desordenar el array de preguntas
		var currentIndex = preguntas.length;
		var temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = preguntas[currentIndex];
			preguntas[currentIndex] = preguntas[randomIndex];
			preguntas[randomIndex] = temporaryValue;
		}
		console.log(preguntas);
		return preguntas;
	}

	function resizeFont(element){
		var fS = parseFloat(element.css("font-size"));
		var par = element.get(0);
		var count = 0;
		while (count<1000 && (par.offsetHeight <par.scrollHeight)){
			fS*=0.95;
			element.css("font-size",fS+"em");
			count++;
		}
	}

	function pregResize(){

		punSize = parseFloat($("#p7").css("height"));
		var dM = w<=480?w*0.001:w*0.02;
		$("#p"+pregCount).css("width",punSize*factorDot+"px");
		$("#p"+pregCount).css("height",punSize*factorDot+"px");

		$(".tPreg").css("font-size",pregFS+"em");
		resizeFont($(".tPreg"));

		tarjeH100 = tarjeFactor*parseFloat($("#tarjeta1").css("height"))/h;

		//console.log(w);
		$( "#vSi" ).css("width",(tarjeH100*h)+"px");
		$( "#vSi" ).css("height",(tarjeH100*h*0.9)+"px");
		$( "#vNo" ).css("width",(tarjeH100*h)+"px");
		$( "#vNo" ).css("height",(tarjeH100*h*0.9)+"px");

		$( "#vOp" ).css("width",(tarjeH100*h)+"px");
		$( "#vOp" ).css("height",(tarjeH100*h*0.9)+"px");


		tar3FS = tarjeH100*h*0.02;
		tar12FS = tarjeH100*h*0.04;
		$( "#vNo" ).css("font-size",tar12FS+"em");
		$( "#vSi" ).css("font-size",tar12FS+"em");

		$( "#vOp" ).css("font-size",tar3FS+"em");

		var tOpW = parseFloat($(".sCerrImg").css("width"))*0.9;

		var sFonH = parseFloat($(".sobreFondo2").children("img").css("height"));

		$(".sobreFondo2").children("img").css("height",sFonH+"px");
		$(".sobreFondo1").children("img").css("height",(sFonH*sobreF1HFact)+"px");
		$(".tapaCerrada").children("img").css("height",(sFonH*sobreF1HFact)+"px");
		$(".sobreFrente").children("img").css("height",(sFonH*sobreF_CHFact)+"px");
		$(".sobreCerrado").children("img").css("height",(sFonH*sobreF_CHFact)+"px");
		$(".sobreChicos").children("img").css("height",(sFonH*sobreF_CHFact)+"px");

		sobreFondoH = parseFloat($(".sobreFondo1").css("top"));
		var sFreT = sobreFreDiff*(sFonH+(sFonH*sobreF1HFact));
		$(".sobreFondo2").css("top",(sobreFondoH+(sFonH*sobreF1HFact))+"px");
		$(".tapaCerrada").css("top",(sobreFondoH+(sFonH*sobreF1HFact))+"px");
		$(".sobreFrente").css("top",(sobreFondoH+sFreT)+"px");
		$(".sobreChicos").css("top",(sobreFondoH+tOpW*0.1)+"px");
		$(".sobreCerrado").css("top",(sobreFondoH+sFreT)+"px");

		var sobW = parseFloat($(".urna1").children("img").css("width"))*0.9;

		$(".sobreFondo1").children("img").css("width",sobW+"px");
		$(".sobreFondo2").children("img").css("width",sobW+"px");
		$(".tapaCerrada").children("img").css("width",(sobW*0.95)+"px");
		$(".sobreFrente").children("img").css("width",sobW+"px");
		$(".sobreChicos").children("img").css("width",sobW+"px");
		$(".sobreCerrado").children("img").css("width",sobW+"px");

		$(".sobreFondo1").css("left","0px");
		$(".sobreFondo2").css("left","0px");
		$(".tapaCerrada").css("left","0px");
		$(".sobreFrente").css("left","0px");
		$(".sobreChicos").css("left","0px");
		$(".sobreCerrado").css("left","0px");


		urna1H = parseFloat($(".urna1").css("top"));
		var urna2Diff = parseFloat($(".urna1").css("height"));
		$(".urna2").css("top",(urna1H+urna2Diff)+"px");

		var u2H = parseFloat($(".afinidad").css("top"))-urna1H+urna2Diff;
		$(".urna2").css("height",u2H+"px");

		var puT=(sobreFondoH+sFreT+(sFonH*sobreF_CHFact));
		$(".pre-urna").css("top",puT+"px");
		$(".pre-urna").css("height",(urna1H+urna2Diff-puT)+"px");

		var oSet = w*0.25;
		var bSl = (w*0.5)+oSet;
		$( ".bSaltear#nav1" ).css("left",bSl+"px");


	}

	function opcionResize(){
		var pUW = $(".popupBg").width();
		$(".popupBg").css("left",(w*0.5-pUW*0.5)+"px");

		var bCl = parseFloat($(".popupBg").css("left"))+parseFloat($(".popupBg").css("width"))*0.825;
		$(".closeBtn").css("left",bCl+"px");
		$(".closeBtn").css("top",parseFloat($(".popupBg").css("height"))*0.035+"px");

		var opW = parseFloat($(".popupBg").css("width"))*0.75;
		$(".op1").css("width",opW+"px");
		$(".op2").css("width",opW+"px");
		$(".op3").css("width",opW+"px");
		$(".op4").css("width",opW+"px");

		var opL = (w*0.5)-opW*0.5;
		$(".op1").css("left",opL+"px");
		$(".op2").css("left",opL+"px");
		$(".op3").css("left",opL+"px");
		$(".op4").css("left",opL+"px");

		var opH = parseFloat($(".popupBg").css("height"))*0.18;
		$(".op1").css("height",opH+"px");
		$(".op2").css("height",opH+"px");
		$(".op3").css("height",opH+"px");
		$(".op4").css("height",opH+"px");

		$(".op1").css("top",(opH*0.6)+"px");
		$(".op2").css("top",((opH*0.6)+8+opH)+"px");
		$(".op3").css("top",((opH*0.6)+8+opH+8+opH)+"px");
		$(".op4").css("top",((opH*0.6)+8+opH+8+opH+8+opH)+"px");

		var opW = parseFloat($(".popupBg").css("width"))*0.75;
		$(".bOp1").css("width",opW+"px");
		$(".bOp2").css("width",opW+"px");
		$(".bOp3").css("width",opW+"px");
		$(".bOp4").css("width",opW+"px");

		var opL = (w*0.5)-opW*0.5;
		$(".bOp1").css("left",opL+"px");
		$(".bOp2").css("left",opL+"px");
		$(".bOp3").css("left",opL+"px");
		$(".bOp4").css("left",opL+"px");

		var opH = parseFloat($(".popupBg").css("height"))*0.18;
		$(".bOp1").css("height",opH+"px");
		$(".bOp2").css("height",opH+"px");
		$(".bOp3").css("height",opH+"px");
		$(".bOp4").css("height",opH+"px");

		$(".bOp1").css("top",(opH*0.6)+"px");
		$(".bOp2").css("top",((opH*0.6)+8+opH)+"px");
		$(".bOp3").css("top",((opH*0.6)+8+opH+8+opH)+"px");
		$(".bOp4").css("top",((opH*0.6)+8+opH+8+opH+8+opH)+"px");
	}

	function animaSobre(){
		var sH =parseFloat($(".sobreFondo1").css("height"));

		var offset = $(".sobreTapa").offset();
		var contOS = $(".sobreFondo1").offset()
		offset.top = offset.top-contOS.top;
		offset.left = offset.left-contOS.left;

		$(".sobreTapa").css("position","absolute");

		$(".sobreTapa").css("left",offset.left+"px");
		$(".sobreTapa").css("top",offset.top+"px");

		$( ".sobreTapa" ).tween({
			height:{
				start: sH,
				stop:0,
				time: 0,
				units: 'px',
				duration:0.25,
				effect:'easeInOut'
			},
			top:{
				start: 3,
				stop:sH,
				time: 0,
				units: 'px',
				duration: 0.25,
				effect:'easeInOut'
			},
			onStop: function( element ){
					$(".sobreTapa").css("position","relative");
					$(".sobreTapa").css("top","0px");
					$(".sobreTapa").css("left","0px");
					$(".sobreTapa").css("height",sH+"px");
					$(".sobreFondo1").hide();
					$(".sobreTapa2").show();
					$(".tapaCerrada").show();
				}
			});

		$( ".sobreTapa2" ).tween({
			height:{
				start: 0,
				stop:sH,
				time: 0.25,
				units: 'px',
				duration:0.25,
				effect:'easeInOut'
			},

			onStop: function( element ){
					$("#vSi").css("position","relative");
					$("#vSi").css("top","0px");
					$("#vSi").css("left","0px");
					$("#vSi").css("zIndex","1");
					$("#vNo").css("position","relative");
					$("#vNo").css("top","0px");
					$("#vNo").css("left","0px");
					$("#vNo").css("zIndex","1");
					$("#vSi").css("width","0px");
					$("#vSi").css("height","0px");
					$("#vNo").css("width","0px");
					$("#vNo").css("height","0px");
					$("#vSi").css("box-shadow","2px 2px 3px black");
					$("#vNo").css("box-shadow","2px 2px 3px black");
					$("#vNo").hide();
					$("#vSi").hide();
					$("#vOp").hide();
					$(".sobreFondo2").hide();
					$(".sobreFrente").hide();
					$(".sobreChicos").hide();
					$(".tapaCerrada").hide();
					$(".sobreCerrado").show();
					sobre2Urna();

				}
			});

		$.play();

	}
	function sobre2Urna(){
			var offset = $(".sCerrImg").offset();
			var contOS = $(".sobreCerrado").offset()
			offset.top = offset.top-contOS.top;
			offset.left = offset.left-contOS.left;

			$(".sCerrImg").css("position","absolute");

			var center =  (($("#game").width())*0.5)-($(".sCerrImg").width()*0.5);
			$(".sCerrImg").css("left",center+"px");
			$(".sCerrImg").css("top",offset.top+"px");

			$( ".sCerrImg" ).tween({
			top:{
				start: 0,
				stop:100,
				time: 0,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
			},
			onStop: function( element ){
					animando=false;
					$(".sobreFondo1").show();
					$(".sobreFondo2").show();
					$(".sobreFrente").show();
					$(".sobreChicos").show();
					$(".sobreCerrado").hide();
					pregResultIntermedio();
				}
			});
		$.play();
	}

	function animaSi(){
		if(!animando){
			animando=true;

			var offset = $("#vSi").offset();
			var contOS = $("#tarjeta1").offset()
			offset.top = offset.top-contOS.top;
			offset.left = offset.left-contOS.left;

			var offUrna = $(".sobreFrente").offset();
			offUrna.top = offUrna.top-contOS.top;

			$("#vSi").css("position","absolute");
			$("#vSi").css("zIndex","2");

			$("#vSi").css("left",offset.left+"px");
			$("#vSi").css("top",offset.top+"px");
			var center =  (($("#game").width())*0.5)-($("#vSi").width()*0.5);

			$(".sobreChicos").hide();
			$( "#vSi" ).tween({
				rotate:{
				start: 0,
				stop: 0,
				time: 0,
				duration: 0.5,
				effect:'easeInOut'
				},
				left:{
				start:offset.left,
				stop: center+h*tarjeH100*0.075,
				time: 0,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
				},
				fontSize:{
				start: tar12FS,
				stop: 2,
				time: 0,
				units: 'em',
				duration: 0.5,
				effect:'easeInOut'
				},
				width:{
				start: h*tarjeH100,
				stop: h*tarjeH100*0.75,
				time: 0,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
				},
				height:{
				start: h*tarjeH100*0.9,
				stop:h*tarjeH100*0.6,
				time: 0,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
				},
				top:{
				start: offset.top,
				stop: offUrna.top,
				time: 0,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
				},
				shadow:{
				      start: '2px 2px 3px black',
				      stop: '0px 0px 0px #000',
				      time: 0.5,
				      duration: 0.5,
				      effect:'easeInOut'
				},


				onStop: function( element ){
					animaSobre();
				}
			});
			$.play();
		}
	}

	function animaNo(){
	if(!animando){
			animando=true;
			/*var offset = $("#vNo").offset();
			offset.left =parseFloat($("#vNo").css("padding-left"));
			offset.top = parseFloat($("#tarjeta1").css("padding-top"));*/

			var offset = $("#vNo").offset();
			var contOS = $("#tarjeta2").offset()
			offset.top = offset.top-contOS.top;
			offset.left = offset.left-contOS.left;

			var offUrna = $(".sobreChicos").offset();
			offUrna.top = offUrna.top-contOS.top;

			var padL = parseFloat($("#tarjeta2").css("padding-right"));

			$("#vNo").css("position","absolute");

			$("#vNo").css("zIndex","2");

			$("#vNo").css("top",offset.top+"px");
			$("#vNo").css("left",offset.left+"px");
			var center =  $("#vNo").css("padding-left")+($("#vNo").width());

			$(".sobreChicos").hide();

			$( "#vNo" ).tween({
				rotate:{
					start: 0,
				stop: 0,
				time: 0,
				duration: 0.5,
				effect:'easeInOut'
				},
				left:{
				start:offset.left,
				stop: -(offset.left+h*tarjeH100*0.9-padL),
				time: 0,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
				},
				fontSize:{
				start: tar12FS,
				stop: 2,
				time: 0,
				units: 'em',
				duration: 0.5,
				effect:'easeInOut'
				},
				width:{
				start: h*tarjeH100,
				stop: h*tarjeH100*0.75,
				time: 0,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
				},
				height:{
				start: h*tarjeH100*0.9,
				stop:h*tarjeH100*0.6,
				time: 0,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
				},
				top:{
				start: offset.top,
				stop: offUrna.top+h*tarjeH100*0.35,
				time: 0,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
				},
				shadow:{
				      start: '2px 2px 3px black',
				      stop: '0px 0px 0px #000',
				      time: 0.5,
				      duration: 0.5,
				      effect:'easeInOut'
				},
				onStop: function( element ){
					animaSobre();
				}
			});
			$.play();
		}
	}

	function getRotDegrees(obj) {
		var matrix = obj.css("-webkit-transform") ||
		obj.css("-moz-transform")    ||
		obj.css("-ms-transform")     ||
		obj.css("-o-transform")      ||
		obj.css("transform");
		if(matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		} else {
			var angle = 0;
		}
		return (angle < 0) ? angle + 360 : angle;
	}

	function resetSacudir(){
		esperando=false;
		var rot = -5;
		$("#vSi").css({ 'transform': 'rotate(' + rot + 'deg)'});

		rot = 5;
		$("#vNo").css({ 'transform': 'rotate(' + rot + 'deg)'});

		rot = 0;
		$("#vOp").css({ 'transform': 'rotate(' + rot + 'deg)'});
	}

	function sacudir(element){
		var rot = 0;
		if(element.is('#vSi')){
			rot=-5;
		}else if(element.is('#vNo')){
			rot=5;
		}
		if(esperando){
			element.tween({
			rotate:{
				start: rot+5,
				stop:rot-5,
				time: 0.0,
				units: 'px',
				duration:0.2,
				effect:'easeInOut'
			}
			});
			element.tween({
			rotate:{
				start: rot-5,
				stop:rot+5,
				time: 0.2,
				units: 'px',
				duration:0.2,
				effect:'easeInOut'
			}
			});
			element.tween({
			rotate:{
				start: rot+5,
				stop:rot,
				time: 0.4,
				units: 'px',
				duration:0.2,
				effect:'easeInOut'
			},
			onStop: function(){
					if(esperando){
						setTimeout(function () {
							sacudir(element);
						}, 5000);
					}
				}
			});
		$.play();
		}
	}

	function nextQuest(){

		$(".message-accuracy").hide();

		$(".sobreFondo1").children("img").hide();
		$(".sobreChicos").hide();
		$(".sobreCerrado").hide()
		$(".tapaCerrada").show();
		$(".sobreTapa2").show();

		preguntaActual = preguntas[pregCount];

		preguntasPasadasString = GetUrlValue("preguntasPasadas");
		if (preguntasPasadasString) {
			preguntasPasadas = JSON.parse(preguntasPasadasString);
		}
		else {
			preguntasPasadas = [];
		}

		preguntasPasadas.push(preguntaActual["question_id"]);
		location.hash = "preguntasPasadas="+JSON.stringify(preguntasPasadas);
		console.log(preguntaActual,preguntasPasadas);

		// Escribe el texto de la siguiente pregunta
		$(".tPreg").html(preguntaActual["question_text"]);
		resizeFont($(".tPreg"));

		animando = true;

		if(pregCount>0){
			$(".bBack").css("visibility", "visible");
			var aH = 0;
			if(mobile){
				$(".afiniImg").show();
				$(".afiT .realAfinidad").show();
				aH = parseFloat($(".afiniImg").css("height"));
				$(".afinidad").scrollLeft(2.25*aH);
				$(".afinidad").css("overflow-x","auto");
			}else{
				$(".afiniSide").fadeIn();
				$(".afinidad2").scrollTop(0);
				aH = parseFloat($(".afiniImg2").css("width"));
				$(".afinidad").css("overflow-y","auto");
			}

			if(userRes[pregCount-1]>-1){
				ordenarAfinidad();
			}
		}else{
			$(".bBack").css("visibility", "hidden");
		}


		//#Anima los puntos que muestran por qué pregunta vas
		var pun = "#p"+pregCount;
		$( pun ).tween({
			width:{
				start: punSize,
				stop: punSize*factorDot,
				time: 0,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
			},
			height:{
				start: punSize,
				stop: punSize*factorDot,
				time: 0,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
			},
			borderRadius:{
				start: punSize,
				stop: punSize*factorDot,
				time: 0,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
			},
			backgroundColor:{
				start: '#fff',
				stop: '#444',
				time: 0,
				duration: 1,
				effect:'easeInOut'
			}
		});

		if(pregCount!=lastPreg){
			pun = "#p"+(lastPreg);
			if(lastPreg<pregCount){
				$( pun ).tween({
					width:{
						start: punSize*factorDot,
						stop: punSize,
						time: 0,
						units: 'px',
						duration: 1,
						effect:'easeInOut'
					},
					height:{
						start: punSize*factorDot,
						stop: punSize,
						time: 0,
						units: 'px',
						duration: 1,
						effect:'easeInOut'
					},
					borderRadius:{
						start: punSize*factorDot,
						stop: punSize,
						time: 0,
						units: 'px',
						duration: 1,
						effect:'easeInOut'
					}
				});
			}else{
				$( pun ).tween({
					width:{
						start: punSize*factorDot,
						stop: punSize,
						time: 0,
						units: 'px',
						duration: 1,
						effect:'easeInOut'
					},
					height:{
						start: punSize*factorDot,
						stop: punSize,
						time: 0,
						units: 'px',
						duration: 1,
						effect:'easeInOut'
					},
					borderRadius:{
						start: punSize*factorDot,
						stop: punSize,
						time: 0,
						units: 'px',
						duration: 1,
						effect:'easeInOut'
					},backgroundColor:{
						start: '#444',
						stop: '#fff',
						time: 0,
						duration: 1,
						effect:'easeInOut'
					}
				});
			}
		}

		var sH =tarjeH100*h*0.9*0.65*sobreF1HFact;
		$( ".sobreTapa2" ).css("height",sH+"px");

		$( ".sobreTapa2" ).tween({
			height:{
				start: sH,
				stop:0,
				time: 0.5,
				units: 'px',
				duration:0.5,
				effect:'easeInOut'
			},
			onStop: function( element ){
					$("#vSi").show();
					$("#vNo").show();
					$(".sobreChicos").show();
					$(".sobreFondo1").children("img").show();
					$(".sobreTapa2").hide();
				}
			});

		$(".sobreChicos").show();
		var tOpW = parseFloat($(".sCerrImg").css("width"))*0.9;

		$(".sobreChicos").css("top",((sobreFondoH+tOpW*0.1)+100)+"px");
		$(".sobreChicos").tween({
			top:{
				start: (sobreFondoH+tOpW*0.1)+100,
				stop: (sobreFondoH+tOpW*0.1),
				time: 0.5,
				units: 'px',
				duration: 1.0,
				effect:'easeInOut'
			}

		});

		$("#vOp").show();

		var offset = $("#vOp").offset();
		var contOS = $("#tarjeta3").offset()
		offset.top = offset.top-contOS.top;
		offset.left = offset.left-contOS.left;
		var halfW = ($("#vOp").width()*0.5);

		var center =  (($("#game").width())*0.5)-($("#vOp").width()*0.5);
		$("#vOp").css("width",0+"px");
		$("#vOp").css("height",0+"px");
		$("#vOp").css("position","absolute");
		$("#vOp").css("zIndex","2");
		$("#vOp").css("left",(offset.left+halfW)+"px");
		$("#vOp").css("top",(sobreFondoH)+"px");


		$("#vOp").tween({
			width:{
				start: 0,
				stop: h*tarjeH100,
				time: 0.5,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
			},
			height:{
				start: 0,
				stop: h*tarjeH100*0.9,
				time: 0.5,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
			},
			top:{
				start: sobreFondoH,
				stop: offset.top,
				time: 0.5,
				units: 'px',
				duration: 1,
				effect:'easeInOut'
			},
			left:{
				start: offset.left+halfW,
				stop: offset.left,
				time: 0.5,
				units: 'px',
				duration: 1,
				effect:'easeInOut'

			},
			fontSize:{
				start: 0,
				stop: tar3FS,
				time: 0.5,
				units: 'em',
				duration: 1,
				effect:'easeInOut'
			},
			onStop: function(){
				$( "#vOp" ).css("width",(tarjeH100*h)+"px");
				$( "#vOp" ).css("height",(tarjeH100*h*0.9)+"px");
				$( "#vOp" ).css("font-size",tar3FS+"em");
				$("#vOp").css("position","relative");
				$("#vOp").css("left","0px");
				$("#vOp").css("top","0px");
				$("#vOp").css("zIndex","1");
			}
		});


		var offsetSi = $("#vSi").offset();
		var contOSi = $("#tarjeta1").offset()
		offsetSi.top = offsetSi.top-contOSi.top;
		offsetSi.left = offsetSi.left-contOSi.left;
		var halfW = ($("#vSi").width()*0.5);

		$("#vSi").css("width",(h*tarjeH100)+"px");
		$("#vSi").css("height",(h*tarjeH100*0.9)+"px");
		$("#vSi").css("position","absolute");
		$("#vSi").css("left",center+"px");
		$("#vSi").css("top",offset.top+5+"px");

		// #Animación de aparición de las opciones de voto
		$( "#vSi" ).tween({
			top:{
				start: offset.top+5+h*tarjeH100*0.45,
				stop: offset.top+5,
				time: 0.9,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
			},
			left:{
				start: center,
				stop: 15,
				time: 0.9,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
			},

			fontSize:{
				start: 0,
				stop: tar12FS,
				time: 0.9,
				units: 'em',
				duration: 0.5,
				effect:'easeInOut'
			},
			rotate:{
				start: 1,
				stop: -5,
				time: 1.4,
				duration: 0.4,
				effect:'easeInOut'
			},
			onStop: function(){
				$("#vSi").css("position","relative");
				$("#vSi").css("zIndex","1");
				$("#vSi").css("left","0px");
				$("#vSi").css("top","0px");
			}
		});


		var offsetNo = $("#vNo").offset();
		var contONo = $("#tarjeta2").offset()
		offsetNo.top = offsetNo.top-contONo.top;
		offsetNo.left = offsetNo.left-contONo.left;
		var halfW = ($("#vNo").width()*0.5);

		$("#vNo").css("width",(h*tarjeH100)+"px");
		$("#vNo").css("height",(h*tarjeH100*0.9)+"px");
		$("#vNo").css("position","absolute");
		$("#vNo").css("left",($("#vNo").width()*-1.0)+"px");
		$("#vNo").css("top",offset.top+5+"px");

		// #Animación de aparición de las opciones de voto
		$( "#vNo" ).tween({
			top:{
				start: offset.top+5+h*tarjeH100*0.45,
				stop: offset.top+5,
				time: 0.9,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
			},
			left:{
				start: $("#vNo").width()*-1.0,
				stop: 15,
				time: 0.9,
				units: 'px',
				duration: 0.5,
				effect:'easeInOut'
			},

			fontSize:{
				start: 0,
				stop: tar12FS,
				time: 0.9,
				units: 'em',
				duration: 0.5,
				effect:'easeInOut'
			},
			rotate:{
				start: -1,
				stop: 5,
				time: 1.4,
				duration: 0.4,
				effect:'easeInOut'
			},

			onStop: function( element ){
				$("#vNo").css("position","relative");
				$("#vNo").css("zIndex","1");
				$("#vNo").css("left","0px");
				$("#vNo").css("top","0px");

				$( "#vOp" ).css("width",(tarjeH100*h)+"px");
				$( "#vOp" ).css("height",(tarjeH100*h*0.9)+"px");
				$( "#vOp" ).css("font-size",tar3FS+"em");
				$( "#vSi" ).css("width",(tarjeH100*h)+"px");
				$( "#vSi" ).css("height",(tarjeH100*h*0.9)+"px");
				$( "#vSi" ).css("font-size",tar12FS+"em");
				$( "#vNo" ).css("width",(tarjeH100*h)+"px");
				$( "#vNo" ).css("height",(tarjeH100*h*0.9)+"px");
				$( "#vNo" ).css("font-size",tar12FS+"em");

				esperando=true;
				setTimeout(function () {
					sacudir($("#vSi"));
				}, 2000);
				setTimeout(function () {
					sacudir($("#vNo"));
				}, 2100);
				setTimeout(function () {
					sacudir($("#vOp"));
				}, 2200);
				animando=false;
			}

		});

		$.play();
		setTimeout(function () {
			if(!animando){
				$( "#vOp" ).css("width",(tarjeH100*h)+"px");
				$( "#vOp" ).css("height",(tarjeH100*h*0.9)+"px");
				$( "#vOp" ).css("font-size",tar3FS+"em");
				$( "#vSi" ).css("width",(tarjeH100*h)+"px");
				$( "#vSi" ).css("height",(tarjeH100*h*0.9)+"px");
				$( "#vSi" ).css("font-size",tar12FS+"em");
				$( "#vNo" ).css("width",(tarjeH100*h)+"px");
				$( "#vNo" ).css("height",(tarjeH100*h*0.9)+"px");
				$( "#vNo" ).css("font-size",tar12FS+"em");
			}
		}, 4000);
	};

	function pregResultFinal() {
		app.currentSection = "resultFinal";
		console.log(pregCount,MaxPreg,pregCount>=MaxPreg);
		if(pregCount>=MaxPreg){
			$(".message-accuracy").hide();
		}
		else {
			$(".message-accuracy").show();
		}

		$(".preguntas").hide();
		$(".posturas").hide();
		$(".resuFooter").hide();
		setTimeout(function () {
	        $(".posturas").show();
			$(".resuFooter").show();
			$(".posturas").scrollTop(0);
			$(".resultados").show();
	 	}, 500);

			$(".pregResu").html("Resultado");
			$(".pregResu").css("font-size","3em");
			$(".pregResu").css("padding-top","5%");
			$(".posturasBG").css("text-align","right");
			$(".bResultados").hide();
			$(".bShare").show();
			$(".rejugar").show();
			$(".vuelve").hide();

			var cant = candidatos.length;
			var posBG="";


			var segundos = true;

			for(var i=0;i<cant;i++){

				var canInd = punParcial[i][1];
				//console.log("Pun Preg "+candidatos[canInd]["candidate_name"]+": "+punParcial[i]);

				if(punParcial[i][0]<0)punParcial[i][0]=0;

				if(i==0||punParcial[0][0]==punParcial[i][0]){
					posBG+="<div class='resuCand1'>";
					posBG+="<div class='resuIMG1'><img id='fCand' class='rFoto' style='margin-right:0px;background-color:"+candidatos[canInd]["candidate_color"]+";' src="+candidatos[canInd]["candidate_pic"]+" ></div>";
					posBG+="<div class='resuDatos1'>";
					posBG+="<div class='resuPor1'>"+parseInt(punParcial[i][0])+"%</div>";
					posBG+="<div class='resuNom1'>"+candidatos[canInd]["candidate_name"]+"<br/></div>";
					posBG+="<div class='resuBarra'><div class='barraLlena' style='width:"+parseInt(punParcial[i][0])+"%;background-color:"+candidatos[canInd]["candidate_color"]+";'>&nbsp;</div><div class='barraVacia' style='width:"+(100-parseInt(punParcial[i][0]))+"%;'>&nbsp;</div></div>";
					posBG+="</div>";
					posBG+="</div>";

					shareTxt+=parseInt(punParcial[i][0])+"% de afinidad con "+candidatos[canInd]["candidate_name"]+"\n\r";

				}else{
					if(segundos){
						posBG+="<br>";
						segundos=false;
						shareTxt+="&#191;Cuál es tu candidato?";
					}
					posBG+="<div class='resuCand2'>";
					posBG+="<div class='resuIMG2'><img id='fCand' class='rFoto' style='margin-right:0px;background-color:"+candidatos[canInd]["candidate_color"]+";' src="+candidatos[canInd]["candidate_pic"]+" ></div>";
					posBG+="<div class='resuDatos2'>";
					posBG+="<div class='resuNom2'>"+candidatos[canInd]["candidate_name"]+"<br/></div>";
					posBG+="<div class='resuBarra'><div class='barraLlena' style='width:"+parseInt(punParcial[i][0])+"%;background-color:"+candidatos[canInd]["candidate_color"]+";'>&nbsp;</div><div class='barraVacia' style='width:"+(100-parseInt(punParcial[i][0]))+"%;'>&nbsp;</div></div>";
					posBG+="<div class='resuPor2'>"+parseInt(punParcial[i][0])+"%</div>";
					posBG+="</div>";
					posBG+="</div>";
				}

			}
			$(".posturas").html(posBG);
			ordenarAfinidad();
	}

	// #Animación muestra el resultado a partir del voto elegido
	function pregResultIntermedio(){
		$(".preguntas").hide();
		$(".posturas").hide();
		$(".resuFooter").hide();

		$(".bResultados").hide();

		setTimeout(function () {
			$(".resultados").show();
	        $(".posturas").show();
			$(".posturas").scrollTop(0);
			$(".resuFooter").show();
	 	}, 500);


			$(".bShare").hide();
			$(".rejugar").hide();

			$(".pregResu").html(preguntas[pregCount]["question_text"]);
			$(".pregResu").css("font-size",resuFS);
			resizeFont($(".pregResu"));
			var cant = candidatos.length;
			var posBG="";
			punPreg.sort(function(a, b){
				return b[0] - a[0];
			});
			for(var i=0;i<cant;i++){
				var canInd = punPreg[i][1];
				//console.log("Pun Preg "+candidatos[canInd]["candidate_name"]+": "+punPreg[i]);
				if(i%2==0){
					var qresp = {};
					qresp = $.grep(candidatos[canInd]["positions"], function(e){ return e.question_id == preguntaActual["question_id"] })[0];
					if(qresp!=null){
						var candTxt = qresp.answer_text;
						var onclick = "";
						if(candTxt.length>1){
							candTxt = "<br><button type=button class='detalleButton"+canInd+"' style='margin-top:4px;border:none'>+</button><div class=detalle"+canInd+" style='display:none;'>"+candTxt+"</div>";
							onclick = " onclick='showDetalle("+canInd+")'"
						}
						posBG+="<div class='chatLeft'><div class='chatIMG'>";
						posBG+="<img id='fCand' class='rFoto' style='background-color:"+candidatos[canInd]["candidate_color"]+";' src="+candidatos[canInd]["candidate_pic"]+" ></div><div class='chatArrowLeft'>&nbsp;</div>";
						posBG+="<div class='chatBoxLeft'>";
						var ansId = qresp.answer_id;
						qresp = $.grep(preguntas[pregCount]["answers"], function(e){ return e.answer_id == ansId; })[0];
						var anTxt = qresp.answer_text;
						//console.log(qresp);
						//console.log("Texto: "+anTxt);
						var r = qresp.answer_value;
						if(r<2){
							posBG+="<div class='chatBoxHeader' id='chatSi'>";
						}else{
							posBG+="<div class='chatBoxHeader' id='chatNo'>";
						}
						posBG+="<h3 class=posNom"+i+" >"+candidatos[canInd]["candidate_name"]+" <span style='font-size:0.6em;vertical-align:middle;'>"+candidatos[canInd]["candidate_partido"]+"</span>"+ "</h3></div>";
						posBG+="<div class='chatBoxContent'><p class='postu postu-"+i+"' "+onclick+">"+anTxt+candTxt+"</p></div></div></div>";
					}else{
						posBG+="<div class='chatLeft'><div class='chatIMG'>";
						posBG+="<img id='fCand' class='rFoto' style='background-color:"+candidatos[canInd]["candidate_color"]+";-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-o-filter:grayscale(100%);-ms-filter:grayscale(100%);' src="+candidatos[canInd]["candidate_pic"]+" ></div><div class='chatArrowLeft'>&nbsp;</div><div class='chatBoxLeft'>";
						posBG+="<div class='chatBoxHeader' id='chatSR'>";
						posBG+="<h3 class=posNom"+i+" >"+candidatos[canInd]["candidate_name"]+" <span style='font-size:0.6em;vertical-align:middle;'>"+candidatos[canInd]["candidate_partido"]+"</span>"+ "</h3></div>";
						posBG+="<div class='chatBoxContent'><p class='postu postu-"+i+"'>"+"*El candidato no respondi\u00f3 esta pregunta"+"</p></div></div></div>";
					}
				}else{
					var qresp = {};
					qresp = $.grep(candidatos[canInd]["positions"], function(e){ return e.question_id == preguntaActual["question_id"]; })[0];
					if(qresp!=null){
						var candTxt = qresp.answer_text;
						var onclick = "";
						if(candTxt.length>1){
							candTxt = "<br><button type=button class='detalleButton"+canInd+"' style='margin-top:4px;border:none'>+</button><div class=detalle"+canInd+" style='display:none;'>"+candTxt+"</div>";
							onclick = "onclick='showDetalle("+canInd+")'";
						}
						posBG+="<div class='chatRight'><div class='chatPhotoRight'>";
						posBG+="<img id='fCand' class='rFoto' style='background-color:"+candidatos[canInd]["candidate_color"]+";' src="+candidatos[canInd]["candidate_pic"]+" ></div><div class='chatArrowRight'>&nbsp;</div>";
						posBG+="<div class='chatBoxRight'>";
						var ansId = qresp.answer_id;
						qresp = $.grep(preguntas[pregCount]["answers"], function(e){ return e.answer_id == ansId; })[0];
						var anTxt = qresp.answer_text;
						var r = qresp.answer_value;
						if(r<2){
							posBG+="<div class='chatBoxHeader' id='chatSi'>";
						}else{
							posBG+="<div class='chatBoxHeader' id='chatNo'>";
						}
						posBG+="<h3 class=posNom"+i+" >"+candidatos[canInd]["candidate_name"]+" <span style='font-size:0.6em;vertical-align:middle;'>"+candidatos[canInd]["candidate_partido"]+"</span>"+ " </h3></div>";
						posBG+="<div class='chatBoxContent'><p class='postu postu-"+i+"' "+onclick+">"+anTxt+candTxt+"</p></div></div></div>";
					}else{
						posBG+="<div class='chatRight'><div class='chatPhotoRight'>";
						posBG+="<img id='fCand' class='rFoto' style='background-color:"+candidatos[canInd]["candidate_color"]+";-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-o-filter:grayscale(100%);-ms-filter:grayscale(100%);' src="+candidatos[canInd]["candidate_pic"]+" ></div><div class='chatArrowRight'>&nbsp;</div><div class='chatBoxRight'>";
						posBG+="<div class='chatBoxHeader' id='chatSR'>";
						posBG+="<h3 class=posNom"+i+" >"+candidatos[canInd]["candidate_name"]+" <span style='font-size:0.6em;vertical-align:middle;'>"+candidatos[canInd]["candidate_partido"]+"</span>"+ " </h3></div>";
						posBG+="<div class='chatBoxContent'><p class='postu postu-"+i+"'>"+"*El candidato no respondi\u00f3 esta pregunta"+"</p></div></div></div>";
					}
				}
			}
			$(".posturas").html(posBG);
	}

	function openIntermedio(){
		$(".intermedio").show();
		$(".intermedio").tween({
			left:{
				start: -w,
				stop:0,
				time: 0,
				units: 'px',
				duration:1.0,
				effect:'easeInOut'
			}
		});
		$.play();
	}

	function closeIntermedio(){
		$(".intermedio").tween({
			left:{
				start: 0,
				stop:-w,
				time: 0,
				units: 'px',
				duration:1.0,
				effect:'easeInOut'
			},
			onStop: function( element ){
				$(".intermedio").hide();
				//console.log("closeInter");
				$(".afiniBio").removeClass("abierta");
			}
		});
		$.play();

	}


	function showAfinidad(candN){
		$("#about2").hide();
		$("#menuMob").hide();
		$(".afiniCand").show();

		openIntermedio();
		//console.log("Candidate Nr: "+candN);
		//console.log(fotos[candN].src);

		$(".afiniCImg").attr("src",fotos[candN].src);
		$(".afiniCImg").css("background-color",candidatos[candN]["candidate_color"]);
                $(".afiniCNom").html(candidatos[candN]["candidate_name"]+"<br/><span style='font-size:0.6em;vertical-align:middle;'>"+candidatos[candN]["candidate_partido"]+"</span>");

                $(".afiniBio").html(candidatos[candN]["candidate_bio"]);

		$(".afiniBio").off().click(function() {
			$(".afiniBio").toggleClass("abierta");
		})

		var isCoin = false;
		var isNCoin = false;
		var isNResp = false

		var htC = "";
		var htNC = "";
		var htNTR = "";

		for(var i=0;i<userRes.length;i++){
			if(userRes[i]>-1){
				var qTxt = preguntas[i]["question_text"];
				var qresp = {};
				qresp = $.grep(candidatos[candN]["positions"], function(e){ return e.question_id == preguntas[i]["question_id"]; })[0];
				if(qresp!=null){
					var ansId = qresp.answer_id;
					qresp = $.grep(preguntas[i]["answers"], function(e){ return e.answer_id == ansId; })[0];
					var anTxt = qresp.answer_text;
					//console.log(qresp);
					//console.log("Texto: "+anTxt);
					var resC = qresp.answer_value;

					if(parseInt(resC*0.5)==parseInt(userRes[i]*0.5)){
						if(!isCoin){
								$(".coincide").show();
								htC = "<div class='tit'>Coincide con vos:</div><br style='line-height:25px;'>";
								isCoin=true;
								//console.log("Coincide!");
						}
						if(parseInt(resC*0.5)==0){
							htC += "<div class='AfiniCV'>";
							htC+="<div class='afPTit'>"+qTxt+"</div>";
							htC += "<div class='afVot' id='afVSi'><span>Si</span></div>";
							htC+="<div class='afPreg'>"+anTxt+"</div>";
							htC+="</div>";
						}else if(parseInt(resC*0.5)==1){
							htC += "<div class='AfiniCV'>";
							htC+="<div class='afPTit'>"+qTxt+"</div>";
							htC += "<div class='afVot' id='afVNo'><span>No</span></div>";
							htC+="<div class='afPreg'>"+anTxt+"</div>";
							htC+="</div>";
						}
					}else{
						if(!isNCoin){
							$(".noCoincide").show();
							htNC = "<div class='tit';>No coincide con vos:</div><br style='line-height:25px;'>";
							isNCoin=true;
							//console.log("No Coincide!");
						}
						if(parseInt(resC*0.5)==0){
							htNC += "<div class='AfiniCV'>";
							htNC+="<div class='afPTit'>"+qTxt+"</div>";
							htNC += "<div class='afVot' id='afVSi'><span>Si</span></div>"
							htNC+="<div class='afPreg'>"+anTxt+"</div>";
							htNC+="</div>";
						}else if(parseInt(resC*0.5)==1){
							htNC += "<div class='AfiniCV'>";
							htNC+="<div class='afPTit'>"+qTxt+"</div>";
							htNC += "<div class='afVot' id='afVNo'><span>No</span></div>"
							htNC+="<div class='afPreg'>"+anTxt+"</div>";
							htNC+="</div>";
						}
					}
				}else{
					if(!isNResp){
							$(".coincide").show();
							htNTR = "<div class='tit';>No tiene respuesta:</div><br style='line-height:25px;'>";
							isNResp=true;
					}

					htNTR += "<div class='AfiniCV'>";
					htNTR+="<div class='afPTit'>"+qTxt+"</div>";
					htNTR+="</div>";
				}
			}
		}
		$(".coincide").html(htC);
		$(".noCoincide").html(htNC);
		$(".noResp").html(htNTR);
		$(".afiniCand").scrollTop(0);
		$("#about2").hide();
	}

function loadGame(){

	var url="/theme"+elecUrl+"/media-naranja.json";

	if (/theme\/election\/(.*)\//.test(location.href)) {
		election = /theme\/election\/([^\/]*)\//.exec(location.href)[1];
		url =  "/theme/election/"+election+"/media-naranja.json";
	}

	if (GetUrlValue("show_all_candidates")) {
		url+="?show_all_candidates="+GetUrlValue("show_all_candidates");
	}

					$.getJSON( url, function( data ) {
					eleccion = data;

					categorias = eleccion["categories"];
					candidatos = eleccion["candidates"];

					election_name = eleccion["election_name"];
					if (GetUrlValue("show_all_candidates") == "True") {
						election_name+=" (incluye pre-candidatos)";
					}

					$(".nElec,.election_name_content").html(election_name);
					//console.log(candidatos);

					var cant = candidatos.length;

					preguntas = shuffle(categorias);

					//Descomentar para desactivar el límite de preguntas
					//MaxPreg = preguntas.length;

					$(".dots.template").hide();
					for(var i=0;i<MaxPreg;i++) {
						var newDot = $(".dots.template").clone().removeClass("template").attr("id","p"+i).css("display","");
						$(".dots.template").parent().append(newDot);
					}


					var afCont="";
					var aH = parseFloat($(".afiniImg").css("height"));
					for(var i=0;i<cant;i++){
						fotos[i] = new Image(aH, aH);
						fotos[i].src=candidatos[i]["candidate_pic"];
						afCont+="<img id=fCand style='background-color:"+candidatos[i]["candidate_color"]+";' class=cFoto"+i+" width="+aH+"px height="+aH+"px"+" src="+candidatos[i]["candidate_pic"]+" >";
						puntajes[i]=[0,i,0];
						punParcial[i]=[0,i,0];
						punPreg[i]=[0,i];
					}

					if(aH*cant>$("#game").width()){
						$(".afiniImg").css("width",(aH*cant)+"px");
						var cl = 0.5*((aH*cant)-parseFloat($(".afinidad").css("width")));
						$(".afiniImg").css("left",-cl+"px");
					}

					$(".afiniImg").html(afCont);
					$(".afiniImg2").html(afCont);

					var mobile = $.browser.mobile;;

					//Ponerle una calse a incicio para que muestre una imagen de fondo
					//Hacer imagen de fondo
					$("#game").addClass("election_"+eleccion.election_id);
					$("#inicio").show().addClass("election_"+eleccion.election_id);
          $("#telon").hide();

					$("#game,.afiniSide").on("click","img#fCand",function(){
						for(var i=0;i<candidatos.length;i++){
							var f1 = $(this).attr("src").split("/");
							var f2 = fotos[i].src.split("/");
							if(f1[f1.length-1]==f2[f2.length-1]){
								showAfinidad(i);
								break;
							}
						}
					});



				});

	}

	function openOpt(){
		$(".opciones").show();
		$(".opciones").tween({
			top:{
				start: h,
				stop:h*0.3+10,
				time: 0,
				units: 'px',
				duration:1.0,
				effect:'easeInOut'
			}
		});
		$.play();
	}

	function closeOpt(){
		$(".opciones").tween({
			top:{
				start: h*0.3,
				stop:h,
				time: 0,
				units: 'px',
				duration:1.0,
				effect:'easeInOut'
			},
			onStop: function( element ){
				$(".opciones").hide();
			}
		});
		$.play();
	}

	function showOpt(){
		openOpt();

		//console.log("opciones");
		for(var i=0;i<cantOp;i++){

			$(".op"+(i+1)).html("<span>"+preguntas[pregCount]["answers"][i]["answer_text"]+"</span>");
			$(".op"+(i+1)).children("span").css("height",$(".op"+(i+1)).css("height"));
			if(!opScroll){
				var lH = parseFloat($(".op"+(i+1)).children("span").css("height"))*1.0;
				var fS = 20;
				$(".op"+(i+1)).children("span").css("line-height",lH+"px");
				//console.log(lH);
				var par = $(".op"+(i+1)).get(0);
				$(".op"+(i+1)).children("span").css("font-size",fS+"px");
				var count = 0;
				var fL=20;
				var begin = true;
				while (count<1000 && (par.offsetHeight <par.scrollHeight ||par.offsetWidth <par.scrollWidth)) {
					if(begin){
						lH = parseFloat($(".op"+(i+1)).children("span").css("height"))*0.5;
						begin=false;
					}
					if(fS>fL){
						fS-=1;
						$(".op"+(i+1)).children("span").css("font-size",fS+"px");
						//console.log("fs"+i+": "+fS);
					}else{
						lH=fS*1.25;
						fL*=0.95;
						$(".op"+(i+1)).children("span").css("line-height",lH+"px");
					}
					count++;
				}
			if(count>=1000){
				var lH = parseFloat($(".op"+(i+1)).children("span").css("height"));
				$(".op"+(i+1)).children("span").css("line-height",lH+"px");
						$(".op"+(i+1)).children("span").css("font-size",lH*0.5+"px");

					}
				}
			}
	}

	function encuesta(){
		$(".loading").hide();
		$(".preguntas").hide();
		$(".resultados").show();
		$(".posturas").hide();
		$(".message-accuracy").hide();
		$(".rejugar").show();
		$(".pregResu").css("font-size","2.0em");
		$(".pregResu").css("height","250px");
		$(".pregResu").html("<div style='width:100%;height:150px;'>&nbsp;</div>&#191;Te inform&#243; el juego?");
		$(".encSi").show();
		$(".encNo").show();
		$(".sigue").hide();
		$(".vuelve").hide();
		$(".bResultados").hide();
	}

	function getMail(){
		$(".pregResu").css("font-size","2.5em");
		$(".pregResu").css("height","30%");
		$(".pregResu").html("<div style='width:100%;height:50%;'>&nbsp;</div>&#161;Gracias!");
		// if () {
		// 	$(".posturas").show().html("<p><a href="">Más información sobre esta elección</a></p>");
		// }
		$(".pregResu").css("visibility", "hidden");
		$(".encSi").hide();
		$(".encNo").hide();
		$(".enviar").show();
		$(".correoU").show();

	}

	function resizeMobile(){
		mobile=true;
		$("header").hide();
		$(".footer").hide();
		$("#sideLeft").hide();
		$("#inicioD").hide();
		$(".afiniSide").hide();
		$(".bMenuH").show();
		$("#game").css("top","0px");
		$("#telon").css("top","0px");
		$("#inicio").css("top","0px");
		$(".afinidad").css("overflow-y","hidden");
		$("#homecontent").hide();
		if(pregCount>0){
			$(".afiT .realAfinidad").show();
			$(".afiniImg").show();
			$(".afinidad").css("overflow-x","auto");
		}
	}

	function resizeDesktop(){
		mobile=false;
		$("#homecontent").show();
		$("header").show();
		$(".footer").show();
		$("#sideLeft").show();
		$("#inicioD").hide();
		if(pregCount>0){
			$(".afiniSide").show();
			$(".afinidad").css("overflow-y","auto");
		}
		$(".bMenuH").hide();
		$(".afiT .realAfinidad").hide();
		$(".afiniImg").hide();
		$(".afinidad").css("overflow-x","hidden");
		$("#game").css("top",gameTop+"px");
		$("#telon").css("top",gameTop+"px");
		$("#inicio").css("top",gameTop+"px");
		var margR=parseFloat($("#sideLeft").css("margin-right"));
		if($(window).width()>960){
			$("#sideLeft").css("left",($(window).width()*0.5-parseFloat($("#game").css("width"))*0.5-parseFloat($("#sideLeft").css("width"))-margR)+"px");
			$(".afiniSide").css("margin-left",margR+"px");
		}else if($(window).width()>768){
			$("#sideLeft").css("width","150px")
			margR = margR*($(window).width()-768)/(960-768);
			$("#sideLeft").css("left",($(window).width()*0.5-parseFloat($("#game").css("width"))*0.5-parseFloat($("#sideLeft").css("width"))-margR)+"px");
			$(".afiniSide").css("margin-left",margR+"px");
		}
		$(".afiniSide").css("left",($(window).width()*0.5+parseFloat($("#game").css("width"))*0.5)+"px");
		$(".afiniSide").css("height",(0.9*$("#game").height())+"px");
	}

	return {//funcion de inicio de la aplicación
		init : function(){

			w = $("#game").width();
			h = $("#game").height();

			//console.log("mobile: "+$.browser.mobile);

			mobile = $.browser.mobile;

			if($(window).width()>768){
				mobile=false;
			}else {
				mobile=true;
			}

			if(GetUrlValue("frame"))mobile=true;

			gameTop = parseFloat($("#game").css("top"));
			$("#telon").css("top",gameTop+"px");
			$("#inicio").css("top",gameTop+"px");
			pregFS = parseFloat($(".tPreg").css("font-size"));
			resuFS = $(".pregResu").css("font-size");

			$("#game").css("left",($(window).width()*0.5-parseFloat($("#game").css("width"))*0.5)+"px");
			$("#telon").css("left",($(window).width()*0.5-parseFloat($("#telon").css("width"))*0.5)+"px");
			if(mobile){
				$("#game").css("top","0px");
				$("#telon").css("top","0px");
				$("#inicio").css("top","0px");
				$("header").hide();
				$(".footer").hide();
				$("#sideLeft").hide();
				$("#inicioD").hide();
				$(".afiniSide").hide();
				$("#homecontent").hide();
				if(pregCount>0){
					$(".afiT .realAfinidad").show();
				}
			}else{
				$("#inicioD").hide();
				$(".bMenuH").hide();
				$("#game").css("left",($(window).width()*0.5-parseFloat($("#game").css("width"))*0.5)+"px");
				$("#sideLeft").show();
				var margR=parseFloat($("#sideLeft").css("margin-right"));
				if($(window).width()>960){
					$("#sideLeft").css("left",($(window).width()*0.5-parseFloat($("#game").css("width"))*0.5-parseFloat($("#sideLeft").css("width"))-margR)+"px");
				}else{
					$("#sideLeft").css("width","150px")
					margR = margR*($(window).width()-768)/(960-768);
					$("#sideLeft").css("left",($(window).width()*0.5-parseFloat($("#game").css("width"))*0.5-parseFloat($("#sideLeft").css("width"))-margR)+"px");
					$(".afiniSide").css("margin-left",margR+"px");
				}
				$(".afiniSide").css("left",($(window).width()*0.5+parseFloat($("#game").css("width"))*0.5)+"px");
				$(".afiniSide").css("height",(0.9*$("#game").height())+"px");
				$(".afiniSide").hide();
			}

			// if(h<480)iniPadH=0.05;
			// $("#inicio").css("padding-top",h*iniPadH+"px");
			// $("#inicio").css("padding-bottom",h*iniPadH+"px");;


			// Listener por resize de la ventana
			window.addEventListener("resize", function() {

				w = $("#game").width();
				h = $("#game").height();

				if(h<480)iniPadH=0.05;
				$("#inicio").css("padding-top",h*iniPadH+"px");
				$("#inicio").css("padding-bottom",h*iniPadH+"px");

				$("#game").css("left",($(window).width()*0.5-parseFloat($("#game").css("width"))*0.5)+"px");
				$("#telon").css("left",($(window).width()*0.5-parseFloat($("#telon").css("width"))*0.5)+"px");


				if($(window).width()>768){
					resizeDesktop();
				}else{
					resizeMobile();
				}

				pregResize();
				$(".pregResu").css("font-size",resuFS);
				resizeFont($(".pregResu"));

			}, false);



			pregResize();

			var inicio = $("#inicio");
			var game = $("#game");

			$(".resultados").hide();
			game.hide();

			$(".intermedio").hide();
			$(".afinidad").css("background-color",$("#game").css("background-color"));
			$(".afiniImg").hide();
			$(".afiT .realAfinidad").hide();
			$(".opciones").hide();
			$("#vSi").hide();
			$("#vNo").hide();
			$("#vOp").hide();

			$(".encSi").click(function(){
				_gaq.push(['_setCustomVar',1,'Encuesta','si',1]);
				getMail();
			});

			$(".encNo").click(function(){
				_gaq.push(['_setCustomVar',1,'Encuesta','no',1]);
				getMail();
			});

			$(".enviar").click(function(){
				correoUser = $( "#inCorreo" ).val();
				_gaq.push(['_setCustomVar',2,'Email',correoUser,1]);
				$( ".correoU" ).hide();
				$(".pregResu").css("visibility", "visible");
				$(".enviar").hide();
				//console.log(correoUser);
			});

			$( "#inCorreo" ).change(function() {
  				correoUser = $( "#inCorreo" ).val();
				//console.log(correoUser);
			});

			$(".encSi").hide();
			$(".encNo").hide();
			$(".enviar").hide();
			$(".correoU").hide();
			$(".bShare").hide();
			$(".rejugar").hide();
			$(".share").hide();
			$(".about2").hide();

			$(".bMenuH").click(function(){
				$("#menuMob").show();
				$(".afiniCand").hide();
				openIntermedio();
			});

			$(".bShare").click(function(){
				$("#menuMob").hide();
				$(".afiniCand").hide();
				$(".about2").hide();
				$.fn.socialSharePrivacy.settings.title = "Jugu&#233; a YoQuieroSaber";
				$.fn.socialSharePrivacy.settings.description = shareTxt;
				$.fn.socialSharePrivacy.settings.body = shareTxt;
				$(".share").show();
				openIntermedio();
			});

			$(".bCompartir").click(function(){
				$.fn.socialSharePrivacy("option","title","Jugu&#233; a YoQuieroSaber");
				$.fn.socialSharePrivacy("option","description","shareTxt");
				$.fn.socialSharePrivacy("option","body","shareTxt");

				if(mobile){
					if($(".intermedio").is(':visible')){
						closeIntermedio();
						setTimeout(function () {
							$("#menuMob").hide();
							$(".afiniCand").hide();
							$(".about2").hide();
							$(".share").show();
							openIntermedio();
							console.log("compartir mobile")
						}, 1500);

					}else{
						$("#menuMob").hide();
						$(".afiniCand").hide();
						$(".about2").hide();
						$(".share").show();
						openIntermedio();
					}
				}else{
					$("#menuMob").hide();
					$(".afiniCand").hide();
					$(".about2").hide();
					$(".share").show();
					openIntermedio();
				}
			});

			$(".bNosotros").click(function(){
				if(mobile){
					if($(".intermedio").is(':visible')){
						closeIntermedio();
						setTimeout(function () {
							$("#menuMob").hide();
							$(".afiniCand").hide();
							$(".share").hide();
							$(".about2").show();
							openIntermedio();
							console.log("compartir mobile")
						}, 1500);

					}else{
						$("#menuMob").hide();
						$(".afiniCand").hide();
						$(".share").hide();
						$(".about2").show();
						openIntermedio();
					}
				}else{
					$("#menuMob").hide();
					$(".afiniCand").hide();
					$(".share").hide();
					$(".about2").show();
					openIntermedio();
				}
			});

			$(".rejugar").click(function(){
				rejugar=true;
				location.reload();
			});

			$(".sobreFrente").click(function() {
				showOpt();
			});
			$("#vOp").click(function() {
				if(!animando)showOpt();
			});

			$(".closeBtn").click(function() {
				resetSacudir();
				closeOpt();
			});

			$(".closeInter,.intermedio-gap").click(function() {
				resetSacudir();
				closeIntermedio();
			})


			$(".bSaltear").click(function() {
				if(!animando){
					resetSacudir();
					lastPreg = pregCount;
					pregCount++;
					console.log("saltear",pregCount,MaxPreg);
					if(pregCount>=MaxPreg){
						pregResultFinal();
					}
					else {
						nextQuest();
					}
					$("#vSi").hide();
					$("#vNo").hide();

				}
			});

			$(".bBack").click(function() {
				//console.log("saltear");
				if(!animando){
					resetSacudir();
					lastPreg = pregCount;
					pregCount--;
					if(pregCount<=0)pregCount=0;
					$("#vSi").hide();
					$("#vNo").hide();
					nextQuest();
				}
			});
			$(".bBack").css("visibility", "hidden");

			$(".bSaltear#nav2").click(function() {
				resetSacudir();
				closeOpt();
			});

			$(".bBack#nav2").click(function() {
				resetSacudir();
				closeOpt();
			});


			$(".sigue").click(function() {
				$(".tapaCerrada").show()
				$(".preguntas").show();
				pregResize();
				lastPreg = pregCount;
				pregCount++;

				if(app.currentSection=="resultFinal"){
					encuesta();
				}
				else if(pregCount>=MaxPreg){
					pregResultFinal();
				}else{
					nextQuest();
					$(".resultados").hide();
				}
			});

			$(".vuelve").click(function() {
				app.currentSection="preguntas"
				$(".tapaCerrada").show()
				$(".preguntas").show();
				pregResize();
				// lastPreg = pregCount;
				pregCount--;
				nextQuest();
				$(".resultados").hide();
			});

			$(".bResultados").click(function() {
				$(".tapaCerrada").show()
				$(".preguntas").show();
				pregResize();
				lastPreg = pregCount;
				pregCount++;
				pregResultFinal();
			});

			$(".bJugar").click(function() {
				jugar();
			});

			$(".bInicio").click(function() {
				$("#game").show();
				pregResize();
				nextQuest();
				$("#inicio").hide();

			});


			$("#vSi").click(function(){
				resetSacudir();
				userRes[pregCount] = 0;
				puntajeCalc(userRes[pregCount]);
				animaSi();
			});

			$("#vNo").click(function() {
				resetSacudir();
				userRes[pregCount] = 3;
				puntajeCalc(userRes[pregCount]);
				animaNo();
			});

			$(".bOp1").click(function() {
				resetSacudir();
				userRes[pregCount] = 0;
				puntajeCalc(userRes[pregCount]);
				$(".opciones").css("top",h+"px");
				$(".opciones").hide();
				animaSi();
			});
			//##
			$(".bOp2").click(function() {
				resetSacudir();
				userRes[pregCount] = 1;
				puntajeCalc(userRes[pregCount]);
				$(".opciones").css("top",h+"px");
				$(".opciones").hide();
				animaSi();
			});
			$(".bOp3").click(function() {
				resetSacudir();
				userRes[pregCount] = 2;
				puntajeCalc(userRes[pregCount]);
				$(".opciones").css("top",h+"px");
				$(".opciones").hide();
				animaNo();
			});
			$(".bOp4").click(function() {
				resetSacudir();
				userRes[pregCount] = 3;
				puntajeCalc(userRes[pregCount]);
				$(".opciones").css("top",h+"px");
				$(".opciones").hide();
				animaNo();
			});

			for(var i=0;i<MaxPreg;i++)userRes[i]=-1;

			loadGame();
		},

	stop : function(){

	},

	update : function(){

	},
	keyPressed : function(keyCode){
	},

	mousePos : function(mouseX,mouseY){
	}


	};

})();
var rejugar=true;
app.init();
$(window).bind('beforeunload', function(){
	if(!rejugar)
  return '\u00bfEst\u00e1s seguro de que quer\u00e9s abandonar el juego?\nPara volver atr\u00e1s en las preguntas pod\u00e9s usar las flechas que aparecen a ambos lados del sobre.';
});
