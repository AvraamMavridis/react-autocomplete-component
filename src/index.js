/**
* React AutoComplete Component
*
* @author  Avraam Mavridis      <avr.mav@gmail.com>
*
*/
import React, { Component } from 'react';

class AutoComplete extends Component {

   /**
   * Props validation
   */
    static propTypes = {
      inputStyle : React.PropTypes.object,
      optionStyle   : React.PropTypes.object,
      optionsContainerStyle   : React.PropTypes.object,
      selectedStyle   : React.PropTypes.object,
      onOpen    : React.PropTypes.func,
      onClose   : React.PropTypes.func,
      onSelect  : React.PropTypes.func.isRequired,
      caseSensitive : React.PropTypes.bool,
      maxOptions : React.PropTypes.number
    }

    static defaultProps = {
      inputStyle : {
        width : '100px',
      },
      optionStyle : {
        borderBottom : '1px solid grey',
        lineHeight: '25px'
      },
      optionsContainerStyle : {
        width: '100px',
        backgroundColor: 'White',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
        margin: '2px 0px',
        padding: '0px 1px',
        listStyle: 'none',
        maxHeight: '100px',
        overflow: 'auto',
        textIndent: '10px'
      },
      selectedStyle : {
        lineHeight: '25px',
        backgroundColor : 'LightSkyBlue'
      },
      options  : [],
      onOpen   : () => null,
      onClose  : () => null,
      caseSensitive : true,
    }

    constructor() {
      super();
      this.state = {
        options       : [],
        selectedIndex : -1,
        isOpen        : false,
        value         : '',
      };
      this.initKeyEvents();
    }

    /**
     * Initialize key events
     *
     * @method initKeyEvents
     *
     * @return { void }
     */
    initKeyEvents() {
      const that = this;

      document.addEventListener( 'keydown', function( e ) {
        if ( e.which === 40 && that.state.selectedIndex + 1 < that.state.options.length ) {
          that.setState( {
            selectedIndex : that.state.selectedIndex + 1,
          } );
        }
        else if ( e.which === 38 && that.state.selectedIndex - 1 >= -1 ) {
          that.setState( {
            selectedIndex : that.state.selectedIndex - 1,
          } );
        }
        else if ( e.which === 13 && that.state.isOpen )
        {
          that.setState( {
            value   : that.state.options[ that.state.selectedIndex ],
            options : [],
            isOpen  : false,
          } );

          that.props.onSelect( that.state.value );
        }
      } );
    }

    /**
     * Callback for onchange event in the input
     *
     * @method onType
     *
     * @param  { object } e Event
     *
     * @return { void }
     */
    onType( e ) {
      const caseSensitive = this.props.caseSensitive;
      const maxOptions = this.props.maxOptions || Infinity;
      let value = e.target.value;

      const _opt = this.props.options.filter( ( opt ) => caseSensitive ? opt.indexOf( value ) > -1 : opt.toLowerCase().indexOf( value.toLowerCase() ) > -1 ).slice( 0, maxOptions) ;

      this.setState( {
        options       : !!e.target.value ? _opt : [],
        value         : e.target.value,
        isOpen        : Boolean( _opt.length && e.target.value ),
        selectedIndex : -1,
      } );
    }

    /**
     * Sets the selected option on click
     *
     * @method onOptionClick
     *
     * @param  { object }  e  Event
     *
     * @return { void }
     */
    onOptionClick( e ) {
      this.setState( {
        value         : e.target.textContent,
        options       : [],
        isOpen        : false,
        selectedIndex : -1,
      } );
      this.props.onSelect( this.state.value );
    }

    /**
     * [componentWillUpdate description]
     *
     * @method componentWillUpdate
     *
     * @param  { object } nextProps
     * @param  { object } nextState
     *
     * @return { void }
     */
    componentWillUpdate( nextProps, nextState ) {
      // use the literal form of the literal because of the undefined case
      this.isClosed = this.isClosed || 'true';
      if ( nextState.isOpen && this.isClosed === 'true' ) {
        nextProps.onOpen();
        this.isClosed = 'false';
      }
      else if ( !nextState.isOpen && this.isClosed === 'false' ) {
        nextProps.onClose();
        this.isClosed = 'true';
      }
    }

    /**
     * Render Element on the DOM
     *
     * @method render
     *
     * @return { React Element }
     */
    render() {
      const inputStyle = { ...this.props.inputStyle };
      const optionStyle = { ...this.props.optionStyle };
      const optionsContainerStyle = { ...this.props.optionsContainerStyle };
      const selectedStyle = { ...this.props.selectedStyle };

      return ( <div>
        <input ref="inputElement" style={ inputStyle } onChange={ this.onType.bind( this ) } type="text" value={ this.state.value }/>
          <ul tabIndex="0" style={optionsContainerStyle}>
          {
          this.state.options.map( ( r, index ) => <li key={ index } style={ this.state.selectedIndex === index ? selectedStyle : optionStyle }
            onClick={ this.onOptionClick.bind( this ) }
            tabIndex={ index } className={ this.state.selectedIndex === index ? 'selected' : '' }> { r } </li> )
          }
          </ul>
      </div> );
    }
  }

export default AutoComplete;
