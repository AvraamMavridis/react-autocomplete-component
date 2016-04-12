# react-autocomplete-component
A simple auto-complete component with onOpen, onClose, and onSelect callbacks

[![NPM](https://nodei.co/npm/react-autocomplete-component.png?mini=true)](https://nodei.co/npm/react-autocomplete-component/)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

###How to use it:

```javascript
  <Autocomplete options={..} onOpen={..} onClose={..} onSelect={..} caseSensitive={} maxOptions={}  />
  ```

### [Demo](http://avraammavridis.github.io/react-autocomplete-component/)

###Options:

| Name        | Description           
| ------------- |-------------:|
| options     | array of values that will be used for the autocomplete |
| onOpen    | callback function that will be called when the list of options opens    |  
| onClose | callback function that will be called when the list of options closes  |
| onSelect | callback function that will be called when an option is selected, the value is passed as the first parameter to the function  |
| inputStyle | overrides the default style for the input  |
| optionStyle | overrides the default style for the options  |
| optionsContainerStyle | overrides the default style for the options container |
| selectedStyle | overrides the default style for the selected option  |  
| caseSensitive (default true) | determines if the filtering will be case sensitive  |  
| maxOptions  | determines how many options will be showed to the user  |  


###Changelog:

25-02-2016 Release version 1.1.0

18-01-2016 Release version 1.1.0

21-12-2015 Release version 1.0.0

### Contribute

Any pull-request is more than welcome :boom: :smile:

### License

MIT


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/AvraamMavridis/react-autocomplete-component/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

