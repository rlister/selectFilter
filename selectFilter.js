// selectFilter.js - filter <select> lists by regex
// http://github.com/rlister/selectFilter
//
// example, provides a select with a text input to filter options:
//
//   <script src="selectFilter.js" type="text/javascript"></script>
//   <form name="myForm">
//     <select name="mySelect" size="10">
//       <option>foo</option>
//       <option>bar</option>
//       <option>baz</option>
//     </Select>
//   </form>
//   <script type="text/javascript">
//     var filter = new selectFilter(document.myForm.mySelect);
//     filter.selected = 1;   //default is 0
//   </script>
//   <input name="regexp" type="text" onkeyup="filter.set(this.value);" />
//   <input type="button" onClick="filter.set(this.form.regexp.value)" value="Go" />
//   <input type="button" onClick="filter.reset();this.form.regexp.value=''" value="Clear" />
//

function selectFilter (obj) {
  this.selectObj  = obj;
  this.showDebug  = 1;
  this.selected   = 0;   // whether filtering will select all remaining options
  this.regexFlags = 'i'; // flags for regexp: "i" = ignore case; "" = insensitive

  // constructor
  this.init = function() {
    this.copy = new Array();
    
    // sanity check
    if ( !this.selectObj )        return this.debug('select object not defined');
    if ( !this.selectObj.options) return this.debug('options not defined');

    // make a copy of select options array
    for (var i=0; i < this.selectObj.options.length; i++) {
      this.copy[i]       = new Option();
      this.copy[i].text  = this.selectObj.options[i].text;
      this.copy[i].value = this.selectObj.options[i].value ?
	this.selectObj.options[i].value : this.selectObj.options[i].text;
    }
  }

  // replace all the options
  this.set = function(pattern) {
    var index = 0;                     // index into select object
    this.selectObj.options.length = 0; // clear the current select list

    try {                       // initialise the regexp
      regex = new RegExp(pattern, this.regexFlags);
    } catch(e) {
      return;
    }

    // replace select object with members of copy that match regex
    for (var i=0; i < this.copy.length; i++ ) {
      var option = this.copy[i];
        
      if ( regex.test(option.text) ) {
        this.selectObj.options[index++] =
          new Option(option.text, option.value, false, this.selected);
      }
    }
  }
  
  // reset filter
  this.reset = function () {
    this.set('');
  }

  // handle setting case
  this.setCaseSensitive = function (s) {
    if ( s ) {
      this.regexFlags = '';
    } else {
      this.regexFlags = 'i';
    }
  }

  // send debug messages
  this.debug = function(msg) {
    if (this.showDebug) {
      console.log('selectFilter: ' + msg);
    }
  }

  // run constructor
  this.init();
}
