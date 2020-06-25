const express = require("express");
const app = express();
const port = 3000;


//current time in unix
const currentTimeInUnix=new Date().getTime() / 1000


//new moon 2000 in unix
const newMoon2000=947182440;

//lunar days and secs
const lunarDays=29.53058770576;
const lunarSecs=lunarDays*24*60*60;

//seconds difference from new moon 2000
const totalSecsDiff=currentTimeInUnix-newMoon2000;

//current Seconds 
var currentSecs=Math.round(totalSecsDiff%lunarSecs)


if(currentSecs<0){
  currentSecs +=lunarSecs;
}

//current Fraction
const currentFrac=currentSecs/lunarSecs;

//which phase this day belongs
const currentDays=currentFrac*lunarDays;

console.log("op",currentDays)
//const moon object to calculate moon phase
const moonObj= [{
	name: "new",
	min: 0,
	max: 1
}, 
{
  name: "waxing crescent",
	min: 1,
	max:  6.38264692644
},
{
	name: "first quarter",
	min: 6.38264692644,
	max: 8.38264692644
}, {
	name: "waxing gibbous",
	min: 8.38264692644,
	max: 13.76529385288
}, {
	name: "full",
	min: 13.76529385288,
	max: 15.76529385288
}, {
	name: "waning gibbous",
	min: 15.76529385288,
	max: 21.14794077932
}, {
	name: "last quarter",
	min: 21.14794077932,
	max: 23.14794077932
}, {
	name: "waning crescent",
	min: 23.14794077932,
	max: 28.53058770576
}, {
	name: "new",
	min: 28.53058770576,
	max: 29.53058770576
}]

const currentMoonPhase=moonObj.filter(each=>currentDays>=each.min && currentDays<= each.max)

console.log("oka",currentMoonPhase[0].name)
//route
app.get("/", (req, res) =>
  res.status(200).json({moonPhase:currentMoonPhase[0].name})
);

//start
app.listen(port, () => console.log(`node app started in termux on ${port}`));
