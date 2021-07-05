const Alert = ({ message, type }) => <div className={'alert ' + (type === 'success' ? 'success' : 'error')} >{message}</div>

export default Alert