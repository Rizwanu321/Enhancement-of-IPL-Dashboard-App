import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PChart from '../PChart'

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const teamBannnerUrl = data.team_banner_url
    const latestMatchDetails = data.latest_match_details
    const recentMatches = data.recent_matches

    const updatedLatestMatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }

    const updatedRecentMatches = recentMatches.map(eachItem => ({
      id: eachItem.id,
      result: eachItem.result,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      matchStatus: eachItem.match_status,
    }))

    let wonCount = 0
    let lostCount = 0
    let drawnCount = 0

    updatedRecentMatches.forEach(eachItem => {
      if (eachItem.matchStatus === 'Won') {
        wonCount += 1
      } else if (eachItem.matchStatus === 'Lost') {
        lostCount += 1
      } else {
        drawnCount += 1
      }
    })

    if (updatedLatestMatchDetails.matchStatus === 'Won') {
      wonCount += 1
    } else if (updatedLatestMatchDetails.matchStatus === 'Lost') {
      lostCount += 1
    } else {
      drawnCount += 1
    }

    const pieData = [
      {name: 'Won', value: wonCount},
      {name: 'Lose', value: lostCount},
      {name: 'Draw', value: drawnCount},
    ]

    const updatedData = {
      teamBannnerUrl,
      latestMatchDetails: updatedLatestMatchDetails,
      recentMatches: updatedRecentMatches,
      pieData,
    }

    this.setState({teamData: updatedData, isLoading: false})
  }

  render() {
    const {teamData, isLoading} = this.state
    return (
      <div className="team-details-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-page-container">
            <img
              className="team_banner"
              src={teamData.teamBannnerUrl}
              alt="team banner"
            />
            <p className="latest-matches">Latest Matches</p>
            <LatestMatch latestMatchDetails={teamData.latestMatchDetails} />
            <ul className="match-card-container">
              {teamData.recentMatches.map(each => (
                <MatchCard key={each.id} match={each} />
              ))}
            </ul>
            <p className="latest-matches">Team Statistics</p>
            <PChart data={teamData.pieData} />
            <Link to="/" className="link-btn">
              <button type="button" className="btn-back">
                Back
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
