import * as React from "react";
import {  withRouter } from 'react-router-dom';
import DeleteUserModal from "../../../components/UserProfile/DeleteUserModal/DeleteUserModal";


import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import AssignLocationModal from "../../LocationManagement/AssignLocationModal/AssignLocationModal";
import RemoveLocationModal from "../../LocationManagement/RemoveLocationModal/RemoveLocationModal";



class UserManagementTableItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteModalShow: false,
            assignLocationModalShow: false,
            removeLocationModalShow: false,
        }
    }

    // Triggers the opening/closing of the DeleteUserModal
    setDeleteModalShow = (bool) => {
        this.setState({
            deleteModalShow: bool,
        });
    };

    // Triggers the opening/closing of the AssignLocationModal
    setAssignLocationModalShow = (bool) => {
        this.setState({
            assignLocationModalShow: bool,
        });
    };

    // Triggers the opening/closing of the RemoveLocationModal
    setRemoveLocationModalShow = (bool) => {
        this.setState({
            removeLocationModalShow: bool,
        });
    };

    profileRouter = () => {
        const {id, history} =  this.props;
        let path = "/admin/user-profile/".concat(id);
        history.push(path);
    }

    render() {
        const {name, profileImg, id, device } = this.props;
        const {deleteModalShow, assignLocationModalShow, removeLocationModalShow} = this.state;
        return (
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                                {name}
                            </span>
                    </Media>
                </th>
                <td>
                    <div className="avatar-group">
                        <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id={"tooltip" + id}
                            onClick={e => e.preventDefault()}
                        >
                            <img
                                alt="..."
                                className="rounded-circle"
                                src={profileImg}
                            />
                        </a>
                        <UncontrolledTooltip
                            delay={0}
                            target={"tooltip" + id}
                        >
                            {name}
                        </UncontrolledTooltip>
                    </div>
                </td>
                <td>{(device)? device.id : "NONE" }</td>
                <td>{(device)? (device.geofence)?  device.geofence.locationName : "NONE" : "NONE" }</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href=""
                                onClick={this.profileRouter}
                            >
                                View Profile
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                Locate User
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => this.setDeleteModalShow(true)}
                            >
                                Delete User
                            </DropdownItem>
                            {(device)?
                                (device.geofence)?
                                <DropdownItem
                                    onClick={() => this.setRemoveLocationModalShow(true)}
                                >
                                    Remove Location
                                </DropdownItem>
                                    :
                                    <DropdownItem
                                        onClick={() => this.setAssignLocationModalShow(true)}
                                    >
                                        Assign a Location
                                    </DropdownItem>
                            :
                            null}
                            <DeleteUserModal show={deleteModalShow} userID={id} userName={name} onHide={() => this.setDeleteModalShow(false)} />
                            <AssignLocationModal show={assignLocationModalShow} userName={name} deviceID={(device)? device.id : ""} onHide={() => this.setAssignLocationModalShow(false)}  />
                            <RemoveLocationModal show={removeLocationModalShow} userName={name} deviceID={(device)? device.id : ""} locationName={(device)? (device.geofence)? device.geofence.locationName : "N/A" : "N/A"} onHide={() => this.setRemoveLocationModalShow(false)} />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        )
    }
}

export default withRouter(UserManagementTableItem);