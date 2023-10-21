import { Link } from "react-router-dom";
import { sideBarConstant } from "../../Constant/sidebarConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faWifi, faUsers, faCog } from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the FontAwesome library
library.add(faHome, faWifi, faUsers, faCog);

function SideBar() {
  return (
    <div>
      <div className="card aasan-sidebar">
        <div className="card-body">
          <ul className="nav flex-column">
            {sideBarConstant?.OPTIONS.map((item, index) => {
              return (
                // <li className="nav-item" key={index}>
                //   <Link className="nav-link aasan-option-link" aria-current="page" to={item?.PATH}>
                //     <FontAwesomeIcon icon={item?.ICON} className="mr-2" size="sm" />
                //     {item?.TITLE}
                //   </Link>
                // </li>
                <li className="nav-item" key={index}>
                  <Link className="nav-link aasan-option-link" aria-current="page" to={item?.PATH}>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={item?.ICON} className="mr-2" size="sm" />
                      <span style={{ marginLeft: '8px', fontSize: 'smaller' }}>{item?.TITLE}</span>
                    </div>
                  </Link>
                </li>


              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
