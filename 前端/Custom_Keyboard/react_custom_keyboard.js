// React 实现车牌键盘的示例代码

// Installation

// yarn add vehicle - plate - keyboard


// Usage

import LicenseKeyboard from 'vehicle-plate-keyboard';
import 'vehicle-plate-keyboard/dist/main.css';


<LicenseKeyboard
    visible={state.showKeyboard}
    onChange={value => setState({ value })}
    value={state.value}
    done={() => setState({ showKeyboard: false })}
/>



// API

// props	type description
// visiable	boolean	keyboard visible
// onChange(value: string) => void trigger when user tap
// value	string	controlled value
// done() => void trigger when keyborad dismiss
// confirmButtonStyle	React.CSSProperties	confirm button style
// confirmButtonText	string	confirm button text
// cellTextStyle	React.CSSProperties	keycell style
// safeArea	boolean	show safearea

// 来源：https://www.jb51.net/article/176805.htm
