import * as React from 'react'
import { useSwipeable } from "react-swipeable";


const styles = {
    height: "200px",
    border: "1px solid red"
}
function Swiper(props: any) {
    const handlers = useSwipeable({
        // onSwipedLeft: () => slide(NEXT),
        // onSwipedRight: () => slide(PREV),
        onSwipedLeft: () => console.log("left"),
        onSwipedRight: () => console.log("right"),
        onSwiped: (eventData) => console.log("User Swiped===?", eventData),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });
    return (
        <div {...handlers} style={styles}>
            <div>
                you can swipe here
            </div>
        </div>
    )
}

export default Swiper