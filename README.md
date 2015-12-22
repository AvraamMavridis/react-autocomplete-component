# react-autocomplete-component
A simple auto-complete component with onOpen, onClose, and onSelect callbacks

[![NPM](https://nodei.co/npm/react-autocomplete-component.png?mini=true)](https://nodei.co/npm/react-autocomplete-component/)

###How to use it:

```javascript
  <Autocomplete options={..} onOpen={..} onClose={..} onSelect={..} />
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


###Changelog:

21-12-2015 Release version 1.0.0

### Contribute

Any pull-request is more than welcome :boom: :smile:

### License

MIT
