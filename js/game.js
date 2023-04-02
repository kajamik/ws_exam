//
function creaSchermata() {
	try {
		nodoContainer = rimpiazzaNodo(nodoContainer, nodoRadice);

		// schermata di inizio
		var header = document.createElement("div");
		var logo = document.createElement("div");
		nodoPulsanti = document.createElement("div");
		var startQuiz = document.createElement("button");
		var results = document.createElement("button");
		var credits = document.createElement("button");

		nodoContainer.setAttribute("class", "quiz_container");
		header.setAttribute("class", "box-flex");
		logo.setAttribute("class", "quiz_header");

		nodoPulsanti.setAttribute("class", "quiz_body");

		updateTextNode(startQuiz, "Inizia Partita");
		updateTextNode(results, "Risultati");
		updateTextNode(credits, "Crediti");

		nodoContainer.appendChild(header);
		header.appendChild(logo);
		nodoContainer.appendChild(nodoPulsanti);
		nodoPulsanti.appendChild(startQuiz);
		nodoPulsanti.appendChild(results);
		nodoPulsanti.appendChild(credits);

		// click event
		startQuiz.onclick = generaQuiz;
		results.onclick = ottieniRisultati;
		credits.onclick = ottieniCrediti;

	}	catch (error) {
	 	alert("creaSchermata: " + error);
	}
}

// se esiste il nodo lo ripiazza, altrimenti lo crea
function rimpiazzaNodo(node, root) {
	try {
		var nuovoNodo = document.createElement("div");
		if(node) {
			root.replaceChild(nuovoNodo, node);
		} else {
			root.appendChild(nuovoNodo);
		}
		return nuovoNodo;
	} catch (error) {
		alert("rimpiazzaNodo: " + error);
	}
}

// click event
function ottieniRisultati() {
	try {
		nodoPulsanti = rimpiazzaNodo(nodoPulsanti, nodoContainer);

		var back = document.createElement("button");

		nodoPulsanti.setAttribute("class", "quiz_body");

		updateTextNode(back, "Ritorna al menu principale");

		nodoPulsanti.appendChild(back);

		if(risultati.length == 0) {
			var testo = document.createElement("p");
			updateTextNode(testo, "Non ci sono risultati salvati");
			nodoPulsanti.appendChild(testo);
		} else {
			var table = document.createElement("table");
			var tr = document.createElement("tr");
			var th = document.createElement("th");
			var th2 = document.createElement("th");
			tr.appendChild(th);
			tr.appendChild(th2);
			table.appendChild(tr);

			updateTextNode(th, "Nome");
			updateTextNode(th2, "Punteggio");

			for(var index in risultati) {
				var tr = document.createElement("tr");
				var row = document.createElement("td");
				var row2 = document.createElement("td");
				tr.appendChild(row);
				tr.appendChild(row2);
				table.appendChild(tr);
				table.appendChild(tr);

				updateTextNode(row, risultati[index].nome);
				updateTextNode(row2, risultati[index].punteggio);
			}

			nodoPulsanti.appendChild(table);

		}

		back.onclick = creaSchermata;

	} catch (error) {
		alert("ottieniRisultati: " + error);
	}
}

function ottieniCrediti() {
	try {
		nodoPulsanti = rimpiazzaNodo(nodoPulsanti, nodoContainer);

		var back = document.createElement("button");
		var testo1 = document.createElement("p");
		var testo2 = document.createElement("p");

		nodoPulsanti.setAttribute("class", "quiz_body");

		updateTextNode(back, "Ritorna al menu principale");
		updateTextNode(testo1, "Quiz creato da Pietro Paolo Carpentras");

		nodoPulsanti.appendChild(back);
		nodoPulsanti.appendChild(testo1);
		nodoPulsanti.appendChild(testo2);

		back.onclick = creaSchermata;

	} catch (error) {
		alert("ottieniRisultati: " + error);
	}
}

