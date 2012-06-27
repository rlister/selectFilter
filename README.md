# selectFilter.js - filter <select> lists by regex

Generic javascript function to filter HTML select objects by regex.

## Demo

http://jsfiddle.net/bhEqj/

## Example

Provides a select with a text input to filter options:

```html
    <script src="selectFilter.js" type="text/javascript"></script>

    <form name="myForm">
      <select name="mySelect" size="10">
        <option>foo</option>
        <option>bar</option>
        <option>baz</option>
      </Select>
    </form>

    <script type="text/javascript">
      var filter = new selectFilter(document.myForm.mySelect);
      filter.selected = 1;   //default is 0
    </script>

    <input name="regexp" type="text" onkeyup="filter.set(this.value);" />

    <input type="button" onClick="filter.set(this.form.regexp.value)" value="Go" />
    <input type="button" onClick="filter.reset();this.form.regexp.value=''" value="Clear" />
```
