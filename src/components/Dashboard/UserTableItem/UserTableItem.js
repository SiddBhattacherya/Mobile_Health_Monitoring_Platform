import * as React from "react";
import {
    Badge,
    Media,
    UncontrolledTooltip
} from "reactstrap";



class UserTableItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePhoto:  require("../../../assets/img/theme/blank-profile.png"),
        }
    }

    componentDidMount() {
       const {  profileImg } = this.props;
       if (profileImg) {
           this.setState({
               profilePhoto: profileImg,
           })
       }
    }


    render() {
        const {name,id, heartRate, device } = this.props;
        const { profilePhoto } = this.state;
        let statusClass = "bg-success";
        /*switch (status.code) {
            case -1:{
                statusClass = "bg-warning"
                break;
            }
            case 0:{
                statusClass = "bg-success"
                break;
            }
            case 1:{
                statusClass = "bg-warning"
                break;
            }
            case 3:{
                statusClass = "bg-info"
                break;
            }
            case 4:{
                statusClass = "bg-danger"
                break;
            }
            default:
                break;
        }*/
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
                                src={profilePhoto}
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
                <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className={statusClass} />
                         {(device)? device.deviceStatus : "N/A"}
                    </Badge>
                </td>
                <td>
                    <div className="d-flex align-items-center">
                        <span className="mr-2">
                            {heartRate}
                        </span>
                    </div>
                </td>
            </tr>
        )
    }
}

export default UserTableItem;