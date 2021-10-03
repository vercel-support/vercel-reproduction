import GraphSelectButton from './charts/GraphSelectButton'
import { useState } from 'react'

function GraphSelection({selectGraph}) {
  const [active, setActive] = useState('dayAmount')
  let val = 1;

  return (
    <>
      <div className="col-1 text-center">
        <GraphSelectButton val={val++} type={'dayAmount'} selectGraph={selectGraph} active={active} setActive={setActive} />
      </div>

      <div className="col-1 text-center">
        <GraphSelectButton val={val++} type={'dayEngagement'} selectGraph={selectGraph} active={active} setActive={setActive} />
      </div>

      <div className="col-1 text-center">
        <GraphSelectButton val={val++} type={'weekAmount'} selectGraph={selectGraph} active={active} setActive={setActive} />
      </div>

      <div className="col-1 text-center">
        <GraphSelectButton val={val++} type={'weekEngagement'} selectGraph={selectGraph} active={active} setActive={setActive} />
      </div>

      <div className="col-1 text-center">
        <GraphSelectButton val={'custom'} type={'custom'} selectGraph={selectGraph} active={active} setActive={setActive} />
      </div>
    </>
  )
}

export default GraphSelection
