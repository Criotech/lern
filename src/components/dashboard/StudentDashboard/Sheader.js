import React from 'react'

export default function Theader({ name, role, onLogout }) {
    return (
        <div class="pt-3 pb-3" style={{backgroundColor: "#00C6C5",}}>
            <div className="container d-flex justify-content-between align-items-center">
                <div>
                    <h3 style={{color: "#ffffff"}}>Welcome {name} ({role})</h3>
                </div>
                <div className="d-flex align-items-center" onClick={onLogout}>
                    {/* <div className="shadow mr-2" style={{width: 20, height: 20, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "blue", color: "#ffffff"}}>O</div> */}
                <span style={{ cursor: 'pointer', color: "#ffffff" }}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</span>
                </div>
            </div>
        </div>
    )
}
