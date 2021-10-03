import AnalysisText from './AnalysisText'
import GraphButton from './GraphButton'

function PreAnalysisSection({showGraphSection, username, node_amount, timeRanges, toggleGraph}) {
  return (
    <div className="container my-4">
      <div className="row">
        <AnalysisText username={username} node_amount={node_amount} timeRanges={timeRanges} />
        <GraphButton showGraphSection={showGraphSection} toggleGraph={toggleGraph} />
      </div>
    </div>
  )
}

export default PreAnalysisSection

