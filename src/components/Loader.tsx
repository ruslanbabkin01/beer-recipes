import { ThreeCircles } from 'react-loader-spinner'

const Loader = () => (
  <div className='w-full flex justify-center'>
    <ThreeCircles
      height='100'
      width='100'
      color='#4fa94d'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
      ariaLabel='three-circles-rotating'
      outerCircleColor=''
      innerCircleColor=''
      middleCircleColor=''
    />
  </div>
)

export default Loader
