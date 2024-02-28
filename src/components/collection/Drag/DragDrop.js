import React, { useState } from 'react'
import Picture from './Picture'
import { useDrop } from 'react-dnd'
import "./DragAndDropProvider.css"

const PictureList =[
    {
        id: 1,
        url: "https://res.cloudinary.com/dpnrapsvi/image/upload/v1708989158/Media/cjjgjr4mmsowydqxucht.png"
    },
    {
        id: 2,
        url: "https://res.cloudinary.com/dpnrapsvi/image/upload/v1708990961/Media/ibbrnl35la2sectce4cj.jpg"
    },
    {
        id: 3,
        url: "https://res.cloudinary.com/dpnrapsvi/image/upload/v1709003497/Media/nhkl1posngc5xyapdlw3.png"
    },
]

function DragDrop() {

    const [board, setBoard] = useState ([ ])

    const [{isOver}, drop] = useDrop (() => ({

        accept: "image",
        drop: (item) => addImageToBoard (item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
          }),

    }))

    const addImageToBoard = (id) => {
      const pictureList = PictureList.filter((picture) => id === picture.id )
      setBoard((board) => [...board, pictureList[0]])
    }


  return (
  <>
  <div className='Pictures'> {PictureList.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />
  })} </div>
  <div className='Board' ref={drop}>
    {board.map((picture) => {
         return <Picture url={picture.url} id={picture.id} />
    })}
  </div>
  </>
  )
}

export default DragDrop