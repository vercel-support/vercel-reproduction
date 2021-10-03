

function GraphOptions({setType, setDataFields}) {
  return (
    <div >
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
        <label className="form-check-label" for="inlineCheckbox1">Beiträge</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
        <label className="form-check-label" for="inlineCheckbox2">Interaktionen</label>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
        <label className="form-check-label" for="exampleRadios1">
          Tag
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
        <label className="form-check-label" for="exampleRadios2">
          Woche
        </label>
      </div>


      
    </div>
  )
}

export default GraphOptions
