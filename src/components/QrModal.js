import React from 'react'
import QRCode from 'qrcode.react'

export default function QrModal({onClose, url}) {
    return (
        <div className="qr-modal-container" onClick={onClose}>
            <QRCode value={url} fgColor="#ff00ff" size={200} />          
        </div>
    )
}
