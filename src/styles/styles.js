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
let checkBoxContainer = `
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
`;
export { checkBoxContainer }