import Loader from 'react-loader-spinner'

function Loading() {
  return (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#263868" height={50} width={50} />
    </div>
  )
}
export default Loading
