$(document).ready(function (){
	contentInit();

	$("nav .menu").on("mouseenter", function(){
		$(this).children("ul").show("blind",160);
	}).on("mouseleave", function(){
		$(this).children("ul").hide("blind","slow");
	});
	$("nav").on("mouseleave", function(){
		$(this).children().children("ul").hide("blind");
	});

	$(".clan a").on("click", function(){
		var id = $(this).attr("id");
		if (id) setMemberlist(id);
	});

	$(".stat a").on("click", function(){
		var id = $(this).attr("id");
		var type = $(this).parent().parent().siblings("a").html();
		if (id){
			if (type=="Skills")
				createTable(id,true);
			else if (type=="Minigames")
				createTable(id,false)
		}
	});

	setMemberlist("eoc-playfun");

});

function contentInit(){
	if ($("footer"))
		$(this).html("&copy;&nbsp;ZETTCA 2014");
}

String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function setMemberlist(ml){
	var ml = ml.replace("-","/").replace("_","/");
	$.ajax({
		async: false,
		type: "POST",
		url: "json/"+ml+".json",
		dataType: "json",
		success: function (json){
			console.log("opening file json/"+ml+".json");
			JSONE = json;
			createTable("overall",true);
		},
	});
}

function createTable(stat, isSkill){
	var x = 0;
	var json = JSONE.slice();
	var statName = stat.replace(/_/g, " ").capitalize();

	if (!json[0][stat])
		throw (stat+" isn't a valid stat.");

	json.sort(function(p1,p2){ if (parseInt(p1[stat].rank)<1) return 1; if (parseInt(p2[stat].rank)<1) return -1; return parseInt(p1[stat].rank)-parseInt(p2[stat].rank); });
	
	$("#tableHiscores tbody").html("");
	$.each(json, function (i, player){
		var cellAvatar = '<td><img src="http://services.runescape.com/m=avatar-rs/'+player.rsn+'/chat.png" alt=""></td>';
		var cellRSN = '<td><a class="rsn" title="'+player.rsn+'">'+player.rsn+'</a></td>';
		var cellCombat = '<td>'+getCombat(player)+'</td>';
		if (isSkill){
			var cellStatLevel = '<td title="'+getLevel(player[stat].exp)+'">'+player[stat].level+'</td>';
			var cellStatExp = "<td>"+player[stat].exp+"</td>";
			var rowContent = "<tr><td>"+(i+1)+"</td>"+cellAvatar+cellRSN+cellCombat+cellStatLevel+cellStatExp+"</tr>";
		}
		else{
			var cellStatRank = "<td></td>";
			var cellStatScore = "<td>"+player[stat].score+"</td>";
			var rowContent = "<tr><td>"+(i+1)+"</td>"+cellAvatar+cellRSN+cellCombat+cellStatScore+"</tr>";
		}
		if ((isSkill && player[stat].level>1) || player[stat].rank > 0){
			$("#tableHiscores tbody").append(rowContent);
			x++;
		}


	});

	var rowHeadSkill = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">'+statName+'</th><th>Combat</th><th>Level</th><th>Experience</th></tr>';
	var rowHeadMG = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">'+statName+'</th><th>Combat</th><th>Score</th></tr>';
	var rowInvalid = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">There are no members to display</th></tr>';
	$("#tableHiscores thead").html((x>0) ? ((isSkill) ? rowHeadSkill : rowHeadMG) : rowInvalid);

	handlePlayerStats();
}

function getLevel(exp){
	var xp=0;
	if (exp<0 || exp>200000000) return -1;

	for (var lvl=1;lvl<127;lvl++){
		xp += Math.floor(lvl + 300 * Math.pow(2, lvl / 7.));
		if (Math.floor(xp/4) > exp) return lvl; 
	}
}

function getCombat(player){
	var cmb = player.defence.level + player.constitution.level + (player.prayer.level/2) + 1.3 * Math.max(player.attack.level+player.strength.level,1.5*player.magic.level,1.5*player.ranged.level);
	return parseInt(cmb/4);
}



function handlePlayerStats(){
	$(".rsn").click(function (){
		console.log("ToDo");
	});
}

function queryString(){
	var QS = new Object();
	var qe = location.href.split("?")[1].split("&");
	qe.forEach(function(el, i){
		x = el.split("=");
		QS[x[0]] = x[1];
	});
	return QS;
}

function spaceNumber(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}