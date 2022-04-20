import React, { useState, useEffect } from "react";
import Fetch from "./utils/HttpClient"

const App = () => {

  const [data, setData] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetData()
    }, 100)
    return () => clearInterval(interval);
  }, [])

  async function handleGetData() {
    setData(await Fetch("http://192.168.0.26:8080/"))
  }

  return (
    <React.Fragment>
      {data && (
        <React.Fragment>
          <p><b>Player Name: </b>{data["player"] && (data["player"]["name"] || "-")}</p>
          <p><b>Health: </b>{data["player"] && (data["player"]["state"]["health"] || "-")}</p>
          <p><b>Armor: </b>{data["player"] && (data["player"]["state"]["armor"] || "-")}</p>
          <p><b>Team: </b>{data["player"] && (data["player"]["team"] || "-")}</p>

          <p><b>Player Score: </b>{data["player"] && (data["player"]["stats"]["kills"])}/{data["player"] && (data["player"]["stats"]["assists"])}/{data["player"] && (data["player"]["stats"]["deaths"])}</p>
          <p><b>Points: </b>{data["player"] && (data["player"]["stats"]["score"])}</p>

          <p><b>Match Score Board: </b>T : {data["map"] && data["map"]["team_t"]["score"]}/{data["map"] && data["map"]["team_ct"]["score"]} : CT</p>

          <p><b>Bomb: </b>{data["round"] && (data["round"]["bomb"] || "-")}</p>

          <p><b>Holding: </b>
            {data["player"] && data["player"]["weapons"]["on_hand"]["name"]}
            {(data["player"] && data["player"]["weapons"]["on_hand"]["ammo_clip"])
              ? ` - ${data["player"]["weapons"]["on_hand"]["ammo_clip"]}/${data["player"]["weapons"]["on_hand"]["ammo_reserve"]}`
              : ""}</p>

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
