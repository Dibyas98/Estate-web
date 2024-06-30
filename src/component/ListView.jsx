import React from 'react'
import { BaggageClaim, Bookmark, ThumbsUp, ThumbsDown, MessageSquare, Bed, SquareParking, Bath, Sofa } from 'lucide-react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive={
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1
    }
  }
const ImgCarousel = ({ phot }) => {
    return (
        <Carousel responsive={responsive} showDots={true} centerMode={true} infinite={true}>
            {
                phot.map((ele) => {
                    return <img src={ele} alt="" className='w-full h-full' style={{
                        display: 'block',
                        height: '100%',
                        margin: 'auto',
                        width: '100%',
                        padding:'0 1rem',
                    }} />
                })
            }
        </Carousel>
    )
}

function ListView({ data }) {
    return (
        <section className='w-full border flex justify-center'>
            <main className='w-full xl:w-4/5 border '>

                <div className='w-full px-6'>
                    <div className='flex w-full'>
                        <h2 className='w-3/5 h-20'>{data.name}</h2>
                        <div className='flex w-2/5 flex-col xl:flex-row justify-center gap-5  items-start'>
                            <div className='w-full flex-col flex justify-between'>
                                <h2>{data.regularPrice}</h2>
                                <h2>{data.discountPrice > 0 ? data.discountPrice : ''}</h2>
                            </div>

                            <div className='flex justify-between w-full xl:w-2/5'>
                                <button><Bookmark></Bookmark></button>
                                <button><BaggageClaim></BaggageClaim></button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'><ImgCarousel phot={data.imageUrls} /></div>
                    <p>{data.description}</p>

                    <div>
                        {data.furnished && <Sofa />}
                        {data.parking && <SquareParking />}
                        <div>
                            <Bath></Bath>
                        </div>
                        <div>
                            <Bed></Bed>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <button className='w-full bg-teal-300 border-r-2 rounded-sm flex items-center justify-center gap-3 py-2'><ThumbsUp />Like</button>
                    <button className='w-full bg-teal-300 border-x-2 rounded-sm flex items-center justify-center gap-3 py-2'><ThumbsDown />dislike</button>
                    <button className='w-full bg-teal-300 border-l-2 rounded-sm flex items-center justify-center gap-3 py-2'><MessageSquare />Comment</button>
                </div>
                <div>
                    comment
                </div>

            </main>
        </section>
    )
}

export default React.memo(ListView)