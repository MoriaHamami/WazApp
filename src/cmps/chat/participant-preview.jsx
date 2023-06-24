import { DeleteOutline } from "@mui/icons-material"
import { Avatar, IconButton } from "@mui/material"

function ParticipantPreview({ id, name, imgURL, onDeleteParticipant }) {
    return (
        <div className="participant-preview">
            <Avatar className="participant-img" src={imgURL} />
            <div className="underline">
                <p>{name}</p>
                <DeleteOutline className="delete-btn" onClick={() => onDeleteParticipant(id)} />

            </div>
        </div>
    )
}

export default ParticipantPreview