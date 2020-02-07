var events = [//use each line here to show a link to a day you want to publish (note: the middle argument in Date is of months starting in 0 - not 1).
  {'Date': new Date(2020, 1, 4 ), 'Title': '&#128279', 'Link': 'https://hopeisback.com/#greencomcom'},
  {'Date': new Date(2020, 1, 18), 'Title': '&#128279', 'Link': 'https://hopeisback.com/#publishhouseplatform'},
  
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);


