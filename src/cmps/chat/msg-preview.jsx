import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { useInView } from "react-intersection-observer"

function MsgPreview({ timestamp, idx, msgsRef, date, name, msg, prevDate, nextTimestamp, floatingTimestamp }) {
    const [isDateShown, setIsDateShown] = useState(false)
    // const [isDateNearestHidden, setIsDateNearestHidden] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    // const [nearDates, setNearDates] = useState([])
    const dateRef = useRef(false)
    // const {ref: dateRef, inView: isDateVisible} = useInView()
   
   // TODO: Make first message not disappear when at top
   
    useEffect(() => {
        updateDate()
// console.log('idx:', idx)
        // const observer = new IntersectionObserver((entries) => {
        //     const entry = entries[0]
        //     // console.log('entries:', entries)
        //     setIsDateNearestHidden(entry.isIntersecting)
        // })

        // if(dateRef.current) observer.observe(dateRef.current)

        // return(() => {
        //     if(dateRef.current) observer.unobserve(dateRef.current)
        // })
        // Change all dates when the day changes
    }, [])
    // }, [date, prevDate])

    // function updateDateVisibility(){

    //         if(!nextDate) return // Check this option
    //         // The current date to show floating on scroll
    //         // Is the first date that is invisible after the last visible date
    //         if(nextTimestamp &&
    //             nextTimestamp === nextDate && 
    //             nextDate.isVisible &&
    //             timestamp === currDate && 
    //             !currDate.isVisible) {
    //                 setIsFloatingOnScroll(true)
    //             }
    //         // if()
    //         // if(invisibleDates.includes(dateRef.current)) setIsDateVisible(true)

    // }

    function updateDate() {
        if (!date) return
        // if (!prevDate) return dateRef.current = true
        if (!prevDate) return setIsDateShown(true)
        // if (!prevDate) return 
        // return setIsDateShown(true)
        // console.log('msgDate:', msgDate)
        // console.log('prevMsgDate:', prevMsgDate)
        
        // const isFromToday = currDate > msgDate + 1000 * 60 * 60 * 24
        
        
        if(prevDate !== date) setIsDateShown(true)
        // if(prevDate !== date) dateRef.current =true

            // console.log('prevDate:', prevDate)
            // console.log('date:', date)
            // setIsDateShown(true)
        // }
        // const currDate = new Date(Date.now()).getTime()
        // const msgDate = new Date(timestamp.seconds * 1000).getTime()
        // const prevMsgDate = new Date(prevTimestamp.seconds * 1000).getTime()
        // const isNewDate = msgDate - prevMsgDate > 86400000
        // if (isNewDate) setIsDateShown(true)


        // if (index > 0) {
        //     previousDate = moment(this.state.messages[index - 1].created_at).format(
        //         "L"
        //     );
        // } else {
        //     previousDate = moment(this.state.messages.created_at).format("L");
        // }
        // !moment(currentDate).isSame(previousDate, "day")
        // let currentDate = moment(item.created_at).format("L");
    }

    // useImperativeHandle(ref, () => {
    //     return {
    //       getRefs: [...ref, dateRef.current],
    //       scrollIntoView() {
    //         dateRef.current.scrollIntoView();
    //       },
    //     };
        
    //     // [ref, ...dateRef.current]
    //   }, []);

    return (
        <>
            {/* {console.log('isDateVisible:', isDateVisible, utilService.getChatFormattedDate(timestamp))} */}
            {/* {isDateShown && !isDateVisible ? <div className="chat-timestamp absolute">{utilService.getChatFormattedDate(timestamp)}</div> : null}
            {isDateShown ? <div ref={dateRef} className="chat-timestamp">{utilService.getChatFormattedDate(timestamp)}</div> : null} */}
            {isDateShown ?
                <div className={`chat-timestamp ${floatingTimestamp === date && 'sticky'}`}>
                {/* <div ref={dateRef} className={`chat-timestamp ${floatingTimestamp === utilService.getChatFormattedDate(timestamp) && 'sticky'}`}> */}
                    {date}
                    {/* {utilService.getChatFormattedDate(timestamp)} */}
                </div> : null}

            <div className="msg-preview" ref={el => msgsRef.current[idx] = el} date={date}>
            {/* <div className="msg-preview" ref={el => msgsRef.current.push(el)} date={date}> */}
            {/* <div className="msg-preview" ref={el => msgsRef.current[idx] = el} timestamp={utilService.getChatFormattedDate(timestamp)}> */}
                <div className={`rect ${name === loggedInUser.name && 'reciever'}`}></div>
                <div className={`chat-msg ${name === loggedInUser.name && 'reciever'}`}>
                    <p className="username">{name}</p>
                    <p className="content">{msg}</p>
                    <p className="timestamp">{timestamp}</p>
                    {/* <p className="timestamp">{new Date(timestamp?.toDate()).toUTCString()}</p> */}
                </div>
            </div>
        </>
    )
    {/* <div className={`circle ${name === loggedInUser.displayName && 'reciever'}`}></div> */ }
}

export default MsgPreview