// creo il menu per i mobile
function creaMenu() {
	try {
		nodoPagina.setAttribute("class", "navigation");
		nodoMenu.setAttribute("class", "open");
		this.onclick = rimuoviMenu;

		window.addEventListener("resize", function() {
			if(this.innerWidth > 990) {
				rimuoviMenu();
			}
		});

	} catch (error) {
		alert("creaHamburgerMenu: " + error);
	}
}

// elimino il menu
function rimuoviMenu() {
	try {
		nodoPagina.setAttribute("class", "");
		nodoMenu.setAttribute("class", "");
		toggler.onclick = creaMenu;
	} catch (error) {
		alert("rimuoviMenu: " + error);
	}
}

var nodoPagina;
var nodoMenu;
var toggler;

function gestoreLoad() {
	try {
		nodoPagina = document.getElementsByTagName("body")[0];
		nodoMenu = document.getElementById("menu");
		toggler = document.getElementById("toggleMenu");

		toggler.onclick = creaMenu;
	} catch (error) {
		alert("load: " + error);
	}
}

window.addEventListener("load", gestoreLoad);
