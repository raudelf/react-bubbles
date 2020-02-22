import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        console.log('Colors Successfully fetched: ', res.data);
        setColorList(res.data);
      })
      .catch(err => console.log('Error fetching Colors: ', err))
  }, [])

  const handleLogout = e => {
    localStorage.removeItem('token');
  }

  return (
    <>
      <form><button onClick={handleLogout}>Logout</button></form>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
