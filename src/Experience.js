import "./three/Experience"

function Experience() {
  return (
    <div className="container" style={{width: "80vw", height: "80vh"}}>
      <canvas
        className="webgl"
        style={{ position:"fixed", width: "100%", height: "100%" }}
      ></canvas>
    </div>
  )
}

export default Experience