// inizializza le variabili del quiz e genera la domanda in modo casuale
function generaQuiz() {
	try {
		nodoContainer = rimpiazzaNodo(nodoContainer, nodoRadice);

		paused = false;
		currentTime = 0;
		time = 30; // in secondi

		if(stepQuiz == 1) {
			quiz = rimescola(quiz);
			punteggio = 0;
			numeroDomande = 5;
		}

		nodoNumeroDomanda = document.createElement("div");
		nodoTempo = document.createElement("div");

		nodoDomanda = document.createElement("div");
		nodoRisposta = document.createElement("div");

		nodoDomanda.className = "main_ask";
		nodoRisposta.className = "risposte";

		nodoContainer.setAttribute("class", "quiz_container");

		nodoContainer.appendChild(nodoNumeroDomanda);
		nodoContainer.appendChild(nodoTempo);

		nodoContainer.appendChild(nodoDomanda);
		nodoContainer.appendChild(nodoRisposta);

		generaDomanda();

		updateTextNode(nodoNumeroDomanda, "Domanda numero " + stepQuiz + " su " + numeroDomande);
		updateTextNode(nodoTempo, convertiSecondi(time));

		tempoLimite = setInterval(avanzaTempo, 1000);
	} catch (error) {
		alert("generaQuiz: " + error);
	}
}
//----------------------------

// crea un nodo figlio al nodo radice generando, in modo casuale, la domanda
function generaDomanda() {
	try {
		indice_domanda = stepQuiz - 1;
		updateTextNode(nodoDomanda, quiz[indice_domanda].domanda);
		var quest = quiz[indice_domanda].risposte[0];
		quiz[indice_domanda].risposte = rimescola(quiz[indice_domanda].risposte);
		for(var i = 0; i < quiz[indice_domanda].risposte.length; i++) {
			generaRisposte(i);
		}
		marcatore = quiz[indice_domanda].risposte.indexOf(quest);
	} catch (error) {
		alert("generaDomanda: " + error);
	}
}

// crea un nuovo nodo figlio al nodo radice generando, in modo casuale, le risposte associate alla domanda
function generaRisposte(i) {
	try {
		var risposta = document.createElement("button");
		updateTextNode(risposta, String.fromCharCode(i+65) + ") " + quiz[indice_domanda].risposte[i]);

		risposta.onclick = verificaRisposta;

		nodoRisposta.appendChild(risposta);
	}	catch (error) {
		alert("generaRisposte: " + error);
	}
}

// effettua il countdown ad ogni domanda
function avanzaTempo() {
	try {
		if(time > 0) {
			time--;
			updateTextNode(nodoTempo.childNodes[0], convertiSecondi(time));
		} else {
			clearInterval(tempoLimite);
			paused = true;
			setTimeout(creaFinestra, 1370);
		}
	} catch (error) {
		alert("avanzaTempo: " + error);
	}
}

//-----------------------------------

//
function verificaRisposta() {
	try {
		if(!paused) {
			paused = true;
			var _call = [].indexOf.call(event.target.parentNode.children, event.target);
			if(_call == marcatore) {
				event.target.className += " correct";
				punteggio += 1;
			} else {
				event.target.className += " wrong";
			}
			clearInterval(tempoLimite);
			paused = true;
			setTimeout(creaFinestra, 500);
		}
	}	catch (error) {
		alert("verificaRisposta: " + error);
	}
}

function terminaQuiz() {
	try {
		clearInterval(tempoLimite);
		paused = true;
		stepQuiz = 1;

		var arr = {
								nome: "Giocatore " + (risultati.length + 1),
								punteggio: punteggio
							};

		risultati.push(arr);
		creaSchermata();
	} catch (error) {
		alert("terminaQuiz: " + error);
	}
}

function creaFinestra() {
	try {
		var win = document.createElement("div");
		var p = document.createElement("p");
		var prossima_domanda = document.createElement("button");

		win.setAttribute('class','window');

		if(stepQuiz == numeroDomande) {
			var pt = document.createElement("p");
			win.appendChild(pt);
			updateTextNode(pt, "Hai totalizzato " + punteggio + " punti");
			updateTextNode(p, "Il tuoi risultati sono stati salvati. Vai su Risultati per vedere la classifica.");
			updateTextNode(prossima_domanda, "Termina quiz");
			prossima_domanda.onclick = terminaQuiz;
		} else {
			stepQuiz++;
			updateTextNode(p, "Clicca sul pulsante per proseguire con le domande");
			updateTextNode(prossima_domanda, "Prossima domanda");
			prossima_domanda.onclick = generaQuiz;
		}

		win.appendChild(p);
		win.appendChild(prossima_domanda);
		nodoRisposta.appendChild(win);

	} catch (error) {
		alert("creaFinestra: " + error);
	}
}

