import React, { useState, useEffect } from "react";

const MatchStats = () => {

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

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

export default MatchStats