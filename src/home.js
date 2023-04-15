import { Link } from "react-router-dom";


function Home() {
  
  const playNotificationSound = () => {
    const audio = new Audio('https://audio.jukehost.co.uk/4D2Yj0Xx5CbBWItxIHdB0Xo9VAzrxb1V');
    audio.play();
  };
  
  return (
    <div class="Home" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '60px 60px'
    }}>
      <h1>Welcome to Everything Books!</h1>
      

      <br></br>

      <p> *Stay tuned as more features for foci time will come to life in due time!*</p>
      
      <Link to="./App">
        <button style={{ cursor: 'pointer', borderRadius: '18px' }} onClick={playNotificationSound}>Get Started</button>
      </Link>
      
    </div>
  );
}


export default Home;
