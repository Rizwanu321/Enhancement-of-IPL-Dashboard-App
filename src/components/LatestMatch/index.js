import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = latestMatchDetails
  console.log(latestMatchDetails)
  return (
    <div className="latest-match-container">
      <div className="details1-container">
        <p className="competing-team">{competingTeam}</p>
        <p className="date">{date}</p>
        <p className="venue-res">{venue}</p>
        <p className="venue-res">{result}</p>
      </div>

      <img
        src={competingTeamLogo}
        className="competing-team-logo"
        alt={`latest match ${competingTeam}`}
      />
      <hr className="line" />
      <div className="details2-container">
        <p className="head">First Innings</p>
        <p className="sub">{firstInnings}</p>
        <p className="head">Second Innings</p>
        <p className="sub">{secondInnings}</p>
        <p className="head">Man of The Match</p>
        <p className="sub">{manOfTheMatch}</p>
        <p className="head">Umpires</p>
        <p className="sub">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
