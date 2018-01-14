import React, { Component } from 'react';
import Translate from 'react-translate-component';

class EquipmentsTable extends Component {
    static defaultProps = {
        equipments: [],
        hasPrice: false
    };

    render() {

        let equipments = this.props.equipments.map((eq) => {
            return (
                <li key={eq.id}>
                    <span>{eq.name} </span>
                    {this.props.hasPrice && <span>({eq.price} €)</span>}
                </li>
            )
        });

        let dropdownEquipments = (equipments.length === 0)?
            <li>
                <p>No equipments</p>
            </li>
            : equipments;


        return (
            <div>
                <ul>
                    <h6 className="text-left font-weight-bold">
                        {this.props.hasPrice? <Translate content="general.supplemental_equipments"/> : <Translate content="general.base_equipments"/>}
                    </h6>
                    {equipments}
                </ul>
            </div>
        );
    }
}

export default EquipmentsTable;