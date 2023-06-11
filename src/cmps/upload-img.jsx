import { doc, updateDoc } from "@firebase/firestore"
// import { utilService } from "../../services/util.service"
// import db from "../../services/firebase";
import { utilService } from "../services/util.service";
import db from "../services/firebase";
import Resizer from "react-image-file-resizer";

function UploadImg({ imgRef, type, id }) {

    async function updateImg(img) {
        // console.log('imgURL:', img)

        // Resize img
        // img = resizeImg(img)

        let ref
        if (type === 'group') {

            ref = doc(db, "rooms", id);
            // const msgRef = doc(roomRef, "msgs", msgs.docs[i].id);
        } else {
            ref = doc(db, "users", id);
            // const msgRef = doc(userRef, "msgs", msgs.docs[i].id);

        }
        await updateDoc(ref, { imgURL: img })
        // await updateDoc(ref, { imgURL: img.src })
    }

     function resizeImg(event) {
        try {
             Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    console.log(uri);
                    updateImg(uri)
                },
                "base64",
                200,
                200
            );
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='upload-img'>
            {/* <input type="file" id="file-input" onChange={() => utilService.uploadImg(imgRef.current, updateImg)} /> */}
            <input type="file" id="file-input" onChange={(ev) => resizeImg(ev)} />
            {/* <input type="file" id="file-input" onChange={(ev) => utilService.uploadImg(ev, updateImg)} /> */}
        </div>
    )
}

export default UploadImg