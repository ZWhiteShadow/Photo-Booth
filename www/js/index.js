
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var app = {
    // Application Constructor
    initialize: function () { 
        document.getElementById("btn").addEventListener("click", app.takePhoto);
        document.getElementById("new").addEventListener("click", app.newPhoto)
         document.getElementById("old").addEventListener("click", app.oldPhoto)
         document.getElementById("x").addEventListener("click", app.change)
         },
    
    onDeviceReady: function () { 
    },

    change: function () {
        var e = document.getElementById("x");
        var value = e.options[e.selectedIndex].value;
        for (var i = 1; i < 17; i++){
        document.getElementById(i.toString()).style.fontSize = "2em"
        document.getElementById(i.toString()).style.color = "black"
        }
        document.getElementById(value.toString()).style.fontSize = "3em"
        document.getElementById(value.toString()).style.color = "red"
    
    },

    newPhoto: function(){
        if(!document.getElementById('new-img').src.endsWith("blank.jpg")){
        var e = document.getElementById("x");
        var value = e.options[e.selectedIndex].value;
        document.getElementById('photo'+value).src = document.getElementById('new-img').src;
        document.getElementById('added-img').src = document.getElementById('new-img').src;
        document.getElementById('new-img').src = "/img/blank.jpg";
        document.getElementById('old-img').src = "/img/blank.jpg";
        }
    },

    oldPhoto: function (){
        document.getElementById('new-img').src = "/img/blank.jpg";
        document.getElementById('old-img').src = "/img/blank.jpg";
    },

    // Take a picture
    takePhoto: function(){
        if(document.getElementById('new-img').src.endsWith("blank.jpg")){
        document.getElementById('added-img').src =  "/img/blank.jpg";
        var e = document.getElementById("x");
        var value = e.options[e.selectedIndex].value;
        document.getElementById('old-img').src = document.getElementById('photo'+value).src;
        navigator.camera.getPicture(app.onSuccess, app.onFail, { quality: 100,
            destinationType: Camera.DestinationType.DATA_URL
        })
      }else{ 
          alert("Choose a photo");
      }
    },
    onSuccess: function(imageData) {
        var e = document.getElementById("x");
        var value = e.options[e.selectedIndex].value;

        if (document.getElementById('photo'+value).src.endsWith("blank.jpg")) {
            var image = document.getElementById('photo'+value);
            image.src = "data:image/jpeg;base64," + imageData;
            document.getElementById('added-img').src = image.src;
            document.getElementById('new-img').src = "/img/blank.jpg";
            document.getElementById('old-img').src = "/img/blank.jpg";
        }else {
            var image = document.getElementById('new-img');
            document.getElementById('added-img').src = "/img/blank.jpg";
            image.src = "data:image/jpeg;base64," + imageData;
            document.getElementById('old-img').src = document.getElementById('photo'+value).src;
        }
    },
    
     onFail: function(message) {
        alert('Failed because: ' + message);
    }
};

app.initialize();