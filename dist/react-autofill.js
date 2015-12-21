'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * React AutoComplete Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @author  Avraam Mavridis      <avr.mav@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var AutoComplete = (function (_React$Component) {
  _inherits(AutoComplete, _React$Component);

  function AutoComplete() {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoComplete).call(this));

    _this.state = {
      options: [],
      selectedIndex: -1,
      isOpen: false,
      value: ''
    };
    _this.initKeyEvents();
    return _this;
  }

  /**
   * Initialize key events
   *
   * @method initKeyEvents
   *
   * @return { void }
   */

  _createClass(AutoComplete, [{
    key: 'initKeyEvents',
    value: function initKeyEvents() {
      var that = this;

      document.addEventListener('keydown', function (e) {
        if (e.which === 40 && that.state.selectedIndex + 1 < that.state.options.length) {
          that.setState({
            selectedIndex: that.state.selectedIndex + 1
          });
        } else if (e.which === 38 && that.state.selectedIndex - 1 >= -1) {
          that.setState({
            selectedIndex: that.state.selectedIndex - 1
          });
        } else if (e.which === 13 && that.state.isOpen) {
          that.setState({
            value: that.state.options[that.state.selectedIndex],
            options: [],
            isOpen: false
          });

          that.props.onSelect(that.state.value);
        }
      });
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

  }, {
    key: 'onType',
    value: function onType(e) {
      var _opt = this.props.options.filter(function (opt) {
        return opt.indexOf(e.target.value) > -1;
      });
      this.setState({
        options: !!e.target.value ? _opt : [],
        value: e.target.value,
        isOpen: Boolean(_opt.length && e.target.value),
        selectedIndex: -1
      });
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

  }, {
    key: 'onOptionClick',
    value: function onOptionClick(e) {
      this.setState({
        value: e.target.textContent,
        options: [],
        isOpen: false,
        selectedIndex: -1
      });
      this.props.onSelect(this.state.value);
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

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      // use the literal form of the literal because of the undefined case
      this.isClosed = this.isClosed || 'true';
      if (nextState.isOpen && this.isClosed === 'true') {
        nextProps.onOpen();
        this.isClosed = 'false';
      } else if (!nextState.isOpen && this.isClosed === 'false') {
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

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var inputStyle = _extends({}, this.props.inputStyle);
      var optionStyle = _extends({}, this.props.optionStyle);
      var selectedStyle = _extends({}, this.props.selectedStyle);

      return _react.React.createElement(
        'div',
        null,
        _react.React.createElement('input', { ref: 'inputElement', style: inputStyle, onChange: this.onType.bind(this), type: 'text', value: this.state.value }),
        _react.React.createElement(
          'ul',
          { tabindex: '0' },
          this.state.options.map(function (r, index) {
            return _react.React.createElement(
              'li',
              { style: _this2.state.selectedIndex === index ? selectedStyle : optionStyle,
                onClick: _this2.onOptionClick.bind(_this2),
                tabindex: index,
                className: _this2.state.selectedIndex === index ? 'selected' : '' },
              ' ',
              r,
              ' '
            );
          })
        )
      );
    }
  }]);

  return AutoComplete;
})(_react.React.Component);

AutoComplete.defaultProps = {
  inputStyle: {
    width: '100px'
  },
  optionStyle: {
    width: '106px'
  },
  selectedStyle: {
    width: '106px',
    backgroundColor: 'LightSkyBlue'
  },
  onOpen: function onOpen() {
    return null;
  },
  onClose: function onClose() {
    return null;
  },
  onSelect: function onSelect() {
    return null;
  }
};
exports.default = AutoComplete;