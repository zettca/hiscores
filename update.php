<html>
	<head>
		<style type="text/css">
			body { font-family: "Courier New", "monospace"; font-size: 12px; }
		</style>
		<title>Stats Updater</title>
	</head>
</html>
<?php
	define("STATS", 49);
	define("SKILLS", 27);

	function getPlayerStats($rsn){ // rsn -> stats json
		$stats = array("overall","attack","defence","strength","constitution","ranged","prayer","magic","cooking","woodcutting","fletching","fishing","firemaking","crafting","smithing","mining","herblore","agility","thieving","slayer","farming","runecrafting","hunter","construction","summoning","dungeoneering","divination","bounty_hunter","bounty_hunter_rouges","dominion_tower","crucible","castle_wars","BA_attackers","BA_defenders","BA_collectors","BA_healers","duel_tournaments","mobilising_armies","conquest","fist_of_guthix","GG_resource","GG_athletics","we2","we2","we2","we2","heist_guard","heist_robber","CFP");
		$dude = array();
		$dude["rsn"] = $rsn;
		$rsnStart = microtime(true);
		$content = explode("\n",file_get_contents("http://hiscore.runescape.com/index_lite.ws?player=$rsn"));
		for ($i=0; $i<STATS; $i++){
			$x = split(",", $content[$i]); // rank,level,exp
			$dude[$stats[$i]] = ($i < SKILLS) ? array("rank"=>(int)$x[0],"level"=>(int)$x[1],"exp"=>(int)$x[2],"isSkill"=>(boolean)true) : array("rank"=>(int)$x[0],"score"=>(int)$x[1],"isSkill"=>(boolean)false);
		}
		echo number_format((float)microtime(true)-$rsnStart,4)." $rsn<br/>";
		return json_encode($dude);
	}

	if (isset($_GET["ml"])){ // update memberlist if existing
		$ml = $_GET["ml"];
		$fileText = fopen("ml/$ml", "r");
		if ($fileText){
			$startTime = microtime(true);
			$JSONE = "[";
			while(!feof($fileText)){
				$rsn = str_replace(" ", "_",substr(fgets($fileText), 0, -1));
				if ($rsn){
					$pStats = getPlayerStats($rsn);
					$JSONE .= $pStats.",";
					unlink("json/player/$rsn.json");
					file_put_contents("json/player/$rsn.json", $pStats);
				}
			}
			$JSONE = substr($JSONE, 0, -1) . "]";
			fclose($fileText);
			unlink("json/$ml.json");
			file_put_contents("json/$ml.json", $JSONE);
			//echo $JSONE;
			echo "=<br/>".number_format((float)microtime(true)-$startTime,4);
		} else echo "$ml isn't a valid memberlist";
	}


	if (isset($_GET["player"])){ // update player if existing
		$rsn = $_GET["player"];
		$JSONE = getPlayerStats($rsn);
		if ($JSONE){
			unlink("json/player/$rsn.json");
			file_put_contents("json/player/$rsn.json", $JSONE);
		}
	}	
?>