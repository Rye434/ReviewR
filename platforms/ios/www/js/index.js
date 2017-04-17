// ReviewR
// Riley Griffith
// grif0193@algonquinlive.com
// v 1.0.0
// April 11 2017


var app = {
    rating: 3,
    stars: null,
    img: null,
    reviewIndex: 0,
    init: function() {
        document.addEventListener('DOMContentLoaded', app.onDeviceReady);
    },
    onDeviceReady: function() {
        app.showReviews();
        let btnAdd = document.getElementById("add");
        btnAdd.addEventListener("touchend", app.reviewModal);
        let btnPic = document.getElementById("btnPicture")
        btnPic.addEventListener("touchend", app.openCamera);
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.addEventListener("touchend", app.toggleModal);
    },
    showReviews: function() {
        if(localStorage.getItem("grif0193")){
        let list = document.getElementById("review-list");
        list.textContent = "";
        let temp = JSON.parse(localStorage.getItem("grif0193"));
        console.log(temp);
        temp.forEach(function(thing,index){
        console.log(temp[index].name);
        let id = temp[index].id;
        let name = temp[index].name;
        let rating = temp[index].rating;
        let img = temp[index].img;
        let li = document.createElement("li");
        let div = document.createElement("div");
        let nameP = document.createElement("p");
        let trash = document.createElement("span");
        let imgDiv = document.createElement("div");
        let image = document.createElement("img");
        imgDiv.classList.add("div");
        image.classList.add("img1");
        image.src = img;
        li.classList.add("table-view-cell");
        li.setAttribute("id", id);
        
        nameP.textContent = name;
        trash.setAttribute("data-id", id);
        trash.className = "icon icon-trash pull-right midline";
        trash.addEventListener("touchend", app.deleteReview);
            
        div.appendChild(nameP);
        for (let i = 0; i < rating; i++){
            let ratingP = document.createElement("span");
            ratingP.classList.add("two");
            div.appendChild(ratingP);
        }
        li.appendChild(trash);
        li.appendChild(div);
        imgDiv.appendChild(image);  
        li.appendChild(imgDiv);
        list.appendChild(li);
        app.reviewIndex++;
        console.log(app.reviewIndex);
        })
        }
    },
    addReview: function() {
        if(localStorage.getItem("grif0193")){
        app.reviewIndex++;
        let temp = JSON.parse(localStorage.getItem("grif0193"));
        let id = app.reviewIndex;
        let name = document.getElementById("item").value;
        let rating = app.rating;
        let review = {"id": id,
                        "name": name,
                        "rating": rating, 
                        "img": app.img
                       }
        let li = document.createElement("li");
        let div = document.createElement("div");
        let nameP = document.createElement("p");
        let trash = document.createElement("span");
        let imgDiv = document.createElement("div");
        let image = document.createElement("img");
        imgDiv.classList.add("div");
        image.classList.add("img1");
        image.src = app.img;
        let list = document.getElementById("review-list");
        li.classList.add("table-view-cell");
        li.setAttribute("id", id);
        nameP.textContent = name;
        trash.setAttribute("data-id", id);
        trash.className = "icon icon-trash pull-right midline";
        trash.addEventListener("touchend", app.deleteReview);
            
        div.appendChild(nameP);
        for (let i = 0; i < rating; i++){
            let ratingP = document.createElement("span");
            ratingP.classList.add("two")
            div.appendChild(ratingP);
        }
        li.appendChild(div);
        li.appendChild(trash);
        imgDiv.appendChild(image);
        li.appendChild(imgDiv);
        list.appendChild(li);
            
        temp.push(review);
        localStorage.setItem("grif0193", JSON.stringify(temp));
        console.log(app.reviewIndex);
        } else {
        app.reviewIndex++;
        let temp = JSON.parse(localStorage.getItem("grif0193"));
        let id = app.reviewIndex;
        let name = document.getElementById("item").value;
        let rating = app.rating;
        let review = [{"id":id,
                        "name":name,
                        "rating":rating, 
                        "img":app.img
                       }]
        let li = document.createElement("li");
        let div = document.createElement("div");
        let nameP = document.createElement("p");
        let trash = document.createElement("span");
        let imgDiv = document.createElement("div");
        let image = document.createElement("img");
        imgDiv.classList.add("div");
        image.classList.add("img1");
        image.src = app.img;
        let list = document.getElementById("review-list");
        li.classList.add("table-view-cell");
        li.setAttribute("id", id);
        nameP.textContent = name;
        trash.setAttribute("data-id", id);
        trash.className = "icon icon-trash pull-right midline";
        trash.addEventListener("touchend", app.deleteReview);
            
        div.appendChild(nameP);
        for (let i = 0; i < rating; i++){
            let ratingP = document.createElement("span");
            ratingP.classList.add("two")
            div.appendChild(ratingP);
        }
        li.appendChild(div);
        li.appendChild(trash);
        imgDiv.appendChild(image);
        li.appendChild(imgDiv);
        list.appendChild(li);
            
        localStorage.setItem("grif0193", JSON.stringify(review));
        console.log(app.reviewIndex);
        app.img = null;
        }
        app.toggleModal();
    },
    deleteReview: function(ev) {
        let ids = ev.currentTarget.getAttribute("data-id");
        let temp = JSON.parse(localStorage.getItem("grif0193"));
        console.log("delete: " + ids);
        temp.forEach(function (review, index) {
            if (ids == review.id) {
                    temp.splice(index, 1);
                    temp = JSON.stringify(temp);
                    console.log(temp);
                if(temp == []){
                    localStorage.clear();
                    temp = null;
                } else {
                    localStorage.setItem("grif0193", temp);
                }
            }
        })
        app.showReviews();
        
        
        
    },
    addEL: function() {
    [].forEach.call(app.stars, function(star, index){
    star.addEventListener('touchend', (function(indx){
      return function(){
        app.rating = indx + 1;  
        app.setRating();
      }
    })(index));
  });
    let btnSave = document.getElementById("btnSave");
    btnSave.addEventListener("touchend", app.addReview)
},
    setRating: function() {
    [].forEach.call(app.stars, function(star, index){
    if(app.rating > index){
      star.classList.add('fill');
    }else{
      star.classList.remove('fill');
    }
  });
    },
    setOptions: function(srcType) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        //sourceType: srcType,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        pictureSourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
},
    openCamera: function(selection) {
        
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = app.setOptions(srcType);

    if (selection == "camera-thmb") {
        options.targetHeight = 300;
        options.targetWidth = 300;
    }

    navigator.camera.getPicture(function (imageUri) {
        app.img = imageUri;
        let image = document.createElement("img");
        image.classList.add("img1");
        image.src = imageUri;
        let replace = document.getElementById("replace");
        replace.innerHTML = "";
        replace.appendChild(image);
    }, function (error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
},
    reviewModal: function(){
        console.log("Open");
        app.stars = document.getElementsByClassName("star");
        app.addEL();
        app.setRating();
    },
    toggleModal: function(){
        console.log("toggle");
        let myEvent = new CustomEvent("touchend", { bubbles: true, cancelable: true })
        document.querySelector(".icon-close").dispatchEvent(myEvent);
    },
};

app.init();