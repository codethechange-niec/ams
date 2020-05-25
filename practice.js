var util = require('./functions');
var dateFns = require("date-fns");

var list = [
	{
		"Day": "Tuesday",
		"Date": "Mar 10",
		"Holiday Name": "Holi",
		"Type": "Regional Holiday",
		"Comments": ""
	},
	{
		"Day": "Wednesday",
		"Date": "Apr 01",
		"Holiday Name": "Bank Holiday",
		"Type": "Not A Public Holiday",
		"Comments": "Banks only. Annual accounts closing"
	},
	{
		"Day": "Thursday",
		"Date": "Apr 02",
		"Holiday Name": "Ram Navami",
		"Type": "Regional Holiday",
		"Comments": ""
	},
	{
		"Day": "Monday",
		"Date": "Apr 06",
		"Holiday Name": "Mahavir Jayanti",
		"Type": "Regional Holiday",
		"Comments": ""
	},
	{
		"Day": "Friday",
		"Date": "Apr 10",
		"Holiday Name": "Good Friday",
		"Type": "Regional Holiday",
		"Comments": ""
	},
	{
		"Day": "Thursday",
		"Date": "May 07",
		"Holiday Name": "Buddha Purnima",
		"Type": "Regional Holiday",
		"Comments": "Birth of Buddha"
	},
	{
		"Day": "Monday",
		"Date": "May 25",
		"Holiday Name": "Id-ul-Fitr",
		"Type": "Regional Holiday",
		"Comments": "Most states"
	},
	{
		"Day": "Saturday",
		"Date": "Aug 01",
		"Holiday Name": "Id-Uz-Zuha",
		"Type": "Regional Holiday",
		"Comments": "Many states"
	},
	{
		"Day": "Wednesday",
		"Date": "Aug 12",
		"Holiday Name": "Janmashtami",
		"Type": "Regional Holiday",
		"Comments": "Many states"
	},
	{
		"Day": "Saturday",
		"Date": "Aug 15",
		"Holiday Name": "Independence Day",
		"Type": "Public Holiday",
		"Comments": ""
	},
	{
		"Day": "Sunday",
		"Date": "Aug 30",
		"Holiday Name": "Ashura",
		"Type": "Regional Holiday",
		"Comments": "Many states"
	},
	{
		"Day": "Friday",
		"Date": "Oct 02",
		"Holiday Name": "Mahatma Gandhi Birthday",
		"Type": "Public Holiday",
		"Comments": "Gandhi Jayanti"
	},
	{
		"Day": "Sunday",
		"Date": "Oct 25",
		"Holiday Name": "Dussehra",
		"Type": "Regional Holiday",
		"Comments": "Vijaya Dashami"
	},
	{
		"Day": "Friday",
		"Date": "Oct 30",
		"Holiday Name": "Maulud Nabi",
		"Type": "Regional Holiday",
		"Comments": "Birthday of Prophet Muhammad"
	},
	{
		"Day": "Saturday",
		"Date": "Oct 31",
		"Holiday Name": "Maharishi Valmiki Birthday",
		"Type": "Regional Holiday",
		"Comments": "Several states"
	},
	{
		"Day": "Saturday",
		"Date": "Nov 14",
		"Holiday Name": "Diwali",
		"Type": "Regional Holiday",
		"Comments": "Many states"
	},
	{
		"Day": "Monday",
		"Date": "Nov 30",
		"Holiday Name": "Guru Nanak's Birthday",
		"Type": "Regional Holiday",
		"Comments": "Full moon of the month Kartik"
	},
	{
		"Day": "Friday",
		"Date": "Dec 25",
		"Holiday Name": "Christmas Day",
		"Type": "Regional Holiday",
		"Comments": "Observed in all states"
	}
];

	let day = "Monday";

	let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

	// let currentDate = 

	let date = dateFns.addDays(new Date(), weekDays.indexOf(day)-weekDays.indexOf("Wednesday"));

	console.log(date.toString())

	// var insertString = "";

	// for(let date of list) {

	// 	insertString += `("${dateFns.format(new Date(date.Date+", 2020"), "yyyy-MM-dd")}", "${date['Holiday Name']}", "${date.Type}"),`

	// }

	// console.log(insertString.substr(0, insertString.length-1))

	// util.getConnection().query(`insert into holidays (date, name, type) values ${insertString.substr(0, insertString.length-1)}`, (err, result) => {

	// 	if(err) {
	// 		console.log(err)
	// 	} else {
	// 		console.log(result);
	// 	}

	// })
