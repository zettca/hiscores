<?php
	header('Content-Type: application/json');

	function getPlayerStats($rsn, $game){ // rsn -> stats json
		$player = array();
		$player["rsn"] = $rsn;

		$stats = ($game=="eoc") ? array("overall","attack","defence","strength","constitution","ranged","prayer","magic","cooking","woodcutting","fletching","fishing","firemaking","crafting","smithing","mining","herblore","agility","thieving","slayer","farming","runecrafting","hunter","construction","summoning","dungeoneering","divination","invention","bounty_hunter","bounty_hunter_rouges","dominion_tower","crucible","castle_wars","BA_attackers","BA_defenders","BA_collectors","BA_healers","duel_tournaments","mobilising_armies","conquest","fist_of_guthix","GG_resource","GG_athletics","we2","we2","we2","we2","heist_guard","heist_robber","CFP") : array("overall","attack","defence","strength","constitution","ranged","prayer","magic","cooking","woodcutting","fletching","fishing","firemaking","crafting","smithing","mining","herblore","agility","thieving","slayer","farming","runecrafting","hunter","construction");
		$link = ($game=="eoc") ? "http://services.runescape.com/m=hiscore/index_lite.ws" : "http://services.runescape.com/m=hiscore_oldschool/index_lite.ws";
		$handle = curl_init();
		curl_setopt($handle, CURLOPT_URL, $link);
		curl_setopt($handle, CURLOPT_POSTFIELDS, "player=$rsn");
		curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);

		$data = explode("\n",curl_exec($handle));
		curl_close($handle);

		$numSkills = ($game=="eoc") ? 28 : 24;

		for ($i=0; $i<count($stats); $i++){
			$x = split(",", $data[$i]); // stat | [rank,level,exp]
			$player[$stats[$i]] = ($i < $numSkills) ? array("rank"=>(int)$x[0],"level"=>(int)$x[1],"exp"=>(int)$x[2]) : array("rank"=>(int)$x[0],"score"=>(int)$x[1]);
		} return $player;
	}

	// memberlist update
	$ml = $_GET["ml"] ? $_GET["ml"] : $argv[1];
	$fileNames = fopen("ml/$ml.csv", "r");
	if ($fileNames){ // memberlist exists
		$startTime = microtime(true);
		$playersEOC = array();
		$playersOSRS = array();
		while(!feof($fileNames)){
			$rsn = str_replace(" ", "_",substr(fgets($fileNames), 0, -1));
			if ($rsn) {
				array_push($playersEOC, getPlayerStats($rsn, "eoc"));
				array_push($playersOSRS, getPlayerStats($rsn, "osrs"));
			}
		}
		fclose($fileNames);
		file_put_contents("json/eoc/$ml.json", json_encode($playersEOC, JSON_PRETTY_PRINT));
		file_put_contents("json/osrs/$ml.json", json_encode($playersOSRS, JSON_PRETTY_PRINT));
		echo "Update on $ml sucessful. Took ".number_format((float)microtime(true)-$startTime,4)." seconds.";
	} else echo "$ml isn't a valid memberlist";
?>
