<html>
	<head>
		<title><?php echo $_GET["rsn"]."'s"; ?> Stats</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="res/css.css" />
		<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Open+Sans' type='text/css' />
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
		<script type="text/javascript" src="res/scripts.js"></script>
		<script type="text/javascript">
		var rsn = <?php echo "'".$_GET["rsn"]."'"; ?>;
		var JSONE;
		$(document).ready(function (){
			$("#update").click(function(){
				getUpdate(rsn);
			});
			$.ajax({
				async: false,
				type: "POST",
				url: "json/player/"+rsn+".json",
				dataType: "json",
				success: function (json){
					JSONE = json;
					$("td").each(function(){
						var skill = $(this).attr('id');
						$(this).attr("title",spaceNumber(JSONE[skill].exp)+"xp");
						$(this).html('<img src="res/img/'+skill+'.png"><span>'+JSONE[skill].level+'</span>');
					});
				},
				error: function (){
					getUpdate(rsn);
				}
			});
		});
		</script>
		<style type="text/css">
		#tableStats td{
			border: 1px solid #CCCCCC;
			border-radius: 6px;
			box-shadow: 0px 0px 5px #FFFFFF;
			padding: 10px 26px;
		}
		#tableStats td span{
			float: right;
			vertical-align: -5px;
			font-size: 20px;
		}
		#tableStats td img{
			float: left;
			
		}
		</style>
	</head>
	<body>
		<header>
			<nav>
				<div class="menu"><a href="#">Clan</a>
					<ul>
						<li><a class="clan" href="/hs/#overall" id="rsportugal">CPRS</a></li>
						<li><a class="clan" href="/hs/#overall" id="playfun">PlayFun</a></li>
						<li><a class="clan" href="/hs/#overall" id="pros">PROS Test</a></li>
					</ul>
				</div>
				<div class="menu"><a href="/hs/#overall">Skills</a>
					<ul>
						<li><a href="/hs/#attack"><img src="res/img/attack.png"> Attack</a></li>
						<li><a href="/hs/#defence"><img src="res/img/defence.png"> Defence</a></li>
						<li><a href="/hs/#strength"><img src="res/img/strength.png"> Strength</a></li>
						<li><a href="/hs/#constitution"><img src="res/img/constitution.png"> Constitution</a></li>
						<li><a href="/hs/#ranged"><img src="res/img/ranged.png"> Ranged</a></li>
						<li><a href="/hs/#prayer"><img src="res/img/prayer.png"> Prayer</a></li>
						<li><a href="/hs/#magic"><img src="res/img/magic.png"> Magic</a></li>
						<li><a href="/hs/#cooking"><img src="res/img/cooking.png"> Cooking</a></li>
						<li><a href="/hs/#woodcutting"><img src="res/img/woodcutting.png"> Woodcutting</a></li>
						<li><a href="/hs/#fletching"><img src="res/img/fletching.png"> Fletching</a></li>
						<li><a href="/hs/#fishing"><img src="res/img/fishing.png"> Fishing</a></li>
						<li><a href="/hs/#firemaking"><img src="res/img/firemaking.png"> Firemaking</a></li>
						<li><a href="/hs/#crafting"><img src="res/img/crafting.png"> Crafting</a></li>
						<li><a href="/hs/#smithing"><img src="res/img/smithing.png"> Smithing</a></li>
						<li><a href="/hs/#mining"><img src="res/img/mining.png"> Mining</a></li>
						<li><a href="/hs/#herblore"><img src="res/img/herblore.png"> Herblore</a></li>
						<li><a href="/hs/#agility"><img src="res/img/agility.png"> Agility</a></li>
						<li><a href="/hs/#thieving"><img src="res/img/thieving.png"> Thieving</a></li>
						<li><a href="/hs/#farming"><img src="res/img/farming.png"> Farming</a></li>
						<li><a href="/hs/#slayer"><img src="res/img/slayer.png"> Slayer</a></li>
						<li><a href="/hs/#runecrafting"><img src="res/img/runecrafting.png"> Runecraft</a></li>
						<li><a href="/hs/#hunter"><img src="res/img/hunter.png"> Hunter</a></li>
						<li><a href="/hs/#construction"><img src="res/img/construction.png"> Construction</a></li>
						<li><a href="/hs/#summoning"><img src="res/img/summoning.png"> Summoning</a></li>
						<li><a href="/hs/#dungeoneering"><img src="res/img/dungeoneering.png"> Dungeoneering</a></li>
						<li><a href="/hs/#divination"><img src="res/img/divination.png"> Divination</a></li>
					</ul>
				</div>
				<div class="menu"><a href="/hs/#">Minigames</a>
					<ul>
						<li><a href="/hs/#bounty_hunter"><img src="res/img/bounty_hunter.png"> Bounty Hunter</a></li>
						<li><a href="/hs/#bounty_hunter_rouges"><img src="res/img/bounty_hunter_rouges.png"> Bounty Hunter Rouges</a></li>
						<li><a href="/hs/#dominion_tower"><img src="res/img/dominion_tower.png"> Dominion Tower</a></li>
						<li><a href="/hs/#crucible"><img src="res/img/crucible.png"> Crucible</a></li>
						<li><a href="/hs/#castle_wars"><img src="res/img/castle_wars.png"> Castle Wars</a></li>
						<li><a href="/hs/#BA_attackers"><img src="res/img/ba_attackers.png"> BA Attackers</a></li>
						<li><a href="/hs/#BA_defenders"><img src="res/img/ba_defenders.png"> BA Defenders</a></li>
						<li><a href="/hs/#BA_collectors"><img src="res/img/ba_collectors.png"> BA Collectors</a></li>
						<li><a href="/hs/#BA_healers"><img src="res/img/ba_healers.png"> BA Healers</a></li>
						<li><a href="/hs/#duel_tournaments"><img src="res/img/duel_tournaments.png"> Duel Tournaments</a></li>
						<li><a href="/hs/#mobilising_armies"><img src="res/img/mobilising_armies.png"> Mobilising Armies</a></li>
						<li><a href="/hs/#conquest"><img src="res/img/conquest.png"> Conquest</a></li>
						<li><a href="/hs/#fist_of_guthix"><img src="res/img/fist_of_guthix.png"> Fist Of Guthix</a></li>
						<li><a href="/hs/#GG_resource"><img src="res/img/gg_resource.png"> GG Resource</a></li>
						<li><a href="/hs/#GG_athletics"><img src="res/img/gg_athletics.png"> GG Athletics</a></li>
						<li><a href="/hs/#heist_guard"><img src="res/img/heist_guard.png"> Heist Guard</a></li>
						<li><a href="/hs/#heist_robber"><img src="res/img/heist_robber.png"> Heist Robber</a></li>
						<li><a href="/hs/#CFP"><img src="res/img/cfp.png"> CFP</a></li>
					</ul>
				</div>
			</nav>
		</header>

		<div id="content">
			<table id="tableStats">
				<tr><td id="attack">null</td><td id="constitution">null</td><td id="mining">null</td></tr>
				<tr><td id="strength">null</td><td id="agility">null</td><td id="smithing">null</td></tr>
				<tr><td id="defence">null</td><td id="herblore">null</td><td id="fishing">null</td></tr>
				<tr><td id="ranged">null</td><td id="thieving">null</td><td id="cooking">null</td></tr>
				<tr><td id="prayer">null</td><td id="crafting">null</td><td id="firemaking">null</td></tr>
				<tr><td id="magic">null</td><td id="fletching">null</td><td id="woodcutting">null</td></tr>
				<tr><td id="runecrafting">null</td><td id="slayer">null</td><td id="farming">null</td></tr>
				<tr><td id="construction">null</td><td id="hunter">null</td><td id="summoning">null</td></tr>
				<tr><td id="dungeoneering">null</td><td id="divination">null</td><td id="overall">null</td></tr>
			</table>
			<br />
			<button id="update" value="update">Update Stats</button>
		</div>

		<footer></footer>
	</body>
</html>