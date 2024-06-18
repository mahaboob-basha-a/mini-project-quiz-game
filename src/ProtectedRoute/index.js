import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = prop => {
  const isExist = Cookies.get('jwt_token')
  if (isExist === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...prop} />
}
export default ProtectedRoute
