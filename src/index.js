/**
* React AutoComplete Component
*
* @author  Avraam Mavridis      <avr.mav@gmail.com>
*
*/
import { React } from 'react';

class AutoComplete extends React.Component {

  static defaultProps = {
    inputStyle : {
      width : '100px',
    },
    optionStyle : {
      width : '106px',
    },
    selectedStyle : {
      width           : '106px',
      backgroundColor : 'LightSkyBlue',
    },
    onOpen   : () => null,
    onClose  : () => null,
    onSelect : () => null,
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
    const _opt = this.props.options.filter( ( opt ) => opt.indexOf( e.target.value ) > -1 );
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
    const selectedStyle = { ...this.props.selectedStyle };

    return ( <div>
      <input ref="inputElement" style={ inputStyle } onChange={ this.onType.bind( this ) } type="text" value={ this.state.value }/>
        <ul tabindex="0">
        {
        this.state.options.map( ( r, index ) => <li style={ this.state.selectedIndex === index ? selectedStyle : optionStyle }
          onClick={ this.onOptionClick.bind( this ) }
          tabindex={ index }
          className={ this.state.selectedIndex === index ? 'selected' : '' }> { r } </li> )
        }
        </ul>
    </div> );
  }
}

export default AutoComplete;
