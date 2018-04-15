currentDrawPile = 0;

function cityCard (city, color, special, index, connected, innoculated){
	card = $("<div></div>")[0];
	card.city = city;
	card.color = color;
	card.special = special;
	card.index = index;
	card.connected = connected;
	card.innoculated = innoculated;
	
	if (!connected)           {card.stack = "inTheBox";}
		else if (innoculated) {card.stack = "box6";}
		else                  {card.stack = "drawPile0";}
	

	card.updatestack = function(){
		$(this).detach();
		if (!this.innoculated) {$("#" + this.stack).append(this)};
	}

	card.generateHTML = function(){
		this.innerHTML = "";
		$(this).append("<div class='cityName'>" + city + "</div>");
		if (gameSettings.boxSixOpen) {$(this).append("<div class='innoculateButton'>" + "\u26A0" + "</div>");}
		$(this).append("<div class='citySpecial'>" + special + "</div>")
		.addClass(color + "Card")
		.addClass("card");
	}

	card.reveal = function(){
		this.stack = "discardPile";
		update();
	}
	
	card.innoculate = function(){
		x = confirm("Really innoculate " + this.city + "?") 
		if (x){
			$(this).detach();
			this.innoculated = true;
			this.stack = box6;
		}
	}
	
	$(card).click(function(e){
		if ($(e.target).hasClass("innoculateButton")){
			this.innoculate();
		}
		else {
			this.reveal();
		}
	})
	
	
		
	card.generateHTML();

	return card;
}

initCityCards = [
{city:"Los Angeles",     color:"yellow",  innoculated: false, connected: false,  special: ""},
{city:"Denver",          color:"blue"  ,  innoculated: false, connected: false,  special: ""},
{city:"Denver",          color:"blue"  ,  innoculated: false, connected: false,  special: ""},
{city:"Khartoum",        color:"yellow",  innoculated: false, connected: false,  special: ""},
{city:"Dar es Salaam",   color:"yellow",  innoculated: false, connected: false,  special: ""},
{city:"Johannesburg",    color:"blue"  ,  innoculated: false, connected: false,  special: ""},
{city:"Antananarivo",    color:"black" ,  innoculated: false, connected: false,  special: ""},
{city:"Dar es Salaam",   color:"yellow",  innoculated: false, connected: false,  special: ""},
{city:"Johannesburg",    color:"blue"  ,  innoculated: false, connected: false,  special: ""},
{city:"Antananarivo",    color:"black" ,  innoculated: false, connected: false,  special: ""},
{city:"Santiago",        color:"yellow",  innoculated: true,  connected: true,   special: ""},
{city:"Cairo",           color:"black" ,  innoculated: true,  connected: true,   special: ""},
{city:"Cairo",           color:"black" ,  innoculated: true,  connected: true,   special: ""},
{city:"Mexico City",     color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Buenos Aires",    color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Buenos Aires",    color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Lima",            color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Bogota",          color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Bogota",          color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Kinshasa",        color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Lagos",           color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Jacksonville",    color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Sao Paulo",       color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Istanbul",        color:"black" ,  innoculated: false, connected: true,   special: ""},
{city:"Tripoli",         color:"black" ,  innoculated: false, connected: true,   special: ""},
{city:"Lagos",           color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Jacksonville",    color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Sao Paulo",       color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Istanbul",        color:"black" ,  innoculated: false, connected: true,   special: ""},
{city:"Tripoli",         color:"black" ,  innoculated: false, connected: true,   special: ""},
{city:"Lagos",           color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Jacksonville",    color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Sao Paulo",       color:"yellow",  innoculated: false, connected: true,   special: ""},
{city:"Istanbul",        color:"black" ,  innoculated: false, connected: true,   special: ""},
{city:"Tripoli",         color:"black" ,  innoculated: false, connected: true,   special: ""},
{city:"Cairo",           color:"black" ,  innoculated: false, connected: true,   special: ""},
{city:"Chicago",         color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"Chicago",         color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"London",          color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"London",          color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"London",          color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"San Francisco",   color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"San Francisco",   color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"Atlanta",         color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"Washington",      color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"New York",        color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"Washington",      color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"New York",        color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"Washington",      color:"blue"  ,  innoculated: false, connected: true,   special: ""},
{city:"New York",        color:"blue"  ,  innoculated: false, connected: true,   special: ""}
	];
	
initCityCards.sort(function (a, b) {
    if (a.color + a.city < b.color + b.city)
		return -1
	else 
		return 1
})
	
gameSettings = {
	boxSixOpen: true
}

cityCards = [];

cardIndex = 0;
$.each(initCityCards, function(){
	newCard = cityCard(this.city, this.color, this.special, this.cardIndex, this.connected, this.innoculated);
	cityCards.push(newCard);
	cardIndex++;
})

function update(){
	$.each(cityCards, function(){
		// Avoid constantly reordering, especially the discard pile. 
		if (this.parentElement == null){
			this.updatestack();
		}
		else if (this.parentElement.id != this.stack){
			this.updatestack();
		}
	});
	$.each($(".cardPile:not(#discardPile, #drawPile0)"), function(){
		if (!this.hasChildNodes()){
			this.remove();
		}
	});
	
}

function epidemic(){
	currentDrawPile++;
	$("#drawPiles")[0].prepend($("<div id='drawPile" + currentDrawPile + "' class='cardPile'></div>")[0]);
	$.each(cityCards, function(){
		if (this.stack == "discardPile"){
			this.stack = "drawPile" + currentDrawPile;
		}
	});
	update();
}
