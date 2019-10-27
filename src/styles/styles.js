/**
 * Copyright 2015-2019 OpenCB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
* Reusable collection of css widgets
* */
const checkBoxWidget = `
    .checkbox-container {
        margin:0;
        padding:0;
    }
    .checkbox-container li{
        display: block;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
     .checkbox-container > li > a {
         padding: 3px 10px 3px 0;
         display: block;
    }
     .checkbox-container span + span {
         margin: 0 5px;
    }
     .checkbox-container .checkmark-label {
         padding:0 0 0 30px 
    }
     .checkbox-container input[type=checkbox] {
         position: absolute;
         opacity: 0;
         cursor: pointer;
         height: 0;
         width: 0;
    }
     .checkbox-container .checkmark {
         position: absolute;
         top: 3px;
         left: 0;
         height: 20px;
         width: 20px;
         background-color: #b7b7b7;
    }
     .checkbox-container .checkbox-container:hover input ~ .checkmark {
         background-color: #ccc;
    }
     .checkbox-container input:checked ~ .checkmark {
         background-color: #2196F3;
    }
     .checkbox-container .checkmark:after {
         content: "";
         position: absolute;
         display: none;
    }
     .checkbox-container input:checked ~ .checkmark:after {
         display: block;
    }
     .checkbox-container .checkmark:after {
         left: 8px;
         top: 4px;
         width: 5px;
         height: 10px;
         border: solid white;
         border-width: 0 3px 3px 0;
         -webkit-transform: rotate(45deg);
         -ms-transform: rotate(45deg);
         transform: rotate(45deg);
    }
     .checkbox-container>li>a:focus, .checkbox-container>li>a:hover {
         color: #262626;
         text-decoration: none;
         background-color: #f5f5f5;
    }
`;

const switchWidget = `
    .switch-container {
      position: relative;
      width: 180px;
    }
    
    .switch-container .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .switch-container .rating-label {
      position: relative;
      text-align: center;
      flex: 0.5;
      z-index: 3;
      font-weight: bold;
      cursor: pointer;
      color: #bbbbbb;
      transition: 500ms;
    }
    
    .switch-container .rating-label:hover,
    .switch-container .rating-label:active {
      color: #bbbbbb;
    }
    
    .switch-container .rating-label-and {
      left: -27px;
      text-align: right;
    }
    
    .switch-container .rating-label-or {
      left: 33px;
      text-align: left;
      color: #222;
    }
    
    .switch-container input {
      display: none;
    }
    
    .switch-container .toggle-rating-pill {
      position: relative;
      height: 30px;
      width: 60px;
      background: #bbbbbb;
      border-radius: 50px;
      transition: all 500ms;
    }
    
    .switch-container .rating-toggle {
        position: absolute;
        width: 26px;
        height: 26px;
        background-color: white;
        left: 62px;
        border-radius: 50%;
        transition: all 500ms;
        z-index: 4;
    }
    
    .switch-container input[disabled].radio-or ~ .rating-label-or,
    .switch-container input[disabled].radio-and ~ .rating-label-and{
        color: #e4e4e4;
    }
    .switch-container input[disabled] ~ .toggle-rating-pill{
        background: #e4e4e4;
    }
    /*
    Toggle Changes
    */
    .switch-container .radio-or:checked ~ .rating-label-or {
      color: #555e63;
    }
    
    .switch-container .radio-and:checked ~ .rating-label-or {
      color: #bbbbbb;
    }
    
    .switch-container .radio-and:checked ~ .rating-label-and {
      color: #555e63;
    }
    
    .switch-container .radio-and:checked ~ .rating-toggle {
      left: 92px;
    }
    
    .switch-container .radio-and:checked ~ .toggle-rating-pill {
      /*background-color: #00b9ee;*/
    }

`;
export {checkBoxWidget, switchWidget};
