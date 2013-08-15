var module = {

    init: function () {
        this.Grid();
    },

    Grid: function () {
      $.getJSON('//spreadsheets.google.com/feeds/list/0AoA7jARPfrB3dDlJUW02Z3hUbHJDZFdVTU12T3hpb3c/od6/public/values?alt=json-in-script&callback=?')
      .success(function (data) {
        var entries = data.feed.entry;
        var $tbody = $('tbody');
        $.each(entries, function (idx, entry) {
          var row = '<tr>';
          $.each(['ticker', 'industry', 'marketcap', 'price', 'change', 'volume'], function (idx, column) {
            row += '<td><span>' + entry['gsx$' + column].$t + '</span></td>';
          });
          row += '</tr>';

          $tbody.append(row);

           // get all the table cells where the class is set to "number" 
              $('td:nth-child(5n)').each(function() {
                  var number = $(this).html();
                  var val = Number(number.replace(/[^0-9\.-]+/g,""));
                  if(val > 0) {
                      $(this).addClass('positive');
                  }
                  if(val < 0) {
                      $(this).addClass('negative');
                  }
              });

          $("tbody tr:nth-child(2n)").add("tbody tr:nth-child(2n-2)").addClass("highlight");

          var $items;
          $items = $('#result thead th span');
          $items.on('click', function (e) {
              var selected;
              e.preventDefault();
              $selected = $(this);

              // update navigation links
              $items.removeClass('active');
              $selected.addClass('active');
          });

        });

      });

  }

}



$(document).ready(function () {
    module.init();
    
 
});