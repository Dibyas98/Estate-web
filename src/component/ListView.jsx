import React from 'react'
import { BaggageClaim, Bookmark,ThumbsUp ,ThumbsDown,MessageSquare ,Bed ,SquareParking ,Bath ,Sofa  } from 'lucide-react';

function ListView() {
    return (
        <section className='w-full border flex justify-center'>
            <main className='w-full xl:w-4/5 border '>
                <div>Carasus</div>
                <div className='w-full px-6'>
                    <div className='flex w-full'>
                        <h2 className='w-3/5 h-20'>Name</h2>
                        <div className='flex w-2/5 flex-col xl:flex-row justify-center gap-5  items-start'>
                            <div className='w-full flex-col flex justify-between'>
                                <h2>Price</h2>
                                <h2>Discount</h2>
                            </div>
                            <div className='flex justify-between w-full xl:w-2/5'>
                                <button><Bookmark></Bookmark></button>
                                <button><BaggageClaim></BaggageClaim></button>
                            </div>
                        </div>
                    </div>
                    <p>Desc</p>

                    <div>
                        Facility
                    </div>
                </div>
                <div className='flex'>
                    <button className='w-full bg-teal-300 border-r-2 rounded-sm'>Like</button>
                    <button className='w-full bg-teal-300 border-x-2 rounded-sm'>dislike</button>
                    <button className='w-full bg-teal-300 border-l-2 rounded-sm'>Comment</button>
                </div>
                <div>
                    comment
                </div>

            </main>
        </section>
    )
}

export default React.memo(ListView)