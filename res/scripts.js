$(document).ready(function(){
	setMemberlist("playfun", "eoc");
	$("#tableHiscores").width(($(window).width() >= 1000) ? 800 : "100%");
	$(window).resize(function(){
		$("#tableHiscores").width(($(window).width() >= 1000) ? 800 : "100%");
	});

	$("nav .menu").on("mouseenter", function(){
		$(this).children("ul").show("blind",160);
	}).on("mouseleave", function(){
		$(this).children("ul").hide("blind","slow");
	});
	$("nav").on("mouseleave", function(){
		$(this).children().children("ul").hide("blind");
	});

	$(".clan a").on("click", function(){
		var ml = $(this).attr("ml");
		var game = $(this).attr("game");
		if (ml) setMemberlist(ml, game);
	});

	$(".stat a").on("click", function(){
		var id = $(this).attr("id");
		var type = $(this).parent().parent().siblings("a").html();
		if (id) createTable(id, type=="Skills");
	});

});

var all, lst;

String.prototype.capitalize = function(){
	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function getVLevel(exp){
	var xp=0;
	for (var lvl=1; lvl<=160; lvl++){
		xp += Math.floor(lvl + 300 * Math.pow(2, lvl / 7.0));
		if (Math.floor(xp/4) > exp) return lvl;
	}
}

function getCombat(player){
	var style = 1.3 * Math.max(player.attack.level+player.strength.level, 1.5*player.magic.level, 1.5*player.ranged.level);
	var summon = (player.summoning && player.summoning.level) || 0;
	var cmb = player.defence.level + player.constitution.level + (player.prayer.level/2) + (summon/2) + style;
	return Math.floor(cmb/4);
}

function setMemberlist(ml, game){
	all = [], lst = [];
	if (!game) game = "eoc";
	var ml = ml.replace("-","/").replace("_","/");
	var url = "json/"+game+"/"+ml+".json";
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		success: function (json){
			console.log("opening file "+url);
			JSONE = json;
			createTable("overall", true);
		},
	});
}

function createTable(stat, isSkill){
	var x = 0;
	var json = JSONE.slice();
	var statName = stat.replace(/_/g, " ").capitalize();

	if (!json[0][stat]) throw (stat+" isn't a valid stat.");

	json.sort(function(p1,p2){
		if (parseInt(p1[stat].rank)<1) return 1; if (parseInt(p2[stat].rank)<1) return -1;
		return parseInt(p1[stat].rank)-parseInt(p2[stat].rank);
	});
	
	$("#tableHiscores tbody").html("");
	$.each(json, function (i, player){
		var cellAvatar = '<td><img src="https://services.runescape.com/m=avatar-rs/'+player.rsn+'/chat.png" alt=""></td>';
		var cellRSN = '<td><a class="rsn" title="'+player.rsn+'">'+player.rsn+'</a></td>';
		var cellCombat = '<td>'+getCombat(player)+'</td>';

		if (isSkill){
			var vLvl = getVLevel(player[stat].exp);
			var cellStatLevel = "<td>"+player[stat].level+" ("+vLvl+")</td>";
			var cellStatExp = "<td>"+player[stat].exp+"</td>";
			var rowContent = "<tr><td>"+(i+1)+"</td>"+cellAvatar+cellRSN+cellCombat+cellStatLevel+cellStatExp+"</tr>";
		} else{
			var cellStatRank = "<td></td>";
			var cellStatScore = "<td>"+player[stat].score+"</td>";
			var rowContent = "<tr><td>"+(i+1)+"</td>"+cellAvatar+cellRSN+cellCombat+cellStatScore+"</tr>";
		}

		all.push(player.rsn);
		if ((isSkill && player[stat].level>1) || player[stat].rank > 0){
			$("#tableHiscores tbody").append(rowContent);
			x++;
			lst.push(player.rsn);
		}
	});

	var rowHeadSkill = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">'+statName+'</th><th>Combat</th><th>Level</th><th>Experience</th></tr>';
	var rowHeadMG = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">'+statName+'</th><th>Combat</th><th>Score</th></tr>';
	var rowInvalid = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">There are no members to display</th></tr>';
	
	$("#tableHiscores thead").html((x>0) ? ((isSkill) ? rowHeadSkill : rowHeadMG) : rowInvalid);
}
