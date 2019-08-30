import React from "react";
export const Loading:React.FC = () => <div
    style={{width: '100%', height: '100%', position: 'absolute', background:'rgba(255, 255, 255, 0.5)', zIndex: 9}}>
    <div style={{background: "rgba(130, 168, 203, 0.8)", padding: '50px 100px', position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}}>Loading...</div>
</div>;