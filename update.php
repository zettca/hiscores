<?php
	header('Content-Type: application/json');

	function getPlayerStats($rsn){ // rsn -> stats json
		global $game;
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
		} return json_encode($player);
	}

	$game = (isset($_GET["game"])) ? (($_GET["game"]=="osrs") ? "osrs" : "eoc") : "eoc";

	if (isset($_GET["ml"])){ // memberlist update
		$ml = $_GET["ml"];
		$fileText = fopen("ml/$game/$ml.csv", "r");
		if ($fileText){ // memberlist exists
			$startTime = microtime(true);
			$JSONE = "[";
			while(!feof($fileText)){
				$rsn = str_replace(" ", "_",substr(fgets($fileText), 0, -1));
				if ($rsn) $JSONE .= getPlayerStats($rsn).",";
			}
			$JSONE = substr($JSONE, 0, -1) . "]";
			fclose($fileText);
			file_put_contents("json/$game/$ml.json", $JSONE);
			echo "Update on $ml sucessful. Took ".number_format((float)microtime(true)-$startTime,4)." seconds.";
		} else echo "$ml isn't a valid memberlist";
	}

	if (isset($_GET["list"])){ // userlist
		$dudes = $_GET["list"];
		$list = explode(",", "$dudes");
		if (count($list) > 0){ // has users to checkz
			$startTime = microtime(true);
			foreach ($list as $rsn) echo getPlayerStats($rsn)."<br/>";
			echo "GET on $dudes sucessful. Took ".number_format((float)microtime(true)-$startTime,4)." seconds.";
		} else echo "$dudes isn't a valid username string";
	}

?>
