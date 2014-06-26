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

	$(".clan a, .stat a").on("click", function(){
		var id = $(this).attr("id");
		if (id) setMemberlist(id);
	});
});

function contentInit(){
	if ($("footer"))
		$(this).html("&copy;&nbsp;ZETTCA 2014");
}

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
	var x = 0;
	var json = JSONE.slice();
	var statName = stat.replace(/_/g, " ").capitalize();

	json.sort(function(p1,p2){ if (parseInt(p1[stat].rank)<1) return 1; if (parseInt(p2[stat].rank)<1) return -1; return parseInt(p1[stat].rank)-parseInt(p2[stat].rank); });
	
	$("#tableHiscores tbody").html("");
	$.each(json, function (i, player){
		var cellAvatar = '<td><img src="http://services.runescape.com/m=avatar-rs/'+player.rsn+'/chat.png" alt=""></td>';
		var cellRSN = '<td><a class="ttStats" title="'+player.rsn+'">'+player.rsn+'</a></td>';
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

	handleTooltips();
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
	var cmb = Math.max(player.attack.level, player.strength.level, player.magic.level, player.ranged.level, player.summoning.level);
	return parseInt(2 + parseInt(player.defence.level) + Math.max(cmb));
}





function handleTooltips(){
	var css = '<style type="text/css"> #tableStats td{ border: 1px solid #CCCCCC; border-radius: 6px; box-shadow: 0px 0px 5px #FFFFFF; padding: 5px 10px; } #tableStats td span{ float: right; vertical-align: -5px; font-size: 14px; } #tableStats td img{ float: left; height: 20px; } </style>';
	var html;
	$(".ttStats").tooltip().hover(function () {
		$(this).tooltip({
			items: "[title]",
			content: function () {
				var rsn = $(this).html();
				$.ajax({
					async: false,
					type: "GET",
					url: "json/player/"+rsn+".json",
					dataType: "json",
					success: function (json){
						html = '<table id="tableStats"><tr><td><img src="res/img/attack.png"><span>'+json['attack'].level+'</span></td><td><img src="res/img/constitution.png"><span>'+json['constitution'].level+'</span></td><td id="mining"><img src="res/img/mining.png"><span>'+json['mining'].level+'</span></td></tr><tr><td id="strength"><img src="res/img/strength.png"><span>'+json['strength'].level+'</span></td><td id="agility"><img src="res/img/agility.png"><span>'+json['agility'].level+'</span></td><td id="smithing"><img src="res/img/smithing.png"><span>'+json['smithing'].level+'</span></td></tr><tr><td id="defence"><img src="res/img/defence.png"><span>'+json['defence'].level+'</span></td><td id="herblore"><img src="res/img/herblore.png"><span>'+json['herblore'].level+'</span></td><td id="fishing"><img src="res/img/fishing.png"><span>'+json['fishing'].level+'</span></td></tr><tr><td id="ranged"><img src="res/img/ranged.png"><span>'+json['ranged'].level+'</span></td><td id="thieving"><img src="res/img/thieving.png"><span>'+json['thieving'].level+'</span></td><td id="cooking"><img src="res/img/cooking.png"><span>'+json['cooking'].level+'</span></td></tr><tr><td id="prayer"><img src="res/img/prayer.png"><span>'+json['prayer'].level+'</span></td><td id="crafting"><img src="res/img/crafting.png"><span>'+json['crafting'].level+'</span></td><td id="firemaking"><img src="res/img/firemaking.png"><span>'+json['firemaking'].level+'</span></td></tr><tr><td id="magic"><img src="res/img/magic.png"><span>'+json['magic'].level+'</span></td><td id="fletching"><img src="res/img/fletching.png"><span>'+json['fletching'].level+'</span></td><td id="woodcutting"><img src="res/img/woodcutting.png"><span>'+json['woodcutting'].level+'</span></td></tr><tr><td id="runecrafting"><img src="res/img/runecrafting.png"><span>'+json['runecrafting'].level+'</span></td><td id="slayer"><img src="res/img/slayer.png"><span>'+json['slayer'].level+'</span></td><td id="farming"><img src="res/img/farming.png"><span>'+json['farming'].level+'</span></td></tr><tr><td id="construction"><img src="res/img/construction.png"><span>'+json['construction'].level+'</span></td><td id="hunter"><img src="res/img/hunter.png"><span>'+json['hunter'].level+'</span></td><td id="summoning"><img src="res/img/summoning.png"><span>'+json['summoning'].level+'</span></td></tr><tr><td id="dungeoneering"><img src="res/img/dungeoneering.png"><span>'+json['dungeoneering'].level+'</span></td><td id="divination"><img src="res/img/divination.png"><span>'+json['divination'].level+'</span></td><td id="overall"><img src="res/img/overall.png"><span>'+json['overall'].level+'</span></td></tr></table>';
					}
				});
				return css+html;
			}
		});
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