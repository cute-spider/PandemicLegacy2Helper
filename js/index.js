

currentDrawPile = 0;

function cityCard (city, color, special){
	card = $("<div></div>")[0];
	card.city = city;
	card.color = color;
	card.special = special;
	card.location = "drawPile0";

	card.updateLocation = function(){
		$(this).detach();
		this.generateHTML();
		$("#" + this.location).append(this);
	}

	card.generateHTML = function(){
		this.innerHTML = "";
		$(this).append(city)
		.addClass(color + "Card")
		.addClass("card");
	}

	card.reveal = function(){
		this.location = "discardPile";
		update();

	}
	
	$(card).click(function(){
		this.reveal();
	})

	return card;
}

initCityCards = [
	{city: "London",              color: "blue",       special: 0},
	{city: "London",              color: "blue",       special: 0},
	{city: "London",              color: "blue",       special: 0},
	{city: "New York",            color: "blue",       special: 0},
	{city: "New York",            color: "blue",       special: "fortified"},
	{city: "New York",            color: "blue",       special: 0},
	{city: "Jacksonville",        color: "yellow",     special: 0},
	{city: "Jacksonville",        color: "yellow",     special: 0},
	{city: "Jacksonville",        color: "yellow",     special: 0},
	{city: "Istambul",            color: "black",      special: 0},
	{city: "Istambul",            color: "black",      special: 0},
	{city: "Istambul",            color: "black",      special: 0},
	{city: "Atlanta",             color: "blue",       special: 0},
	{city: "Washington",          color: "blue",       special: 0},
	{city: "Washington",          color: "blue",       special: 0},
	{city: "Washington",          color: "blue",       special: 0},
	{city: "Sao Paulo",           color: "yellow",     special: 0},
	{city: "Sao Paulo",           color: "yellow",     special: 0},
	{city: "Sao Paulo",           color: "yellow",     special: 0}
	]

	cityCards = [];
	
	$.each(initCityCards, function(){
		newCard = cityCard(this.city, this.color, this.special);
		cityCards.push(newCard);
	})

function update(){
	$.each(cityCards, function(){
		this.updateLocation();
	});
	
}

function epidemic(){
	currentDrawPile++;
	$("#cardPiles")[0].prepend($("<div id='drawPile" + currentDrawPile + "' class='cardPile'></div>")[0]);
	$.each(cityCards, function(){
		if (this.location == "discardPile"){
			this.location = "drawPile" + currentDrawPile;
		}
	});
	update();
}