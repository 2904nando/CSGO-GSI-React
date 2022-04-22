import React, { useState, useEffect } from "react";
import Fetch from "./utils/HttpClient"

const App = () => {

  const [data, setData] = useState({})

  const [playerActivity, setPlayerActivity] = useState("")
  const [roundPhase, setRoundPhase] = useState("")

  const [playerName, setPlayerName] = useState("")
  const [playerHealth, setPlayerHealth] = useState(0)
  const [playerArmor, setPlayerArmor] = useState(0)
  const [playerTeam, setPlayerTeam] = useState("")
  const [playerKills, setPlayerKills] = useState(0)
  const [playerAssists, setPlayerAssists] = useState(0)
  const [playerDeaths, setPlayerDeaths] = useState(0)
  const [playerPoints, setPlayerPoints] = useState(0)

  const [trPoints, setTrPoints] = useState(0)
  const [ctPoints, setCtPoints] = useState(0)

  const [bombState, setBombState] = useState("")

  const [holding, setHolding] = useState({})
  const [grenades, setGrenades] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetData()
    }, 100)
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    setPlayerName(data["player"] && data["player"]["name"])
    setPlayerHealth(data["player"] && data["player"]["state"]["health"])
    setPlayerArmor(data["player"] && data["player"]["state"]["armor"])
    setPlayerTeam(data["player"] && data["player"]["team"])
    setPlayerKills(data["player"] && data["player"]["stats"]["kills"])
    setPlayerAssists(data["player"] && data["player"]["stats"]["assists"])
    setPlayerDeaths(data["player"] && data["player"]["stats"]["deaths"])
    setPlayerPoints(data["player"] && data["player"]["stats"]["score"])

    setTrPoints(data["map"] && data["map"]["team_t"]["score"])
    setCtPoints(data["map"] && data["map"]["team_ct"]["score"])

    setBombState(data["round"] && data["round"]["bomb"])

    setHolding(data["player"] && (data["player"]["weapons"]["on_hand"] || {}))

  }, [data])

  async function handleGetData() {
    setData(await Fetch("http://192.168.0.26:8080/"))
  }

  return (
    <React.Fragment>
      {data && (
        <React.Fragment>
          <p><b>Player Name: </b>{playerName || "-"}</p>
          <p><b>Health: </b>{playerHealth || "-"}</p>
          <p><b>Armor: </b>{playerArmor || "-"}</p>
          <p><b>Team: </b>{playerTeam || "-"}</p>

          <p><b>Player Score: </b>{playerKills}/{playerAssists}/{playerDeaths}</p>
          <p><b>Points: </b>{playerPoints}</p>

          <p><b>Match Score Board: </b>{playerTeam === "CT"
            ? `CT : ${ctPoints || 0}|${trPoints || 0} : T`
            : `T : ${trPoints || 0}|${ctPoints || 0} : CT`
          }</p>

          <p><b>Bomb: </b>{bombState || "-"}</p>

          {/* <p><b>Holding: </b>
            {holding['name'] || '-'}
            {holding['ammo_clip']
              ? ` - ${holding['ammo_clip']}/${holding["ammo_reserve"]}`
              : ""}</p> */}

          {/* <p><b>Primary Weapon: </b>{data["player"] && (data["player"]["weapons"]["weapons"][0]["name"] || "-")}</p>
          <p><b>Secondary Weapon: </b>{data["player"] && (data["player"]["weapons"]["weapons"][1]["name"] || "-")}</p> */}
        </React.Fragment>
      )
      }
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </React.Fragment>
  )
}

export default App;
