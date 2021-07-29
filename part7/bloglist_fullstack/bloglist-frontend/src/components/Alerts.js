const Alerts = ({ alerts }) => {
  if(!alerts.content) {
    return null
  }
  
  return (
    <div>
      {alerts.content.map((alert, index) =>
        <div className={'alert ' + (alerts.type === 'success' ? 'success' : 'error')} >{alert}</div>
      )}
    </div>
  )
}

export default Alerts