// Variabili
var quiz = [
	{
		"domanda": "Chi tra queste persone non fu uno dei primi pensatori del socialismo?",
		"risposte": [
			"Karl Marx", "Charles Fourier", "Robert Owen", "Ferdinand Lassalle"
		],
	},{
		"domanda": "In che anno è nato Giacomo Matteotti?",
		"risposte": [
			"22 maggio 1885", "26 novembre 1857", "5 maggio 1818", "25 giugno 1903"
		]
	},{
		"domanda": "In che data fu assassinato Giacomo Matteotti?",
		"risposte": [
			"10 giugno 1924", "5 giugno 1924", "10 giugno 1923", "1 luglio 1924"
		]
	},{
		"domanda": "Chi fu Charles Fourier?",
		"risposte": [
			"Un filosofo", "Uno scrittore", "Un politico", "Un capitalista"
		]
	},{
		"domanda": "Cos'è il socialismo?",
		"risposte": [
			"E' un ampio complesso di ideologie, orientamenti politici, movimenti e dottrine che tendono a una trasformazione della società in direzione dell'uguaglianza", "E' un ampio complesso di ideologie, orientamenti politici, movimenti e dottrine che tendono a sopprimere la società", "E' un ampio complesso di ideologie, orientamenti politici, movimenti e dottrine che tendono a una trasformazione della società in direzione della disparità", "E' un ampio complesso di ideologie, orientamenti politici, movimenti e dottrine che tendono a una trasformazione della società in direzione del capitalismo"
		]
	},{
		"domanda": "Che s'intende per Compagno?",
		"risposte": [
			"Colui che cerca la propria realizzazione attraverso un progetto comune di tipo solidale e collettivistico", "Colui che cerca di raggiungere i propri obbiettivi", "Colui che aspira a diventare un grande leader", "Colui che agisce per il proprio ideale"
		]
	},{
		"domanda": "Cos'è la socialdemocrazia?",
		"risposte": [
			"E' quell'insieme di movimenti socialisti che accettano il concetto di economia di mercato, di proprietà privata e il muoversi all'interno delle istituzioni liberali", "E' quell'insieme di movimenti socialisti che non accettano il concetto di economia di mercato, di proprietà privata e il muoversi all'interno delle istituzioni liberali", "E' quell'insieme di movimenti socialisti che vogliono la totale abolizione della proprietà privata", "E' un ampio complesso di ideologie, orientamenti politici, movimenti e dottrine che tendono a una trasformazione della società in direzione dell'uguaglianza"
		]
	}
];

var currentTime;
var time;
var paused;
var tempoLimite; // interval
var difficolta;
var stepQuiz;
// principale
var nodoRadice;
var nodoContainer;
var nodoPulsanti;

// toolbar
var nodoNumeroDomanda;
var nodoNumeroDomandaCorrette;
var nodoTempo;
// quiz
var numeroDomande;
var indice_domanda;
var marcatore;
var nodoDomanda;
var nodoRisposta;

var risultati;
var domandeCorrette;
var punteggio;

// Main
function load() {
	try {
		paused = true;
		risultati = new Array();
		stepQuiz = 1;
		marcatore = -1; // indice della risposta esatta

		nodoRadice = document.getElementById("quiz");

		creaSchermata();
	} catch (error) {
		alert("load: " + error);
	}
}

window.onload = load;

// ricrea in modo casuale l'array
function rimescola(A) {

	var indice = A.length - 1;

	while(indice > 0) {
		var rand = Math.round( Math.random() * indice );

		var temp = A[indice];
		A[indice] = A[rand];
		A[rand] = temp;

		indice--;
	}

	return A;
}

// modifico il valore di un nodo
function updateTextNode(node, string) {
	try {
		var value;
		if(node.nodeValue != null) {
			node.nodeValue = string;
		} else {
			value = document.createTextNode(string);
			node.appendChild(value);
		}
	} catch (error) {
		alert("updateTextNode: " + error);
	}
}

// converte i secondi in minuti
function convertiSecondi(time) {

	var minuti = Math.floor(time / 60);
	var secondi = time % 60;

	if(minuti < 10) {
		minuti = "0" + minuti;
	}
	if(secondi < 10) {
		secondi = "0" + secondi;
	}

	return minuti + ":" + secondi;
}
