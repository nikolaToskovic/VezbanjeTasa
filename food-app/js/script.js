var appId = 'ba91a818';
var appKey = '6b0ae77471973a7cb4bbbf6cf4dcf8f7';
var inputKeyword = document.querySelector('input');
var recipeNumber = document.querySelector('.recipe-number');
var imgs = document.getElementById('images');
var selectHealth = document.querySelector('#select-health');
var selectDiet = document.querySelector('#select-diet');
var buttonClick = document.querySelector('button');
var selectedHealth = '';
var selectedDiet = '';
var baseUrl = "https://api.edamam.com/search?&app_id=" + appId + "&app_key=" + appKey;

selectHealth.addEventListener('change', function(e) {
    var selectedHealth = e.target.value;
    window.selectedHealth = selectedHealth;
})


inputKeyword.addEventListener('change', function(e){
    var searchTerm = e.target.value;
    window.searchTerm = searchTerm;
})


selectDiet.addEventListener('change', function(e) {
    var selectedDiet= e.target.value;
    window.selectedDiet = selectedDiet; 
})

function searchRecipes() {
    
    buttonClick.addEventListener('click', function(){  
        
        function getUrl() {
    
            var url = baseUrl + "&q=" + searchTerm;
    
            if(selectedHealth !== '') {
                url += "&health=" + selectedHealth;
            }
            if(selectedDiet !== '') {
                url += "&diet=" + selectedDiet;
            }
            return url;
        }

        var newRequest = new XMLHttpRequest();
      
        newRequest.open('GET', getUrl());

        newRequest.onload = function() {
            console.log(JSON.parse(newRequest.responseText))
            var request = JSON.parse(newRequest.responseText);
            countMeter(request);

            request.hits.forEach(element => {
                console.log(element)
                createContainer(element);

            });
        }
        newRequest.send()
    }) 
}

function createContainer(element) {
    
    var container = document.createElement('div');
    container.setAttribute('class', 'container-class');

    var img = document.createElement('div');
    
    img.innerHTML = '<a href='+ element.recipe.url + '><img src=' + element.recipe.image + '></img></a>'
    
    var labelDiv = document.createElement("div");
    labelDiv.classList.add("labels");
    var dietLabel = element.recipe.dietLabels;
    dietLabel.forEach(function(item) {
        var something = document.createElement('span');
        something.classList.add('label');
        something.innerHTML = item;
        labelDiv.prepend(something);
    })

    var healtLabel = element.recipe.healthLabels;
    healtLabel.forEach(function(item) {
        var somethingHealth = document.createElement('span');
        somethingHealth.classList.add('label');
        somethingHealth.innerHTML = item;
        labelDiv.prepend(somethingHealth);
    })

    var caloriesShown = document.createElement('span');
    caloriesShown.classList.add('calories');
    caloriesShown.innerHTML = element.recipe.calories.toFixed(0);

    var name = document.createElement('h3');
    name.innerHTML = element.recipe.label;

    container.prepend(caloriesShown,img,name,labelDiv);
    imgs.appendChild(container);
    
}

function countMeter(request) {
    recipeNumber.innerHTML = request.count;
}

searchRecipes();