// Enable the datepickers
$('.datepicker').datepicker();

customApp = new app();
// Initialize dat App object
$('#name').change(function() {
  if (!customApp) {
    customApp = new app();
  }
  customApp.name = $('#name').val();
  save();
});

$('input').change(function() {
  updateAll();
});

function updateAll() {
  customApp.name = $('#name').val();
  customApp.desktop = $('#desktop').val();
  customApp.twitter.use = $('#use').val();
  customApp.twitter.handle = $('#handle').val();
  customApp.startDate = convertToISO($('#startDate').val());
  customApp.endDate = convertToISO($('#endDate').val());

}
  
function save() {
  if(typeof(Storage)!=="undefined") {
    sessionStorage.MSB_name = customApp.name;
    sessionStorage.MSB_desktop = customApp.desktop;
    sessionStorage.MSB_use = customApp.twitter.use;
    sessionStorage.MSB_handle = customApp.twitter.handle;
  }
}

$(document).ready(function () {

  function getInitialData() {
    today = new Date();
    year = today.getYear() + 1900;
    init_date = today.getMonth() + "/" + today.getDay() + "/" + year;
    
    return [
      ["Name of Event", "University Center", init_date, "10:00", "14:00", "", "", "description text"]
    ];
  }
  
  function isEmptyRow(instance, row) {
  var rowData = instance.getData()[row];
  for (var i = 0, ilen = rowData.length; i < ilen; i++) {
    if (rowData[i] !== null) {
      return false;
    }
  }
  return true;
}

function defaultValueRenderer(instance, td, row, col, prop, value, cellProperties) {
  var args = $.extend(true, [], arguments);
  if (args[5] === null && isEmptyRow(instance, row)) {
    args[5] = tpl[col];
    td.style.color = '#999';
  }
  else {
    td.style.color = '';
  }
  Handsontable.TextCell.renderer.apply(this, args);
}


var tpl = ["event", "location"];
var container = $("#event_data");

  $("#event_data").handsontable({
    data: getInitialData(),
    startRows: 300,
    startCols: 8,
    colWidths: [120, 120, 100, 80, 80, 50, 50, 300],
    colHeaders: ["Event Name", "Location", "Date", "Start Time (24hr)", "End Time (24hr)", "longitude", "latitude", "description"],
    columnSorting: true,
    minSpareRows: 1,
    cells: function (row, col, prop) {
            var cellProperties = {};
            cellProperties.type = {renderer: defaultValueRenderer}
            return cellProperties;
    },
    beforeChange: function (changes, source) {
    var instance = container.data('handsontable')
        , i
        , ilen = changes.length
        , c
        , clen = instance.colCount
        , rowColumnSeen = {}
        , rowsToFill = {};
    for (i = 0; i < ilen; i++) {
      if (changes[i][2] === null && changes[i][3] !== null) { //if oldVal is empty
        if (isEmptyRow(instance, changes[i][0])) {
          rowColumnSeen[changes[i][0] + '/' + changes[i][1]] = true; //add this row/col combination to cache so it will not be overwritten by template
          rowsToFill[changes[i][0]] = true;
        }
      }
    }
    for (var r in rowsToFill) {
      if (rowsToFill.hasOwnProperty(r)) {
        for (c = 0; c < clen; c++) {
          if (!rowColumnSeen[r + '/' + c]) { //if it is not provided by user in this change set, take value from template
            changes.push([r, c, null, tpl[c]]);
          }
        }
      }
    }
//    for (var i = changes.length - 1; i >= 0; i--) {
//        if (changes[i][3] === "") {
//          return false;
//        }
//      }
  },
    columns: [
      {
        // name
      },
      {
        // location
      },
      {
        type: 'date',
        dateFormat: 'mm/dd/yy'
      },
      {
        // time
      },
      {
        type: 'numeric',
        format: '00:00'
      },
      {
        // longitude
      },
      {
        // latitude
      },
      {
        // description
      }
    ]
  });
  
  function bindDumpButton() {
      $('body').on('click', 'button[name=dump]', function () {
        var dump = $(this).data('dump');
        var $container = $(dump);
        console.log('data of ' + dump, $container.handsontable('getData'));
      });
    }
  bindDumpButton();

});



// HELPER FUNCTIONS
function convertToISO(dateString) {
  date = new Date(dateString);
  return date.toISOString();
}