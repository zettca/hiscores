$(document).ready(function (){
	$("nav .menu").on("mouseenter", function(){
		$(this).children("ul").show("blind",160);
	}).on("mouseleave", function(){
		$(this).children("ul").hide("blind","slow");
	});
	$("nav").on("mouseleave", function(){
		$(this).children().children("ul").hide("blind");
	});
	$(".clan").on("click", function(){
		var id = $(this).attr("id");
		if (id) setMemberlist(id);
	});

});

String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function setMemberlist(ml){
	$.ajax({
		async: false,
		type: "GET",
		url: "json/"+ml+".json",
		dataType: "json",
		success: function (json){
			JSONE = json;
			createTable("overall");
		},
	});
}

function createTable(stat){
	var json = JSONE.slice();
	var statName = stat.replace(/_/g, " ").capitalize();

	json.sort(function(p1,p2){ if (parseInt(p1[stat].rank)<1) return 1; if (parseInt(p2[stat].rank)<1) return -1; return parseInt(p1[stat].rank)-parseInt(p2[stat].rank); });
	
	$("#tableHiscores tbody").html("");
	var x=0;
	$.each(json, function (i, player){
		var cellAvatar = '<td><img src="http://services.runescape.com/m=avatar-rs/'+player.rsn+'/chat.png" alt=""></td>';
		var cellRSN = '<td><a href="user.php?rsn='+player.rsn+'">'+player.rsn+'</a></td>';
		var cellCombat = '<td>'+getCombat(player)+'</td>';
		if (player[stat].isSkill){
			var cellStatLevel = '<td title="'+getLevel(player[stat].exp)+'">'+player[stat].level+'</td>';
			var cellStatExp = "<td>"+player[stat].exp+"</td>";
			var rowContent = "<tr><td>"+(i+1)+"</td>"+cellAvatar+cellRSN+cellCombat+cellStatLevel+cellStatExp+"</tr>";
		}
		else{
			var cellStatRank = "<td></td>";
			var cellStatScore = "<td>"+player[stat].score+"</td>";
			var rowContent = "<tr><td>"+(i+1)+"</td>"+cellAvatar+cellRSN+cellCombat+cellStatScore+"</tr>";
		}
		if (player[stat].rank > 0){
			$("#tableHiscores tbody").append(rowContent);
			x++;
		}
	});

	var rowHeadSkill = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">'+statName+'</th><th>Combat</th><th>Level</th><th>Experience</th></tr>';
	var rowHeadMG = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">'+statName+'</th><th>Combat</th><th>Score</th></tr>';
	var rowInvalid = '<tr><th><img src="res/img/'+stat+'.png"></th><th colspan="2">There are no members to display</th></tr>';
	$("#tableHiscores thead").html((x>0) ? ((json[0][stat].isSkill) ? rowHeadSkill : rowHeadMG) : rowInvalid);
}

function getLevel(exp){
	var xp=0;
	if (exp<0) return 1;

	for (var lvl=1;lvl<127;lvl++){
		xp += Math.floor(lvl + 300 * Math.pow(2, lvl / 7.));
		if (Math.floor(xp/4) > exp) return lvl; 
	}
}

function getCombat(player){
	var cmb = Math.max(player.attack.level, player.strength.level, player.magic.level, player.ranged.level, player.summoning.level);
	return parseInt(2 + parseInt(player.defence.level) + Math.max(cmb));
}

function getUpdate(rsn){
	$.post("json/update.php", data, function (response){
		alert(response);
		location.reload();
	});
}




function doResizements(){
	$("#tableHiscores").width(($(window).width() >= 1000) ? 800 : "100%");
}

function hashChanged(){
	hash = location.hash.substring(1);
	if (hash) createTable(hash);
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