// JavaScript Document
myApp.filter('myFilter', function () {
    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function (input, optional1, optional2) {

        var output;

        // Do filter work here
        return output;
    };

});

myApp.filter('indianCurrency', function () {
  return function (getNumber) {
    if (!isNaN(getNumber)) {
      var numberArr = getNumber.toString().split('.');
      var lastThreeDigits = numberArr[0].substring(numberArr[0].length - 3);
      var otherDigits = numberArr[0].substring(0, numberArr[0].length - 3);
      if (otherDigits != '') {
        lastThreeDigits = ',' + lastThreeDigits;
      }
      var finalNumber = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits;
      if (numberArr.length > 1) {
        var getRoundedDecimal = parseInt(numberArr[1].substring(0, 2)) + 1;
        finalNumber += "." + getRoundedDecimal;
      }
      // return '₹' + finalNumber;
      return finalNumber;
    }
  }
})

myApp.filter('truncate', function () {
  return function (value, limit) {
    if (value) {
      if (value.length < limit) {
        return value;
      } else {
        return value.slice(0, limit) + "...";
      }
    }
  }
})

// FILTER FOR SPORT ICON AND HEADER IMG
myApp.filter('sporticon', function(){
  return function(input){
    var input = input;
    var iconImg = "";
    var headerImg = "";
    // Switch the sport types to get the icons
    switch(input){
      case "Handball":
        iconImg = "img/sporticon/1_Handball.png";
      break;
      case "Basketball":
        iconImg = "img/sporticon/2_Basketball.png";
      break;
      case "Volleyball":
        iconImg = "img/sporticon/3_Volleyball.png";
      break;
      case "Throwball":
        iconImg = "img/sporticon/4_Throwball.png";
      break;
      case "Hockey":
        iconImg = "img/sporticon/5_Hockey.png";
      break;
      case "Kabaddi":
        iconImg = "img/sporticon/6_Kabaddi.png";
      break;
      case "Football":
        iconImg = "img/sporticon/7_Football.png";
      break;
      case "Badminton":
      case "Badminton Doubles":
        iconImg = "img/sporticon/8_Badminton.png";
      break;
      case "Tennis":
      case "Tennis Doubles":
      case "Tennis Mixed Doubles":
        iconImg = "img/sporticon/9_Tennis.png";
      break;
      case "Table Tennis":
      case "Table Tennis Doubles":
        iconImg = "img/sporticon/10_Table-Tennis.png";
      break;
      case "Squash":
        iconImg = "img/sporticon/11_Squash.png";
      break;
      case "Judo":
        iconImg = "img/sporticon/12_Judo.png";
      break;
      case "Taekwondo":
        iconImg = "img/sporticon/13_Taekwondo.png";
      break;
      case "Boxing":
        iconImg = "img/sporticon/14_Boxing.png";
      break;
      case "Fencing":
        iconImg = "img/sporticon/15_Fencing.png";
      break;
      case "Karate":
      case "Karate Team Kumite":
        iconImg = "img/sporticon/16_Karate.png";
      break;
      case "Sport MMA":
        iconImg = "img/sporticon/17_MMA.png";
      break;
      case "Shooting":
      case "Shooting Air Rifle Peep Team":
      case "Shooting Air Rifle Open Team":
      case "Shooting Air Rifle Peep Team":
        iconImg = "img/sporticon/18_Shooting.png";
      break;
      case "Archery":
        iconImg = "img/sporticon/19_Archery.png";
      break;
      case "Swimming":
      case "Swimming 4x50m Freestyle Relay":
      case "Swimming 4x50m Medley Relay":
        iconImg = "img/sporticon/20_Swimming.png";
      break;
      case "Water Polo":
        iconImg = "img/sporticon/21_WaterPolo.png";
      break;
      case "Carrom":
        iconImg = "img/sporticon/22_Carrom.png";
      break;
      case "Chess":
        iconImg = "img/sporticon/23_Chess.png";
      break;
      case "Athletics":
      case "Athletics 4x100m Relay":
      case "Athletics 4x50m Relay":
      case "Athletics Medley Relay":
        iconImg = "img/sporticon/25_Athletics.png";
      break;
      case "Kho Kho":
        iconImg = "img/sporticon/26_Kho-Kho.png";
      break;
    }
    return iconImg;
  }
})
// FILTER FOR SPORT ICON AND HEADER IMG END

// FILTER FOR GENDER ICONS

myApp.filter('gendericon',function(){
  return function(gender,type){
    var gender = gender.toLowerCase();
    var type = type;
    var iconImg = "";

    switch (type) {
      case "athlete":
        iconImg = "img/gendericon/"+ gender +"-athlete.png";
      break;
      case "team":
        iconImg = "img/gendericon/"+ gender +"-team.png";
      break;
      case "blue":
        iconImg = "img/gendericon/"+ gender +"-blue.png";
      break;
      case "grey":
        iconImg = "img/gendericon/"+ gender +"-grey.png";
      break;
      case "white":
        iconImg = "img/gendericon/"+ gender +"-white.png";
      break;
      case "progress":
        iconImg = "img/gendericon/"+ gender +"-progress.png";
      break;
      case "small":
        iconImg = "img/gendericon/"+ gender +"-small.png";
      break;
    }
    return iconImg;
  }
})
// FILTER FOR GENDER ICONS END

// FILTER MEDALS
myApp.filter('medalicon', function(){
  return function(input, type){
    var input = input.toLowerCase();
    var type = type.toLowerCase();
    var medalImg = "";

    switch (type) {
      case "blue":
        medalImg = "img/medalicon/" + input + "-blue.png";
      break;
      case "grey":
        medalImg = "img/medalicon/" + input + "-grey.png";
      break;
      case "white":
        medalImg = "img/medalicon/" + input + "-white.png";
      break;
      case "big":
        medalImg = "img/medalicon/" + input + "-big.png";
      break;
    }
    return medalImg;
  }
})
// FILTER MEDALS
;
