import './index.css'

const MatchCard = props => {
  const {match} = props
  const {result, competingTeamLogo, competingTeam, matchStatus} = match
  const newClassName = matchStatus === 'Won' ? 'green' : 'red'
  return (
    <li className="match-list-container">
      <img
        className="match-team-logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="opp-team-name">{competingTeam}</p>
      <p className="final-result">{result}</p>
      <p className={newClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
