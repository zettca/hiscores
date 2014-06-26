<html>
	<head>
		<title><?php echo $_GET["rsn"]."'s"; ?> Stats</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="res/styles.css" />
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
						<li><a class="clan" href="#overall" id="rsportugal">CPRS</a></li>
						<li><a class="clan" href="#overall" id="playfun">PlayFun</a></li>
						<li><a class="clan" href="#overall" id="pros">PROS Test</a></li>
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