import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './calc.css';

// ========================================

interface DigitProps {
    value: string;
    onClick(): void;
}
interface DigitState { }

class Digit extends React.Component<DigitProps, DigitState> {
    render() {
        return (
            <button className="digit" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

interface BoardProps {
    onClick(value: string): void;
}
interface BoardState { }

class Board extends React.Component<BoardProps, BoardState>  {
    renderDigit(val: string) {
        return <Digit value={val} onClick={() => this.props.onClick(val)} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderDigit('7')}{this.renderDigit('8')}{this.renderDigit('9')}{this.renderDigit('*')}
                </div>
                <div className="board-row">
                    {this.renderDigit('4')}{this.renderDigit('5')}{this.renderDigit('6')}{this.renderDigit('-')}
                </div>
                <div className="board-row">
                    {this.renderDigit('1')}{this.renderDigit('2')}{this.renderDigit('3')}{this.renderDigit('+')}
                </div>
                <div className="board-row">
                    {this.renderDigit('C')}{this.renderDigit('0')}{this.renderDigit('.')}{this.renderDigit('/')}
                </div>
            </div>
        );
    }
}

interface Props { }
class State {
    display: string = '0';
    pushed: Array<string> = [''];
}

export class Calculator extends React.Component<Props, State> {
    state = {
    display: '0',
    pushed: ['']
};

    handleClick(i: string): void {
        let pushed = this.state.pushed;
        let l: any = pushed[pushed.length - 1];
        let I: any = i;
        if (!isNaN(l * 1) && (!isNaN(I * 1) || I === '.')) {
            pushed[pushed.length - 1] = l + i;
            this.setState({
                pushed: pushed,
                display: pushed[pushed.length - 1]
            });
        } else if (i === '*' || i === '-' || i === '+' || i === '/') {
            pushed.push(i);
            this.setState({
                pushed: pushed
            });
        } else if (isNaN(l * 1) && !isNaN(I * 1)) {
            pushed.push(i);
            this.setState({
                pushed: pushed,
                display: pushed[pushed.length - 1]
            });
        } else if (i === 'C') {
            this.setState({
                pushed: [''],
                display: '0'
            });
        }
    }

    calculate(): void {
        let pushed: Array<any> = this.state.pushed;
        for (var z = 1; z < pushed.length; z = z + 2) {
            switch (pushed[z]) {
                case '*':
                    pushed[z + 1] = (pushed[z - 1] * 1) * (pushed[z + 1] * 1);
                    this.setState({
                        pushed: pushed,
                        display: pushed[pushed.length - 1]
                    });
                    break;
                case '-':
                    pushed[z + 1] = (pushed[z - 1] * 1) - (pushed[z + 1] * 1);
                    this.setState({
                        pushed: pushed,
                        display: pushed[pushed.length - 1]
                    });
                    break;
                case '+':
                    pushed[z + 1] = (pushed[z - 1] * 1) + (pushed[z + 1] * 1);
                    this.setState({
                        pushed: pushed,
                        display: pushed[pushed.length - 1]
                    });
                    break;
                case '*':
                    pushed[z + 1] = (pushed[z - 1] * 1) / (pushed[z + 1] * 1);
                    this.setState({
                        pushed: pushed,
                        display: pushed[pushed.length - 1]
                    });
                    break;
                default:
                    break;
            }
        }
        this.setState({
            pushed: [pushed[pushed.length - 1]]
        });
    }

    render() {
        return (
            <div className="display">
                {this.state.display}
                <Board onClick={(i) => this.handleClick(i)} />
                <button className="equal" onClick={() => this.calculate()}>
                    =
        </button>
            </div>
        );
    }
}
