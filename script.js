var categories ;
var trucs ;
var dictCategories = {} ;

function loading(){
    getCategories() ;
}

function getCategories(){
    var url = "https://cours-micros-services-js.anthonymedassi.repl.co/categories/";
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		categories = JSON.parse(this.responseText);
        chargerCategories() ;
    }
    xhttp.open("GET", url, true);
	xhttp.send();
}

function getTrucs(){
    var url = "https://cours-micros-services-js.anthonymedassi.repl.co/trucs/";
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		trucs = JSON.parse(this.responseText);
        chargerTrucs() ;
    }
    xhttp.open("GET", url, true);
	xhttp.send();
}


function chargerCategories(){
    for( var i=0 ; i<categories.length;i++){
		c = categories[i] ;
        dictCategories[c['code']] = c;
        tr = document.createElement("tr");
        tdCode = document.createElement("td");
		tdCode.textContent = c['code'];
        tdLibelle = document.createElement("td");
		tdLibelle.textContent = c['libelle'];
        button = document.createElement("button") ;
        button.textContent = "Filtrer" ;
        button.setAttribute("id",c['code'] );
        button.setAttribute("onclick","chargerTrucsFiltres(this)") ;
        tr.appendChild(tdCode) ;
        tr.appendChild(tdLibelle) ;
        tr.appendChild(button) ;
        table_categories_tbody.appendChild(tr) ;
        option = document.createElement("option") ;
        option.value = c['code'] ;
        option.textContent = c['libelle'] ;
        truc_categorie.appendChild(option) ;
	}
    getTrucs() ;
}


function chargerTrucs(){
    while( table_trucs_tbody.firstChild) {
        table_trucs_tbody.removeChild( table_trucs_tbody.firstChild);
    }
    for( var i=0 ; i<trucs.length;i++){
		t = trucs[i] ;
        tr = document.createElement("tr");
        tdCode = document.createElement("td");
		tdCode.textContent = t['code'];
        tdLibelle = document.createElement("td");
		tdLibelle.textContent = t['libelle'];
        tdLibelleCat = document.createElement("td");
		tdLibelleCat.textContent = dictCategories[t['categorie']]['libelle'];
        button = document.createElement("button") ;
        button.textContent = "Supprimer" ;
        button.setAttribute("id",t['code'] );
        button.setAttribute("onclick","deleteTruc(this)")
        tr.appendChild(tdCode) ;
        tr.appendChild(tdLibelle) ;
        tr.appendChild(tdLibelleCat) ;
        tr.appendChild(button) ;
        table_trucs_tbody.appendChild(tr) ;
	}
}

function chargerTrucsFiltres(button){
    codeCategorie = button.getAttribute("id") ;
    var url = "https://cours-micros-services-js.anthonymedassi.repl.co/trucs/"+codeCategorie;
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		trucs = JSON.parse(this.responseText);
        chargerTrucs() ;
    }
    xhttp.open("GET", url, true);
	xhttp.send();
}

function deleteTruc(button){
    codeTruc = button.getAttribute("id") ;
    var url = "https://cours-micros-services-js.anthonymedassi.repl.co/trucs/"+codeTruc;
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		getTrucs() ;
    }
    xhttp.open("DELETE", url, true);
	xhttp.send();
}

function clicAjouter(){
    l = truc_libelle.value ;
    c = truc_categorie.value ;
    var url = "https://cours-micros-services-js.anthonymedassi.repl.co/trucs/";
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		getTrucs() ;
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify({"libelle":l, "categorie":c}));
}


