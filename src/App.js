import {  useState } from 'react';
import './App.css';

function App() {
  let [num, setNum] = useState("");
  let [error, setError] = useState("");
  let [details, setdetails] = useState([]);
  let [flag, setFlag] = useState(false)
  function changeHandler(event) {
    setdetails([]);
    setFlag(false);
    setNum(event.target.value);
    setError("");
  }
  function submitHandler(event) {
    event.preventDefault();
    //validation
    let profilenum = Number(num);
    setError("");
    if (Number.isInteger(profilenum) && profilenum < 13 && profilenum > 0) {
      setFlag(true);
      let data = fetch(`https://reqres.in/api/users/${profilenum}`);
      data.then((response) => response.json()).then((detail) => {
        let datas = [];
        datas.push(detail.data.first_name);
        datas.push(detail.data.last_name);
        datas.push(detail.data.avatar);
        datas.push(detail.data.email);
        let description = `User name is ${datas[0] + " " + datas[1]}  `;
        datas.push(description);
        setdetails(datas)
      })
    }
    else if (profilenum > 12 || profilenum < 1) {
      setError("Input should lie between 1 to 12");
    }
    else {
      if (!Number.isInteger(profilenum)) {
        setError("Input should be a Number");
      }
      else {
        setError("There is some mistake in Input it should be a number and lie between 1 to 12");
      }
    }
  }
  return (
    <div className="App">
      <div className='wrapper'>
        <div id="userdata">
          {/* user details */}
          {
            flag ? (<>
              {
                details.length > 0 ? (<div id="induser">
                  <section id="pic" className='box'>
                    <div className='content'>
                    <img src={details[2]} alt="userpic" id="pict" />
                    <h2 id="imgname">{`${details[0]}`}</h2>
                    </div>
                    </section>
                  <div class name="remdet">
                   <section id="name">
                   <span className='head'>Name</span>  <h3>{`${details[0] + " " + details[1]}`}</h3>
                  </section>
                  <section id="emailid">
                   <span className='head'> Email id </span><h3>{details[3]}</h3>
                  </section>
                  <section id="description">
                    <span className='head'>Description</span> <h3>{details[4]}</h3>
                  </section></div>
                </div>) : (<div className='loader'></div>)
              }
            </>) : (<><img alt="user"  src="user.png" className="imguser" /></>)
          }
        </div>
        {/* user input */}
        <div id="profilenum">
          <form id="userinp">
            <label for="num" id="info">Enter a user profile Number </label>
            <div><input type="number" id="num" value={num} onChange={changeHandler} placeholder="Between 1 to 12" /></div>
            <div><h3 id="error">{error}</h3></div>
            <div><button className='btnsub' onClick={submitHandler}>Search</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
