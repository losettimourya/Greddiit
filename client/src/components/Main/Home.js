import React from 'react'
import 'react-router-dom'
import Navbar from '../Navbar';
import profile from "../images/icon.jpg";
import axios from "axios";
import { useState } from "react";
import styles from "./styles.module.css";

function Main() {
  const func = ()=>{
    const lis = [...document.querySelectorAll('.followerlist li')];
    for(const li of lis) {
      li.addEventListener('click', function(){
        this.parentNode.removeChild(this);
      })
    }
  }
  return (
    <div>
      <Navbar />
      <div class="containerr">
        <div class="cardd">
          <img src={profile} alt="Person" class="card__imagee" />
          <p class="card__namee">{localStorage.getItem("token")}</p>
          <div class="grid-containerr">

            <div class="grid-child-posts">
              902 Post
            </div>

            <div class="grid-child-followers">
              1300 Likes
            </div>

          </div>
          <ul class="social-icons">
            <li><a href="/"><i class="fa fa-instagram"></i></a></li>
            <li><a href="/"><i class="fa fa-twitter"></i></a></li>
            <li><a href="/"><i class="fa fa-linkedin"></i></a></li>
            <li><a href="/"><i class="fa fa-codepen"></i></a></li>
          </ul>
          <button class="bt draw-border">Follow</button>
          <button class="bt draw-border">Message</button>
        </div>
        <div class='orderl'>
          <h2>Followers</h2>
          <ul class="followerlist">
            <li >Follower 1<button onClick={func}>Remove</button></li>
            <li>Follower 2<button onClick={func}>Remove</button></li>
          </ul>
        </div>
        <div class='orderl'>
          <h2>Following</h2>
          <ul class="followerlist">
            <li>Follower 1<button onClick={func}>Remove</button></li>
            <li>def<button onClick={func}>Remove</button></li>
          </ul>
        </div>
  </div>
    </div>
  );
}

export default Main;