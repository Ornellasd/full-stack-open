import { Alert } from '@material-ui/lab'

const Alerts = ({ alerts }) => {
  if(!alerts.content) {
    return null
  }
  
  // return (
  //   <div>
  //     {alerts.content.map((alert, index) =>
  //       <div className={'alert ' + (alerts.type === 'success' ? 'success' : 'error')} >{alert}</div>
  //     )}
  //   </div>
  // )

  return (
    <div>
      {alerts.content.map((alert, index) =>
        <Alert severity={alerts.type === 'success' ? 'success' : 'error'}>{alert}</Alert>
      )}
    </div>
  )
}

export default Alerts