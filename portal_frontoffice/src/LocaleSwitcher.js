import React, {Component} from 'react';
import counterpart from 'counterpart';

class LocaleSwitcher extends Component {
    handleChange(e) {
        counterpart.setLocale(e.target.value);
        localStorage.setItem("locale", e.target.value);
        window.location.reload();
    }

    render() {
    return (
            <select className="btn btn-warning" defaultValue={counterpart.getLocale()} onChange={this.handleChange}>
                <option>pt</option>
                <option>en</option>
            </select>
        );
    }
}

export default LocaleSwitcher;