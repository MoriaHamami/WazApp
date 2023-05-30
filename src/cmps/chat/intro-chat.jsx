import Lock from '@mui/icons-material/Lock'
import laptopCartoon from '../../assets/imgs/laptop-cartoon.webp'

function IntroChat() {
    return (
        <div className="intro-chat">
            <article>
                <img src={laptopCartoon} alt="" />
                <h1>WazApp Web</h1>
                <p>Send and recieve messages easily without keeping your phone online.</p>
            </article>

            <p><Lock /> End-to-end encrypted</p>
        </div>
    )
}
export default IntroChat